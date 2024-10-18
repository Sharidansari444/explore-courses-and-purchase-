import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { GrContact } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { useAtuh } from '../../storecontext/auth';
import HomeLayout from '../Layout/HomeLayout'

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
        <HomeLayout>
            <div className='h-100 w-100 bg-dark text-light'>

                <nav className="navbar container justify-content-between d-flex navbar-expand-lg w-100 ">


                    <div className="d-flex align-items-center justify-content-end text-decoration-none">
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
        </HomeLayout>
    )
}

export default Adminlayout