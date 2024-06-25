import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className=' d-flex flex-column justify-content-center align-items-center ' style={{width:"100wvh",height:"100vh",backgroundColor:"#212529"}}>
        <h1 style={{fontSize:"130px",color:"yellow  "}}>
            404
            
            </h1>
           
            <button onClick={()=>navigate(-1) } className="btn btn-outline-warning  text-light border">
                Go Back
                </button>
    </div>
  )
}

export default NotFound;