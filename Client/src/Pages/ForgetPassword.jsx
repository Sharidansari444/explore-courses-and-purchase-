import axios from 'axios'
import React, { useState } from 'react'
import { useAtuh } from '../../storecontext/auth'
import { toast } from 'react-toastify'
    
const ForgetPassword = () => {
   
    const { AuthorizationToken } = useAtuh()
    const [email, setEmail] = useState("")
    // const [loading, setLoading] = useState(false)
    const sendemail = (e) =>{

        setEmail(e.target.value)
    }
 
    const sendLink =  async(e) =>{
        e.preventDefault()
        axios.post("http://localhost:5000/api/auth/forgetpassword",{email},{
            headers:{
                Authorization : AuthorizationToken
            }
        }).then((res)=>{
            console.log(res)    
            if(res.status === 201){
                toast.success("reset password link send on your email")
            }
        }).catch((error)=>{
           console.log(error)
        })
        
        
    }

    return (
        <div className=' main-container d-flex bg-dark  justify-content-center align-items-center' >
            <div className='card h-50 d-flex text-light align-items-center  bg-dark'>

            <h1 className='text-light mb-5 '>Enter your Email</h1>

                <div className='w-75' >
                    {/* {loading ? <h5 className='text-success' > password change link send your email  succesfully </h5> : ""} */}
                    <form className=' mt-5'>

                        <div >
                              <h5>Email</h5>
                            <input className='form-control  mt-2'
                                type="email"
                                name='email'
                                value={email}
                                onChange={sendemail}
                                placeholder=' Enter your  email address'

                            />
                        </div>
                        <button onClick={sendLink} className='w-100 form-control mt-3 fs-5 btn btn-outline-warning text-light '>
                            Send
                        </button>
                        

                    </form>

                </div>

            </div>
        </div>
    )
}

export default ForgetPassword