import { TextField } from "@mui/material";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import { IsLogin } from "../../redux/actions/isLoginAction";
import { loginAction } from "../../redux/actions/loginAction";
import { userAuthSignup } from "../../redux/actions/signupAction";
import { USER_AUTH_SIGNUP, USER_AUTH_SIGNUP_LOADING } from "../../redux/type";
import CreateAccountmodal from "./CreateAccountmodal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import ForgotPasswordSuccesModel from "./ForgotPasswordSuccesModel";

interface loginData {
    email?: string;
    password?: string;
}
interface register {
    userName: string,
    phoneNo: string,
    email: any,
    password: any,
    onHide?: ((e: any) => void) | any;
}
const RegisterYourAccount = ({ show, onHide, userType }: any) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userAuthSingupData = useSelector((state: any) => state.signupData.userAuthSingup)

    const [mobileNumber, setMobileNumber] = useState("");
    const [type, setType] = useState<string>('password')
    const [selectLoginType, setSelectLoginType] = useState("USER");
    const [termsConditions, setTermsConditions] = useState<boolean>(false);
    const [loginType, setLoginType] = useState(false);
    const [error, setError] = useState<loginData>({
        email: '',
        password: '',
    });
    const [register, setRegister] = useState<register>({
        userName: '',
        phoneNo: '',
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        userName: '',
        phoneNo: '',
        email: '',
        password: '',
        termsConditionsError: ''
    })

    const handalonChnage = (e: any, name: any) => {
        if (name === "userName" || name === "email" || name === "password") {
            setRegister({ ...register, [name]: e.target.value })
        } else if (name === "termsConditions") {
            setTermsConditions(e.target.checked)
        }
        setFormErrors({ ...formErrors, [name]: "" });
    }

    // useEffect(() => {
    //     console.log('termsConditions', termsConditions)
    // }, [termsConditions])

    const handleOnChange = (e: any, name: string) => {
        const regexphone = /^[0-9\b]+$/;
        if (name === "phoneNo") {
            if (e.target.value === '' || regexphone.test(e.target.value)) {
                setRegister({ ...register, phoneNo: e.target.value })
                setFormErrors({ ...formErrors, phoneNo: '' })
            }
        }

    }
    useEffect(() => {
        if (userType) {
            setSelectLoginType(userType.toUpperCase())
        }
    }, [userType])

    const validation = () => {
        const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        let flag = false
        const error = {
            userName: '',
            phoneNo: '',
            email: '',
            password: '',
            termsConditionsError: '',
        };
        if (!register.userName) {
            error.userName = "Please enter name"
            flag = true
        };
        if (!register.phoneNo) {
            error.phoneNo = "Please enter phone number"
            flag = true
        };

        if (register.phoneNo && register.phoneNo.length < 10) {
            error.phoneNo = "Please enter valid phone number"
            flag = true
        }

        if (!register.email) {
            error.email = "Please enter email"
            flag = true
        };

        if (register.email && !register.email.match(regexForEmail)) {
            error.email = "Please enter valid email"
            flag = true
        }
        if (!register.password) {
            error.password = "Please enter password"
            flag = true
        };
        if (!termsConditions) {
            error.termsConditionsError = "You must accept the terms and conditions"
            flag = true
        }
        setFormErrors(error)
        return flag
    }
    const createAccount = () => {
        if (validation()) {
            return
        }
        let body = {
            name: register.userName,
            email: register.email,
            password: register.password,
            phone: register.phoneNo,
            userType: selectLoginType
        }
        dispatch(userAuthSignup(body))
    }

    useEffect(() => {
        if (userAuthSingupData && userAuthSingupData.message === "User already exists") {
            // onHide('');
            dispatch({
                type: USER_AUTH_SIGNUP,
                payload: null,
            })
        } else {
            if (userAuthSingupData?.status === 200) {
                onHide('');
                let data = {
                    email: register.email,
                    password: register.password,
                    userType: selectLoginType.toUpperCase()
                }
                if (!(data.userType === "EMPLOYER" || data.userType === "PARTNER")) {
                    dispatch(loginAction(data, selectLoginType, true));
                }
                dispatch({
                    type: USER_AUTH_SIGNUP,
                    payload: null,
                })
                if (selectLoginType === "USER") {
                    navigate("/get_started")
                }
            }
        }
    }, [userAuthSingupData])

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

    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide('')}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter" setLoginType
                centered
                className="loginmodal"
            >
                {/* <Modal.Header closeButton></Modal.Header> */}
                <Modal.Body>
                    <div className="loginbody row">
                        <div className="closeButton">
                            <img src="./assets/img/wrong.png" alt="" onClick={() => { onHide('') }} />
                        </div>

                        <div className="col-lg-6">
                            <img src="./assets/img/RegisterYourAccount.png" alt="" width="100%" height="100%" />
                        </div>

                        <div className="col-lg-6 login-form ">
                            <h1>Register your account</h1>
                            <h2>Attend a Course today to Get Hired Tomorrow</h2>

                            <div className="d-flex flex-wrap confirmation-buttons">
                                <button onClick={() => setSelectLoginType("USER")} className={`mt-3 ${selectLoginType === "USER" ? "active" : "disable"}`}> <img src={`${selectLoginType === "USER" ? './assets/img/noun-job-active.png' : './assets/img/noun-job-disable.png'}`} alt="" width="24px" height="24px" /> Candidate</button>
                                <button onClick={() => setSelectLoginType("EMPLOYER")} className={`mt-3 ${selectLoginType === "EMPLOYER" ? "active" : "disable"}`}> <img src={`${selectLoginType === "EMPLOYER" ? './assets/img/noun-events-active.png' : './assets/img/noun-events-disable.png'}`} alt="" width="24px" height="24px" /> Employer</button>
                                <button onClick={() => setSelectLoginType("PARTNER")} className={`mt-3 ${selectLoginType === "PARTNER" ? "active" : "disable"}`}> <img src={`${selectLoginType === "PARTNER" ? './assets/img/noun-vacancy-active.png' : './assets/img/noun-vacancy-disable.png'}`} alt="" width="24px" height="24px" /> Partner</button>
                            </div>

                            <div className="mt-3">
                                <TextField autoComplete='off' id="outlined-danger" type="text" label="Enter Your Name" name="userName" value={register.userName} variant="outlined" onChange={(e) => handalonChnage(e, "userName")} />
                                {formErrors.userName && <span style={{ color: 'red' }}>{formErrors.userName}</span>}
                            </div>
                            <div className="mt-3">
                                <TextField
                                    autoComplete='off'
                                    className="mi-input"
                                    id="outlined-danger"
                                    type="text"
                                    name="phoneNo"
                                    value={register.phoneNo}
                                    label="Enter Your Mobile Number" variant="outlined"
                                    onChange={(e) => handleOnChange(e, "phoneNo")}
                                    inputProps={{
                                        maxLength: 10,
                                    }}
                                />
                                {formErrors.phoneNo && <span style={{ color: 'red' }}>{formErrors.phoneNo}</span>}
                            </div>
                            <div className="mt-3">
                                <TextField autoComplete='off' id="outlined-danger" type="email" label="Enter Your E-mail ID" name="email" value={register.email} variant="outlined" onChange={(e) => handalonChnage(e, "email")} />
                                {formErrors.email && <span style={{ color: 'red' }}>{formErrors.email}</span>}
                            </div>
                            <div className="mt-3  position-relative">
                                <TextField autoComplete='off' id="outlined-danger" type={type} name="password" value={register.password} label="Enter Your Passsword" variant="outlined" onChange={(e) => handalonChnage(e, "password")} />
                                {formErrors.password && <span style={{ color: 'red' }}>{formErrors.password}</span>}
                                {/* <p className="text-end mt-2" style={{ cursor: "pointer", width: "fit-content", marginLeft: "auto" }} onClick={() => onHide("ForgotPass")}>Forgot Password</p> */}
                                <img className="show-password" src={type === "password" ? './assets/img/view.png' : './assets/img/hidden.png'} onClick={() => type === "password" ? setType('text') : setType('password')} alt="" />
                            </div>
                            <div className="via-checkbox mt-4">
                                <div className="text-center">
                                    <input type="checkbox" name="selectgender" id="female" className="form-check-input" onChange={(e) => handalonChnage(e, "termsConditions")} />
                                    <label htmlFor="female" className="upload-image-resume-lable" style={{ fontWeight: '300' }}>Creating an account means you’re okay with our Terms of Service, Privacy Policy, and our default Notification Settings.</label>
                                </div>
                                {formErrors.termsConditionsError && <span style={{ color: 'red' }}>{formErrors.termsConditionsError}</span>}

                            </div>
                            <div className="text-center login-button mt-2">
                                <button onClick={() => createAccount()}>Create Account</button>
                            </div>
                            <div>
                                <p onClick={() => onHide('login')}>log in</p>
                            </div>
                            <div className="text-center mt-3">
                                <span style={{ color: '#747477', fontSize: "14px", lineHeight: '15px' }}>This site is protected by reCAPTCHA and the Swayam Connect <br />
                                    <a href="/privacypolicy" style={{ textDecoration: 'none', color: '#C90F22' }}> Policy and Terms </a> of Service apply.</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RegisterYourAccount