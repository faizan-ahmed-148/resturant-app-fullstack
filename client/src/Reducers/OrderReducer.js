import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    
}


export const NewOrderReducer = createReducer(initialState, {

    CREATE_ORDER_REQUEST: (state) => {
        state.loading = true
        
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
        state.loading = false
        state.order= action.payload
    
    },
    CREATE_ORDER_FAIL: (state, action) => { 
        state.loading = false
        state.error = action.payload
    },

    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})



export const MyOrderReducer = createReducer(initialState, {

    MY_ORDERS_REQUEST: (state) => {
        state.loading = true
        
    },
    MY_ORDERS_SUCCESS: (state, action) => {
        state.loading = false
        state.orders= action.payload
    
    },
    MY_ORDERS_FAIL: (state, action) => { 
        state.loading = false
        state.error = action.payload
    },

    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})

export const allOrdersReducer  = createReducer(initialState, {

    ALL_ORDERS_REQUEST: (state) => {
        state.loading = true
        
    },
    ALL_ORDERS_SUCCESS: (state, action) => {
        state.loading = false
        state.orders= action.payload
    
    },
    ALL_ORDERS_FAIL: (state, action) => { 
        state.loading = false
        state.error = action.payload
    },

    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})

export const orderReducer   = createReducer(initialState, {

    UPDATE_ORDER_REQUEST: (state) => {
        state.loading = true
        
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
        state.loading = false
        state.message= action.payload
    
    },
    UPDATE_ORDER_FAIL: (state, action) => { 
        state.loading = false
        state.error = action.payload
    },

    DELETE_ORDER_REQUEST: (state) => {
        state.loading = true
        
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
        state.loading = false
        state.message= action.payload
    
    },
    DELETE_ORDER_FAIL: (state, action) => { 
        state.loading = false
        state.error = action.payload
    },


    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})

export const orderDetailsReducer  = createReducer(initialState, {

    ORDER_DETAILS_REQUEST: (state) => {
        state.loading = true
        
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
        state.loading = false
        state.order= action.payload
    
    },
    ORDER_DETAILS_FAIL: (state, action) => { 
        state.loading = false
        state.error = action.payload
    },

    CLEAR_ERROR: (state) => {
        state.error = null
    },
    CLEAR_MESSAGE: (state) => {
        state.message = null
    }

})




