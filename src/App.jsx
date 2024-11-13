
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css'
// import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Pagenotfound from './pages/Pagenotfound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/Contextshare'



function App() {

  const {loginResponse} = useContext(loginResponseContext)
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register={true}/>}/>
      <Route path='/dashboard' element={loginResponse?<Dashboard/>:<Pagenotfound/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
