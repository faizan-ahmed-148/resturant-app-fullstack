const User = require("../models/UserModel")
const Product = require("../models/ProductModel")
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/APiFeautures");


// create product (admin)
exports.createProduct = async (req, res) => {
    try {
        let images = [];

        if (typeof req.body.images === "String") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
        req.body.user = req.user._id

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product,
            message: "Product Created Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}





exports.getAllProducts = async (req, res) => {
    try {

        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();

        const apiFeature = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
            .pagination(resultPerPage);

        let products = await apiFeature.query;

        let filteredProductsCount = products.length;

          apiFeature.pagination(resultPerPage);

        // const products = await apiFeature.query;
        // console.log(products)

        res.status(200).json({
            success: true,
            products,
            productsCount,
            resultPerPage,
            filteredProductsCount,
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// Get All Product (Admin)

exports.GetAdminProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            products,
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}


// get Product Detail 
exports.getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Update Product -- Admin

exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);


        if (!product) {
            return res.status(400).json({
                success: false,
                message: "product not found"
            })
        }

        // Images Start Here

        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "products",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.images = imagesLinks;
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            product,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }

};


// delete product (admin)

exports.deletePoduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "product not found"
            })
        }

        // Deleting Images From Cloudinary

        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        await product.remove();

        res.status(200).json({
            success: true,
            message: "Product Delete Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// Create New Review or Update the review
exports.createProductReview = async (req, res) => {
    try {
        const { rating, comment, productId } = req.body;

        const review = {
          user: req.user._id,
          name: req.user.name,
          rating: Number(rating),
          comment,
        };
      
        const product = await Product.findById(productId);
      
        const isReviewed = product.reviews.find(
          (rev) => rev.user.toString() === req.user._id.toString()
        );
      
        if (isReviewed) {
          product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
              (rev.rating = rating), (rev.comment = comment);
          });
        } else {
          product.reviews.push(review);
          product.numOfReviews = product.reviews.length;
        }
      
        let avg = 0;
      
        product.reviews.forEach((rev) => {
          avg += rev.rating;
        });
      
        product.ratings = avg / product.reviews.length;
      
        await product.save({ validateBeforeSave: false });
      
        res.status(200).json({
          success: true,
          message: "your review has been sent successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// Get All Reviews of a product
exports.getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.query.id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete Review
exports.deleteReview = async (req, res) => {
    try {
        const product = await Product.findById(req.query.productId);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "product not found"
            })
        }

        const reviews = product.reviews.filter(
            (rev) => rev._id.toString() !== req.query.id.toString()
        );

        let avg = 0;

        reviews.forEach((rev) => {
            avg += rev.rating;
        });

        let ratings = 0;

        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }

        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(
            req.query.productId,
            {
                reviews,
                ratings,
                numOfReviews,
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        res.status(200).json({
            success: true,
            message: "Review has been Deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};