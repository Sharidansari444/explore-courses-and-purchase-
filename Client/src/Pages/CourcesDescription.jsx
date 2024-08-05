import {  useLocation, useNavigate } from 'react-router-dom'
import ravindra from '../Assets/Images/Rabindranath_Tagore.jpg'
import { useAtuh } from '../../storecontext/auth'

// import toast from 'react-hot-toast'
const CourcesDescription = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const {user} = useAtuh()
    const loginhanlder = (  )=>{
       
          if(user.status === 200 ){
            navigate("/payments/Checkoutpage" ,  { state: { ...state } })
          }else(
            navigate("/login")
          )

    }


    //  const {AuthorizationToken } = useAtuh()
    //      // console.log(state)

    //  const {buysubscription} = useAtuh()
    //  const [userkey,setUserkey] = useState("")

    //  const subscribeHnadler = async () =>{ 
    //     // const extradata = {
    //     //     razorpay_payment_id :" ",
    //     //     razorpay_subscription_id : "",
    //     //     razorpay_signature  : " "
    //     // }
    //      const response  =  await axios.get("http://localhost:5000/api/v1/razorpay-key",{
    //         headers:{
    //             Authorization : AuthorizationToken
    //         }
    //      })
    //      console.log(response)
    //      buysubscription()
    //      setUserkey(response.data.key)
    //     //  console.log(userkey)
         
     
    //  }
    //  useEffect(()=>{
    //     if(userkey){
    //         const openPopUp =  () =>{
    //             const options = {
                 
    //                 key : "sub_NgDxyEFNryxXyT",
    //                 name: " Course",
    //                 description:"get access to all premium content",
    //                 subscription_id : buysubscription.subscription.id,
    //                 callback_url : "http://localhost:5000/api/v1/veriy",
    //                 prefill: {
    //                     name: "Sharid Ansari",
    //                     email: "sharidansari111@gmail.com",
    //                 },
    //                 notes: {
    //                     address : " Sharid ansari created"
    //                 },
    //                 theme: {
    //                     color: "#3399cc"
    //                 }
                

    //             }
    //             const razor  = new window.Razorpay(options)
    //             razor.open()
    //         }
    //         openPopUp()
    //     }
    //  },[])
  return (
    <div className='bg-dark w-100 h-100'>

    
        <div className='bg-dark  container text-light'>
            <div className='row'>
                <div className='col'> <h1>All couces</h1></div>

            </div>
            <div className='row  mt-5'>
                 <div className='col-md-6'>
                    <img src={ravindra} style={{width:"40vw" , height:"45vh", objectFit:"inherit"}} alt="" />
                    <div className='row mt-3'> 
                        
                        <h2 className=' text-warning'> Cource : <span className='text-light'>{state.service}</span> </h2>
                    </div>
                    <div className='row'>
                        <h4 className=' text-warning'>Provider : <span className='text-light'>{state.provider}</span></h4>
                    </div>
                    <div className='row'>
                        <h4 className='text-warning'>Price : <span className='text-primary'>{state.price}</span></h4>
                    </div>
                     <button className='btn btn-warning'  onClick={() => loginhanlder()}>  subscribe now</button>
                 </div>
                 <div className='col-6 d-flex  flex-column'>
                    <h4 className='text-warning' >This is a gitcode</h4>
                    <h6 className='text-warning'  >Cource description :</h6> 
                    <span> {state.description}</span>
                    </div>
            </div>
        </div>
      
        </div>
  
  );
}

export default CourcesDescription