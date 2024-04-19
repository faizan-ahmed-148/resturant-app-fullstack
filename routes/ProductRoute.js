const express = require("express");
const router  = express.Router()
const { createProduct, getAllProducts, GetAdminProducts, getProductDetails, updateProduct, deletePoduct, createProductReview, getProductReviews, deleteReview } = require("../controllers/ProductController");
const { isAuthenticated, authorizeRole } = require("../middlewares/auth");




router.route("/admin/create/product").post(isAuthenticated, authorizeRole("admin"),createProduct)

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticated, authorizeRole("admin"), GetAdminProducts);

router.route("/product/:id").get(getProductDetails);

router.route("/admin/product/:id")
.put(isAuthenticated, authorizeRole("admin"), updateProduct)
.delete(isAuthenticated, authorizeRole("admin"), deletePoduct)

router.route("/review").put(isAuthenticated, createProductReview);
  
router.route("/reviews").get(getProductReviews)
  .delete(isAuthenticated, deleteReview);


module.exports = router