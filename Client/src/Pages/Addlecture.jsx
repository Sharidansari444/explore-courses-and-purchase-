import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

const Addlecture = () => {
  const navigate = useNavigate()
  const courseDetails = useLocation().state
  const [inputdata, setInputdata] = useState({
    id: courseDetails._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  })

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setInputdata({
      ...inputdata,
      [name]: value
    })

  }

  const videouploads = (e) => {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video)
    console.log(source)
    setInputdata({
      ...inputdata,
      lecture: video,
      videoSrc: source
    })
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    if (!inputdata.title || !inputdata.description || !inputdata.lecture) {
      return toast.error("please filed the all input")
    }
    await axios.post(`http://localhost:5000/api/course/${inputdata.id}`, inputdata ,{
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    }).then((res) => {
      console.log(res)

    }).catch((error) => {
      console.log(error)
    })

  }
  useEffect(() => {
    console.log(courseDetails)
    if (!courseDetails) {
      navigate("/course")
    }
  }, [])


  return (

    <div className=' bg-dark w-auto h-100 d-flex justify-content-center align-items-center  '>
      <div className='w-25 h-50 bg-dark shadow  text-light  '>
        <div className='d-flex justify-content-between'>

          <span className='text-warning fs-4' onClick={()=> navigate(-1)} >
          
            <FaArrowLeft/>
          </span>
          <h6>Add new lecture</h6>
        </div>
        <form onSubmit={onsubmitHandler}>

          <h5>Title</h5>
          <input
            type="text"
            placeholder='Enter your title here..'
            name='title'
            className='w-100 form-control-color text-light bg-transparent border border-1 '
            value={inputdata.title}
            onChange={onchangeHandler}

          />
          <h5>Decription</h5>
          <textarea

            className='w-100 bg-transparent text-light  border border-1 pb-5 '
            type='text'
            placeholder='enter your description'
            name='description'
            value={inputdata.description}
            onChange={onchangeHandler}
          />
          {inputdata.videoSrc ? ( 
            <video src={inputdata.videoSrc} className='w-100 object-fit-cover ' disablePictureInPicture controls></video>
          ) : (
            <div className='d-flex justify-content-center align-items-center h-50 border border-1 mt-3 mb-2  '>
              <label htmlFor="lecture"> choose your video</label>
              <input id='lecture' type="file" className='text-light d-none' accept=' video/mp4 video/x-mp4 video/*' name='lecture' onChange={videouploads} />

            </div>

          )

          }
          <button type='submit' className=' w-100  btn btn-outline-warning '> Add new lecture  </button>
        </form>

      </div>
    </div>


  )
}

export default Addlecture 