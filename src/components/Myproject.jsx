import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContext } from '../context/Contextshare'


function Myproject() {

  const [userproject, setUserproject] = useState([])
  const {addResponse} = useContext(addResponseContext)
  const {editResponse} = useContext(editResponseContext)
  const [removestatus,setRemovestatus] = useState("")

  const getuserProjects = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await userProjectApi(reqHeader)
      // console.log(result)
      setUserproject(result.data)
    }

  }
  console.log(userproject)

  const handleDelete = async(id)=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      const result = await removeUserProjectApi(id,reqHeader)
      console.log(result)
      if(result.status==200){
        setRemovestatus(result)
      }
      else{
        alert('something went wrong')
      }
    }
  }

  useEffect(() => {
    getuserProjects()
  }, [addResponse,removestatus,editResponse])

  return (
    <div className='p-4 shadow w-100'>
      <div className="d-flex mt-4 justify-content-between">
        <h3 className='text-success'>My Projects</h3>
        <Addproject />
      </div>

      {
      userproject?.length > 0 ?
        userproject.map((item) => (
          <div className='p-3 bg-light mt-3 rounded-2 d-flex justify-content-between align-items-center'>
            <h5>{item?.title}</h5>
            <div className="d-flex">
              <Edit projects={item} />
              <Link to={item?.website} target='_blank'>  <FontAwesomeIcon icon={faGlobe} className='text-warning mx-3 ' /></Link>
              <Link to={item?.github}>   <FontAwesomeIcon icon={faGithub} className='text-success mx-3' /></Link>
              <Link><FontAwesomeIcon icon={faTrash} className='text-danger mx-3 ' onClick={()=>handleDelete(item?._id)} /></Link>
            </div>
          </div>
        ))
        :
        <h4 className='text-center text-warning mt-5'>No projects added yet</h4>
      }
    </div>
  )
}

export default Myproject
