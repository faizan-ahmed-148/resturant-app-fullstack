import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./App.css"
import { Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from './Component/Home/Home';
import Footer from './Component/Layout/Footer/Footer';
import Header from './Component/Layout/Header/Header';
import About from './Component/Layout/About/About';
import Contact from './Component/Layout/Contact/Contact';
import { ProductDetail } from './Component/Product/ProductDetail';
import Products from './Component/Product/Products';
import LoginSignup from './Component/User/LoginSignup';
import { loadUser } from "./Actions/User"
import UserOptions from './Component/Layout/Header/UserOptions';
import Profile from './Component/User/Profile';
import ForgotPassword from './Component/User/ForgotPassword';
import ResetPassword from './Component/User/ResetPassword';
import UpdateProfile from './Component/User/UpdateProfile';
import UpdatePassword from './Component/User/UpdatePassword';
import Cart from './Component/Cart/Cart';
import Shipping from './Component/Cart/Shipping';
import ConfirmOrder from './Component/Cart/ConfirmOrder';
import Payment from './Component/Cart/Payment';
import OrderSuccess from './Component/Cart/OrderSuccess';
import MyOrder from "./Component/Order/MyOrder"
import OrderDetails from "./Component/Order/OrderDetails"
import Dashboard from "./Component/Admin/Dashboard"
import ProductList from './Component/Admin/ProductList';
import NewProduct from './Component/Admin/NewProduct';
import UpdateProduct from './Component/Admin/UpdateProduct';
import NotFound from "./Component/Layout/NotFound/NotFound"
import ProductReview from './Component/Admin/ProductReview';
import UpdateUser from './Component/Admin/UpdateUser';
import UsersList from './Component/Admin/UsersList';
import ProcessOrder from './Component/Admin/ProcessOrder';
import OrderList from './Component/Admin/OrderList';

const App = () => {
  const dispatch = useDispatch()

  const { isAuthenticated, user, loading } = useSelector((state) => state.users);
  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    
    dispatch(loadUser());
    
    getStripeApiKey()

  }, [dispatch ]);


  return (
    <>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes> 

           <Route path="/process/payment" element={isAuthenticated ? <Payment /> : <LoginSignup />} />
          </Routes> 
        </Elements> 
      )}
          <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/account" element={isAuthenticated ? <Profile user={user} loading={loading} /> : <LoginSignup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <LoginSignup />} />
        <Route path="/password/update" element={isAuthenticated ? <UpdatePassword /> : <LoginSignup />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/shipping" element={isAuthenticated ? <Shipping /> : <LoginSignup />} />
        <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <LoginSignup />} />
        <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <LoginSignup />} />
        <Route path="/success" element={isAuthenticated ? <OrderSuccess /> : <LoginSignup />} />
        <Route path="/orders" element={isAuthenticated ? <MyOrder /> : <LoginSignup />} />
        <Route path="/order/:id" element={isAuthenticated ? <OrderDetails /> : <LoginSignup />} />
     
        <Route path="/admin/dashboard"  element={ user && user.role==="admin" && isAuthenticated ? <Dashboard /> : <LoginSignup />} />
       <Route path="/admin/products"  element={ user && user.role==="admin" && isAuthenticated ? <ProductList /> : <LoginSignup />} />
       <Route path="/admin/product"  element={ user && user.role==="admin" && isAuthenticated ? <NewProduct /> : <LoginSignup />} />
       <Route path="/admin/product/:id"  element={ user && user.role==="admin" && isAuthenticated ? <UpdateProduct /> : <LoginSignup />} />

       <Route path="/admin/orders"  element={ user && user.role==="admin" && isAuthenticated ? <OrderList /> : <LoginSignup />} />
       <Route path="/admin/order/:id"  element={ user && user.role==="admin" && isAuthenticated ? <ProcessOrder /> : <LoginSignup />} />
       <Route path="/admin/users"  element={ user && user.role==="admin" && isAuthenticated ? <UsersList /> : <LoginSignup />} />
       <Route path="/admin/user/:id"  element={ user && user.role==="admin" && isAuthenticated ? <UpdateUser /> : <LoginSignup />} />
       <Route path="/admin/reviews"  element={ user && user.role==="admin" && isAuthenticated ? <ProductReview /> : <LoginSignup />} />
      

       <Route path="*" element={<NotFound />} />
       <Route
          component={
            window.location.pathname === "/process/payment" ? null : null
          }
        />
      </Routes>  
      

      <Footer />
    </>
  )
}

export default App
