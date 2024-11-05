import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAtuh } from '../../storecontext/auth'
import { Link } from 'react-router-dom'

const AdminUser = () => {

  const { AuthorizationToken } = useAtuh()
  const [allUserData, setAllUserData] = useState([])

 

  const getAllUsersData = () => {
    axios.get("http://localhost:5000/api/admin/User", {
      headers: {
        Authorization: AuthorizationToken
      }
    }).then((res) => {
      console.log(res)
      // console.log(res.data.user)
      setAllUserData(res.data.user)

    })
  }

  const deleteUser = (id) => {
    console.log(id)
    axios.delete(`http://localhost:5000/api/admin/User/Delete/${id}`, {
      headers: {
        Authorization: AuthorizationToken
      }
    }).then((res) => {
      console.log(res)

      // getAllUserData is again call after user delete
      getAllUsersData();
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {

    getAllUsersData();

  }, [])




  return (
    
    <div className="container  ">

      <div className="d-flex mt-5 flex-column  " >
        <div>
          <h3>All user data</h3>
        </div>
        <div className='mt-5 table-responsive ' >
          <table className='table table-bordered table-striped table-hover '>
            <thead className=' table-dark'>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>edit</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {allUserData && allUserData.map((currUser, index) => {
                return <tr key={index}>
                  <td>{currUser.name}</td>
                  <td>{currUser.email}</td>
                  <td><Link className='btn btn-outline-warning' to={`/admin/User/${currUser._id}/edit`}> Edit</Link></td>
                  <td><button className='btn btn-outline-danger' onClick={() => deleteUser(currUser._id)}>
                    Delete
                  </button></td>
                </tr>
              })}
            </tbody>
          </table>

        </div>

      </div>



    </div>
  )
}

export default AdminUser