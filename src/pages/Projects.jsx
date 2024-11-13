import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApi'


function Projects() {

  const [allprojects, setAllprojects] = useState([])
  const [token, setToken] = useState("")
  const [searchkey,setSearchkey] = useState("")


  const getAllProject = async () => {


    if (sessionStorage.getItem("token")) {

      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await allProjectApi(searchkey,reqHeader)
      setAllprojects(result.data)
    }
  }

  console.log(allprojects)
  console.log(token)
  console.log(searchkey)

  useEffect(() => {
   
    getAllProject()
  }, [searchkey]) //passing state as dependency -so when state changes function gets called

  useEffect(()=>{
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  },[])



  return (
    <>
      <Header />
      <div className='my-5'>
        <h3 className='text-center'>All Projects</h3>


        {!token ?
          <div className='container-fluid'>
            <div className='row'>
              <div className="col-md-3"></div>
              <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
                <img className='w-25 my-4' src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" />
                <h4 className='text-danger'>Please <Link to={'/login'}>Login</Link> to see more projects</h4>
              </div>
              <div className="col-md-3"></div>
            </div>

          </div>

          :

          <div className='mt-5'>
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex">
                  <input onChange={(e)=>setSearchkey(e.target.value)} type="text" placeholder='technologies' className='form-control shadow' />
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'lightgrey', marginTop: '12px', marginLeft: '-30px' }} />
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>

            <div className='container-fluid p-5 mt-5'>
              <div className="row">

                {allprojects?.map((item) => (
                  <div className="col-md-3">
                    <ProjectCard project={item} />
                  </div>
                ))

                }

              </div>

            </div>
          </div>}

      </div>
    </>
  )
}

export default Projects
