import './Cources.css'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAtuh } from '../../storecontext/auth'
import { FaArrowLeft } from "react-icons/fa";
const Courses = () => {
  const { user } = useAtuh()
  // const {isLoggedin} = useAtuh()
  const [course, setCourse] = useState([])
  const navigate = useNavigate()

  const getdata = async () => {

    await axios.get("http://localhost:5000/api/course/allcourse", {

    }).then((res) => {

      console.log(res.data.allcourse)
      const allcourses = res.data.allcourse
      const data1 = res.data.message
      console.log(data1)
      setCourse(allcourses)


    }).catch((error) => {
      console.log(`Frontend error ${error}`)
    })

    // console.log(response)

  }

  const OnDelete = async (id) => {
    console.log(id)
    await axios.delete(`http://localhost:5000/api/course/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },


    }).then((res) => {
      console.log(res)
      getdata()

    }).catch((error) => {
      console.log(error)
    })

  }
  useEffect(() => {
    getdata()
  }, [])

  return (
    <div className='d-flex bg-dark text-light flex-column overflow-y-scroll'>

      <div className='m-5'>
        <span className='text-warning fs-4' onClick={() => navigate(-1)} >

          <FaArrowLeft />
        </span>
        <h2 className='fst-italic' >All <span className='text-warning'>cources</span></h2>
      </div>
      <div className='bg-dark     d-flex  container h-auto w-auto h-50 flex-wrap text-white' >



        {course.map((curElem, index) => {
          return (

            <div key={index} className="cardlist border    mb-3 mt-5  w-25 h-75     rounded  ms-5 bg-transparent  text-light " >
              <img src={curElem.thumbnail.secure_url} className=" w-100 h-50  object-fit-fill overflow-hidden " />
              <div className="card-body h-50">
                <h5 className='text-warning' >{curElem.category}</h5>
                <div className='d-flex justify-content-between ' >
                  <p className='text-secondary'>Creted By -- </p>

                  <p className='description w-auto text-primary'>{curElem.createdBy}</p>
                </div>
                <p className=' text-light'>{curElem.description}</p>
                {user.isAdmin === true || user.razorpay_order_id?.status === "active" ? (

                  <div className='mb-1'>


                    <button onClick={() => navigate("/cources/description", { state: { ...curElem } })} className=' w-100 btn btn-outline-secondary'>watch now</button>
                  </div>
                ) : (


                  <div className='mb-1'>
                    <div className='d-flex '>

                      <p className=' text-decoration-line-through text-danger'>1000</p>
                      <p className=' ms-2  text-warning'>350Rs</p>
                    </div>

                    <button onClick={() => navigate("/cources/description", { state: { ...curElem } })} className=' w-100 btn btn-outline-secondary'>  Buy Now</button>

                  </div>
                )


                }
                {
                  user.isAdmin === true && (
                    <button onClick={() => OnDelete(curElem._id)} className=' overflow-hidden w-100 btn btn-danger text-light '>
                      Delete lecture
                    </button>
                  )
                }

              </div>


            </div>
          )
        })}


      </div>


    </div>
  )

}

export default Courses