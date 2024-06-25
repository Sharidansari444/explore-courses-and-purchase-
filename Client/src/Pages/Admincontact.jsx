import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAtuh } from '../../storecontext/auth'




const Admincontact = () => {
  const { AuthorizationToken } = useAtuh()
  const [contactdata, setContactdata] = useState([])
 
  const allContact = async () => {

    await axios.get("http://localhost:5000/api/admin/adminContact", {
      headers: {
        Authorization: AuthorizationToken
      }
    }).then((res) => {
      console.log(res)
      console.log(res.data.message)
      if(res.statusText){
        setContactdata(res.data.message)

      }
      
    }).catch((error) => {
      console.log(error)  
     
    })
  }

  const Deletecontact = async  (id)=>{
    await axios.delete(`http://localhost:5000/api/admin/adminContact/delete/${id}` ,{
      headers:{
        Authorization : AuthorizationToken
      }
    }).then((res)=>{
     console.log(res)
     allContact()
     
    //  toast.success(res.data.message)
    
    }).catch((error)=>{
      console.log(error)
    })
  } 

  useEffect(() => {
    allContact()
  }, [])

  return (
    <div className='container'>
      <h2 className='mt-5 fst-italic'>All contact data</h2>
      <div className=' d-flex flex-wrap  container'>
           {    contactdata.map((currvalue, index) => {
       
            return  <div key={index} className="card mt-5 container  ms-4 bg-dark text-light" >
              <div className="card-body">
                <h3  className="card-title">{currvalue.name}</h3>
                <h6 className="mb-2 ">{currvalue.email}</h6>
                <p className="card-text">{currvalue.message}</p>
                <button onClick={()=>Deletecontact(currvalue._id)} className='btn btn-warning'> Delete</button>
              </div>
            </div>
          })
            }
          
        
        
       

      </div>
    </div>
  )
}

export default Admincontact