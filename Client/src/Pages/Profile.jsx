import React from 'react'
import { useAtuh } from '../../storecontext/auth';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Profile = () => {

  const { user} = useAtuh()
  const navigate = useNavigate()
  console.log(user)
  return (

    <div>
      <div className='bg-dark w-100 h-100 '>

        <div className='  w-100 h-100 d-flex justify-content-center align-items-center ' >
          <div className=' card bg-dark text-light  h-50 container ' >
      <span className='text-warning fs-4' onClick={()=> navigate(-1)} >
          
          <FaArrowLeft/>
        </span>
            <div  className=' w-100 h-auto  flex-column
             d-flex justify-content-center align-items-center'>
              
            {/* <FaRegUserCircle className='w-25 h-75   ' /> */}
            <img className='w-25 rounded-circle h-auto  flex-column
             d-flex justify-content-center align-items-center' src={user?.avatar?.secure_url} alt="" />
             <h5 className='text-warning mt-3'> {user?.name}</h5>
            </div>
              <div className='d-flex justify-content-between mt-3'>

            <h5 className='mt-2 ' >Email :</h5>
            <span className='text-warning'>{user?.email}</span>
              </div>
              <div className='d-flex justify-content-between'>

            <h5>Roll : </h5>
            <span className='text-warning'>{user?.isAdmin === false ? "User" : " isAdmin"
            }</span>
              </div>
              <div className='d-flex justify-content-between'>
            <h5>Subscription :</h5>
            <span className='text-warning'> {user?.razorpay_order_id?.status === "active" ? " Active" : " Inactive"}</span>
              </div>
             
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile