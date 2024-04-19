import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../Layout/Loader/Loading";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../Home/MetaData/MetaData";
import { loadUser, UpdateProfileUser } from "../../Actions/User";
import { useNavigate } from "react-router-dom";



const UpdateProfile = () => {
    
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.users);
  const { error, message, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState();


  const updateProfileSubmit = (e) => {
    e.preventDefault();

    dispatch(UpdateProfileUser(name, email, avatar));
  };

  const updateProfileDataChange = (e) => {
    const file = e.target.files[0];
    
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  useEffect(() => {
   
    if (error) {
        alert.error(error);
        dispatch({ type: "CLEAR_ERROR" });
    }

    if (message) {
      
        alert.success(message);
        dispatch({ type: "CLEAR_MESSAGE" });
    
      dispatch(loadUser());

      navigate("/account");

    }
  }, [dispatch, error, alert, navigate, user, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatar} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;