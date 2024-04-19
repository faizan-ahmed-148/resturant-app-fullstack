import React from 'react'
import { Rating } from "@mui/material";
import { NavLink } from 'react-router-dom';

const ProductCard = ({product}) => {
    

        return (
            <>
          <NavLink className="productCard" to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
              <Rating
                name= "size-large"
                size="small"
           
                value= {product.ratings}
                readOnly= {true}
                precision= {0.5}
                 
            />{""}
              <span className="productCardSpan">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <span>{`₹${product.price}`}</span>
          </NavLink>
        
          </>
        );
      };


export default ProductCard