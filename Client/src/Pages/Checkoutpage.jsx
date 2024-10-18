
import {  useState } from "react"
import {toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAtuh } from "../../storecontext/auth"






const Checkoutpage =   () => {
  const naviagte = useNavigate()
  const { AuthorizationToken } = useAtuh()

  const [ amount, setamount ] = useState()

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
        setamount(350)
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
        if (res.status === 200){

          toast.success("payment success")
          naviagte("/success")
        }
        
      },
      theme :{
        color : "#5f63b8"
      }



    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }
 


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