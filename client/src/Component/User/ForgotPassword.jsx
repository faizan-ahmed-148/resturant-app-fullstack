import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../Layout/Loader/Loading";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordUser } from "../../Actions/User";
import { useAlert } from "react-alert";
import MetaData from "../Home/MetaData/MetaData";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );



  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(ForgotPasswordUser(email));
  };

  useEffect(() => {
    if (error) {
        alert.error(error);
        dispatch({ type: "CLEAR_ERROR" });
      }
      if (message) {
        alert.success(message);
        dispatch({ type: "CLEAR_MESSAGE" });
      }
  }, [alert, error, dispatch, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
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

                <input
          
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;