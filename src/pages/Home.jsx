import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import image from '../assets/3d-businessman-character-working-with-laptop-png.webp'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'


function Home() {

    const [isLogin,setIslogin] = useState(false)
    const [homeProject,setHomeproject] = useState([])

    const getHomeProject =async()=>{
        const result = await homeProjectApi()
        // console.log(result)
        setHomeproject(result.data)

    }
    console.log(homeProject)

    useEffect(()=>{
        getHomeProject()
        if(sessionStorage.getItem("token")){
            setIslogin(true)
        }
        else{
            setIslogin(false)
        }
    },[])
    
  return (
    <>
    <div style={{height:'100vh'}} className='bg-success p-5'>
        <div className='continer-fluid mt-5'>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className="col-md-6">
                    <h1 style={{fontSize:'70px',color:'white'}}>Project Fair</h1>
                    <p>one stop destination for all software development projects</p>

                 { 
                 !isLogin ? <Link to={'/login'}> <button className='btn btn-success text-light p-1 mt-3'>Get Started<FontAwesomeIcon className='ms-1' icon={faArrowRight} /></button></Link>
                 :
                    <Link to={'dashboard'}><button className='btn btn-success text-light p-1 mt-3'>Manage Project <FontAwesomeIcon className='ms-1' icon={faArrowRight} /></button></Link>
                }
                </div>
                <div className="col-md-6">
                    <img src={image} className='w-50' />
                </div>

            </div>

        </div>
      
    </div>

    <div>
        <h1 className='text-center my-5'>Explore Our Projects</h1>
        <div className="container">
            <div className="row">
                { homeProject?.map((item)=>(
                    <div className="col-md-4">
                    <ProjectCard project={item}/>
                </div>
                ))
                    
                }
                
            </div>
        </div>
       <Link to={'/projects'} className='text-danger'> <p className='text-center my-4'>see more projects</p></Link>
    </div>

    </> 
  )
}

export default Home
