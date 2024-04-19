import React from "react";
import MetaData from "../Home/MetaData/MetaData";
import Loader from "../Layout/Loader/Loading";
import { NavLink } from "react-router-dom";



import "./Profile.css";

const Profile = ({user, loading}) => {
  

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title={`${user.name}'s Profile`} />
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <NavLink to="/me/update">Edit Profile</NavLink>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>

            <div>
              <NavLink to="/orders">My Orders</NavLink>
              <NavLink to="/password/update">Change Password</NavLink>
            </div>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default Profile