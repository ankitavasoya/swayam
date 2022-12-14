import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

interface Props {
    stepname: () => void,
}
const DocumentVerification:React.FC<Props> = ({stepname}) => {

    const [selectDocType, setSelectDocType] = useState('PAN Card')
    const documentType = [
        {
            text: "PAN Card"
        },
        {
            text: "TAN"
        },
        {
            text: "GST Certificate"
        },
        {
            text: "Registration certificate"
        },
    ]
    return (
        <>

            <Container>
                {/* <div className='post_job_content'> */}
                <Row>
                    <Col lg={6} className="border-right">

                        <div className='d-flex'>
                            <img src="./assets/img/noun-upload-document-red.png" alt="" height="36px" />
                            <h1>Upload one document for verification</h1>
                        </div>
                        <Row className='mt-4'>
                            {
                                documentType.map((item) => (
                                    <Col lg={3}>
                                        <button onClick={() => setSelectDocType(item.text)} className={selectDocType === item.text ? 'selected_tab' : "diseble_tab"}>{item.text}</button>
                                    </Col>
                                ))
                            }
                        </Row>
                        <div className=' drag_and_drop mt-4'>
                            <p>Upload or drag and drop jpg, gif, png up to 3MB</p>
                            <button>Upload Document</button>
                        </div>
                        <div className='mt-4 d-flex Upload_documents_terms'>
                            <input type="checkbox" id='Upload_documents'/>
                            <label htmlFor="Upload_documents">Upload your documents means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.</label>
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
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* </div> */}

            </Container>
        </>
    )
}

export default DocumentVerification