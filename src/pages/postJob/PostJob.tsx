import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import recruitment_diseble from "../../assets/img/noun-recruitment_diseble.png";
import recruitment_active from "../../assets/img/noun-recruitment_active.png";
import nurse_diseble from "../../assets/img/noun-nurse-diseble.png";
import document_diseble from "../../assets/img/noun-upload-document-diseble.png";
import consultant_disebles from "../../assets/img/noun-consultant-diseble.png";
import contact_diseble from "../../assets/img/noun-contact-diseble.png";
import nurse_active from "../../assets/img/noun-nurse-active.png";
import document_active from "../../assets/img/noun-upload-document-active.png";
import location_active from "../../assets/img/noun-location-active.png";
import consultant_active from "../../assets/img/noun-consultant-active.png";
import contact_active from "../../assets/img/noun-contact-active.png";
import location_diseble from "../../assets/img/noun-location-diseble.png";
import FirmName from './FirmName';
import JobsType from './JobsType';
import DocumentVerification from './DocumentVerification';
import Location from './Location';
import Consultant from './Consultant';
import RecruitersDetails from './RecruitersDetails';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {

    const navigate = useNavigate()
    const [showStep, setShowStep] = useState("Name of Recruiter")

    const stepperData = [
        {
            img: recruitment_diseble,
            img_active: recruitment_active,
            name: "Name of Recruiter"
        },
        {
            img: nurse_diseble,
            img_active: nurse_active,
            name: "Job Types",
            width: "28px",
            height: "32px"
        },
        {
            img: document_diseble,
            img_active: document_active,
            name: "Upload Document"
        },
        {
            img: location_diseble,
            img_active: location_active,
            name: "Location"
        },
        {
            img: consultant_disebles,
            img_active: consultant_active,
            name: "Consultant"
        },
        {
            img: contact_diseble,
            img_active: contact_active,
            name: "Recruiter's Details",
            diplay: "d-none"
        },
    ]
    return (
        <>
            <div className="breadcrums blue-text">
                <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Post a job</button>
            </div>
            <div style={{ paddingTop: "50px", paddingBottom: "40px" }} className="post_job_main">
                <Container>
                    <h1>Employer Registration</h1>
                    <div className='post_job_content'>
                        {
                            showStep === "Name of Recruiter" &&
                            <FirmName stepname={() => setShowStep("Job Types")} />
                        }

                        {
                            showStep === "Job Types" && <JobsType stepname={() => setShowStep("Upload Document")} />
                        }

                        {
                            showStep === "Upload Document" && <DocumentVerification stepname={() => setShowStep("Location")} />
                        }

                        {
                            showStep === "Location" && <Location stepname={() => setShowStep("Consultant")} />
                        }

                        {
                            showStep === "Consultant" && <Consultant stepname={() => setShowStep("Recruiter's Details")} />
                        }

                        {
                            showStep === "Recruiter's Details" && <RecruitersDetails />
                        }
                    </div>
                </Container>
            </div>

            <div className='stepper_content'>
                <Container>
                    <div className='d-flex align-items-center' style={{ height: "104px" }}>

                        {
                            stepperData.map((item) => (
                                <>
                                    <div style={{ width: "150px" }} className="text-center position-relative">
                                        <button type="button" onClick={() => setShowStep(item.name)} className={showStep === item.name ? 'active_step' : 'disable_step'}>
                                            <img src={showStep === item.name ? item.img_active : item.img} alt="" className='' style={{ width: item.width, height: item.height }} />
                                        </button>
                                        <p className={showStep === item.name ? 'stepper_content_p' : 'd-none'}>{item.name}</p>
                                    </div>
                                    <div className={`${item?.diplay ? 'd-none border_after' : 'border_after'}`}></div>
                                </>
                            ))
                        }
                    </div>
                </Container>
            </div>
        </>
    )
}

export default PostJob