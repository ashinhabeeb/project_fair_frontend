import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { updateProfileApi } from '../services/allApi';
import Collapse from 'react-bootstrap/Collapse';


function Profile() {

  const [open, setOpen] = useState(false);
  const [userdetails, setUserdetails] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
    github: "",
    linkedin: ""
  })
  const [existingimg, setExistingimg] = useState("")
  const [preview, setPreview] = useState("")
  const [updatestatus, setUpdatestatus] = useState("")

  const handleFile = (e) => {
    setUserdetails({ ...userdetails, profile: e.target.files[0] })
  }

  const handleUpdate = async () => {
    const { username, email, password, profile, github, linkedin } = userdetails

    if (!github || !linkedin) {
      toast.info('please add github and linekdin')
    }
    else {
      const reqbody = new FormData()
      reqbody.append("username", username)
      reqbody.append("email", email)
      reqbody.append("password", password)
      reqbody.append("github", github)
      reqbody.append("linkedin", linkedin)
      preview ? reqbody.append("profile", profile) : reqbody.append("profile", existingimg)

      const token = sessionStorage.getItem("token")
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileApi(reqbody, reqHeader)
        console.log(result)

        if (result.status == 200) {
          toast.success("updated Successfully")
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setUpdatestatus(result.data)
        }
        else {
          toast.error("something went wrong")
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProfileApi(reqbody, reqHeader)
        console.log(result)
        if (result.status == 200) {
          toast.success("updated Successfully")
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
          setUpdatestatus(result.data)

        }
        else {
          toast.error("something went wrong")
        }
      }
    }
  }

  console.log(updatestatus)

  useEffect(() => {
    if (userdetails.profile) {
      setPreview(URL.createObjectURL(userdetails.profile))
    }
  }, [userdetails.profile])
  console.log(preview)


  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      console.log(user)

      setUserdetails({ ...userdetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })

      setExistingimg(user.profile)

    }
  }, [updatestatus])

  console.log(userdetails)
  console.log(existingimg)


  return (
    <>

      <div className='p-4 shadow' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div className='d-flex justify-content-between'>
          <h3>Profile</h3>
          <button  onClick={() => setOpen(!open)} className='btn btn-outline-warning '>
           { open==false?<FontAwesomeIcon icon={faArrowDown} />:
            <FontAwesomeIcon icon={faArrowUp} />}
            </button>
        </div>
        <Collapse in={open}>
          <div>

            <div className='d-flex justify-content-center align-items-center mt-3 flex-column'>
              <label htmlFor="profileImage" className='d-flex justify-content-center align-items-center mt-3'>
                <input id='profileImage' type="file" style={{ display: 'none' }} onChange={(e) => handleFile(e)} />

                {existingimg == "" ?
                  <img src={preview ? preview : "https://media.istockphoto.com/vectors/user-vector-id1138452882?k=20&m=1138452882&s=170667a&w=0&h=VPcCtAjIcXjS88hse2EL6bD_YLOYzh2V8fDdNCfOiB4="} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%', marginBottom: '20px' }} />
                  :
                  <img src={preview ? preview : `${serverUrl}/uploads/${existingimg}`} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%', marginBottom: '20px' }} />
                }
              </label>

              <div className='w-100'>

                <div className='mb-3'>
                  <input type="text" placeholder='github' className='form-control' value={userdetails.github} onChange={(e) => setUserdetails({ ...userdetails, github: e.target.value })} />

                </div>
                <div className='mb-3'>
                  <input type="text" placeholder='LinkedIn' className='form-control' value={userdetails.linkedin} onChange={(e) => setUserdetails({ ...userdetails, linkedin: e.target.value })} />

                </div>
                <div className='mb-3'>
                  <button className='btn btn-success w-100' onClick={handleUpdate}>Update</button>
                </div>

              </div>

            </div>
          </div>

        </Collapse>

      </div>

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />

    </>
  )
}

export default Profile
