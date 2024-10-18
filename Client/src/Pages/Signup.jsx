import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAtuh } from '../../storecontext/auth';
import { toast } from 'react-toastify'


const Signup = () => {

    const [image, setImage] = useState(null)


    const navigate = useNavigate()
    const { storeTokenInLS } = useAtuh()
    const [signupdata, setsignupdata] = useState({
        name: "",
        password: "",
        email: "",
        avatar: "",


    })

    function changehanlder(e) {

        let name = e.target.name
        let value = e.target.value;

        setsignupdata({

            ...signupdata,
            [name]: value,
        });




    }
    function getavatar(event) {

        event.preventDefault()
        const uploadImage = event.target.files[0]
        if (uploadImage) {
            setsignupdata({
                ...signupdata,
                avatar: uploadImage
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage)
            fileReader.addEventListener("load", function () {
                console.log(this.result)
                setImage(this.result)
            })

        }
    }
    

         const submithandle = async (e) => {

            e.preventDefault()
            console.log(signupdata)



            await axios.post("http://localhost:5000/api/auth/signup", signupdata ,{
                headers :{
                    "Content-Type" : "multipart/form-data"
                }
            }).then((res) => {
                if (res.statusText) {
                    storeTokenInLS(res.data.token)
                    console.log(res)
                    toast.success("Signup Succesfull")
                    navigate("/login")

                }
            }).catch((error) => {
                console.log(error.response.data)
                toast.error(error.response.data.extradetails ? error.response.data.extradetails : error.response.data.message)
            })




         }
           
    

         return (
            <div className=' main-container d-flex bg-dark   justify-content-center align-items-center' >
                <div className='card  d-flex text-light justify-content-center align-items-center flex-column bg-dark'>
                    <h2 className='text-light mb-3'>Signup Page</h2>
                    <label htmlFor='image_uploads' className='w-50 h-50 d-flex justify-content-center  '>
                        {image ? (
                            <img className='w-50 h-25 rounded-circle object-fit-fill m-auto' src={image} alt="profile" />
                        ) : (

                            <FaRegUserCircle className=' w-50 h-50 pointer-event   ' />
                        )}


                    </label>
                    <input 
                       onChange={getavatar}
                        
                        type="file"
                        className='d-none'
                        id='image_uploads'
                        name='image_uploads'
                        accept='.jpg , .png , .jpeg .svg'
                        />
                    <div className='input w-100'>

                        <form onSubmit={submithandle}>
                            <h4>Name</h4>
                            <input id='name' className='form-control w-100'
                                type="text"
                                name='name'
                                autoComplete='off'
                                placeholder='Enter your name..'
                                value={signupdata.name}
                                onChange={changehanlder}

                            />
                            <h4>Email</h4>
                            <div>

                                <input className='form-control  mt-2'
                                    type="email"
                                    name='email'
                                    autoComplete='off'
                                    placeholder='email..'
                                    value={signupdata.email}
                                    onChange={changehanlder}
                                />

                            </div>

                            <h4 >Password</h4>
                            <input className='form-control  mt-2'
                                type="password"
                                name='password'
                                autoComplete='off'
                                placeholder='Enter your password..'
                                value={signupdata.password}
                                onChange={changehanlder}

                            />

                            <button className='w-100 form-control mt-3 fs-5 btn btn-outline-warning text-light '>
                                Create a account
                            </button>

                        </form> 
                    </div>


                    <p className='mt-3 '>have a already account ? <span><Link to="/Login">Login</Link></span> </p>
                </div>
            </div>
         )
 
}

    export default Signup


