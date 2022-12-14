import { Checkbox, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllState } from '../../redux/actions/stateAction';
import { getCourseCategoriesAction, otherCourse, qualification } from '../../redux/actions/courseAction';
import { getStarted } from '../../redux/actions/getStartAction';
import { getJobRoles } from '../../redux/actions/jobAction';
import { getUser } from '../../redux/actions/loginAction';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const GetStarted = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allStateData = useSelector((state: any) => state.stateData.stateData)
    const courseCategoryData = useSelector((state: any) => state.courseData.courseCategory)
    const completeCoursesData = useSelector((state: any) => state.courseData.getOtherCourseData)
    const getQualificationData = useSelector((state: any) => state.courseData.getQualificationData)
    const getJobRolesData = useSelector((state: any) => state.jobData.getJobRoles)
    const getUserData = useSelector((state: any) => state.login.getUserData)

    const [selectrole, setSelectrole] = useState<any[]>([])

    const [input, setInput] = useState<any>({
        availableForHire: true,
        name: '',
        phone: '',
        email: '',
        location: '',
        facebook: '',
        twitter: '',
        linkedIn: '',
        instagram: '',
        intrested: '',
        qualification: '',
        aboutYou: '',
        experience: '',
        avatar: '',
        certification: '',
        completeCourse: [],
        enrolledCourses: '',
        jobApplication: '',
        priority: '',
        resumeUrl: '',
        savedCourses: '',
        savedJobs: '',
        savedSchemes: '',
        selectedJobRole: '',
        userType: '',
        workExperience: '',
        isActive: true,
        isDeleted: false,
    })

    const [errors, setErrors] = useState({
        resumeUrl: '',
        availableForHire: '',
        location: '',
        qualification: '',
        completeCourse: '',
        experience: '',
        certification: '',
        workExperience: '',
    })
    const [resumeFlag, setResumeFlag] = useState()

    useEffect(() => {
        dispatch(getAllState())
        dispatch(getCourseCategoriesAction())
        dispatch(getJobRoles())
    }, [])
    useEffect(() => {
        if (AuthStorage.getStorageData(STORAGEKEY.token)) {
            dispatch(otherCourse())
            dispatch(qualification())
            dispatch(getUser())
        }
    }, [AuthStorage.getStorageData(STORAGEKEY.token)])
    useEffect(() => {
        if (getUserData && getUserData.data && getUserData.data.resumeUrl) {
            const temp = getUserData?.data?.resumeUrl.split("/")
            setResumeFlag(temp.at(-1))
        }
    }, [getUserData])


    useEffect(() => {
        setInput({
            availableForHire: getUserData?.data?.availableForHire,
            name: getUserData?.data?.name,
            phone: getUserData?.data?.phone,
            email: getUserData?.data?.email,
            location: getUserData?.data?.state,
            facebook: getUserData?.data?.facebookLink,
            twitter: getUserData?.data?.twitterLink,
            linkedIn: getUserData?.data?.linkedInLink,
            instagram: getUserData?.data?.instagramLink,
            qualification: getUserData?.data?.qualification,
            intrested: getUserData?.data?.intrested,
            aboutYou: getUserData?.data?.aboutMe,
            experience: getUserData?.data?.experience,
            avatar: getUserData?.data?.avatar,
            certification: getUserData?.data?.certification,
            completeCourse: getUserData?.data?.completeCourse === "null" || getUserData?.data?.completeCourse === null ? [] : getUserData?.data?.completeCourse.split(','),
            enrolledCourses: getUserData?.data?.enrolledCourses,
            id: getUserData?.data?.id,
            jobApplication: getUserData?.data?.jobApplication,
            priority: getUserData?.data?.priority,
            resumeUrl: getUserData?.data?.resumeUrl,
            savedCourses: getUserData?.data?.savedCourses,
            savedJobs: getUserData?.data?.savedJobs,
            savedSchemes: getUserData?.data?.savedSchemes,
            userType: getUserData?.data?.userType,
            workExperience: getUserData?.data?.workExperience,
            isActive: true,
            isDeleted: false,
        })
        setSelectrole(getUserData?.data?.selectedJobRole ? getUserData?.data?.selectedJobRole.split(",") : [])
    }, [getUserData])


    const handleChange = (e: any, name: any) => {
        if (name === "resumeUrl") {
            setInput({ ...input, [e.target.name]: e.target.checked })
        }
        if (name === "location" || name === "qualification" || name === "experience") {
            setInput({ ...input, [name]: e.target.value })
        }
        if (name === "certification" || name === "workExperience") {
            setInput({ ...input, [name]: e })
        }
        if (name === "availableForHire") {
            setInput({ ...input, [name]: e.target.checked })
        }
    }

    const clear = () => {
        setInput({
            resumeUrl: '',
            availableForHire: '',
            location: '',
            qualification: '',
            completeCourse: [],
            experience: '',
            certification: '',
            workExperience: '',
        })
    }

    const validation = () => {
        let flag = false
        const error = {
            resumeUrl: '',
            availableForHire: '',
            location: '',
            qualification: '',
            completeCourse: '',
            experience: '',
            certification: '',
            workExperience: '',
        }
        if (!input.location) {
            error.location = "Select your location"
            flag = true
        }
        if (!input.qualification) {
            error.qualification = "Select your qualification"
            flag = true
        }
        if (input.completeCourse.length < 1) {
            error.completeCourse = "Select your completeCourse"
            flag = true
        }
        if (!input.experience) {
            error.experience = "Enter your experience"
            flag = true
        }
        if (input.certification === "" && input.certification === undefined) {
            error.certification = "Select your certification"
            flag = true
        }
        if (input.workExperience === "" && input.workExperience === undefined) {
            error.workExperience = "Select your certification"
            flag = true
        }
        if (errors.resumeUrl !== "") {
            flag = true
        }
        setErrors(error)
        return flag
    }


    const resumeUpload = (e: any, name: any) => {
        if (e.target.files[0].size / 1024 > 3063) {
            setErrors({ ...errors, resumeUrl: "File size larger than 3MB" })
        } else if (e.target.files[0].size / 1024 < 3063 && e?.target?.files && e?.target?.files[0]) {
            setErrors({ ...errors, resumeUrl: "" });
            setInput({ ...input, [name]: e.target.files[0] })
            setResumeFlag(e.target.files[0].name)
        }
    }


    const selectRole = (value: any) => {
        if (selectrole.includes(value)) {
            setSelectrole(selectrole.filter((item: any) => item !== value))
        } else {
            setSelectrole([...selectrole, value])
        }
    }

    const downloadFile = (file: any) => {
        console.log('file ✨', file)
    }


    const handleChangee = (event: SelectChangeEvent<typeof input>, name: any) => {
        const {
            target: { value },
        } = event;
        setInput({
            ...input,
            completeCourse: typeof value === 'string' ? value.split(',') : value
        });
    };

    const submit = () => {
        if (!errors.resumeUrl) {
            if (validation()) {
                return
            }
            else {
                const selRole = Array.isArray(selectrole) ? selectrole.join(',') : "";
                let formData = new FormData()
                formData.append('name', input.name)
                formData.append('phone', input.phone)
                formData.append('email', input.email)
                formData.append('qualification', input.qualification)
                formData.append('avatar', input.avatar)
                formData.append('userType', input.userType)
                formData.append('priority', input.priority ? input.priority : 0)
                formData.append('resumeUrl', input.resumeUrl)
                formData.append('state', input.location)
                formData.append('availableForHire', input.availableForHire);
                formData.append('completeCourse', input.completeCourse)
                formData.append('experience', input.experience)
                formData.append('certification', input.certification)
                formData.append('workExperience', input.workExperience)
                formData.append('selectedJobRole', selRole)
                formData.append('aboutMe', input.aboutYou)
                formData.append('intrested', input.intrested)
                formData.append('facebookLink', input.facebook)
                formData.append('twitterLink', input.twitter)
                formData.append('linkedInLink', input.linkedIn)
                formData.append('instagramLink', input.instagram)
                formData.append('isActive', input.isActive);
                formData.append('isDeleted', input.isDeleted);
                ApiPost(`user/auth/editProfile?id=${input.id}`, formData)
                    .then((res: any) => {
                        if (res.status === 200 && res.message === "user updated") {
                            toast.success("Record saved")
                            navigate('/recommendation', { state: { stateId: input.location, jobRolesId: selRole, coursesCategoryId: input.completeCourse } })
                        }
                    })
            }
        }
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} checkedIcon={<img src='./assets/img/tick.png' width="12px" height="14px" />} defaultChecked={input.availableForHire} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#C90F22',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#fff',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));


    return (
        <Container>
            <div className="breadcrums blue-text">
                <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Get Started</button>
            </div>
            <div className='GetStarted_main mb-5 mt-5'>
                <h1 className='GetStarted_title'>Get Started </h1>
                <div className="GetStarted_content">
                    <div className='border-bottom'>
                        <h1>Upload Resume</h1>
                        <p>Form will be Auto-filled based on resume</p>
                        <Row>
                            <Col lg={4}>
                                <div className='Upload_Resume'>
                                    <div>
                                        <p>Upload or drag and drop PDF, Docx, up to 3MB</p>
                                    </div>
                                    <div>
                                        <label htmlFor="Upload_Resume">Upload Resume</label>
                                        <input type="file" id='Upload_Resume' name="resumeUrl" className='d-none' onChange={(e) => resumeUpload(e, "resumeUrl")} />
                                    </div>
                                    {errors?.resumeUrl && <span style={{ color: "red" }}>{errors.resumeUrl}</span>}
                                    {!errors?.resumeUrl ? resumeFlag && <span style={{ color: "green" }} onClick={() => downloadFile(resumeFlag)}>{resumeFlag}</span> : ""}
                                </div>

                            </Col>
                            <Col lg={8}>
                                <div className='switch-btn-set'>
                                    <FormControlLabel
                                        label="Available for hire"
                                        name='availableForHire'
                                        defaultValue={"false"}
                                        onChange={(e) => { handleChange(e, "availableForHire") }}
                                        control={<IOSSwitch sx={{ m: 1 }} />}
                                    />
                                </div>
                                <h2>Upload or drag and drop PDF, Word file up to 3MB</h2>
                            </Col>
                        </Row>
                    </div>
                    <div className='mt-4 border-bottom'>
                        <h1>Personal</h1>
                        <div className='mt-4'>
                            <Row>
                                <Col lg={4} md={6} className='mb-4'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Your Location</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={input.location}
                                            name="location"
                                            label="Select Your Location"
                                            onChange={(e) => { handleChange(e, "location"), setErrors({ ...errors, location: "" }) }}
                                        >
                                            {allStateData ? allStateData && allStateData.data?.map((item: any) => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            )) : ""}
                                        </Select>
                                        {errors.location && <span style={{ color: "red" }}>{errors?.location}</span>}
                                    </FormControl>
                                </Col>
                                <Col lg={4} md={6} className='mb-4'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Your Qualification</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={input.qualification}
                                            name="qualification"
                                            label="Select Your Qualification"
                                            onChange={(e) => { handleChange(e, "qualification"), setErrors({ ...errors, qualification: "" }) }}
                                        >
                                            {getQualificationData && getQualificationData.data && getQualificationData.data?.map((item: any) => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                        {errors.qualification && <span style={{ color: "red" }}>{errors?.qualification}</span>}
                                    </FormControl>
                                </Col>
                                <Col lg={4} md={6} className='mb-4'>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-checkbox-label">Select Your Complete Course</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={input.completeCourse ?? []}
                                            name="completeCourse"
                                            onChange={(e) => { handleChangee(e, "completeCourse"), setErrors({ ...errors, completeCourse: "" }) }}
                                            input={<OutlinedInput label="Select Your Complete Course" />}
                                            renderValue={(selected) => selected?.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {completeCoursesData && completeCoursesData.data?.length > 0 && completeCoursesData.data?.map((item: any) => (
                                                <MenuItem key={item.name} value={item.name}>
                                                    <div className='certification d-flex justify-content-between w-100 align-items-center'>
                                                        <ListItemText primary={item.name} />
                                                        <Form.Check
                                                            checked={input.completeCourse?.indexOf(item.name) > -1}
                                                            type="checkbox"
                                                            className='checkbox me-1'
                                                            id={"Yes"}
                                                            name="Yes_No"
                                                        />
                                                    </div>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.completeCourse && <span style={{ color: "red" }}>{errors?.completeCourse}</span>}
                                    </FormControl>
                                </Col>
                                <Col lg={4} md={6} className='mb-4'>
                                    <FormControl fullWidth>
                                        <TextField name='experience' value={input.experience} label="Experience" type="number" onChange={(e) => { handleChange(e, "experience"), setErrors({ ...errors, experience: "" }) }} InputProps={{
                                            inputProps: { min: 0 }
                                        }} />
                                    </FormControl>
                                    {errors.experience && <span style={{ color: "red" }}>{errors?.experience}</span>}
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className='mt-4 border-bottom'>
                        <Row>
                            <Col xl={4} md={8} sm={8}>
                                <h2>Do you have any degree or certification ?</h2>
                            </Col>
                            <Col xl={5} md={3} sm={3}>
                                <div className='certification d-flex'>
                                    <Form.Group className="ckeckbox-label-div d-flex">
                                        <Form.Check
                                            onChange={(e: any) => { handleChange(e.target.value, "certification"), setErrors({ ...errors, certification: "" }) }}
                                            type="radio"
                                            className='checkbox me-1'
                                            value={"true"}
                                            checked={input.certification?.toString() === "true" ? true : false}
                                            name="certification"
                                        />
                                        <label htmlFor="Yes">Yes</label>
                                    </Form.Group>
                                    <Form.Group className="ckeckbox-label-div d-flex ms-5">
                                        <Form.Check
                                            // checked="Yes"
                                            onChange={(e: any) => { handleChange(e.target.value, "certification"), setErrors({ ...errors, certification: "" }) }}
                                            type="radio"
                                            className='checkbox me-1'
                                            value={"false"}
                                            name="certification"
                                            checked={input.certification?.toString() === "false" ? true : false}
                                        // defaultChecked={!input.certification ? true : false}
                                        />
                                        <label htmlFor="No">No</label>
                                    </Form.Group>
                                    {errors.certification && <span style={{ color: "red" }}>{errors?.certification}</span>}
                                </div>
                            </Col>
                        </Row>
                        <div className='mt-3'>
                            <Row>
                                <Col xl={4} md={8} sm={8}>
                                    <h2>Work experience</h2>
                                </Col>
                                <Col xl={5} md={3} sm={3}>
                                    <div className='certification d-flex'>
                                        <Form.Group className="ckeckbox-label-div d-flex">
                                            <Form.Check
                                                // checked="Yes"
                                                onChange={(e: any) => { handleChange(e.target.value, "workExperience"), setErrors({ ...errors, workExperience: "" }) }}
                                                type="radio"
                                                className='checkbox me-1'
                                                value={"true"}
                                                checked={input.workExperience?.toString() === "true" ? true : false}
                                                name="workExperience"
                                            />
                                            <label htmlFor="healthcare_Yes">Yes</label>
                                        </Form.Group>
                                        <Form.Group className="ckeckbox-label-div d-flex ms-5">
                                            <Form.Check
                                                // checked="Yes"
                                                onChange={(e: any) => { handleChange(e.target.value, "workExperience"), setErrors({ ...errors, workExperience: "" }) }}
                                                type="radio"
                                                className='checkbox me-1'
                                                value={"false"}
                                                checked={input.workExperience?.toString() === "false" ? true : false}
                                                name="workExperience"
                                            />
                                            <label htmlFor="healthcare_No">No</label>
                                        </Form.Group>
                                        {errors.workExperience && <span style={{ color: "red" }}>{errors?.workExperience}</span>}
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    </div>
                    <div className='mt-4 select_role'>
                        <h1>Do you have any degree or certification ?   </h1>
                        <div className='select_role_content mt-3'>
                            {getJobRolesData.data && getJobRolesData.data.length > 0 ? getJobRolesData.data.map((item: any, i: number) => (
                                <Col xl={3} lg={4} md={6} sm={12} >
                                    {/* <button className={`${selectrole.includes(item.name) ? "active" : "disable"}`} onClick={() => selectRole(item.name)}> <img src={`${selectrole.includes(item.name) ? "./assets/img/Nursing.png" : "./assets/img/Nursing-red.png"}`} alt="" className='me-3' />{item.name}</button> */}
                                    <button className={`${selectrole.includes(item.name) ? "active" : "disable"}`} onClick={() => selectRole(item.name)}> <img src={item.imgUrl ? item.imgUrl : ""} alt="" width="35px" height="35px" className='me-3' />{item.name}</button>
                                </Col>
                            )
                            ) : ''}
                        </div>
                        <div className='text-center mt-5 gap-3 d-flex justify-content-center mb-3 Get_Recommendations'>
                            <button onClick={submit}>Get Recommendations</button>
                            <button onClick={() => navigate("/")}>Go to home</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default GetStarted

