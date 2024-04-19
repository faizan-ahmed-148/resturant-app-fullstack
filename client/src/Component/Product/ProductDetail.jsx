import React, { Fragment, useEffect, useState } from 'react'
import "./ProductDetail.css"
import { Dialog, DialogActions, Button, DialogTitle, DialogContent } from "@mui/material"
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from "@mui/material";
import { getProductDetails } from '../../Actions/Product';
import Loader from '../Layout/Loader/Loading';
import MetaData from "../Home/MetaData/MetaData";
import ReviewCard from './ReviewCard';
import { addItemsToCart } from '../../Actions/Cart';
import { newReview } from '../../Actions/Product';
import { TbTruckDelivery, TbReplace } from "react-icons/tb";

export const ProductDetail = () => {
    const dispatch = useDispatch()
    const alert = useAlert();
    const { id } = useParams();


    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    const { message, error: reviewError } = useSelector(
        (state) => state.newReview
    );


    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product && product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity))
        alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);

        dispatch(newReview(myForm));

        setOpen(false);
    };





    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "CLEAR_ERROR" })
        }
        if (reviewError) {
            alert.error(reviewError)
            dispatch({ type: "CLEAR_ERROR" })
        }

        if (message) {
            alert.success(message)
            dispatch({ type: "CLEAR_MESSAGE" })
        }
        dispatch(getProductDetails(id))

    }, [dispatch, error, alert, id, message, reviewError]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={`${product && product.name} -- Yang's Kitchen`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product && product.images &&
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product && product.name}</h2>
                                <p>Product # {product && product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating
                                    name="size-large"
                                    size="medium"
                                    value={product && product.ratings}
                                    readOnly={true}
                                    precision={0.5}
                                />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product && product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product && product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product && product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product && product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product && product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>
                            <div className='detailsBlock-3-1-1-2'>
                                <div className="product-warranty-data">
                                    <TbTruckDelivery className="warranty-icon" />
                                    <p>Free Delivery</p>
                                </div>

                                <div className="product-warranty-data">
                                    <TbReplace className="warranty-icon" />
                                    <p>7 Days Replacement</p>
                                </div>

                                <div className="product-warranty-data">
                                    <TbTruckDelivery className="warranty-icon" />
                                    <p>3 to 4 Working Days </p>
                                </div>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product && product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />

                            <textarea
                                className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {product && product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product && product.reviews &&
                                product.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
};

