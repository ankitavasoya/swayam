import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ChangePasswordAction } from '../../redux/actions/loginAction';
import { RootState } from '../../redux/store';
import { CHANGE_PASSWORD } from '../../redux/type';

interface Props {
    onHide: () => void;
    show?: boolean;
    token?: any;
    forgotEmail?: any;
}
interface ChangeData {
    OTP: string,
    pass: string,
    conPass: string,
}

interface Password {
    OTP: string
    pass: string,
    conPass: string
}

const ChangePasswordModal: React.FC<Props> = ({ show, onHide, forgotEmail }) => {

    const dispatch = useDispatch()

    const [password, setPassword] = useState<Password>({
        OTP: '',
        pass: '',
        conPass: ''
    })

    const [passType, setpassType] = useState<any>({
        OTP: 'number',
        pass: 'password',
        conPass: 'password'
    })

    const [error, setError] = useState<any>()

    const changePasswordData = useSelector((state: RootState) => state.login.change)
    const changePasswordError = useSelector((state: RootState) => state.login.changeError)

    const handleChange = (e: any, name: any) => {
        setError({ ...error, [name]: '' })
        if (name === "pass" || name === 'conPass' || name === "OTP") {
            setPassword({ ...password, [name]: e.target.value })
        }
    }

    const validation = () => {
        let passregex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        let flag = false;
        let error: ChangeData = {
            OTP: "",
            pass: "",
            conPass: "",
        }
        if (!password.OTP) {
            error.OTP = "Please enter OTP";
            flag = true
        }
        if (!password.pass) {
            error.pass = "Please enter password";
            flag = true
        }
        else if (!passregex.test(password.pass)) {
            error.pass = "Please  valid password";
            flag = true
        }
        if (!password.conPass) {
            error.conPass = "Please enter password";
            flag = true
        }
        // else if (!passregex.test(password.conPass)) {
        //     error.conPass = "Please enter valid confirm password";
        //     flag = true
        // }
        else if (password.pass !== password.conPass) {
            error.conPass = "Please enter same password and confirm password";
            flag = true
        }
        setError(error)
        return flag
    }

    const save = () => {
        if (validation()) {
            return;
        }
        let body = {
            OTP: password.OTP,
            email: forgotEmail,
            password: password.conPass
        }
        dispatch(ChangePasswordAction(body))
    }
    useEffect(() => {
        if (changePasswordError && changePasswordError.status === 400 && changePasswordError.message === "Link Expired") {
            toast.error(changePasswordError.message)
            onHide()
        }
    }, [changePasswordError])

    useEffect(() => {
        if (changePasswordData && changePasswordData.status === 200) {
            toast.success(changePasswordData.message)
            dispatch({
                type: CHANGE_PASSWORD,
                payload: []
            })
            onHide()
        }
    }, [changePasswordData])


    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="p-5 change-pass-model"
            >
                <Modal.Header closeButton className='change-pass-model-header'>
                </Modal.Header>
                <Modal.Body>
                    <div className="forget-pass-model-body">
                        <h1>Change Password</h1>
                        <div className='d-flex position-relative email-num-input'>
                            <TextField type="text" label="Enter new OTP" value={password.OTP} onChange={(e) => handleChange(e, 'OTP')} inputProps={{ maxLength: 6 }} />
                        </div>
                        {error?.OTP && <span style={{ color: 'red' }}>{error.OTP}</span>}
                        <div className='d-flex position-relative email-num-input'>
                            <TextField type={passType.pass} label="Enter new passsword" value={password.pass} onChange={(e) => handleChange(e, 'pass')} />
                            <img src={passType.pass === 'password' ? "./assets/img/eye.png" : "./assets/img/Eyes.png"} alt="" onClick={() => setpassType({ ...passType, pass: passType.pass === "password" ? "text" : "password" })} />
                        </div>
                        {error?.pass && <span style={{ color: 'red' }}>{error.pass}</span>}
                        <div className='d-flex varifications'>
                            <img src="./assets/img/greenTick.png" alt="" />
                            <p>Minimum 8 characters</p>
                        </div>
                        <div className='d-flex varifications'>
                            <img src="./assets/img/greenTick.png" alt="" />
                            <p>1 Special Character</p>
                        </div>
                        <div className='d-flex varifications'>
                            <img src="./assets/img/greenTick.png" alt="" />
                            <p>1 Alphabet</p>
                        </div>
                        <div className='d-flex varifications'>
                            <img src="./assets/img/greenTick.png" alt="" />
                            <p>1 Number</p>
                        </div>
                        <div className='d-flex position-relative email-num-input'>
                            <TextField type={passType.conPass} label="Enter new passsword" value={password.conPass} onChange={(e) => handleChange(e, 'conPass')} />
                            <img src={passType.conPass === 'password' ? "./assets/img/eye.png" : "./assets/img/Eyes.png"} alt="" onClick={() => setpassType({ ...passType, conPass: passType.conPass === "password" ? "text" : "password" })} />
                        </div>
                        {error?.conPass && <span style={{ color: 'red' }}>{error.conPass}</span>}
                        <div className='d-flex justify-content-around mt-5'>
                            <button className='Continue-bnt' onClick={() => save()}>Save Password</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </>
    )
}

export default ChangePasswordModal