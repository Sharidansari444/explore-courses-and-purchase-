import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { useAtuh } from '../../storecontext/auth'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
const ResetPassword = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const { AuthorizationToken } = useAtuh()
  const { id, token } = useParams()

  const resetpassword = async () => {
    await axios.get(`http://localhost:5000/api/auth/resetpassword/${id}/${token}`, { password }, {
      headers: {
        Authorization: AuthorizationToken
      }
    }).then((res) => {
      console.log(res)
      if(res.status === 201){
        console.log("user valid")
      }else{
        navigate("*")
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  const UpdatePassword = (e) => {
    setPassword(e.target.value)
  }

  const sendpassword = async(e) => {
    e.preventDefault()
    await axios.post(`http://localhost:5000/api/auth/${id}/${token}`,{password}).then((response)=>{
      console.log(response)
      if(response.status === 201){
        toast.success("password change succesfully")
      }
    }).catch((error)=>{
      console.log(error)
    })
     
  }





  useEffect(() => {

    resetpassword()
  }, [])


  return (
    <div className=' main-container d-flex bg-dark  justify-content-center align-items-center' >
      <div className='card h-50 d-flex text-light align-items-center  bg-dark'>

        <h1 className='text-light mb-5 '>Reset password</h1>

        <div className='w-75' >

          <form className=' mt-5'>

            <div >
              <h5>New Password</h5>
              
              <input className='form-control  mt-2'
                type="password"
                name='password'
                value={password}
                onChange={UpdatePassword}
                placeholder=' Enter your new password'

              />
            </div>
            <button onClick={sendpassword} className='w-100 form-control mt-3 fs-5 btn btn-outline-warning text-light '>
              Update
            </button>

          </form>

        </div>

      </div>
    </div>

  )
}

export default ResetPassword