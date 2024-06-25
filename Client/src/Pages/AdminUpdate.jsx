import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAtuh } from '../../storecontext/auth'
import {  useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminUpdate = () => {
  const [Userdata, setUserData] = useState({
    name: " ",
    email: " ",
  })
  const {AuthorizationToken} = useAtuh()  
  const params = useParams()
  const navigate = useNavigate()

  const getAllUpdateUser =  () =>{
    
    axios.get(`http://localhost:5000/api/admin/User/${params.id}`,{
      headers:{
        Authorization: AuthorizationToken
      }
    }).then( async (res)=>{
      console.log(res.data.message)
      setUserData(res.data.message)
      
    })
    
    
    }

 const sendhandler = (e)=>{
  const name = e.target.name
  const value  = e.target.value

  setUserData({
    ...Userdata,
    [name]: value
  })
 }

 useEffect(()=>{
    getAllUpdateUser()
 },[])


 const submithandler = (e) =>{
    e.preventDefault()

    axios.patch(`http://localhost:5000/api/admin/User/update/${params.id}`, Userdata, {
      headers:{
        // "Content-Type":"application/json",
        Authorization: AuthorizationToken
      },
      // body: JSON.stringify(Userdata)
    }).then((res)=>{
      console.log(res)
      navigate("/admin/Users")
      toast.success("Update Successfully")

    }).catch((error)=>{
      console.log(error)
      toast.error(" Not Updated !")
    })
 
 }


  return (
    <div className='w-100 h-auto'>
    <div className='main text-black d-flex bg-dark bg-gradient'>
      <div className='form '>
        <div className='' style={{ height: "100vh", width: "50vw" }}>
          <form onSubmit={submithandler} className='input   d-flex justify-content-center align-items-center flex-column' action="" >
            <h1 className='mb-3 text-warning '>Update from</h1>
            
            <input
              className='form-control w-50'
              type="text"
              placeholder='Name..'
              name='name'
              value={Userdata.name}
              onChange={sendhandler}
               
            />

            <input
              className='form-control w-50 mt-4'
              type="email"
              name='email'
              placeholder='Enter your email..'
              value={Userdata.email}
              onChange={sendhandler}
            />
            <button className='w-50 form-control  mt-3 fs-5 btn btn-outline-warning text-light '>
              Update
            </button>
          </form>
        </div>
        
      
      
      </div>
    </div>
    </div>
  )
}

export default AdminUpdate