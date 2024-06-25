import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAtuh } from '../../storecontext/auth'
import { toast } from 'react-toastify'

const Logout = () => {
   const {LogoutUser } = useAtuh()
   useEffect(()=>{
    LogoutUser()
    toast.success("Logout Succesfull")
   },[LogoutUser])
  
   return <Navigate to={"/"}></Navigate>
}

export default Logout