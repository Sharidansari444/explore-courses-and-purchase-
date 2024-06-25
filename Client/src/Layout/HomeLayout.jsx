import React from 'react'
// import { useSelector } from 'react-redux';
// import {FiMenu} from 'react-icons/fi'
// import {AiFillCloseCircle} from 'react-icons/ai';
// import Footer from '../Components/Footer'
import { Link,  } from 'react-router-dom';
import { useAtuh } from '../../storecontext/auth';
const HomeLayout = ({ children }) => {
   const {isLoggedin} = useAtuh()
  // const dispatch = useDispatch();

  // const navigate = useNavigate();


  // const isLoggedin = useSelector((state) => state?.auth?.isLoggedin);
  // const role = useSelector((state) => state?.auth?.role);

  // function handleLogout (e){
  //   e.preventDefault();
  //   navigate("/")
  // }

  return (
    <div className="navbar navbar-dark bg-dark fixed-top d-flex ">
      <div className="container-fluid">

        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"  >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">

          <div className="offcanvas-body " >
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 ">
              <li className="nav-item">
                <Link className="text-light nav-link" to="/">Home</Link>
              </li>
              {/* {!isLoggedin && role === 'ADMIN' && (
                <li>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </li>
              )} */}
              <li className="nav-item">
                <Link className="text-light nav-link " to="/abouts">Abouts us</Link>
              </li>
              <li className="nav-item">
                <Link className="text-light nav-link" to="/Contact">contact us</Link>
              </li>
              <li className="nav-item"> 
                <Link className="text-light nav-link" to="/Cources">All courses</Link>
              </li>
              
            </ul>
            {isLoggedin ? (
                
              <li className='position-absolute  ' style={{listStyle:"none"}}>
              <div className='d-flex  align-items-center justify-content-center w-90'>
                <button className='btn btn-primary   px-4 fs-5  py-1 text-white ' style={{margin:"10px 10px 10px 0"}}>

                  <Link  className="text-light nav-link" to="/profile">Profile</Link>
                </button>
                <button className='btn btn-warning px-4 fs-5 py-1 font-semibold'>

                  <Link  className="text-light nav-link" to="/logout" >Logout</Link>
                </button>
              </div>
              </li>
              ): (  
              <li className='position-absolute  ' style={{listStyle:"none"}}>
              <div className='d-flex  align-items-center justify-content-center w-90'>
                <button className='btn btn-primary   px-4 fs-5  py-1 text-white ' style={{margin:"10px 10px 10px 0"}}>

                  <Link  className="text-light nav-link" to="/Login">Login</Link>
                </button>
                <button className='btn btn-warning px-4 fs-5 py-1 font-semibold'>

                  <Link  className="text-light nav-link" to="/Signup">Signup</Link>
                </button>
              </div>
              </li>)}
 
          </div>
        </div>
      </div>
      {children}

    </div>
  )
}

export default HomeLayout