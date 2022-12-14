import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { forgotAction } from '../../redux/actions/loginAction'
import { RootState } from '../../redux/store'
import { FORGOT_PASSWORD } from '../../redux/type'
import RegisterYourAccount from './RegisterYourAccount'

const ForgotPasswordModal = ({ show, onHide, emailValue }: any) => {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [email, setEmail] = useState<any>()
    const [error, setError] = useState<String>()

    const forgotData = useSelector((state: RootState) => state.login.forgot)
    const forgotError = useSelector((state: RootState) => state.login.forgotError)


    const forgot = () => {
        const reEmail = /^\S+@\S+\.\S+$/;
        const reNumber = /^[0-9]{10}$/;
        if (!email) {
            setError("Email / Mobile number is required")
        }
        if (email) {
            if (!(reEmail.test(email) || reNumber.test(email))) {
                setError("Enter valiad email / mobile number is required")
            } else {
                let body = {
                    email: email
                }
                dispatch(forgotAction(body))

            }
        }

    }

    useEffect(() => {
        if (forgotData && forgotData.status === 200 && forgotData.message === "User not found") {
            setError("User not registered")
        }
    }, [forgotData])

    useEffect(() => {
        setError('')
    }, [show])


    useEffect(() => {
        emailValue(email)
    }, [email])

    useEffect(() => {
        if (forgotData && forgotData.status === 200 && forgotData.message !== "OTP sent successfully.") {
            show = { show }
            toast.error(forgotData.message)
        } else if (forgotData && forgotData.status === 200 && forgotData.message === "OTP sent successfully.") {
            toast.success(forgotData.message)
            dispatch({
                type: FORGOT_PASSWORD,
                payload: null
            })
            onHide('continue')
        }
    }, [forgotData])

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="p-5 forget-pass-model"
            >
                <Modal.Header closeButton className='forget-pass-model-header'></Modal.Header>
                <Modal.Body>
                    <div className="mt-3 forget-pass-model-body">
                        <h1>{t("ForgotPasswordModal.title")}</h1>
                        <p>{t("ForgotPasswordModal.subTitle")}</p>
                        <div className='d-flex position-relative email-num-input'>
                            <TextField type="text" label={t("ForgotPasswordModal.inputLabel")} value={email} onChange={(e) => { setEmail(e.target.value); setError('') }}
                            />
                        </div>
                        <div className='p-1' style={{ display: "flex" }}>
                            {error && <p style={{ color: "red", alignItems: "left" }}>{error}</p>}
                        </div>
                        <div className='d-flex justify-content-around mt-5'>

                            {/* <button className='back-btn' onClick={() => onHide()}>{t("ForgotPasswordModal.backBtn")}</button>
                           <button className='Continue-bnt' onClick={() => forgot()}>{t("ForgotPasswordModal.continueBtn")}</button>
                    </div>
                        <div className='register-text'>
                           <p>{t("ForgotPasswordModal.registerDesLabel")}<span style={{ color: "#C90F22" }} onClick={() => { onHide('register') }}> {t("ForgotPasswordModal.registerLabel")}</span></p> */}

                            <button className='back-btn' onClick={() => onHide('login')}>{t("ForgotPasswordModal.backBtn")}</button>
                            <button className='Continue-bnt' onClick={() => forgot()}>{t("ForgotPasswordModal.continueBtn")}</button>
                            {/* <button className='Continue-bnt' onClick={() => onHide('continue')}>{t("ForgotPasswordModal.continueBtn")}</button> */}
                        </div>
                        <div className='register-text'>
                            <p>{t("ForgotPasswordModal.registerDesLabel")}<span onClick={() => onHide('register')} style={{ color: "#C90F22" }}>{t("ForgotPasswordModal.registerLabel")}</span></p>
                        </div >
                    </div >
                </Modal.Body >
            </Modal >


        </>
    )
}

export default ForgotPasswordModal