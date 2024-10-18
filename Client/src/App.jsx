import React from 'react'

import { Route, Routes } from 'react-router-dom'
import HomePages from './Pages/HomePages'

import AboutsUs from "./pages/AboutsUS";
import NotFound from './Pages/NotFound';
import Courses from './Pages/Courses';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Contact from './Pages/Contact';
import Logout from './Pages/Logout';
import Profile from './Pages/Profile';
import Adminlayout from './Layout/Adminlayout';
import AdminUser from './Pages/AdminUser';
import Admincontact from './Pages/Admincontact';
import AdminUpdate from './Pages/AdminUpdate';
import CourcesDescription from './Pages/CourcesDescription';
import Checkoutpage from './Pages/Checkoutpage';
import ForgetPassword from './Pages/ForgetPassword';
// import Resetpassword from './Pages/ResetPassword';
import ResetPassword from './Pages/ResetPassword';
import Success from './Pages/Success';
import CreateCourse from './Pages/CreateCourse';
import Displaylecture from './Pages/Displaylecture';
import Addlecture from './Pages/Addlecture';
// import CourseUpdate from './Pages/CourseUpdate';



const App = () => {
  return (
    
    <div>
        <Routes>
          <Route path='/' element={<HomePages/>}></Route>
          <Route path='/abouts' element={<AboutsUs/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
          <Route path='/Courses' element={<Courses/>}> 
          </Route>
          {/* <Route path='course/:id/update' element={<CourseUpdate/>}></Route> */}
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Logout' element={<Logout/>}></Route>
          <Route path='/Contact' element={<Contact/>}></Route>
          <Route path='/Profile' element={<Profile/>}></Route>
          <Route path='/cources/description' element={<CourcesDescription/>}></Route>
          <Route path='/payments/Checkoutpage' element={<Checkoutpage/>}></Route>
          <Route path ='/success' element = {<Success/>}></Route>
          <Route path='/admin' element={<Adminlayout/>}>
             <Route path='Users' element={<AdminUser/>}> </Route>
             <Route path='Contacts' element={<Admincontact/>}> </Route>
             <Route path='User/:id/edit' element={<AdminUpdate/>}></Route>
          </Route>

          <Route path='/CourseCreate' element={<CreateCourse/>}></Route>
          <Route path='/ForgetPassword' element={<ForgetPassword/>}></Route>
          <Route path='/ResetPassword/:id/:token' element={<ResetPassword/>}></Route>
          <Route path='/Displaylecture' element={<Displaylecture/>}></Route>
          <Route path='/Addlecture' element={<Addlecture/>}></Route>
          </Routes>   
        
    </div>
  )
}

export default App