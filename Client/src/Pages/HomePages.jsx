import React from 'react'
import { Link } from 'react-router-dom'
import HomeLayout from '../Layout/HomeLayout'
import HomePagesImage from '../Assets/Images/projectimage (2).png'
const HomePages = () => {
    // const isLoggedin = useAtuh()
    return (
        <HomeLayout>
            <div className='pt-10 text-white d-flex  align-items-center  justify-content-center gap-10 mx-16'>
                <div className=' space-y-6' style={{ width: "60%" }}>
                    <h1 className='font-semibold '>
                        Find Out best

                        <span className='text-warning  p-2 font-bold' >
                            Online Courses
                        </span> 
                    </h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et odio tenetur at assumenda voluptatibus obcaecati non repellendus eum autem aliquid?</p>
                    <div className='space-x-6'>
                        <Link to="/courses">
                            
                            <button className='btn btn-outline-warning text-light py-3 px-3 fs-5 '>
                                Explore Courses
                            </button>
                        </Link>
                        <Link to="/Contact">
                            <button className='btn btn-outline-warning text-light  m-3  py-3 fs-5 '>
                                Contact Us
                            </button>
                        </Link>
                    </div>

                </div>
                <div className=' d-flex align-items-center justify-content-center '>
                    {<img className='w-75 rounded-circle' src={HomePagesImage} alt=" Homepage image" style={{ height: "50vh", }} />}
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePages