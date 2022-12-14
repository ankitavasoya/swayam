import { TextField } from "@mui/material";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import STORAGEKEY from "../../config/APP/app.config";
import AuthStorage from "../../helper/AuthStorage";
import { IsLogin } from "../../redux/actions/isLoginAction";
import { loginAction } from "../../redux/actions/loginAction";
interface loginData {
  email?: string;
  password?: string;
  userType?: string
}
interface props {
  show?: boolean;
  onHide?: ((e: any) => void) | any;
  userType?: string;
  getStart?: any;
  getType?: any;
  emailValue?: ((e: any) => void) | any;
}

const Loginmodal: React.FC<props> = ({ show, onHide, userType, getStart }) => {
  // const Loginmodal = ({ show, onHide, userType, getStart }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate()

  const [mobileNumber, setMobileNumber] = useState<any>({
    phone: ""
  });
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [selectLoginType, setSelectLoginType] = useState("user");
  const [login, setLogin] = useState<loginData>({
    email: '',
    password: '',
  })
  const [type, setType] = useState<string>('password')
  const [loginType, setLoginType] = useState(false);
  const [inputType, setInputType] = useState('mobile');
  const [error, setError] = useState<loginData>({
    email: '',
    password: '',
  });

  const loginDetail = useSelector((state: any) => state.login.loginData)


  useEffect(() => {
    if (userType) {
      setSelectLoginType(userType)
    }
  }, [userType])

  const handleOnChange = (e: any, name: any) => {
    let re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMobileNumber({ ...mobileNumber, [name]: e.target.value })
      setMobileNumberError("")
    }
  }

  const handleChange = (e: any) => {
    setInputType(e.target.id)
    if (e.target.id === 'email') {
      setLoginType(true)
    } else if (e.target.id === "mobile") {
      setLoginType(false)
    }
  }

  const handlechange = (e: any, name: any) => {
    const emailRegex = RegExp(/^\S+@\S+\.\S+$/);
    // if (name === "email" && emailRegex.test(e.target.value)) {
    //   setError({ ...error, email: "Eneter valid email address" })
    // } else {

    setLogin({ ...login, [e.target.name]: e.target.value })
    // }
  }

  const validation = () => {
    let err: loginData = {
      email: "",
      password: "",
    }
    let flage = false;
    const emailRegex = RegExp(/^\S+@\S+\.\S+$/);

    if (login.password === '') {
      err.password = t("LoginModel.inputError.password");
      flage = true;
    }

    if (inputType === 'mobile') {
      if (mobileNumber.phone === "") {
        setMobileNumberError("Mobile number is required");
        flage = true;
      }
      if (mobileNumber.phone && mobileNumber.phone.length < 10) {
        setMobileNumberError("Please enter valid phone number")
        flage = true
      }
    } else if (inputType === "email") {
      if (login.email === '') {
        err.email = t("LoginModel.inputError.email");
        flage = true;
      }
      else if (!login.email?.match(emailRegex)) {
        err.email = "Enter valiad email address";
        flage = true;
      }
    }
    setError(err);
    return flage;
  }

  const onSubmit = () => {
    if (validation()) {
      return;
    }
    let data: any
    if (inputType === "email") {
      data = {
        email: login.email,
        password: login.password,
        userType: selectLoginType.toUpperCase()
      }
    } else if (inputType === "mobile") {
      data = {
        email: mobileNumber.phone,
        password: login.password,
        userType: selectLoginType.toUpperCase()
      }
    }

    dispatch(loginAction(data, selectLoginType));
    dispatch(IsLogin(true))
    onHide('');
  }


  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide('')}
        size="xl"
        // aria-labelledby="contained-modal-title-vcenter" setLoginType
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="loginmodal"
      >
        <Modal.Body>
          <div className="loginbody row">
            <div className="closeButton">
              <img src="./assets/img/wrong.png" alt="" onClick={() => { onHide(true) }} />
            </div>

            <div className="col-lg-6">
              <img src="./assets/img/login.png" alt="" width="100%" height="100%" />
            </div>

            <div className="col-lg-6 login-form ">
              <h1>{t("LoginModel.title")}</h1>
              <h2>{t("LoginModel.subTitle")}</h2>

              <div className="d-flex flex-wrap confirmation-buttons">
                <button onClick={() => setSelectLoginType("user")} className={`mt-3 ${selectLoginType === "user" ? "active" : "disable"}`}> <img src={`${selectLoginType === "user" ? './assets/img/noun-job-active.png' : './assets/img/noun-job-disable.png'}`} alt="" width="24px" height="24px" />{t("LoginModel.RoleMngBtn.candidate")}</button>
                <button onClick={() => setSelectLoginType("employer")} className={`mt-3 ${selectLoginType === "employer" ? "active" : "disable"}`}> <img src={`${selectLoginType === "employer" ? './assets/img/noun-events-active.png' : './assets/img/noun-events-disable.png'}`} alt="" width="24px" height="24px" />{t("LoginModel.RoleMngBtn.employee")}</button>
                <button onClick={() => setSelectLoginType("partner")} className={`mt-3 ${selectLoginType === "partner" ? "active" : "disable"}`}> <img src={`${selectLoginType === "partner" ? './assets/img/noun-vacancy-active.png' : './assets/img/noun-vacancy-disable.png'}`} alt="" width="24px" height="24px" />{t("LoginModel.RoleMngBtn.partner")}</button>
              </div>

              <div className="mt-4 d-flex via-checkbox">
                <div className="text-center">
                  <input type="radio" name="selectgender" id="mobile" className="form-check-input" checked={!loginType ? true : false} onChange={(e) => handleChange(e)} />
                  <label htmlFor="mobile" className="ms-2">{t("LoginModel.loginMethod.mobile")}</label>
                </div>
                <div className="ms-4 text-center">
                  <input type="radio" name="selectgender" id="email" className="form-check-input" onChange={(e) => handleChange(e)} />
                  <label htmlFor="email" className="ms-2">{t("LoginModel.loginMethod.email")}</label>
                </div>
              </div>

              <div className="mt-3">
                {!loginType ?
                  <TextField autoComplete='off' className="mi-input" id="outlined-danger" type="text" name="phone" value={mobileNumber.phone} label={t("LoginModel.inputLabel.mobile")} onChange={(e) => handleOnChange(e, "phone")} inputProps={{ maxLength: 10 }} />
                  : <TextField id="outlined-danger" type="email" label={t("LoginModel.inputLabel.email")} name="email" value={login.email} variant="outlined" onChange={(e) => handlechange(e, "email")} />}

                {!loginType ? mobileNumberError && <span style={{ color: 'red' }}>{mobileNumberError}</span> : error && error.email && <span style={{ color: 'red' }}>{error.email}</span>}

                {/* {loginType === "mobile" ?
                  <TextField autoComplete='off' className="mi-input" id="outlined-danger" type="text" name="phone" value={mobileNumber.phone} label={t("LoginModel.inputLabel.mobile")} onChange={(e) => handleOnChange(e, "phone")} inputProps={{ maxLength: 10 }} />
                  : loginType === "email" ? <TextField id="outlined-danger" type="email" label={t("LoginModel.inputLabel.email")} name="email" value={login.email} variant="outlined" onChange={(e) => handlechange(e)} /> : ""}
                {loginType === "mobile" ? mobileNumberError && <span style={{ color: 'red' }}>{mobileNumberError}</span> : loginType === "emial" ? error && error.email && <span style={{ color: 'red' }}>{error.email}</span> : ""} */}
              </div>

              <div className="mt-3 position-relative">
                <TextField id="outlined-danger" type={type} name="password" label={t("LoginModel.inputLabel.password")} variant="outlined" onChange={(e) => handlechange(e, "password")} />
                {error && error.password && <span style={{ color: 'red' }}>{error.password}</span>}

                <p className="text-end mt-2" style={{ cursor: "pointer", width: "fit-content", marginLeft: "auto" }}
                  onClick={() => onHide("ForgotPass", selectLoginType)}>{t("LoginModel.forgotPassword")}</p>
                <img className="show-password" src={type === "password" ? './assets/img/view.png' : './assets/img/hidden.png'} onClick={() => type === "password" ? setType('text') : setType('password')} alt="" />
              </div>
              <div className="text-center login-button mt-5">

                <button onClick={() => onSubmit()}>{t("LoginModel.loginBtn")}</button>
                <p>{t("LoginModel.registerDesLable")}<span onClick={() => onHide('register')} >{t("LoginModel.registerLable")}</span></p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Loginmodal;
