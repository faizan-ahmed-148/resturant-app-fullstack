import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    DeleteReviewReducer,
    ProductDetailReducer,
    ProductReducer,
    newProductReducer,
    newReviewReducer,
    productReducer
} from "./Reducers/ProductReducer"

import {
    userReducer,
    ForgetPasswordReducer,
    ProfileReducer,
    allUsersReducer,
    userDetailsReducer
} from "./Reducers/UserReducer"


import {
    CartReducer
} from "./Reducers/CartReducer"

import {
    MyOrderReducer,
    NewOrderReducer,
    allOrdersReducer,
    orderDetailsReducer,
    orderReducer
} from "./Reducers/OrderReducer"

const reducer = combineReducers({
    products: ProductReducer,
    productDetails: ProductDetailReducer,
    users: userReducer,
    forgotPassword: ForgetPasswordReducer,
    profile: ProfileReducer,
    cart: CartReducer,
    newOrder: NewOrderReducer,
    myOrders: MyOrderReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    review: DeleteReviewReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    allOrders: allOrdersReducer,
   order: orderReducer,
    
});
let initialState = {
    cart: {

        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }

}
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;