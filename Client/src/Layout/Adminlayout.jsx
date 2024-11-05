import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { useAtuh } from '../../storecontext/auth';

const Adminlayout = () => {

    const { user } = useAtuh()
    const { isLoading } = useAtuh()

    if (isLoading) {
        return <h1>Loading ...</h1>
    }


    console.log("adminLayout ", user)   

    if (!user.isAdmin) {
        return <Navigate to={"/"} />
    }
    return (
        
            <div className=' h-100 w-100 bg-dark overflow-y-scroll  text-light'>

                <nav className="navbar container d-flex navbar-expand-lg  ">


                    <div className="d-flex align-items-center   justify-content-end text-decoration-none ">
                        <ul className="navbar-nav w-auto gap-4">
                            <li  className='nav-item '>

                               <NavLink className='text-decoration-none  text-warning ' to={"/admin/Users"}> <FaUser /> User</NavLink> 
                            </li>
                            <li>
                                <NavLink className='text-decoration-none  text-warning' to={"/"}> <FaHome  /> Home</NavLink>
                            </li>
                            <li>
                                <NavLink className='text-decoration-none text-warning' to={"/admin/contacts"}> <GrContact /> contact</NavLink>
                            </li>

                        </ul>

                    </div>
                </nav>
                <Outlet />
            </div>
    )
}

export default Adminlayout