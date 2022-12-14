import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
interface writeToUs {
    email?: string;
    name?: string;
    body?: string;
}

const WriteToUs = ({ show, onHide }: any) => {

    const dispatch = useDispatch();

    const [mobileNumber, setMobileNumber] = useState("");
    const [writeToUs, setWriteToUs] = useState<writeToUs>({
        email: '',
        name: '',
        body: '',
    })
    const [type, setType] = useState<string>('password')
    const [loginType, setLoginType] = useState(false);
    const [error, setError] = useState<writeToUs>({
        email: '',
        name: '',
        body: '',
    });

    const onChange = (e: any) => {
        const re = /^[0-9\b]+$/;
        if (!e.target.value || e.target.value === "" || re.test(e.target.value)) {
            setMobileNumber(e.target.value);
        }
    }

    const handleChange = (e: any) => {
        if (e.target.id === 'email') {
            setLoginType(true)
        } else {
            setLoginType(false)
        }
    }

    const handlechange = (e: any) => {
        setWriteToUs({ ...writeToUs, [e.target.name]: e.target.value })
    }
    const validation = () => {
        let err: writeToUs = {
            email: '',
            name: '',
            body: '',
        }
        const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        let flage = false;
        if (writeToUs.email === '') {
            err.email = 'Email is required';
            flage = true;
        }
        if (writeToUs.email && !writeToUs.email.match(regexForEmail)) {
            error.email = "Please enter a valid email address"
            flage = true;
        }
        if (writeToUs.name === '') {
            err.name = 'Name is required';
            flage = true;
        }
        if (writeToUs.body === '') {
            err.body = 'Body is required';
            flage = true;
        }

        setError(err);
        return flage;
    }

    const onSubmit = () => {
        if (validation()) {
            return
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter" setLoginType
            centered
            className="loginmodal"
        >
            {/* <Modal.Header closeButton></Modal.Header> */}
            <Modal.Body>
                <div className="loginbody row">
                    <div className="closeButton">
                        <img src="./assets/img/wrong.png" alt="" onClick={() => { onHide(true) }} />
                    </div>

                    <div className="col-lg-6">
                        <img src="./assets/img/login.png" alt="" width="100%" height="100%" />
                    </div>

                    <div className="col-lg-6 login-form ">
                        <h1>Write to us</h1>
                        <h2>Be it queries or want to know more about jobs, Courses and Partners</h2>

                        <div className="mt-4">
                            <TextField id="outlined-danger" type="name" label="Enter Your Name" name="name" value={writeToUs.name} variant="outlined" onChange={(e) => handlechange(e)} />
                            {error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
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

                        <div className="mt-4">
                            {!loginType ? <TextField className="mi-input" id="outlined-danger" type="text" value={mobileNumber} label="Enter Your Mobile Number" variant="outlined" onChange={(e) => {
                                onChange(e)
                            }} /> :
                                <TextField id="outlined-danger" type="email" label="Enter Your Email" name="email" value={writeToUs.email} variant="outlined" onChange={(e) => handlechange(e)} />}
                            {error && error.email && <span style={{ color: 'red' }}>{error.email}</span>}
                        </div>

                        <div className="mt-4 position-relative">
                            <TextField
                                id="outlined-multiline-static"
                                label="Tell me about you"
                                multiline
                                rows={3}
                                name="body"
                                value={writeToUs.body}
                                onChange={(e) => handlechange(e)}
                            />
                            {error && error.body && <span style={{ color: 'red' }}>{error.body}</span>}
                            <p className="text-end mt-2" style={{ cursor: "pointer", width: "fit-content", }}>Your review must be at least 50 characters <span style={{ fontWeight: "600", color: "#000" }}>Full review guidelines</span></p>
                        </div>
                        <div className="text-center login-button mt-5">
                            <button onClick={() => onSubmit()}>Submit</button>
                            {/* <p>Don't have an account with us? <span onClick={() => { }} > Register </span> </p> */}
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default WriteToUs