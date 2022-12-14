import { TextField } from '@mui/material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const RecruitersDetails = () => {

    const inputData = [
        {
            label: "Enter Recruiters Name",
            type: "text"
        },

        {
            label: "Enter Mobile Number",
            type: "number"
        },

        {
            label: "Enter Email ID",
            type: "email"
        },

        {
            label: "Enter Website/URL",
            type: "text"
        },
    ]

    const login = () => {
        navigate("/postjoblogin")
    }
    const navigate = useNavigate()
    return (
        <>

            <Container>
                {/* <div className='post_job_content'> */}
                <Row>
                    <Col lg={6} className="border-right">

                        <div className='d-flex'>
                            <img src="./assets/img/noun-location-4566596@2x.png" alt="" height="32px" />
                            <h1>Are you an company or consultant?</h1>
                        </div>
                        <Row className='mt-4'>

                            {
                                inputData.map((item) => (
                                    <Col lg={6}>
                                        <TextField id="outlined-danger" type={item.type} label={item.label} name={"search"} variant="outlined" className='mt-3 ' />
                                    </Col>
                                ))
                            }
                        </Row>
                        <div className=' drag_and_drop mt-4'>
                            <p>Upload or drag and drop jpg, gif, png up to 3MB</p>
                            <button>Upload Document</button>
                        </div>
                        <div className='mt-4 d-flex Upload_documents_terms'>
                            <input type="checkbox" id='Upload_documents' />
                            <label htmlFor="Upload_documents">Upload your company logo means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.</label>
                        </div>
                        <button className='mt-5 continue_btn' onClick={() => login()}>Submit</button>
                    </Col>
                    <Col lg={6}>
                        <div className='Your_Profile_div'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>Your Profile</h1>
                            </div>
                            <div className='mt-4'>
                                <div>
                                    <h3>My recruiter firm name</h3>
                                    <h2>ABCD</h2>
                                </div>
                                <div className='mt-3'>
                                    <h3>My Job Type</h3>
                                    <h2>Nursing</h2>
                                </div>
                                <div className='mt-3'>
                                    <h3>Upload Document</h3>
                                    <h2>PAN card</h2>
                                </div>
                                <div className='mt-3'>
                                    <h3>Location</h3>
                                    <h2>Thane</h2>
                                </div>
                                <div className='mt-3'>
                                    <h3>Company or Consultant</h3>
                                    <h2>Direct Employer </h2>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* </div> */}

            </Container>
        </>
    )
}

export default RecruitersDetails