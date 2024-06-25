import './Cources.css'
import ravindra from '../Assets/Images/Rabindranath_Tagore.jpg'
import { useAtuh } from '../../storecontext/auth'
import { useNavigate } from 'react-router-dom'
const Cources = () => {
  // const {isLoggedin} = useAtuh()
  const { cource } = useAtuh()
  const navigate = useNavigate()

  return (
    <div className='d-flex bg-dark text-light flex-column ' style={{ height: "100vh" }}>
      <div>
        <h2 className='fst-italic m-5' >All <span className='text-warning'>cources</span></h2>
      </div>
      <div className='bg-dark  d-flex container flex-wrap text-white' >



        {cource.map((curElem, index) => {
          return (

            <div onClick={() => navigate("/cources/description", { state: { ...curElem } })} key={index} className="cardlist  mt-5 border flex-wrap  rounded  ms-4 w-25 bg-transparent  text-light" style={{ height: "60vh", cursor: "pointer" }}>
              <img src={ravindra} className=" w-100  object-fit-fill overflow-hidden " alt="..." style={{ height: "40vh" }} />
              <div className="card-body">
                <h3 className='text-warning' >{curElem.service}</h3>
                <p className='description w-auto text-secondary'>{curElem.description}</p>
                <div className='d-flex'>

                  <p className=' text-primary'>{curElem.price}</p>
                  <p className=' ms-3 text-warning text-decoration-line-through'>$10000</p>
                  <div className=' ms-5 '>

                    <button className='btn btn-outline-secondary'>  Buy Now</button>
                  </div>

                </div>
              </div>


            </div>
          )
        })}


      </div>


    </div>
  )

}

export default Cources