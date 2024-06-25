import React from 'react'
import HomeLayout from '../Layout/HomeLayout'
 import aboutsmainimage from '../Assets/Images/study.png'
 import ambedkar from '../Assets/Images/amnedkar.jpg'
 import ravindra from '../Assets/Images/Rabindranath_Tagore.jpg'
 import abdul from '../Assets/Images/APJ-Abdul-Kalam.png.webp'
import { useAtuh } from '../../storecontext/auth'
 
const AboutsUs = () => {
    
 const {user} = useAtuh()
  return (
    <HomeLayout >
      <div className=' container text-white'  >

        <div className='d-flex  gap-5 '   >
            
             <section className='w-50 space-y-10  '>
                <h5> Welcome <span className='fs-2 text-warning fst-italic'>{user.name}</span>  </h5>
                  <h1 className='text-warning  ' style={{marginTop:"10px"}}>

                    Affordable and quality breducation 
                  </h1>
                    
               
                <p className='fs-5' style={{marginTop:"30px"}}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat possimus non ducimus quisquam reiciendis temporibus vel. Saepe debitis fugit aspernatur! Culpa laboriosam reiciendis quis iste deleniti corporis velit veniam esse. Molestiae ratione quas eos?
                </p>
             </section>
             <div className=''  >
                
                   <img src={aboutsmainimage} style={{height:"50vh"}} />
                   
             </div>
           
          </div>
          <div id="carouselExampleAutoplaying" className="carousel slide justify-content-center align-items-center" data-bs-ride="carousel" style={{marginLeft:"40%"}}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={ambedkar} className="d-block  " style={{height:"40vh"}} />
                        </div>
                        <div className="carousel-item">
                            <img src={ravindra} className="d-block   "  style={{height:"40vh"}}/>
                        </div>
                        <div className="carousel-item">
                            <img src={abdul} className="d-block   "   style={{height:"40vh"}}/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true "></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
      </div>
    </HomeLayout>
    

  )
}

export default AboutsUs