import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() {
  const [show, setShow] = useState(false);

  const { setaddResponse } = useContext(addResponseContext)

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""

  })

  const [preview, setPreview] = useState("")
  const [token, setToken] = useState("")
  const [key, setKey] = useState(1)

  console.log(preview)
  console.log(projectDetails)
  console.log(token)

  //url.createobjectURL - to convert file into url

  const handleFile = (e) => {
    // console.log(e.target.files[0])
    setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })
  }

  const handleClose = () => {
    // handleCancel()
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleCancel = () => {

    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")

    if (key == 1) {
      setKey(0)
    }
    else {
      setKey(1)
    }
  }


  const handleAdd = async () => {
    const { title, language, github, website, overview, projectImage } = projectDetails

    if (!title || !language || !website || !github || !overview || !projectImage) {
      toast.info("please fill the form")
    }
    else {
      //append() - if the request contains uploaded content - then the request body should be created with the help of append method in the formData class. inshort request body should be a formData.

      const reqbody = new FormData()

      reqbody.append("title", title)
      reqbody.append("language", language)
      reqbody.append("website", website)
      reqbody.append("github", github)
      reqbody.append("overview", overview)
      reqbody.append("projectImage", projectImage)

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await addProjectApi(reqbody, reqHeader)
        console.log(result)
        if (result.status == 200) {
          toast.success('project added succesfully')
          handleClose()
          handleCancel()
          setaddResponse(result)

        }
        else if (result.status == 406) {
          toast.warning(result.response.data)

        }
        else {
          toast.error('something went wrong')
          handleClose()
        }

      }
      else {
        toast.warning('please login')
      }

    }
  }

  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [])

  return (
    <>
      <button onClick={handleShow} className='btn btn-success rounded-0'>Add Project</button>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectimage">
                  <input onChange={(e) => handleFile(e)} id='projectimage' type="file" style={{ display: 'none' }} key={key} />
                  <img src={preview ? preview : "https://cdn-icons-png.flaticon.com/512/223/223117.png"} alt="" className='w-75' />
                </label>
              </div>
              <div className="col-md-6">

                <div className="mb-3">
                  <input onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} type="text" placeholder='title' className='form-control' />
                </div>
                <div className="mb-3">
                  <input onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} type="text" placeholder='Language' className='form-control' />
                </div>
                <div className="mb-3">
                  <input onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} type="text" placeholder='Github' className='form-control' />
                </div>
                <div className="mb-3">
                  <input onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} type="text" placeholder='Website' className='form-control' />
                </div>
                <div className="mb-3">
                  <textarea onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} rows={5} name="" id="" placeholder='overwiew' className='form-control'></textarea>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </Modal>

    </>
  )
}

export default Addproject
