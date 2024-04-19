import axios from "axios"

// login 
export const loginUser = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: "LOGIN_REQUEST"
        })
        const { data } = await axios.post("/api/v1/login", { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );


        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data.user


        })
    } catch (error) {

        dispatch({
            type: "LOGIN_FAILURE",
            payload: error.response.data.message


        })
    }


}

// register 
export const RegisterUser = (name, email, password, avatar) => async (dispatch) => {

    try {
        dispatch({
            type: "REGISTER_REQUEST"
        })
        const { data } = await axios.post("/api/v1/register", { name, email, password, avatar },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );


        dispatch({
            type: "REGISTER_SUCCESS",
            payload: data.user


        })
    } catch (error) {

        dispatch({
            type: "REGISTER_FAILURE",
            payload: error.response.data.message


        })
    }


}


// load 

export const loadUser = () => async (dispatch) => {

    try {
        dispatch({
            type: "LOADUSER_REQUEST"
        })

        const { data } = await axios.get("/api/v1/me");

        dispatch({
            type: "LOADUSER_SUCCESS",
            payload: data.user


        })
    } catch (error) {

        dispatch({
            type: "LOADUSER_FAILURE",
            payload: error.response.data.message


        })
    }


}

// logout 

export const LogOutUser = () => async (dispatch) => {

    try {
        dispatch({
            type: "LOGOUT_REQUEST"
        })

        await axios.get("/api/v1/logout");

        dispatch({
            type: "LOGOUT_SUCCESS",

        })
    } catch (error) {

        dispatch({
            type: "LOGOUT_FAILURE",
            payload: error.response.data.message


        })
    }


}

// ForgotPassword 

export const ForgotPasswordUser = (email) => async (dispatch) => {

    try {
        dispatch({
            type: "FORGOT_PASSWORD_REQUEST"
        })
        const { data } = await axios.post("/api/v1/forgot/password", { email },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );


        dispatch({
            type: "FORGOT_PASSWORD_SUCCESS",
            payload: data.message


        })
    } catch (error) {

        dispatch({
            type: "FORGOT_PASSWORD_FAILURE",
            payload: error.response.data.message


        })
    }


}




// Contact

export const ContactUser = (name, email, message) => async (dispatch) => {

    try {
        dispatch({
            type: "CONTACT_REQUEST"
        })
        const { data } = await axios.post("/api/v1/contact/me", { name, email, message },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );


        dispatch({
            type: "CONTACT_SUCCESS",
            payload: data.message


        })
    } catch (error) {

        dispatch({
            type: "CONTACT_FAILURE",
            payload: error.response.data.message


        })
    }


}



// resetPassword 
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: "RESET_PASSWORD_REQUEST",
        });

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            {
                password,
                confirmPassword
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        dispatch({
            type: "RESET_PASSWORD_SUCCESS",
            payload: data.message,
        });
    } catch (error) {
        dispatch({
            type: "RESET_PASSWORD_FAILURE",
            payload: error.response.data.message,
        });
    }
};



// update profile 

export const UpdateProfileUser = (name, email, avatar)=> async(dispatch)=>{

    try {
        dispatch({
            type: "UPDATE_PROFILE_REQUEST"
        })
        const {data}= await axios.put("/api/v1/me/update", {name, email, avatar},
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
        );


        dispatch({
            type: "UPDATE_PROFILE_SUCCESS",
            payload: data.message
            

        })
    } catch (error) {
        
        dispatch({
            type: "UPDATE_PROFILE_FAILURE",
            payload: error.response.data.message
            

        })
    } 


}


// update password 

export const UpdatePasswordUser = (oldPassword, newPassword,confirmPassword )=> async(dispatch)=>{

    try {
        dispatch({
            type: "UPDATE_PASSWORD_REQUEST"
        })
        const {data}= await axios.put("/api/v1/update/password", {oldPassword, newPassword, confirmPassword},
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
        );


        dispatch({
            type: "UPDATE_PASSWORD_SUCCESS",
            payload: data.message
            

        })
    } catch (error) {
        
        dispatch({
            type: "UPDATE_PASSWORD_FAILURE",
            payload: error.response.data.message
            

        })
    } 


}

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: "ALL_USERS_REQUEST" });
      const { data } = await axios.get(`/api/v1/admin/users`);
  
      dispatch({ type: "ALL_USERS_SUCCESS", payload: data.users });
    } catch (error) {
      dispatch({ type: "ALL_USERS_FAIL", payload: error.response.data.message });
    }
  };


  // get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: "USER_DETAILS_REQUEST" });
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: "USER_DETAILS_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({ type: "USER_DETAILS_FAIL", payload: error.response.data.message });
    }
  };


  // Update User
export const updateUser = (userId, name, email, role) => async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_USER_REQUEST" });
  
     
  
      const { data } = await axios.put(
        `/api/v1/admin/user/${userId}`,{name, email, role},

        { 
            headers: { 
                "Content-Type": "application/json" 
            } 
        }
      );
  
      dispatch({ type: "UPDATE_USER_SUCCESS", payload: data.message });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_FAIL",
        payload: error.response.data.message,
      });
    }
  };
  

  // Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: "DELETE_USER_REQUEST" });
  
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: "DELETE_USER_SUCCESS", payload: data.message });
    } catch (error) {
      dispatch({
        type: "DELETE_USER_FAIL",
        payload: error.response.data.message,
      });
    }
  };