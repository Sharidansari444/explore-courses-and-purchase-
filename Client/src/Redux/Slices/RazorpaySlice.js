// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import  axios from "axios"
// import { useAtuh } from "../../../storecontext/auth"
// const initialState = {
//     key:"",
//     subscription_id:"",
//     isPayments:{},
//     finaMonth :{}
// }
// export const getRazorPayId  = createAsyncThunk("/razorpay-key", async ()=>{
//     const {AuthorizationToken} = useAtuh()
    
//     try {
//         const response = await axios.get("http://localhost:5000/api/v1/razorpay-key",{
//             headers:{
//                 Authorization: AuthorizationToken
//             }
//         }).then((res)=>{
//             console.log(res)
//         });
//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// })
// export const purchaseCourseBundle = createAsyncThunk("/purchageCourse", async ()=>{
//     const {AuthorizationToken} = useAtuh()  
//     try {
//         const response = await axios.post("http://localhost:5000/api/v1/subscribe",{
//             headers:{
//                 Authorization: AuthorizationToken
//             }
//         });
//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// })

// export const verifyuserPayment = createAsyncThunk("/payment/verify", async (data)=>{
//     try {
//         const response = await axios.post("http://localhost:5000/api/v1/veriy" ,
//        {
//             razorpay_pament_id: data.razorpay_pament_id,
//             razorpay_subscription_Id : data.razorpay_subscription_Id ,
//             razorpay_signature : data.razorpay_signature
//         }
//         );
//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// })
// export const getPaymentRecord = createAsyncThunk("/payment/record", async ()=>{
//     try {
//         const response =  axios.get("/allpayments",{
        
//         });
//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// })
// export const cancleCourseBundle = createAsyncThunk("/payment/cancle", async ()=>{
//     try {
//         const response =  axios.post("/unsubscription",{
        
//         });
//         return response.data

//     } catch (error) {
//         console.log(error)
//     }
// })
// const razorpaySlice = createSlice({
//     name:"razorpay",
//     initialState,
//     reducers:{},
//     extraReducers: (builder) =>{
//     builder.addCase(getRazorPayId.fulfilled, (state,action)=>{
//         state.key= action?.payload?.key;
//     })
//     .addCase(purchaseCourseBundle.fulfilled, (state, action)=>{
//         state.subscription_id = action?.payload?.subscription_id
//     })
//     .addCase(verifyuserPayment.fulfilled, (state, action)=>{
//         state.isPaymentsVerified = action?.payload?.success
//     })
//     .addCase(verifyuserPayment.rejected, (state, action)=>{
//         state.isPaymentsVerified = action?.payload?.success
//     })
//     .addCase(getPaymentRecord.fulfilled, (state, action)=>{
//         state.allPayments = action?.payload?.allPayments
//         state.finalMonth = action?.payload?.finalMonth
        
//     })
//     }
// })

// export default razorpaySlice.reducer
