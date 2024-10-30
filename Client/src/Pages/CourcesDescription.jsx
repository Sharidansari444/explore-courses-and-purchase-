import {  useLocation, useNavigate } from 'react-router-dom'
import { useAtuh } from '../../storecontext/auth'
import { FaArrowLeft } from "react-icons/fa";
// import toast from 'react-hot-toast'
const CourcesDescription = () => {
    const {state} = useLocation()
    const navigate = useNavigate()
    const {user} = useAtuh()
    const loginhanlder = (  )=>{
       
          if(user){
            navigate("/payments/Checkoutpage" ,  { state: { ...state } })
          }else(
            navigate("/login")
          )

    }


    
  return (
    <div className='bg-dark w-100 h-100'>
     
    
        <div className='bg-dark  container text-light'>
       <span onClick={()=>navigate(-1)} className='text-warning fs-3  '><FaArrowLeft/></span>

            <div className='row'>
                <div className='col mt-2'> <h3>All couces</h3></div>

            </div>
            <div className='row  mt-5'>
                 <div className='col-md-6'>
                    <img src={state.thumbnail.secure_url} style={{width:"40vw" , height:"45vh", objectFit:"inherit"}} alt="" />
                    <div className='row mt-3'> 
                        
                        <h5 className=' text-warning'> Description : <span className='text-light'>{state.description}</span> </h5>
                    </div>
                    <div className='row'>
                        <h4 className=' text-warning'>category : <span className='text-light'>{state.category}</span></h4>
                    </div>
                    <div className='row'>
                        <h4 className='text-warning'>CreatedBy : <span className='text-primary'>{state.createdBy}</span></h4>
                    </div>
                    { user.isAdmin === true || user?.razorpay_order_id?.status === 'active' ? (
                       
                      <>
                         <button className='btn btn-warning' onClick={() => navigate("/Displaylecture", { state: { ...state } })}>  watch lecture</button><button onClick={(() => navigate("/Addlecture", { state: { ...state } }))} className='btn ms-3 btn-outline-warning text-light '>
                Add lecture
              </button>
                      </>
                       
                    ) : (
                      <button className='btn btn-warning'  onClick={() => loginhanlder()}>  subscribe now</button> 
                    )


                    }
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