import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

interface Props {
    stepname: () => void;
}
const Consultant:React.FC<Props> = ({stepname}) => {

    const [consultant, setConsultant] = useState('Direct Employer')
    const jobTypeData = [
        {
            img: "./assets/img/noun-boss-3796701.png",
            text: "Direct Employer",
            width: "25.23px",
            height: "36px"
        },
        {
            img: "./assets/img/noun-mediation-160374.png",
            text: "Third Party Recuiter",
            width: "36px",
            height: "32.52px"
        },
        {
            img: "./assets/img/noun-connect-1401395@2x.png",
            text: "Lab Technician.png",
            width: "34.45px",
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
                            <img src="./assets/img/noun-location-4566596@2x.png" alt="" height="32px" />
                            <h1>Are you an company or consultant?</h1>
                        </div>
                        <div className='mt-4'>
                            {
                                jobTypeData.map((item) => (
                                    <div onClick={() => setConsultant(item.text)} className={consultant === item.text ? 'job_type_btn_active d-flex align-items-center mb-3' : 'job_type_btn_diseble d-flex align-items-center mb-3'}>
                                        <img src={item.img} alt="" style={{ width: item.width, height: item.height }} />
                                        <h4>{item.text}</h4>
                                    </div>
                                ))
                            }
                        </div>
                        <button className='mt-5 continue_btn' onClick={() =>stepname()}>Continue</button>
                    </Col>
                    <Col lg={6}>
                        <div className='Your_Profile_div'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>Your Profile</h1>
                                {/* <p>Edit Profile</p> */}
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
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* </div> */}

            </Container>
        </>
    )
}

export default Consultant