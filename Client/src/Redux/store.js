import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice'
// import razorpaySliceReducer  from '../Redux/Slices/RazorpaySlice'
const store = configureStore({
    reducer:{
     auth : authSliceReducer,
    //  razorpay : razorpaySliceReducer

    },
   devTools:true
})
export default store;