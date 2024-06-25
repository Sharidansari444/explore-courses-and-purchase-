import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAtuh } from '../../storecontext/auth'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()
    const { storeTokenInLS } = useAtuh()
    const [logindata, setLogindata] = useState({

        password: "",
        email: ""


    })

    function loginhanlder(e) {
        let name = e.target.name
        let value = e.target.value;

        setLogindata({

            ...logindata,
            [name]: value,
        });
    }
    const submithandle = async (e) => {
        e.preventDefault()


        await axios.post("http://localhost:5000/api/auth/login", logindata).then((res) => {
            console.log(res)

            storeTokenInLS(res.data.token)
            toast.success("Login Succesfull")
            navigate("/")
        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.extradetails ? error.response.data.extradetails : error.response.data.message)
        })


    }

    return (
        <div className=' main-container d-flex bg-dark   justify-content-center align-items-center' >
            <div className='card  d-flex text-light justify-content-center align-items-center flex-column bg-dark'>
                <h2 className='text-light mb-3'>Login</h2>

                <div className='input w-100'>
                    <form onSubmit={submithandle}>
                        <h4>Email</h4>
                        <div>

                            <input className='form-control  mt-2'
                                type="email"
                                name='email'
                                placeholder='email..'
                                value={logindata.email}
                                onChange={loginhanlder}
                            />

                        </div>

                        <h4 >Password</h4>
                        <input className='form-control  mt-2'
                            type="password"
                            name='password'
                            placeholder='Enter your password..'
                            value={logindata.password}
                            onChange={loginhanlder}

                        />

                        <button className='w-100 form-control mt-3 fs-5 btn btn-outline-warning text-light '>
                            Login
                        </button>

                    </form>
                    <div className='d-flex  mt-3'>
                        <Link className='text-decoration-none' to="/ForgetPassword">  <span className='text-primary  ' >Forget Password ?</span> </Link>

                         
                    </div>
                    <p className='mt-3'> Dont have a account ?
                    <span>
                        <Link to="/Signup">  Signup</Link>
                    </span>
                </p>
                </div>
                
            </div>
        </div>
    )

}

export default Login