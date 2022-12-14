import { TextField } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

interface Props {
    stepname: ()=> void,
}
const FirmName: React.FC<Props> = ({ stepname }) => {
    return (
        <>

            <Container>
                {/* <div className='post_job_content'> */}
                <Row>
                    <Col lg={6} className="border-right">

                        <div className='d-flex'>
                            <img src="./assets/img/noun-recruitment-2376575.png" alt="" height="36px" />
                            <h1>What is your recruiter firm name</h1>
                        </div>
                        <TextField id="outlined-danger" type="text" label="Enter Your recruiter firm Name" name={"search"} variant="outlined" className='mt-5 firm_Name_input' />
                        <button className='mt-5 continue_btn' onClick={() => stepname()}>Continue</button>
                    </Col>
                    <Col lg={6}>
                        <div className='Your_Profile_div'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>Your Profile</h1>
                                {/* <p>Edit Profile</p> */}
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default FirmName