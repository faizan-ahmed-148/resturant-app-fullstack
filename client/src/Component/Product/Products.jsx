import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loading";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { Typography, Slider, Button } from "@mui/material";
import Pagination from "react-js-pagination";
import MetaData from "../Home/MetaData/MetaData";
import { getAllProducts } from "../../Actions/Product";
import ProductCard from "../Home/ProductCard";



const categories = [
  "burger",
  "Cheeseburger",
  "Sandwich",
  "pizza",
  "Muffin",
  "Burrito",
  "Taco",
  "Hotdog"
];


const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams()


  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");


  const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);
  const keyword = params.keyword;

  const priceHandler = (e, newPrice) => {

    setPrice(newPrice);
  };

  const setCurrentPageNo = (e) => {

    setCurrentPage(e);
  };

  let count = productsCount;

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch({ type: "CLEAR_ERROR" })
    }

    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, alert, error, currentPage, price, category, ratings]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>


          <MetaData title="--Yang's Kitchen Foods" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
          </div>


          {/* Pricing  */}
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={100000}
            />

            {/* category  */}
            <Typography variant="h5">Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            {/* Ratings */}
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

            <Button variant="contained"
              className="Clear_Filter"
              style={{
                margin: "2vmax 0",
                backgroundColor: "red",
                padding: "0.9vmax",
              }}
              onClick={() => { window.location.reload() }} >Clear Filters</Button>
          </div>

          {/* pagination  */}
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

        </Fragment>
      )}
    </Fragment>
  )
}

export default Products