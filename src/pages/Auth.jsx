import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'



function Auth({register}) {

  const {setLoginResponse} = useContext(loginResponseContext)

  const navigate = useNavigate()

  const [userdetails,setUserdetails] = useState({
    username:"",
    email:"",
    password:""
  })
  console.log(userdetails)

  const handleRegister = async()=>{
    const {username,email,password} = userdetails

    if(!username || !email || !password){
      toast.info('please fill the form completely')
    }
    else{
      const result = await registerApi(userdetails)
      console.log(result)
      if(result.status==200){
        toast.success('registration successful')
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }
      else if(result.status==406){
        toast.warning(result.response.data)
      }
      else{
        toast.error("something went wrong")
      }
    }
  }

  const handleLogin = async()=>{
    const {email,password}=userdetails
    if(!email || !password){
      toast.info('please fill the form completely')
    }
    else{
      const result = await loginApi({email,password})
      console.log(result)
      if(result.status==200){
        toast.success('login successful')
        setLoginResponse(true)

        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))

        sessionStorage.setItem("token",result.data.token)
        
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
        setTimeout(()=>{
          navigate('/')
        },2000)
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
      }
      else{
        toast.error(result.response.data)
        setUserdetails({
          username:"",
          email:"",
          password:""
        })
      }
    }
  }
  return (
    <>

      <div className='container pt-5'>
        <Link to={'/'}><button className='btn text-warning mb-2'><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back Home</button></Link>
        <div className="container bg-success p-5 "> 
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" className='w-50'/>
            </div>
            <div className="col-md-6 text-center  ">
           
               <div className='d-flex flex-column align-items-center'>
                  <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project fair</h3>
                 { !register?
                  <h5 className='text-light'>Sign in to Your Account</h5>
                 :
                  <h5 className='text-light'>Sign Up to Your Account</h5>
                  }
                  

                  {
                    register && 
                    <input className=' d-flex form-control text-secondary w-75 mt-5 border-0 rounded-0' type="text" placeholder='username' onChange={(e)=>setUserdetails({...userdetails,username:e.target.value})} value={userdetails.username}/>
                    }

                  <input className=' d-flex form-control text-secondary w-75 mt-3 border-0 rounded-0' type="text" placeholder='Email-id' onChange={(e)=>setUserdetails({...userdetails,email:e.target.value})}  value={userdetails.email}/>

                  <input type="text" placeholder='password' className='form-control text-secondary w-75 mt-3 border-0 rounded-0' onChange={(e)=>setUserdetails({...userdetails,password:e.target.value})} value={userdetails.password}/>

                { !register ?
                  <div>
                    <button onClick={handleLogin} className='mt-3 rounded-0 btn btn-warning w-75'>Login</button>
                    <p className='text-light mt-2'>New User? click here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                 </div>
                  :
                 <div>
                    <button onClick={handleRegister} className='mt-3 rounded-0 btn btn-warning w-75'>Register</button>
                    <p className='text-light mt-2'>Already a User? click here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                 </div>}
             
               </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000}  />
    </>
  )
}

export default Auth
