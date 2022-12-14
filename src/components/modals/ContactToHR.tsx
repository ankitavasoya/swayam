import { TextareaAutosize, TextField } from '@mui/material'
import { log } from 'console'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AuthStorage from '../../helper/AuthStorage'
import { getUser } from '../../redux/actions/loginAction'
import { sendMail } from '../../redux/actions/sendMailToHRAction'
import { SEND_MAIL_TO_HR } from '../../redux/type'

const ContactToHR = ({ show, onHide, getOneData }: any) => {
    const dispatch = useDispatch()
    const getUserData = useSelector((state: any) => state.login.getUserData)
    const mailData = useSelector((state: any) => state.sendMailData.sendMailToHR)

    const [error, setError] = useState<any>({})
    const [userData, setUserData] = useState<any>()
    const [hrEmail, setHrEmail] = useState<any>()
    const [input, setInput] = useState({
        name: "",
        email: "",
        contact: "",
        massage: "",
    })
    useEffect(() => {
        if (AuthStorage.getToken()) {
            dispatch(getUser())
        }
    }, [])

    useEffect(() => {
        if (getUserData && getUserData.data && getUserData.data) {
            setUserData(getUserData.data)
        }
    }, [getUserData])

    useEffect(() => {
        if (getOneData && getOneData.data) {
            setHrEmail(getOneData.data.email)
        }
    }, [getOneData])

    const handleChange = (e: any, name: any) => {
        const re = /^[0-9\b]+$/;
        if (name === "name" || name === "email" || name === "massage") {
            setInput({ ...input, [name]: e.target.value })
        }
        if (name === "contact") {
            if (e.target.value === '' || re.test(e.target.value)) {
                setInput({ ...input, [name]: e.target.value })
            }
        }
    }

    const validation = () => {
        let flag = false
        let error = {
            name: "",
            email: "",
            contact: "",
            massage: "",
        }
        if (!input.name) {
            error.name = "Enter your name"
            flag = true
        }
        if (!AuthStorage.getToken() && !input.email) {
            error.email = "Enter your email"
            flag = true
        }
        if (!AuthStorage.getToken() && !input.contact) {
            error.contact = "Enter your contact"
            flag = true
        }
        if (!AuthStorage.getToken() && input.contact && input.contact.length < 10) {
            error.contact = "Please enter valid phone number"
            flag = true
        }

        if (!input.massage) {
            error.massage = "Enter your massage"
            flag = true
        }
        setError(error)
        return flag
    }
    const submit = () => {
        if (validation()) {
            return
        }
        let body = {
            hrEmail: hrEmail,
            email: AuthStorage.getToken() ? userData.email : input.email,
            contactNo: AuthStorage.getToken() ? userData.phone : input.contact,
            name: input.name,
            message: input.massage,
        }
        dispatch(sendMail(body))
    }
    useEffect(() => {
        if (mailData && mailData.status === 200) {
            toast.success("Mail sent successfully")
            onHide()
            dispatch({
                type: SEND_MAIL_TO_HR,
                payload: [],
            })
        }
    }, [mailData])

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="p-5 apply-job-model"
        >
            <Modal.Header closeButton className='apply-job-model-header'>
                <h1>Contact to HR</h1>
            </Modal.Header>
            <Modal.Body>
                <div className=" apply-job-model-body">
                    <div className='input-checkbox-label mt-3 mb-4'>
                        <div className='mt-3'>
                            <TextField type="text" label="Enter your name" name='name' value={input.name} onChange={(e) => { handleChange(e, 'name'); setError({ ...error, name: "" }) }} />
                            {error.name && <span style={{ color: "red" }}>{error.name}</span>}
                        </div>
                        <div className='mt-3'></div>
                        {!AuthStorage.getToken() ?
                            <TextField type="email" label="Enter your email" name='email' value={input.email} onChange={(e) => { handleChange(e, 'email'); setError({ ...error, email: "" }) }} />
                            : ""}
                        {!AuthStorage.getToken() ? error.email && <span style={{ color: "red" }}>{error.email}</span> : ""}
                    </div>
                    <div className='mt-3'>
                        {!AuthStorage.getToken() && <TextField type="text" label="Enter your contact No" name='contact' value={input.contact} onChange={(e) => { handleChange(e, 'contact'), setError({ ...error, contact: "" }) }} inputProps={{ maxLength: 10 }} />}
                        {!AuthStorage.getToken() && error.contact && <span style={{ color: "red" }}>{error.contact}</span>}
                    </div>
                    <div className='mt-3'>
                        <TextareaAutosize
                            autoComplete='off'
                            minRows={3}
                            id="outlined-danger"
                            aria-label="Enter massage for hr"
                            placeholder="Enter massage for hr"
                            name='massage'
                            value={input.massage}
                            onChange={(e) => { handleChange(e, 'massage'), setError({ ...error, massage: "" }) }}
                            style={{ width: "100%" }}
                        />
                        {error.massage && <span style={{ color: "red" }}>{error.massage}</span>}
                    </div>
                </div>
                <div className='mt-3 text-center submit-btn-enter-detail'>
                    <button className='Continue-bnt' onClick={() => submit()}>Submit</button>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default ContactToHR