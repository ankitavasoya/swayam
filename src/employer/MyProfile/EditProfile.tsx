import React, { useEffect, useState } from 'react'
import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Button, Col, Container, Row } from 'react-bootstrap'
import UploadImageResume from '../../components/modals/UploadImageResume'
import { useDispatch, useSelector } from 'react-redux'
import { getAllState } from '../../redux/actions/stateAction'
import { ApiGet, ApiPost } from '../../helper/API/ApiData'
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
import { Body } from 'react-bootstrap/lib/Media'
import { getUser } from '../../redux/actions/loginAction'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import DeleteProfile from '../../components/modals/DeleteProfile'
import { IsProfileImage } from '../../redux/actions/isLoginAction'

const EditProfile = () => {
    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} checkedIcon={<img src='./assets/img/tick.png' />} defaultChecked={input.availableForHire} />
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

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllState())
        dispatch(getUser())
    }, [])
    const allStateData = useSelector((state: any) => state.stateData.stateData)
    const getUserData = useSelector((state: any) => state.login.getUserData)

    const [uploadImageResume, setUploadImageResume] = useState(false);
    const [uploadResume, setUploadResume] = useState(false);
    const [deleteProfile, setDeleteProfile] = useState(false);
    const [uploadPhotoResume, setUploadPhotoResume] = useState("");
    const [uploadHeader, setUploadHeader] = useState("");
    const [uploadtext, setUploadtext] = useState("");
    const [qualification, setQualification] = useState<any>([]);
    const [img, setImg] = useState<any>();
    const [error, setError] = useState<any>({});
    const [profileTog, setProfileTog] = useState<any>(false);

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
        completeCourse: '',
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
        sendEmail: true,
    });

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
            completeCourse: getUserData?.data?.completeCourse,
            enrolledCourses: getUserData?.data?.enrolledCourses,
            id: getUserData?.data?.id,
            jobApplication: getUserData?.data?.jobApplication,
            priority: getUserData?.data?.priority,
            resumeUrl: getUserData?.data?.resumeUrl,
            savedCourses: getUserData?.data?.savedCourses,
            savedJobs: getUserData?.data?.savedJobs,
            savedSchemes: getUserData?.data?.savedSchemes,
            selectedJobRole: getUserData?.data?.AAAselectedJobRoleA,
            userType: getUserData?.data?.userType,
            workExperience: getUserData?.data?.workExperience,
            isActive: true,
            isDeleted: false,
        })
        setImg(input?.avatar)
        AuthStorage.setStorageData(STORAGEKEY.profileImg, getUserData?.data?.avatar, true);
    }, [getUserData])

    const selectFile = (e: any) => {
        if (e?.target?.files && e?.target?.files[0]) {
            setImg(URL.createObjectURL(e?.target?.files[0]))
        }
    }
    useEffect(() => {
        ApiGet(`qualification/getqualifications?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
            .then((res: any) => {
                if (res && res.data) {
                    setQualification(res.data)
                }
            })
    }, [])


    const handleChange = (e: any, name: any) => {
        if (name === "availableForHire") {
            setInput({ ...input, [name]: e.target.checked })
        }
        else {
            setInput({ ...input, [name]: e.target.value })
        }
    }

    let validation = () => {
        let flag = false
        const error = {
            name: '',
            phone: '',
            email: '',
            aboutYou: '',
        }
        if (!input.name) {
            error.name = "Enter your name"
            flag = true
        }
        if (!input.phone) {
            error.phone = "Enter your phone"
            flag = true
        }
        if (!input.email) {
            error.email = "Enter your email"
            flag = true
        }
        if (input.aboutYou) {
            if (input.aboutYou?.length < 50) {
                error.aboutYou = "Review must be at least 50 characters"
                flag = true
            }
        }
        setError(error)
        return flag

    }

    const submit = () => {
        if (validation()) {
            return
        }
        let formData = new FormData();
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
        formData.append('selectedJobRole', input.selectedJobRole)
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
                if (res.status === 200) {
                    const userType = AuthStorage.getStorageData(STORAGEKEY.userType)
                    toast.success("Profile updated")
                    if (typeof input.avatar === 'object') {
                        dispatch(IsProfileImage(URL.createObjectURL(input.avatar)))
                    } else {
                        dispatch(IsProfileImage(input.avatar))
                    }
                    if (userType === "USER") {
                        navigate("/myprofile")
                    } else if (userType === "EMPLOYER") {
                        navigate("/employer/myprofile")
                    } else if (userType === "PARTNER") {
                        navigate("/partner/myprofile")
                    }
                }
            })
    }
    const handaleDelete = () => {
        setInput({ ...input, sendEmail: true })
        setDeleteProfile(true)
    }
    return (
        <>
            <div className='my_profile_main'>
                <Container>
                    <h1 className='heading-txt'>Edit profile</h1>
                    <div className='profile-view '>
                        <Row className='border-bottom mb-4'>
                            <Col lg={9}>
                                <div className="d-flex edit-profile">
                                    <div className="file-input">
                                        {img || AuthStorage.getStorageData(STORAGEKEY.profileImg) ? <>
                                            <img src={img ? img : AuthStorage.getStorageData(STORAGEKEY.profileImg)} alt="" className='selected-img' />
                                        </> :
                                            <>
                                                <img src="./assets/img/add-file.png" alt="" />
                                                <label htmlFor="myfile" className='file-input-lable'>Add Your Photo</label>
                                                <input type="file" id="myfile" name="myfile" onChange={(e) => selectFile(e)} />
                                            </>}

                                    </div>
                                    <div className='profile-detail ms-4'>
                                        <div className='switch-btn-set'>
                                            <FormControlLabel
                                                className='me-0'
                                                label="Available for hire"
                                                name="availableForHire"
                                                control={<IOSSwitch sx={{ m: 1 }} />}
                                                defaultValue={input?.availableForHire}
                                                onChange={(e: any) => handleChange(e, "availableForHire")}
                                            />
                                        </div>
                                        <h1>Upload or drag and drop jpg, gif, png up to 3MB</h1>
                                        {img || AuthStorage.getStorageData(STORAGEKEY.profileImg) ? <button className='change-photo-btn' onClick={() => { setUploadImageResume(true); setUploadHeader("Change Your Photo"); setUploadPhotoResume("Upload Photo"); setUploadtext("Upload or drag and drop jpg, gif, png up to 3MB") }} >Change Your Photo</button> : ""}
                                        <button className='' onClick={() => { setUploadResume(true); setUploadHeader("Upload Resume"); setUploadPhotoResume("Upload Resume"); setUploadtext("Upload or drag and drop PDF, Docx, up to 3MB") }} ><img src='./assets/img/Mask (1).png' />Upload Resume</button>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <div className='social-detail-main'>
                                    <div className='social-detail'>
                                        <button className='delete-btn' onClick={handaleDelete}>Delete Profile</button>
                                        <button className='ms-4'>Changes Password</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <h1 className='title mb-4'>Generals</h1>
                        <Row className='border-bottom mb-4'>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='name' id="outlined-danger" type="text" value={input.name} label="Enter Your Name" variant="outlined" onChange={(e: any) => { handleChange(e, "name"), setError({ ...error, name: '' }) }} />
                                {error?.name && <span style={{ color: "red" }}>{error.name}</span>}
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='phone' id="outlined-danger" type="text" value={input.phone} label="Enter Your Mobile Number" variant="outlined" onChange={(e: any) => { handleChange(e, "phone"), setError({ ...error, phone: '' }) }} inputProps={{ maxLength: 10 }} />
                                {error?.phone && <span style={{ color: "red" }}>{error.phone}</span>}
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='email' id="outlined-danger" type="text" value={input.email} label="Enter Your E-mail ID" variant="outlined" onChange={(e: any) => { handleChange(e, "email"), setError({ ...error, email: '' }) }} />
                                {error?.email && <span style={{ color: "red" }}>{error.email}</span>}
                            </Col>
                            <Col lg={4} className="mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Enter Your Location</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        name='location'
                                        id="demo-simple-select"
                                        value={input.location}
                                        label="Enter Your Location"
                                        onChange={(e: any) => handleChange(e, "location")}
                                    >
                                        {allStateData && allStateData.data?.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='experience' id="outlined-danger" type="text" value={input.experience} label="Enter Total Experience" variant="outlined" onChange={(e: any) => handleChange(e, "experience")} />
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='facebook' id="outlined-danger" type="text" value={input.facebook} label="Enter facebookLink" variant="outlined" onChange={(e: any) => handleChange(e, "facebook")} />
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='twitter' id="outlined-danger" type="text" value={input.twitter} label="Enter twitterLink" variant="outlined" onChange={(e: any) => handleChange(e, "twitter")} />
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='linkedIn' id="outlined-danger" type="text" value={input.linkedIn} label="Enter Your linkedInLink" variant="outlined" onChange={(e: any) => handleChange(e, "linkedIn")} />
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='instagram' id="outlined-danger" type="text" value={input.instagram} label="Enter Your instagramLink" variant="outlined" onChange={(e: any) => handleChange(e, "instagram")} />
                            </Col>
                        </Row>
                        <h1 className='title mb-4'>Generals</h1>
                        <Row className=''>
                            <Col lg={4} className="mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Enter Your Education Qualification</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={input.qualification}
                                        name="qualification"
                                        label="Enter Your Education Qualification"
                                        onChange={(e: any) => handleChange(e, "qualification")}
                                    >
                                        {qualification && qualification?.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <TextField className="mi-input" name='intrested' id="outlined-danger" type="text" value={input.intrested} label="Interested in" variant="outlined" onChange={(e: any) => handleChange(e, "intrested")} />
                            </Col>
                            <Col lg={12} className="mb-4">
                                <TextField id="outlined-multiline-static" value={input.aboutYou} label="Tell me about you" multiline name='aboutYou' rows={3} onChange={(e: any) => { handleChange(e, "aboutYou"), setError({ ...error, aboutYou: "" }) }} />
                                {error?.aboutYou && <span style={{ color: "red" }}>{error.aboutYou}</span>}

                                <div className="review_form mb-4">
                                    <p>Your review must be at least 50 characters <span>Full review guidelines</span></p>
                                </div>
                                <div className="text-end">
                                    <Button className='save-button' onClick={submit}>Save Changes</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </Container>
            </div>

            {uploadImageResume &&
                <UploadImageResume
                    show={uploadImageResume}
                    onHide={() => setUploadImageResume(false)}
                    header={uploadHeader}
                    uploadPhotoResume={uploadPhotoResume}
                    uploadtext={uploadtext}
                    setImagesData={(e: any) => { setImg(e), setImg(URL.createObjectURL(e)), setInput({ ...input, avatar: e }) }}
                    profileImage={true}
                />
            }

            {uploadResume &&
                <UploadImageResume
                    show={uploadResume}
                    onHide={() => setUploadResume(false)}
                    header={uploadHeader}
                    uploadPhotoResume={uploadPhotoResume}
                    uploadtext={uploadtext}
                    setImagesData={(e: any) => { setInput({ ...input, resumeUrl: e }) }}
                    profileImage={false}
                />
            }
            {
                deleteProfile &&
                <DeleteProfile
                    show={deleteProfile}
                    onHide={() => setDeleteProfile(false)}
                    input={input}
                />
            }


        </>

    )
}

export default EditProfile