import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import store from './Redux/store'
import App from './App.jsx'
import { AuthProvider } from '../storecontext/auth.jsx'
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
   <Provider store={store}>

        <BrowserRouter>

            <App />
            
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
             
             />
        </BrowserRouter>
   </Provider>
   </AuthProvider>
   
)
