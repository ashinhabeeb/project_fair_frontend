import React from 'react'
import Card from 'react-bootstrap/Card';
// import mediaplayerphoto from '../assets/media-player.png'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';




function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <div>
       <Card style={{ width: '100%' }}className='mt-4 mt-md-5 shadow border-0'>
      <Card.Img variant="top" src={`${serverUrl}/uploads/${project?.projectImage}`} onClick={handleShow} style={{height:'200px'}} />
      <Card.Body>
        <Card.Title className='text-center'>{project?.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-6">
                 <img src={`${serverUrl}/uploads/${project?.projectImage}`} alt="no image" className='w-100'/>
                </div>
                <div className="col-md-6">
                    <h4>Description</h4>
                    <p>{project?.overview}</p>
                    <h4>Technologies</h4>
                    <p>React</p>
                </div>
            </div>

         </div>
        </Modal.Body>
        <Modal.Footer>
            <div className='d-flex'>
           <Link to={project?.github} target='_blank'> <FontAwesomeIcon icon={faGithub} className='fa-2x me-3' /></Link>
           <Link to={project?.website} target='_blank'> <FontAwesomeIcon icon={faGlobe} className='fa-2x' /></Link>
            </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectCard
