import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostJobLogIn = () => {

    const navigate = useNavigate()
    const [loginType, setLoginType] = useState(false);

    const handleChange = (e: any) => {

        if (e.target.id === 'email') {
            setLoginType(true)
        } else {
            setLoginType(false)
        }
    }
    useEffect(() => {
        // toast.success("Successfully Post Job Profile Saved")
    }, [])

    const [type, setType] = useState<string>('password')
    return (
        <>
            <div className="breadcrums blue-text">
                <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Post a job</button>
            </div>
            <div style={{ paddingTop: "50px", paddingBottom: "40px" }} className="post_job_main">
                <Container>
                    <h1>Employer Registration</h1>
                    <div className='post_job_login'>
                        <Row >
                            <Col lg={6} className="border-right" style={{ padding: "0px 80px" }}>
                                <h1>I want to Login as</h1>
                                <div className="mt-4 d-flex via-checkbox">
                                    <div className="text-center">
                                        <input type="radio" name="selectgender" id="mobile" className="form-check-input" checked={!loginType ? true : false} onChange={(e) => handleChange(e)} />
                                        <label htmlFor="mobile" className="ms-2">Via Mobile</label>
                                    </div>
                                    <div className="ms-4 text-center">
                                        <input type="radio" name="selectgender" id="email" className="form-check-input" onChange={(e) => handleChange(e)} />
                                        <label htmlFor="email" className="ms-2">Via Email ID</label>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    {!loginType ? <TextField className="mi-input" id="outlined-danger" type="text" label="Enter Your Mobile Number" variant="outlined" /> :
                                        <TextField id="outlined-danger" type="email" name="email" label="Enter Your Email Id" variant="outlined" />}
                                </div>
                                <div className="mt-3 position-relative">
                                    <TextField id="outlined-danger" type={type} name="password" label="Enter Your OTP" variant="outlined" />
                                    <p className="text-end mt-2" style={{ cursor: "pointer", width: "fit-content", marginLeft: "auto" }}>Resend OTP</p>
                                    <img className="show-password" src={type === "password" ? './assets/img/view.png' : './assets/img/hidden.png'} onClick={() => type === "password" ? setType('text') : setType('password')} alt="" />
                                </div>
                                <div className="text-center login-button mt-5">
                                    <button>Login</button>
                                    <p className='mt-4'>If you are new to Swayam, Click here to <span>register</span> as an employer</p>
                                </div>
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
                    </div>
                </Container>
            </div>
        </>
    )
}

export default PostJobLogIn