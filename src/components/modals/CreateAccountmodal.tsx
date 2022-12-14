import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Modal, Toast } from "react-bootstrap";
import { useSelector, useDispatch, DefaultRootState, RootStateOrAny } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { signupAction } from "../../redux/actions/signupAction";
import { RootState } from "../../redux/store";

interface signUpData {
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    userType?: string;
}

const CreateAccountmodal = ({ show, onHide }: any) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const signup = useSelector((state:RootState) => state.signupData.signUpData)

    // useEffect(()=>{
    //     if(signup && signup.status === 200){
    //         toast.success("Signup sucess");    
    //     }
    // },[signup])

    const [mobileNumber, setMobileNumber] = useState("")
    const [age, setAge] = React.useState('');
    const [error, setError] = useState<signUpData>({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
        userType: "",
    });
    const [signupData, setSignupData] = useState<signUpData>({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
        userType: "",
    })

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as string);
    // };

    const handleChange = (e: any) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value })
    }

    const validation = () => {
        let err: signUpData = {
            name: "",
            phone: "",
            email: "",
            password: "",
            confirm_password: "",
            userType: "",
        }
        let flage = false;
        if (signupData.name === '') {
            err.name = 'Name is required';
            flage = true;
        }
        if (signupData.phone === '') {
            err.phone = 'Phone is required';
            flage = true;
        }
        if (signupData.email === '') {
            err.email = 'Email is required';
            flage = true;
        }
        if (signupData.password === '') {
            err.password = 'Password is required';
            flage = true;
        }
        if (!signupData.confirm_password) {
            err.confirm_password = 'Confirm Password is required';
            flage = true;
        }
        else if (signupData.password !== signupData.confirm_password) {
            err.confirm_password = "Password is not same";
            flage = true;
        }
        if (signupData.userType === '') {
            err.userType = 'UserType is required';
            flage = true;
        }
        setError(err);
        return flage;
    };

    const onsubmit = () => {
        if (validation()) {
            return;
        }
        let data: signUpData = {
            name: signupData.name,
            email: signupData.email,
            password: signupData.password,
            phone: signupData.phone,
            userType: signupData.userType,
        }
        dispatch(signupAction(data));
        onHide()
    }

    // const onChange = (e: any) => {
    //     const re = /^[0-9\b]+$/;
    //     if (!e.target.value || e.target.value === "" || re.test(e.target.value)) {
    //         setMobileNumber(e.target.value);
    //     }
    // }

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                // visible = {createAccountmodal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="loginmodal"
            >
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body>
                    <div className="loginbody row">

                        <div className="closeButton">
                            <img src="./assets/img/wrong.png" alt="" onClick={() => { onHide(true) }} width="100%" />
                        </div>

                        <div className="col-lg-6">
                            <img src="./assets/img/createAccountmodal.png" alt="" width="100%" height="100%" />
                        </div>

                        <div className="col-lg-6 login-form ">
                            <h1>Launch your healthcare career</h1>
                            <h2>Attend an Course today to Get Hired Tomorrow</h2>

                            <div className="mt-3">
                                <TextField id="outlined-danger" type="text" name="name" onChange={(e) => { handleChange(e) }} label="Enter Your Name" variant="outlined" />
                                {error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                            </div>

                            <div className="mt-3">
                                <TextField id="outlined-danger" type="text" name="phone" label="Enter Your Mobile Number" variant="outlined" onChange={(e) => {
                                    handleChange(e)
                                }} />
                                {error && error.phone && <span style={{ color: 'red' }}>{error.phone}</span>}
                            </div>

                            <div className="mt-3">
                                <TextField id="outlined-danger" name="email" onChange={(e) => { handleChange(e) }} type="text" label="Enter Your E-mail ID" variant="outlined" />
                                {error && error.email && <span style={{ color: 'red' }}>{error.email}</span>}
                            </div>

                            <div className="mt-3">
                                <TextField id="outlined-danger" name="password" onChange={(e) => { handleChange(e) }} type="text" label="Enter Your Password" variant="outlined" />
                                {error && error.password && <span style={{ color: 'red' }}>{error.password}</span>}
                            </div>

                            <div className="mt-3">
                                <TextField id="outlined-danger" name="confirm_password" type="text" label="Confirm Your Password" onChange={(e) => { handleChange(e) }} variant="outlined" />
                                {error && error.confirm_password && <span style={{ color: 'red' }}>{error.confirm_password}</span>}

                            </div>

                            <div className="mt-3">
                                <TextField id="outlined-danger" name="userType" onChange={(e) => { handleChange(e) }} type="text" label="Enter Your Usertype" variant="outlined" />
                                {error && error.userType && <span style={{ color: 'red' }}>{error.userType}</span>}
                            </div>
                            <div className="text-center login-button">
                                <button onClick={() => onsubmit()}>Create Account</button>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateAccountmodal
