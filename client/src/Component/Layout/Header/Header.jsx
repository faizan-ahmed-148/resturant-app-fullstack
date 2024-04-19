import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import './Header.css';
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate()

  const { cartItems } = useSelector((state) => state.cart);

  const [keyword, setKeyword] = React.useState("");
  const [ham, setHam]= React.useState(true)

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
        navigate(`/products/${keyword}`);
    } else {
        navigate("/products");
    }
  };

  return (
    <>
      <nav className="navbar">
      <MenuIcon className="ham" onClick={()=>setHam(!ham)}/>
      <div className={ham ? "nav_container" : "nav"}>
        <div className={ham ? "navbar__logo" : "nav"}>
          <img src="https://th.bing.com/th/id/R.317811ec58337f8071ebfb83a76d508f?rik=R%2fBQYoPU3RwM2w&pid=ImgRaw&r=0" alt="Amazon Logo" />
        </div>
        <form className={ham ? "navbar__search" : "nav"} onSubmit={searchSubmitHandler}>
          <input type="text" placeholder="Search a Product ..."   onChange={(e) => setKeyword(e.target.value)}/>
          <SearchIcon className={ham ? "navbar__searchIcon" : "nav"}/>
          <input type="submit" value="Search"/>
        </form>
        <div className={ham ? "navbar__navItems" : "nav"}>
          <NavLink to="/" className={ham ? "navbar__navLink" : "nav"}>
            Home
          </NavLink>
          <NavLink to="/about" className={ham ? "navbar__navLink" : "nav"}>
            About
          </NavLink>
          <NavLink to="/products" className={ham ? "navbar__navLink" : "nav"}>
            Products
          </NavLink>
          <NavLink to="/contact" className={ham ? "navbar__navLink" : "nav"}>
            Contact
          </NavLink>
        </div>
        <div className={ham ? "navbar__icons" : "nav"}>
          <NavLink to="/account"> <AccountCircleIcon className= {ham ? "navbar__icon" : "nav"}/> </NavLink>
          <NavLink to="/cart"> <ShoppingCartIcon className={ham ? "navbar__icon" : "nav"}/> </NavLink>
          <span className={ham ? "navbar__cartCount" : "nav"}>{cartItems.length}</span>
        </div>
        </div>
      </nav>
   
    </>
  )
};

export default Header;
