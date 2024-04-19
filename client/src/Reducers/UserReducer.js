import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false
}

export const userReducer = createReducer(initialState, {

    LOGIN_REQUEST: (state) => {
        state.loading = true
    },
    LOGIN_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    LOGIN_FAILURE: (state, action) => { 
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false
    },

    REGISTER_REQUEST: (state) => { 
        state.loading = true
    },
    REGISTER_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    REGISTER_FAILURE: (state, action) => { 
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false
    },


    LOADUSER_REQUEST: (state) => { 
        state.loading = true
    },
    LOADUSER_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    LOADUSER_FAILURE: (state, action) => { 
        state.loading = false;
        state.error = action.payload
        state.user =null
        state.isAuthenticated = false
    },

  
    
    LOGOUT_REQUEST: (state) => { 
        state.loading = true
    },
    LOGOUT_SUCCESS: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false
    },
    LOGOUT_FAILURE: (state, action) => { 
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = true
    },


    CLEAR_ERROR: (state) => {
        state.error = null
    },

    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})



export const ForgetPasswordReducer = createReducer(initialState, {

    FORGOT_PASSWORD_REQUEST: (state) => {
        state.loading = true
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    FORGOT_PASSWORD_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },





    RESET_PASSWORD_REQUEST: (state) => {
        state.loading = true;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    RESET_PASSWORD_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    

    CONTACT_REQUEST: (state) => {
        state.loading = true
    },
    CONTACT_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    CONTACT_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },


    CLEAR_ERROR: (state) => {
        state.error = null
    },

    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})


export const ProfileReducer = createReducer(initialState, {

    UPDATE_PROFILE_REQUEST: (state) => {
        state.loading = true;
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    UPDATE_PROFILE_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    UPDATE_PASSWORD_REQUEST: (state) => {
        state.loading = true
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    UPDATE_PASSWORD_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    UPDATE_USER_REQUEST: (state) => {
        state.loading = true
    },
    UPDATE_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    UPDATE_USER_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    DELETE_USER_REQUEST: (state) => {
        state.loading = true
    },
    DELETE_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    DELETE_USER_FAIL: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    CLEAR_ERROR: (state) => {
        state.error = null
    },

    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})



export const allUsersReducer   = createReducer(initialState, {

    ALL_USERS_REQUEST: (state) => {
        state.loading = true
        
    },
    ALL_USERS_SUCCESS: (state, action) => {
        state.loading = false;
        state.users= action.payload
       
    },
    ALL_USERS_FAIL: (state, action) => { 
        state.loading = false;
        state.error = action.payload
    },
    
    
   
    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }
})


export const userDetailsReducer    = createReducer(initialState, {

    USER_DETAILS_REQUEST: (state) => {
        state.loading = true
        
    },
    USER_DETAILS_SUCCESS: (state, action) => {
        state.loading = false;
        state.user= action.payload
       
    },
    USER_DETAILS_FAIL: (state, action) => { 
        state.loading = false;
        state.error = action.payload
    },
    
    
   
    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }
})
