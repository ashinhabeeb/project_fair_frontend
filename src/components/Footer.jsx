import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div className='p-5 bg-success mt-5'>

        <div className='container-fluid'>
         <div className='row'>
                <div className="col-md-4">
                    <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-3'/>Project Fair</h3>
                    <p className='mt-3 ' style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fugit beatae, eaque tenetur explicabo deserunt, quos omnis officiis cupiditate ex accusamus unde quasi. Temporibus non deserunt veritatis earum voluptates velit.</p>
                </div>
                <div className="col-md-2 d-md-flex justify-content-end">
                    <div>
                        <h3 className='text-light'>Guides</h3>
                        <p>Home</p>
                        <p>Project</p>
                        <p>Dashboard</p>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-2 d-md-flex justify-content-center">
                    <div>
                        <h3 className='text-light'>Links</h3>
                        <p>React</p>
                        <p>Rreact Bootstrap</p>
                        <p>Bootswatch</p>
                    </div>
                </div>
                <div className="col-md-3 ">
                    <h3 className='text-light'>Contact Us</h3>
                    <div className='d-md-flex mt-3 gap-2'>
                        <input placeholder='Email-id' className='form-control rounded-0' type="text" />
                        <button className='btn btn-warning rounded-0'>Subscribe</button>
                    </div>
                    <div className='d-flex mt-4 justify-content-between'>
                    <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light'/>
                    <FontAwesomeIcon icon={faTwitter} className='fa-2x text-light' />
                    <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light' />
                    <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light' />
                    </div>
                </div>
         </div>

        </div>
      
    </div>
  )
}

export default Footer
