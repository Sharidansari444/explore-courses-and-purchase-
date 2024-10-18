import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAtuh } from '../../storecontext/auth'
// import axios from 'axios'


const Displaylecture = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const { user } = useAtuh()
  const navigate = useNavigate()
  const { state } = useLocation()
  // const {course} = useAtuh()

  useEffect(() => {
    if (!state) navigate("/Courses")
    console.log(state)
    // console.log(course)


  }, [])
  return (
    <div className='bg-dark '>
      <div className='w-100 h-100 bg-dark d-flex flex-column  justify-content-center align-items-center text-light'>
        <div className=' text-md-center text-warning'>
          {state && state?.numbersOfLectures > 0 ? (<span>Coure name {state.title}</span>) : (<h1>Lecture not Added</h1>)}

        </div>
        {state && state.numbersOfLectures > 0 && <div className='  d-flex justify-content-center gap-5 '>
          {/*  left sections for playing video and Displaying course */}
          <div className='w-50 h-auto p-4 shadow-lg'>
            <video src={state && state.lectures[currentVideo]?.lecture?.secure_url}
              className=' object-fit-contain rounded-2 w-100'
              controls
              disablePictureInPicture
              controlsList='nodownload'

            >


            </video>
            <div className='text-light '>
              <h5 className=' mt-1'>
                <span className=' text-warning form-control-lg '>
                  Title : {" "}

                </span>
                {state && state.lectures[currentVideo]?.title}
              </h5>
              <p>
                <span className='form-control-lg text-warning  '>
                  Description : {' '}
                </span>
                {state && state.lectures[currentVideo]?.description}
              </p>
            </div>

          </div>

          {/*  right section fro showing the all lecture list */}
          <div className='w-25 h-auto'>
            <ul className='d-flex flex-column h-auto p-4 shadow-lg space-left2 '>
              <li className=' d-flex  justify-content-between align-content-center text-warning'>
                <p > Lecture list</p>
                {
                  user.isAdmin === true && (
                    <button onClick={(() => navigate("/Addlecture", { state: { ...state } }))} className='btn btn-outline-warning text-light '>
                      Add lecture
                    </button>
                  )
                }
              </li>
              {state && state.lectures.map((currentlecture, index) => {
                return (
                  <>
                    <li className='text-light' key={currentlecture._id}>
                      <p onClick={() => setCurrentVideo(index)}>
                        <span className='text-warning' role='button'>
                          {" "} Lecture {index + 1}  : {" "}
                        </span>
                        {currentlecture && currentlecture?.title}


                      </p>
                      {/* {
                        user.isAdmin === true && (
                          <button  onClick={()=> OnDelete(state.lectures.id)} className='btn btn-danger text-light '>
                            Delete lecture
                          </button>
                        )
                      } */}


                    </li>
                  </>
                )
              })}
            </ul>

          </div>

        </div>}
      </div>
    </div>
  )
}

export default Displaylecture