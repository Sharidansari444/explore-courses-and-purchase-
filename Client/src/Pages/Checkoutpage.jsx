
// import { getRazorPayId, purchaseCourseBundle, verifyuserPayment } from '../Redux/Slices/RazorpaySlice'
// import xtype from 'xtypejs'
import axios from "axios"
import {  useState } from "react"
// import { useAtuh } from "../../storecontext/auth"
import {toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAtuh } from "../../storecontext/auth"


// import {useLocation, useNavigate} from  "react-router-dom"




const Checkoutpage =   () => {
  const naviagte = useNavigate()
  const { AuthorizationToken } = useAtuh()

  const [ amount ,setamount ] = useState(350)

  const handlepayment = async ()=>{
    try {
      const response = await fetch("http://localhost:5000/api/v1/orders",{
        
        method : 'POST',
        headers: {
          "Content-type" : "application/json",
          Authorization: AuthorizationToken
          
        },
        body : JSON.stringify({
          amount
        })
      })
      const  data = await response.json()
        console.log(data)
        handlepaymentverify(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handlepaymentverify = async (data)=>{
    
    const options = {
      key : import.meta.env.RAZORPAY_KEY_ID,
      amount : data.amount,
      currency : data.currency, 
      name: "sharid",
      description : "Test mode",
      order_id : data.id,
      handler : async (response) =>{
        console.log("response", response)
        const res = await fetch("http://localhost:5000/api/v1/paymentsverify",{
          method : 'POST',
          headers :{
            "Content-Type" : "application/json",
            Authorization: AuthorizationToken
          },
          body : JSON.stringify({
            razorpay_order_id : response.razorpay_order_id,
            razorpay_payment_id : response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
        //  axios.post("http://localhost:5000/api/v1/paymentsverify",{
        //   headers :{
        //     Authorization: AuthorizationToken
        //   },
        //     razorpay_order_id : response.razorpay_order_id,
        //     razorpay_payment_id : response.razorpay_payment_id,
        //     razorpay_signature: response.razorpay_signature
            
        // }).then((res)=>{
        //   console.log(res)
        //   console.log(res.data.message)
        //   toast.success("payments success")
        //   naviagte("/success")
          
        // }).catch((error)=>{
        //   console.log(error)
        // })
          
         })
        console.log(res)
        const verifyData = await res.json() 
        console.log(verifyData)
        if(verifyData.message){
        toast.success(verifyData.message)
        }
      },
      theme :{
        color : "#5f63b8"
      }



    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }
  // const {state} = useLocation()
  // const {AuthorizationToken} = useAtuh()
  // const navigate = useNavigate()
  // const [userkey, setUserkey] = useState("")
  // const [subscriptionId, setSubscriptionId] = useState("")
  // const [paymentsdetails, setPaymentsdetails] = useState({
  //   razorpay_payment_id: "",
  //   razorpay_subscription_id: " ",
  //   razorpay_signature: " "

  // })
  // const razorpayKey = useSelector((state) => state?.razorpayKey?.key)
  // const subscription_id = useSelector((state) => state?.razorpayKey?.subscription_id)
  // const isPaymentVerified = useSelector((state) => state?.razorpayKey?.isPaymentVerified)

  // const { user } = useAtuh()

  // const hanldeSubscription = (e) => {
  //   e.preventDefault()
  //   if (! razorpayKey || ! subscription_id) {
  //     toast.error("somthing went wrong")
  //     return
  //   }
  //   const options = {
  //     key: razorpayKey,
  //     subscription_id: subscription_id,
  //     name: "Cource Pvt .Ltd",
  //     description: " Subscription",
  //     theme: {
  //       color: "#F37254"
  //     },
  //     prefill: {
  //       email: user.email,
  //       name: user.name
  //     },
  //     handler: async function (response) {
  //       paymentsdetails.razorpay_pament_id = response.razorpay_pament_id;
  //       paymentsdetails.razorpay_signature = response.razorpay_signature;
  //       paymentsdetails.razorpay_subscription_Id = response.razorpay_subscription_Id;

  //       toast.success("Payments Successfull")
  //       await dispatch(verifyuserPayment(paymentsdetails))
  //       !isPaymentVerified ? navigate("/checkout/success") : navigate("/checkout/fail")
  //     }
  //   }
  //   const paymentsObject = new window.Razorpay(options)
  //   paymentsObject.open()
  // }
  // const paymentsdetails = {

  //   razorpay_pament_id: "",
  //   razorpay_subscription_Id: " ",
  //   razorpay_signature: " "
  // }
  // const load = async () => {
  //   await dispatch(getRazorPayId())
  //   await dispatch(purchaseCourseBundle())
  // }

  // useEffect(() => {
  //   load()
  // }, [])
//   const checkouthandler = ()=>{
//     // console.log(data)
//     if(userkey.key){
//       alert("somthing went wrong")
//       return
//      }
//      const options = {
//       key : userkey,
//       subscription_id : subscriptionId ,
//       name: "Cource Pvt  .Ltd",
//    description: " Subscription",
//   theme: {
//      color: "#F37254"
//    },
//    prefill: {
//      email: user.email,
//      name: user.name
//    },
//    handler: async function (response) {
  
//                 setPaymentsdetails( {
//                  razorpay_payment_id: response.razorpay_payment_id,
//                  razorpay_subscription_id :response.razorpay_subscription_id ,
//                  razorpay_signature : response.razorpay_signature
//             })
            

         
  
//             xtype(verifyuserPayment(paymentsdetails))
//             if( verifyuserPayment === paymentsdetails){
//               navigate("/success")
//             }

           
//         }
       
//      }


//      const paymentsObject = new window.Razorpay(options)
//        paymentsObject.open()
//   }

//   console.log(paymentsdetails)
//     const razorpaykey = async()=>{
//       await axios.get("http://localhost:5000/api/v1/razorpay-key",{headers:{
//        Authorization : AuthorizationToken
//       }}).then((res)=>{
//       //  console.log(res)
//        setUserkey(res.data.key)
//       })
//   }
  

//   const bysubscription = async ()=>{
  
   
//           await axios.get("http://localhost:5000/api/v1/subscribe",{
//          headers:{
//            Authorization : AuthorizationToken
//          }
//         }).then((res)=>{
//           console.log(res)
//           console.log(res.data.subscription.id)
//           setSubscriptionId(res.data.subscription.id)

//           toast.success("payment ho  gya hai")
//         }).catch((error)=>{
//           console.log(error)
//         })
       
        
         
        
    
//   }

//    const verifyuserPayment = async (paymentsdetails)=>{
    
//     console.log(paymentsdetails)
//              await axios.post("http://localhost:5000/api/v1/veriy", {
//               razorpay_payment_id:paymentsdetails.razorpay_payment_id,
//               razorpay_subscription_id:paymentsdetails.razorpay_subscription_id,
//               razorpay_signature:paymentsdetails.razorpay_signature
//             }, 
//              {
//               headers:{
//                 Authorization : AuthorizationToken
//               }
//             },
           
//             ).then((res)=>{
//               console.log(res)
            
            
            
//           }).catch((error)=>{
//             console.log(error)
//           })  
         
          
   
        
//     }
  
//   useEffect(()=>{
//     razorpaykey()
//     bysubscription()
//  },[])


  return (
    <div className='d-flex bg-dark  h-100 justify-content-center align-items-center'>
      <div className="card h-50 w-25 bg-dark text-light" >
        <div className='text-warning  text-light w-full bg-warning d-flex justify-content-center'>

            <h5 className=''>subscription bundle</h5>
        </div>
          <div className="card-body">
            {/* <h5 className="card-title text-primary">{user.email}</h5> */}
            {/* <p className="card-text">{state.description}</p> */}

            <p><li>100% refund and cancle  avilable</li>
              <li>terms and condition apply</li>
             </p>
            
          </div>


           <button className='w-100 btn btn-warning' onClick={handlepayment} >buy now </button>
      </div>
    </div>
  )
}

export default Checkoutpage