import { Input, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AddJobApplication } from '../../redux/actions/jobApplicationAction';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ADD_JOB_APPLICATION } from '../../redux/type';
import { ApiGet } from '../../helper/API/ApiData';

interface Props {
    onHide: () => void;
    show?: boolean;
    id?: string;
}

interface ApplyJob {
    job_id: any,
    mobileNo: string,
    emailId: string,
    resume_url: string,
    certification_url: string,
    currently_working: any,
    experience: any,
    termAndCondition: boolean,
}

const ApplyForAJob: React.FC<Props> = ({ show, onHide, id }) => {

    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const jobId = queryParams.get("jobId")

    const [applyJob, setApplyJob] = useState<ApplyJob>({
        job_id: id ? id : jobId ? jobId : '',
        mobileNo: '',
        emailId: '',
        resume_url: '',
        certification_url: '',
        currently_working: false,
        experience: 0,
        termAndCondition: false,
    })
    const [userEmail, setUserEmail] = useState<any>()

    const [formErrors, setFormErrors] = useState<any>({})

    const addJobApplicationData = useSelector((state: any) => state.jobApplicationData.addJobApplication)

    useEffect(() => {
        if (addJobApplicationData && addJobApplicationData.data && addJobApplicationData.status === 200) {
            toast.success(addJobApplicationData.message)
            onHide()
            dispatch({
                type: ADD_JOB_APPLICATION,
                payload: []
            })
        }
    }, [addJobApplicationData])

    useEffect(() => {
        ApiGet('user/auth/getUser')
            .then((res: any) => {
                if (res && res.data && res.data.email) {
                    setUserEmail(res.data.email)
                }
            })
    }, [])

    const handleChange = (e: any, name: string) => {
        setFormErrors({ ...formErrors, [name]: '' })
        let regex = /^[0-9\b]+$/;
        if (name === "mobileNo") {
            if (e.target.value === "" || regex.test(e.target.value)) {
                setApplyJob({ ...applyJob, [name]: e.target.value })
            }
        } else if (name === "emailId") {
            setApplyJob({ ...applyJob, [name]: e.target.value })
        } else if (name === "currently_working") {
            setApplyJob({ ...applyJob, [name]: e.target.checked })
        } else if (name === "termAndCondition") {
            setApplyJob({ ...applyJob, [name]: e.target.checked })
        } else if (name === "experience") {
            if (e.target.value && regex.test(e.target.value)) {
                setApplyJob({ ...applyJob, [name]: parseInt(e.target.value) })
            } else if (e.target.value === "") {
                setApplyJob({ ...applyJob, [name]: 0 })
            }
        } else if (name === "resume_url") {
            setApplyJob({ ...applyJob, [name]: e.target.value })
        } else if (name === "certification_url") {
            setApplyJob({ ...applyJob, [name]: e.target.value })
        }
    }

    const onFileSelecte = (e: any, name: any) => {
        let extensions = e.target.files[0]?.name?.split('.')
        if (extensions?.length > 0) {
            let extensionsValidation = ['docx', 'pdf', 'xlsx', 'jpeg', 'jpg', 'png']
            if (extensionsValidation.includes(extensions[extensions.length - 1])) {
                setApplyJob({ ...applyJob, [name]: e.target.files[0] })
                setFormErrors({ ...formErrors, [name]: "" });
            }
            else {
                setFormErrors({ ...formErrors, resume_url: 'Please select valid document file' })
                setApplyJob({ ...applyJob, [name]: "" })
            }
        }
        else {
            setFormErrors({ ...formErrors, imageUrl: 'Please select document file' })
        }
    }

    const onChnagecertificationUrl = (e: any, name: any) => {
        let extensions = e.target.files[0].name?.split('.')
        if (extensions) {
            let extensionsValidation = ['jpeg', 'jpg', 'png']
            if (extensionsValidation.includes(extensions[extensions.length - 1])) {
                setApplyJob({ ...applyJob, [name]: e.target.files[0] })
                setFormErrors({ ...formErrors, certification_url: "" });
            }
            else {
                setFormErrors({ ...formErrors, certification_url: 'Please select valid document file' })
                setApplyJob({ ...applyJob, certification_url: '' })
            }
        }
        else {
            setFormErrors({ ...formErrors, imageUrl: 'Please select document file' })
        }
    }

    const validation = () => {
        let flag = false;
        const error: any = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!applyJob.resume_url) {
            error.resume_url = "Please select resume";
            flag = true;
        }
        if (!applyJob.certification_url) {
            error.certification_url = "Please select certification";
            flag = true;
        }
        if (!applyJob.termAndCondition) {
            error.termAndCondition = "Please select term and condition";
            flag = true;
        }
        setFormErrors(error);
        return flag;
    };

    const submit = () => {
        if (validation()) {
            return
        }

        // let body = {
        //     job_id: applyJob.job_id,
        //     resume_url: applyJob.resume_url,
        //     certification_url: applyJob.certification_url,
        //     currently_working: applyJob.currently_working,
        //     experience: applyJob.experience,
        // }

        const formData = new FormData();
        formData.append('resume_url', applyJob.certification_url);
        formData.append('certification_url', applyJob.certification_url);
        formData.append('experience', applyJob.experience);
        formData.append('job_id', applyJob.job_id);
        formData.append('currently_working', applyJob.currently_working);
        formData.append('email', userEmail);

        dispatch(AddJobApplication(formData))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="p-5 apply-job-model"
        >
            <Modal.Header closeButton className='apply-job-model-header'>
                <h1>Apply for a Job</h1>
            </Modal.Header>
            <Modal.Body>
                <div className=" apply-job-model-body">
                    <div className='input-checkbox-label mt-3 mb-4'>
                        <input type="checkbox" className='me-2' onChange={(e) => handleChange(e, "currently_working")} />
                        <label htmlFor="">Currently working</label>
                    </div>
                    <div className='mt-3'>
                        <TextField type="text" label="Enter your total experience " value={applyJob.experience} onChange={(e) => handleChange(e, 'experience')} />
                    </div>
                    <Row className=''>
                        <Col xl={12}>
                            {/* <TextField type="url" className='mt-4' label="Enter Your Resume Url" value={applyJob.resume_url} onChange={(e) => handleChange(e, 'resume_url')} /> */}

                            <TextField className='mt-4' type="file" placeholder="Resume URL" name="resume_url" onChange={(e) => onFileSelecte(e, "resume_url")} label="Choose your resume" InputLabelProps={{ shrink: true }} />
                            {formErrors?.resume_url && (<label style={{ color: "red", fontSize: '13px' }}>{formErrors.resume_url}</label>)}
                        </Col>
                        <Col xl={12}>
                            {/* <TextField type="url" className='mt-4' label="Enter Your Certification Url" value={applyJob.certification_url} onChange={(e) => handleChange(e, 'certification_url')} /> */}
                            <TextField className='mt-4' type="file" placeholder="Certification URL" name="certification_url" onChange={(e) => onChnagecertificationUrl(e, "certification_url")} label='Choose your certificat' InputLabelProps={{ shrink: true }} />
                            {formErrors?.certification_url && (<label style={{ color: "red", fontSize: '13px' }}>{formErrors.certification_url}</label>)}
                        </Col>
                    </Row>
                    <div className='d-flex term-and-privacy mt-4'>
                        <input type="checkbox" onChange={(e) => handleChange(e, "termAndCondition")} />
                        <p>Upload your resume means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.</p>
                    </div>
                    {formErrors?.termAndCondition && (<label style={{ color: "red", fontSize: '13px' }}>{formErrors.termAndCondition}</label>)}
                    <div className='mt-3 text-center submit-btn-enter-detail'>
                        <button className='Continue-bnt' onClick={() => submit()}>Submit</button>
                        <p className='mt-3'>If you don’t have a resume, <span style={{ color: "red" }} className="enter-Details">click to enter Details </span></p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ApplyForAJob
