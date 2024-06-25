import React  from 'react'
import {  BsFacebook, BsInstagram , BsLinkedin, BsTwitter} from 'react-icons/bs'
const Footer = () => {
  const CurrentDate = new Date()
  const year = CurrentDate.getFullYear()
  return (
    <div>
      <footer className='position-relative w-100  d-flex text-white bg-primary sm:flex-row align-items-center justify-content-between   py-4 bg-parimari' style={{height:"10vh"}}>
        <section className='text-lg'>
          Sharid Ansari {year}
        </section>
          <section className='d-flex justify-content-center gap-3 fs-5 text-white text-2xl' style={{right:"50px"}}>
         <BsFacebook/>
        <BsInstagram/>
        <BsLinkedin/>
        <BsTwitter/>

          </section>
      </footer>
    </div>
  )
}

export default Footer;