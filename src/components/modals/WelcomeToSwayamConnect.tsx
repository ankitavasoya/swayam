import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import convenient from "../../assets/img/noun_convenient_4230074.png";
import feedback from "../../assets/img/noun_feedback_2724559.png";
import skill from "../../assets/img/noun_skills_3378442.png";
import connect from "../../assets/img/noun_connect_4315588.png";

interface Props {
    onHide: () => void;
    show?: boolean;
}

interface loginData {
    email?: string;
    password?: string;
}

const WelcomeToSwayamConnect: React.FC<Props> = ({ show, onHide }) => {

    const [loginType, setLoginType] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const handleChange = (e: any) => {

        if (e.target.id === 'email') {
            setLoginType(true)
        } else {
            setLoginType(false)
        }
    }

    const [login, setLogin] = useState<loginData>({
        email: '',
        password: '',
    })

    const onChange = (e: any) => {
        const re = /^[0-9\b]+$/;
        if (!e.target.value || e.target.value === "" || re.test(e.target.value)) {
            setMobileNumber(e.target.value);
        }
    }

    const handlechange = (e: any) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const candidateDetail = [
        {
            img: convenient,
            txt: "Faster and effective ways to step up your career",
            width: 29.04,
            height: 28,
        },
        {
            img: connect,
            txt: "Faster and effective ways to step up your career",
            width: 30.05,
            height: 29.95,
        },
        {
            img: skill,
            txt: "Faster and effective ways to step up your career",
            width: 39.64,
            height: 26.67,
        },
        {
            img: feedback,
            txt: "Faster and effective ways to step up your career",
            width: 23.96,
            height: 27.19,
        },
    ]

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter" setLoginType
                centered
                className="loginmodal"
            >
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body>
                    <div className="loginbody row">
                        <div className="closeButton">
                            <img src="./assets/img/wrong.png" alt="" onClick={onHide} />
                        </div>

                        <div className="col-lg-4 bg-clr">
                            <div className='candidate-info'>
                                <img src="./assets/img/Logo_white.png" alt="" width="100%" height="100%" />
                                <h1 className='pt-3'>Candidate</h1>
                                <div className='candidate_detail'>
                                    {
                                        candidateDetail.map((item, i) => (
                                            <div className='d-flex mb-3 align-items-center' key={i}>
                                                <img src={item.img} alt="" style={{ width: item.width, height: item.height }} />
                                                <p>{item.txt}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 login-form ">
                            <h1>I want to Login as</h1>
                            <h2>Attend an Course today to Get Hired Tomorrow</h2>

                            <div className="d-flex flex-wrap confirmation-buttons">
                                <button className="active mt-3"> <img src="./assets/img/noun-job.png" alt="" width="24px" height="24px" /> Candidate</button>
                                <button className="disable mt-3"> <img src="./assets/img/noun-events.png" alt="" width="24px" height="24px" /> Employer</button>
                                <button className="disable mt-3"> <img src="./assets/img/noun-vacancy.png" alt="" width="24px" height="24px" /> Partner</button>
                            </div>

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
                                {!loginType ? <TextField id="outlined-danger" type="text" value={mobileNumber} label="Enter Your Mobile Number" variant="outlined" onChange={(e) => {
                                    onChange(e)
                                }} /> :
                                    <TextField id="outlined-danger" type="email" name="email" label="Enter Your Email" variant="outlined" onChange={(e) => handlechange(e)} />}
                                {/* {error && error.email && <span style={{ color: 'red' }}>{error.email}</span>} */}
                            </div>
                            <div className="mt-3">
                                <TextField id="outlined-danger" name="password" label="Enter Your PASSWORD" variant="outlined" />
                                {/* {error && error.password && <span style={{ color: 'red' }}>{error.password}</span>} */}
                                <p className="text-end mt-2">Resend OTP</p>
                            </div>
                            <div className="text-center login-button mt-5">
                                <button >Login</button>
                                <p>Don't have an account with us? <span> Register </span> </p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WelcomeToSwayamConnect