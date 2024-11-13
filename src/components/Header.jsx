import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useFetcher, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';


function Header() {

  const {setLoginResponse} = useContext(loginResponseContext)

  const [token,setToken] = useState("")
  const navigate = useNavigate()


  const handleLogout = ()=>{
   sessionStorage.removeItem("existingUser")
   sessionStorage.removeItem("token")
   navigate('/')
   setLoginResponse(false)
  }


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  return (
    <>
       <Navbar className="bg-success">
        <Container>
         <Link to={'/'}>
              <Navbar.Brand className='text-light'>
                <h2><FontAwesomeIcon icon={faStackOverflow} />Project fair</h2>
              </Navbar.Brand>
         </Link>
        { token && 
        <button onClick={handleLogout} className='btn btn-warning ms-auto rounded-0'><FontAwesomeIcon icon={faPowerOff} />Logout</button>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header
