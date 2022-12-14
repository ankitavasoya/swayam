import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { forgotAction } from '../../redux/actions/loginAction'
import { RootState } from '../../redux/store'
import { FORGOT_PASSWORD } from '../../redux/type'

const ForgotPasswordSuccesModel = ({ show, onHide, forgotValue }: any) => {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [time, setTime] = useState<any>(30)

    const forgotData = useSelector((state: RootState) => state.login.forgot)

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            }
            if (time === 0) {
                clearInterval(myInterval)
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    })

    const resend = () => {
        if (forgotValue) {
            let body = {
                email: forgotValue
            }
            dispatch(forgotAction(body))
        }
    }

    useEffect(() => {
        if (forgotData && forgotData.status === 200 && forgotData.message === "Link sent successfully.") {
            toast.success(forgotData.message)
            dispatch({
                type: FORGOT_PASSWORD,
                payload: null
            })
            setTime(30)
        }
    }, [forgotData])

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="p-5 forget-pass-succes-model"
            >
                <Modal.Header closeButton className='forget-pass-succes-model-header'></Modal.Header>
                <Modal.Body>
                    <div className="mt-3 forget-pass-succes-model-body">
                        <h1>{t("ForgotPasswordSuccessModal.title")}</h1>
                        <img src="./assets/img/check.png" alt="" />
                        <h2 className="">{t("ForgotPasswordSuccessModal.description")}</h2>
                        {/* <div className={time !== 0 ? 'd-flex justify-content-center time-resend-btn-disabled' : 'd-flex justify-content-center time-resend-btn'}>
                            <p>00:{time ? time < 10 ? `0${time}` : time : '00'}</p>
                            <button disabled={time === 0 ? false : true} onClick={() => resend()}>{t("ForgotPasswordSuccessModal.resend")}</button>
                        </div> */}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ForgotPasswordSuccesModel