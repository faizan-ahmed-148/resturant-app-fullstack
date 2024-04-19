import { createReducer } from "@reduxjs/toolkit"

const initialState = {
    
}


export const ProductReducer = createReducer(initialState, {

    ALL_PRODUCT_REQUEST: (state) => {
        state.loading = true
        
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false
        state.products= action.payload.products
        state.productsCount= action.payload.productsCount
        state.resultPerPage= action.payload.resultPerPage
        state.filteredProductsCount= action.payload.filteredProductsCount
    },
    ALL_PRODUCT_FAILURE: (state, action) => { 
        state.loading = false
        state.error = action.payload
    },


    ADMIN_PRODUCT_REQUEST: (state) => {
        state.loading = true
        
    },
    ADMIN_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false
        state.products= action.payload
    },
    ADMIN_PRODUCT_FAIL: (state, action) => { 
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


export const newProductReducer  = createReducer(initialState, {

    NEW_PRODUCT_REQUEST: (state) => {
        state.loading = true
        
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.product= action.payload.product
        state.message=action.payload.message
    },
    NEW_PRODUCT_FAIL: (state, action) => { 
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



export const productReducer   = createReducer(initialState, {

    UPDATE_PRODUCT_REQUEST: (state) => {
        state.loading = true
        
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.message=action.payload
    },
    UPDATE_PRODUCT_FAIL: (state, action) => { 
        state.loading = false;
        state.error = action.payload
    },
    
    DELETE_PRODUCT_REQUEST: (state) => {
        state.loading = true
        
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.message=action.payload
    },
    DELETE_PRODUCT_FAIL: (state, action) => { 
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


export const ProductDetailReducer = createReducer(initialState, {

    PRODUCT_DETAILS_REQUEST: (state) => {
        state.loading = true
        
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
        state.loading = false;
        state.product= action.payload
    },
    PRODUCT_DETAILS_FAIL: (state, action) => { 
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


// createReview 
export const newReviewReducer = createReducer(initialState, {

    NEW_REVIEW_REQUEST: (state) => {
        state.loading = true  
    },
    NEW_REVIEW_SUCCESS: (state, action) => {
        state.loading = false;
        state.message= action.payload
    },
    NEW_REVIEW_FAIL: (state, action) => { 
        state.loading = false;
        state.error = action.payload
    },
    
    ALL_REVIEW_REQUEST: (state) => {
        state.loading = true  
    },
    ALL_REVIEW_SUCCESS: (state, action) => {
        state.loading = false;
        state.reviews= action.payload
    },
    ALL_REVIEW_FAIL: (state, action) => { 
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


export const DeleteReviewReducer = createReducer(initialState, {

    DELETE_REVIEW_REQUEST: (state) => {
        state.loading = true  
    },
    DELETE_REVIEW_SUCCESS: (state, action) => {
        state.loading = false;
        state.message= action.payload
    },
    DELETE_REVIEW_FAIL: (state, action) => { 
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