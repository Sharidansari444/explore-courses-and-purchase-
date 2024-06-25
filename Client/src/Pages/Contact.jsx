import  {  useState } from 'react'
import "./contact.css"
import contact from '../Assets/Images/contact.png'
import { useAtuh } from '../../storecontext/auth'
import axios from 'axios'
import { toast } from 'react-toastify'

const Contact = () => {
  const [userData, setUserData] = useState(true)
  const {user} = useAtuh()
  const [userinput, setUserinput] = useState({
    name: "",
    email: "",
    message: ""
  })

  // userData is true
  // user is true than output is true

  if(userData && user){
    setUserinput({
      name : user.name,
      email: user.email,
      message:""
    })
    setUserData(false)
  }

  function sendhandler(e) {
    // console.log(e)
    let name = e.target.name
    let value = e.target.value

    setUserinput({
      ...userinput,
      [name]: value
    })
    

  }

  const contactsubmit = async (e)=> {
    e.preventDefault()
    // console.log(userinput)

      
   await axios.post("http://localhost:5000/api/form/contact",
   userinput
   ).then((res)=>{

     
      toast.success("message send successfully")
      console.log(res)
      setUserinput({
        message:""
      })
     
   }).catch((error)=>{
     console.log(error)
     toast.error(error.response.data.extradetails? error.response.data.extradetails : error.response.data.message )

   })
      // console.log(contactuser)

    
  }

  return (
    <div className='w-100 h-auto'>
    <div className='main text-light d-flex bg-dark bg-gradient'>
      <div className='contact-img  d-flex justify-content-center align-items-center ' style={{ height: "100vh" }}>
        <img id='img' src={contact} alt="" />
      </div>
      <div className='form '>
        <div className='' style={{ height: "100vh", width: "50vw" }}>
          <form onSubmit={contactsubmit} className='input   d-flex justify-content-center align-items-center flex-column' action="" >
            <h1 className='mb-3 text-warning '>Contact Form</h1>
            
            <input
              className='form-control w-50'
              type="text"
              placeholder='Name..'
              name='name'
              value={userinput.name || ""}
              onChange={sendhandler}
               
            />

            <input
              className='form-control w-50 mt-4'
              type="email"
              name='email'
              placeholder='Enter your email..'
              value={userinput.email || ""}
              onChange={sendhandler}
            />

            <textarea
              className="form-control w-50 h-25  mt-4 "
              placeholder='Messgae...'
              name='message'
              value={userinput.message || ""}
              onChange={sendhandler}
              required={true}
            ></textarea>
            <button className='w-50 form-control  mt-3 fs-5 btn btn-outline-warning text-light '>
              Send message
            </button>
          </form>
        </div>
        
      
      
      </div>
    </div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.2429684312774!2d77.42944827517113!3d23.234243979025916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c435b24a0de2f%3A0xd090bc43b3357c8d!2sFrontech%20Service%20Center!5e0!3m2!1sen!2sin!4v1706868729014!5m2!1sen!2sin" style={{width:"100%",height:"50vh", allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade" }} ></iframe>
    </div>
  )
}

export default Contact