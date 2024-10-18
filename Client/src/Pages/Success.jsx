import React from 'react'
import './success.css';
import { useNavigate } from 'react-router-dom';
const Success = () => {
  const navigate = useNavigate()
  return (
    <div className='d-flex bg-dark flex-column  justify-content-center align-items-center h-100'>

    <div className="jumping-emoji d-flex justify-content-center align-items-center flex-column w-25">
      🤑
      <h2 className=' text-success ms-0'>Payment Success </h2>
    </div>
    <button onClick={()=>navigate("/")} className='  btn btn-outline-warning'>Home</button>
    </div>
  );
};

export default Success
