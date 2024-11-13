import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { updateUserprojectApi } from '../services/allApi';
import { editResponseContext } from '../context/Contextshare';



function Edit({ projects }) {

  const {setEditResponse} = useContext(editResponseContext)

  const [projectdetails, setProjectdetails] = useState({
    title: projects?.title,
    language: projects?.language,
    github: projects?.github,
    website: projects?.website,
    overview: projects?.overview,
    projectImage: ""
  })
  const [preview, setPreview] = useState("")
  const [key, setKey] = useState(1)



  console.log(projectdetails)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false),
      handleCancel()
  };
  const handleShow = () => setShow(true);

  // console.log(projects)

  const handlefile = (e) => {
    setProjectdetails({ ...projectdetails, projectImage: e.target.files[0] })
  }

  const handleUpdate = async() => {
    const { title, language, github, website, overview, projectImage } = projectdetails
    if (!title || !language || !github || !website || !overview) {
      toast.info('please fill the form completely')
    }
    else{
      //rebody

      const reqbody = new FormData()

      reqbody.append("title",title)
      reqbody.append("language",language)
      reqbody.append("website",website)
      reqbody.append("overview",overview)
      preview?reqbody.append("projectImage",projectImage):reqbody.append("projectImage",projects.projectImage)

      const token = sessionStorage.getItem("token")

      if(preview){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserprojectApi(projects._id,reqbody,reqHeader)
        console.log(result)
        if(result.status==200){
          setEditResponse(result)
          toast.success("project updated succesfully")
          setTimeout(()=>{
            handleClose()
          },3000)
        }
        else{
          handleCancel()
          toast.error('something went wrong')
        }
      }
      else{
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserprojectApi(projects._id,reqbody,reqHeader)
        console.log(result)
        if(result.status==200){
          setEditResponse(result)
          toast.success("project updated succesfully")
          setTimeout(()=>{
            handleClose()
          },3000)
        }
        else{
          handleCancel()
          toast.error('something went wrong')
        }
      }
    }
  }

  useEffect(() => {
    if (projectdetails.projectImage) {
      setPreview(URL.createObjectURL(projectdetails.projectImage))
    }
  }, [projectdetails.projectImage])

  const handleCancel = () => {
    setProjectdetails({
      title: projects.title,
      language: projects.language,
      github: projects.github,
      website: projects.website,
      overview: projects.overview,
      projectImage: ""
    })
    setPreview("")
    if (key == 0) {
      setKey(1)
    }
    else {
      setKey(0)
    }
  }

  return (
    <>
      <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} className='mx-3 ' style={{ color: '#6f42c1' }} />

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectimage">
                  <input key={key} onChange={(e) => handlefile(e)} id='projectimage' type="file" style={{ display: 'none' }} />
                  <img src={preview ? preview : `${serverUrl}/uploads/${projects.projectImage}`} alt="" className='w-75' />
                </label>
              </div>
              <div className="col-md-6">

                <div className="mb-3">
                  <input onChange={(e) => setProjectdetails({ ...projectdetails, title: e.target.value })} value={projectdetails?.title} type="text" placeholder='title' className='form-control' />
                </div>
                <div className="mb-3">
                  <input onChange={(e) => setProjectdetails({ ...projectdetails, language: e.target.value })} value={projectdetails?.language} type="text" placeholder='Language' className='form-control' />
                </div>
                <div className="mb-3">
                  <input onChange={(e) => setProjectdetails({ ...projectdetails, github: e.target.value })} value={projectdetails?.github} type="text" placeholder='Github' className='form-control' />
                </div>
                <div className="mb-3">
                  <input onChange={(e) => setProjectdetails({ ...projectdetails, website: e.target.value })} value={projectdetails?.website} type="text" placeholder='Website' className='form-control' />
                </div>
                <div className="mb-3">
                  <textarea onChange={(e) => setProjectdetails({ ...projectdetails, overview: e.target.value })} value={projectdetails?.overview} rows={5} name="" id="" placeholder='overwiew' className='form-control'></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </Modal>
    </>
  )
}

export default Edit
