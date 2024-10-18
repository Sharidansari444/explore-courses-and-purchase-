import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState("")
  // const [course, setCourse] = useState([])
  const AuthorizationToken = `Bearer ${token}`

  const storeTokenInLS = (serverToken) => {
    // setToken(serverToken) token save hone ke pahle token ka value true hoga jisse  isLoggedin ka value true ho jayega then user login krega to logout so hoga without page referece kiye
    setToken(serverToken)
    return localStorage.setItem("token", serverToken)
  }
  let isLoggedin = !!token;

  // console.log("isLoggedin", isLoggedin)
  const LogoutUser = () => {
    setToken("")
    return localStorage.removeItem("token")


  }
  //  JWT Authention - to get the current login user data  
  const userauth = async () => {
     setIsLoading(true)
    await axios.get("http://localhost:5000/api/auth/user",
    {
      headers: {
        Authorization: AuthorizationToken,
        "Content-Type" : "application/json"
      }
    }
    ).then((res)=>{

       if(res.statusText){
         const data = res
         console.log(data)
        //  console.log(data.data.userdata)
         setUser(data.data.userdata)
         setIsLoading(false)
       }
       
    }).catch((error)=>{
      console.log(error)
    })
    // console.log(response)
  }
 
 

  


  useEffect(() => {
   
    userauth()
    
  }, [])

// console.log(cource)
  return (

    <AuthContext.Provider value={{ AuthorizationToken , storeTokenInLS,  LogoutUser, isLoggedin, user , isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}



// eslint-disable-next-line react-refresh/only-export-components
export const useAtuh = () => {
  const authContextvalue = useContext(AuthContext)
  if (!authContextvalue) {
    throw new Error("useAuth used out side of provider")
  }
  return authContextvalue;

}