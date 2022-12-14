import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

interface Props {
    stepname: () => void,
}
const JobsType: React.FC<Props> = ({ stepname }) => {

    const [changeJobType, setChangeJobType] = useState('Nursing')
    const jobTypeData = [
        {
            img: "./assets/img/Nursing.png",
            img_active: "./assets/img/Nursing.png",
            text: "Nursing",
            width: "25.23px",
            height: "36px"
        },
        {
            img: "./assets/img/General Duty Assistant.png",
            img_active: "./assets/img/noun-medical-personnel-2125283.png",
            text: "General Duty Assistant",
            width: "36px",
            height: "32.52px"
        },
        {
            img: "./assets/img/Lab Technician.png",
            img_active: "./assets/img/noun-scientist-2909361.png",
            text: "Lab Technician.png",
            width: "34.45px",
            height: "36px"
        },
        {
            img: "./assets/img/Executive Assistant.png",
            img_active: "./assets/img/noun-executive-4633817.png",
            text: "Executive Assistant",
            width: "28.93px",
            height: "36px"
        },
    ]
    return (
        <>

            <Container>
                {/* <div className='post_job_content'> */}
                <Row>
                    <Col lg={6} className="border-right">

                        <div className='d-flex'>
                            <img src="./assets/img/noun-nurse-red.png" alt="" height="32px" />
                            <h1>What is Job Types you are hiring for</h1>
                        </div>
                        <div className='mt-4'>
                            {
                                jobTypeData.map((item) => (
                                    <div onClick={() => setChangeJobType(item.text)} className={changeJobType === item.text ? 'job_type_btn_active d-flex align-items-center mb-3' : 'job_type_btn_diseble d-flex align-items-center mb-3'}>
                                        <img src={changeJobType === item.text ? item.img_active : item.img} alt="" style={{ width: item.width, height: item.height }} />
                                        <h4>{item.text}</h4>
                                    </div>
                                ))
                            }
                        </div>
                        <button className='mt-5 continue_btn' onClick={() => stepname()}>Continue</button>
                    </Col>
                    <Col lg={6}>
                        <div className='Your_Profile_div'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>Your Profile</h1>
                                <p>Edit Profile</p>
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
                                <div className='mt-3'>
                                    <h3>Recruiter's Contact Details</h3>
                                    <h2>XYZoooo</h2>
                                    <h2>9769000000</h2>
                                    <h2>xxxx.xxxxx@gmail.com</h2>
                                    <h2>www.xyz.com</h2>
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

export default JobsType