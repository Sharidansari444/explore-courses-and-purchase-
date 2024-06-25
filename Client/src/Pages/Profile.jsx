import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useAtuh } from '../../storecontext/auth';


const Profile = () => {

  const { user } = useAtuh()
  return (

    <div>
      <div className='bg-dark w-100 h-100 '>

        <div className='  w-100 h-100 d-flex justify-content-center align-items-center ' >
          <div className=' card bg-dark text-light  h-50 container ' >
            <div  className=' w-100 h-auto  flex-column
             d-flex justify-content-center align-items-center'>

            <FaRegUserCircle className='w-25 h-75   ' />
             <h5 className='text-warning mt-3'> {user.name}</h5>
            </div>
              <div className='d-flex justify-content-between mt-3'>

            <h5 className='mt-2 ' >Email :</h5>
            <span className='text-warning'>{user.email}</span>
              </div>
              <div className='d-flex justify-content-between'>

            <h5>Roll : </h5>
            <span className='text-warning'>{user?.isAdmin === false ? "User" : " isAdmin"
            }</span>
              </div>
              <div className='d-flex justify-content-between'>
            <h5>Subscription :</h5>
            <span className='text-warning'> {user?.subscription
              ?.status === "created" ? " Active" : " Inactive"}</span>
              </div>
             
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile