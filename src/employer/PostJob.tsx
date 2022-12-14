import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getDistrict } from '../redux/actions/districtAction'
import { addJob, getJobCategories, getJobRoles, getJobsFilterForMain, updateJob } from '../redux/actions/jobAction'
import { getAllState } from '../redux/actions/stateAction'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import STORAGEKEY from '../config/APP/app.config'
import { getActiveJobsFilterForMain } from '../redux/actions/activeJobsActions'
import { useLocation } from 'react-router-dom'
import { getJobByIdUserPanel } from '../redux/actions/userPanelAction'
import AuthStorage from '../helper/AuthStorage'
import { ADD_JOB, JOB_UPDATE_MAIN } from '../redux/type'
import { toast } from 'react-toastify'
// import uuid from 'react-uuid';

const PostJob = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    // const UserData: any = JSON.parse(AuthStorage.getItem(STORAGEKEY.userData)!);
    const UserData: any = AuthStorage.getStorageData(STORAGEKEY.userId)
    const [perPage, setPerPage] = useState(8)
    const [pageNumber, setPageNumber] = useState(1)
    const [editData, setEditData] = useState<any>({})
    useEffect(() => {
        console.log('userData', UserData)
    }, [UserData])

    const [postJob, setPostJob] = useState<any>({
        name: UserData,
        jobType: "",
        jobRole: "",
        description: "",
        priority: "",
        vacancies: "",
        reqExperience: "",
        salary: "",
        benifits: "",
        requirements: "",
        type: "",
        extraType: "",
        isActive: "",
        shifts: "",
        application_form: "",
        recommended_and_forwarded: "",
        application_process: "",
        medical_superintendent: "",
        hospital_expenses_estimation_certificate: "",
        workingHours: "",
        jobDetails: "",
        documentation: "",
        thumbnail: "",
        bannerImage: "",
        pincode: "",
        state: "",
        district: "",
        town: "",
        phone: "",
        email: "",
        startDate: "",
        endDate: "",
        key: "",
    })

    const [formErrors, setFormErrors] = useState({
        jobType: "",
        jobRole: "",
        description: "",
        vacancies: "",
        reqExperience: "",
        salary: "",
        benifits: "",
        requirements: "",
        type: "",
        extraType: "",
        isActive: "",
        shifts: "",
        application_form: "",
        recommended_and_forwarded: "",
        application_process: "",
        medical_superintendent: "",
        hospital_expenses_estimation_certificate: "",
        workingHours: "",
        jobDetails: "",
        documentation: "",
        thumbnail: "",
        bannerImage: "",
        pincode: "",
        state: "",
        district: "",
        town: "",
        phone: "",
        email: "",
        startDate: "",
        endDate: "",
    })
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const getStateData = useSelector((state: any) => state.stateData.stateData)
    const getJobRolesData = useSelector((state: any) => state.jobData.getJobRoles)
    const getDistrictData = useSelector((state: any) => state.districtData.districtData)
    const getJobsFilterForMainFalseData = useSelector((state: any) => state.activeJobsData.getJobsFilterForMainFalse)
    const inactiveJobs = useSelector((state: any) => state.jobData.getJobsFilterForMainFalse)
    const getOneDataById = useSelector((state: any) => state.userPanelData.getJobById)
    const updateJobData = useSelector((state: any) => state.jobData.updateJob)
    const addJobData = useSelector((state: any) => state.jobData.addJob)
    const jobCategories = useSelector((state: any) => state.jobData.getJobCategories)


    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const jobId = queryParams.get("id")

    useEffect(() => {
        dispatch(getAllState())
        dispatch(getJobRoles())
        dispatch(getJobCategories())
    }, [])

    useEffect(() => {
        if (updateJobData.status === 200) {
            toast.success("Job post updated")
            clear()
            dispatch({
                type: JOB_UPDATE_MAIN,
                payload: ""
            })
        }
    }, [updateJobData])

    useEffect(() => {
        if (addJobData.status === 200) {
            toast.success("Job post added")
            clear()
            dispatch({
                type: ADD_JOB,
                payload: ""
            })
        }
    }, [addJobData])

    useEffect(() => {
        dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", false, ""))
    }, [perPage, pageNumber])

    useEffect(() => {
        if (jobId) {
            dispatch(getJobByIdUserPanel(jobId))
        }
    }, [jobId])

    useEffect(() => {
        if (getOneDataById && getOneDataById.data && getOneDataById.data.data)
            setEditData(getOneDataById.data.data)
    }, [getOneDataById])

    useEffect(() => {
        if (postJob.state) {
            dispatch(getDistrict(postJob.state))
        }
    }, [postJob.state])


    useEffect(() => {
        if (jobId && editData) {
            setPostJob({
                ...postJob,
                name: UserData,
                jobType: editData.jobType?.id,
                jobRole: editData.jobRole?.id,
                description: editData.description,
                vacancies: editData.vacancies,
                priority: editData.priority,
                reqExperience: editData.reqExperience,
                salary: editData.salary,
                benifits: editData.benifits,
                requirements: editData.requirements,
                type: editData.type,
                extraType: editData.extraType,
                isActive: editData.isActive,
                shifts: editData.shifts,
                application_form: editData.application_form,
                recommended_and_forwarded: editData.recommended_and_forwarded,
                application_process: editData.application_process,
                medical_superintendent: editData.medical_superintendent,
                hospital_expenses_estimation_certificate: editData.hospital_expenses_estimation_certificate,
                jobDetails: editData.jobDetails,
                documentation: editData.documentation,
                workingHours: editData.workingHours,
                thumbnail: editData.thumbnail,
                bannerImage: editData.bannerImg,
                pincode: editData.pincode,
                state: editData.state?.id,
                district: editData?.district?.id,
                town: editData.town,
                phone: editData.phone,
                email: editData.email,
                startDate: moment(editData.startData).format('yyyy-MM-DD'),
                endDate: moment(editData.endDate).format('yyyy-MM-DD'),
            })
        }
    }, [editData]);

    const handleChange = (e: any, name: string) => {
        setFormErrors({ ...formErrors, [name]: '' })
        let re = /^[0-9\b]+$/;
        if (name === "type" || name === "salary" || name === "requirements" || name === "extraType" || name === "benifits" || name === "name" || name === "jobRole" || name === "jobType" || name === "consultant" || name === "document" || name === "documentURL" || name === "district" || name === "state" || name === "other" || name === "recruiters" || name === "email" || name === "website" || name === "logoURL" || name === "town" || name === "description" || name === "isActive" || name === "shifts" || name === "application_form" || name === "recommended_and_forwarded" || name === "application_process" || name === "medical_superintendent" || name === "hospital_expenses_estimation_certificate" || name === "priority" || name === 'workingHours' || name === "documentation" || name === 'jobDetails') {
            setPostJob({ ...postJob, [name]: e.target.value })
        } else if (name === "pincode" || name === "phone" || name === "vacancies" || name === "reqExperience") {
            if (e.target.value === "" || re.test(e.target.value)) {
                setPostJob({ ...postJob, [name]: e.target.value })
            }
        } else if (name === "startDate" || name === "endDate") {
            setPostJob({ ...postJob, [name]: e.target.value })
        }
    }
    const validation = () => {
        let phoneNumberRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
        let pincodeRegex = /^[1-9][0-9]{5}$/
        let flag = false
        const error = {
            jobType: "",
            jobRole: "",
            description: "",
            vacancies: "",
            reqExperience: "",
            salary: "",
            benifits: "",
            requirements: "",
            type: "",
            extraType: "",
            isActive: "",
            shifts: "",
            application_form: "",
            recommended_and_forwarded: "",
            application_process: "",
            medical_superintendent: "",
            hospital_expenses_estimation_certificate: "",
            workingHours: "",
            jobDetails: "",
            documentation: "",
            thumbnail: "",
            bannerImage: "",
            pincode: "",
            state: "",
            district: "",
            town: "",
            phone: "",
            email: "",
            startDate: "",
            endDate: "",
        };
        if (!postJob.jobType) {
            error.jobType = "Please select Job type"
            flag = true
        }
        if (!postJob.jobRole) {
            error.jobRole = "Please select Job role"
            flag = true
        }
        if (!postJob.description) {
            error.description = "Please enter description"
            flag = true
        }
        if (!postJob.vacancies) {
            error.vacancies = "Please enter vacancies"
            flag = true
        }
        if (!postJob.reqExperience) {
            error.reqExperience = "Please enter required experience"
            flag = true
        }
        if (!postJob.salary) {
            error.salary = "Please enter salary"
            flag = true
        }
        if (!postJob.benifits) {
            error.benifits = "Please enter benefits"
            flag = true
        }
        // if (!postJob.requirements) {
        //     error.requirements = "Please enter requirements"
        //     flag = true
        // }
        if (!postJob.type) {
            error.type = "Please select type"
            flag = true
        }
        if (!postJob.extraType) {
            error.extraType = "Please select extra type"
            flag = true
        }
        if (postJob.isActive === "") {
            error.isActive = "Please select isactive"
            flag = true
        }
        if (!postJob.shifts) {
            error.shifts = "Please select shifts"
            flag = true
        }
        if (!postJob.application_form) {
            error.application_form = "Enter application form"
            flag = true
        }
        // if (!postJob.recommended_and_forwarded) {
        //     error.recommended_and_forwarded = "Enter recommended and forwarded"
        //     flag = true
        // }
        if (!postJob.application_process) {
            error.application_process = "Enter application process"
            flag = true
        }
        // if (!postJob.medical_superintendent) {
        //     error.medical_superintendent = "Enter medical superintendent"
        //     flag = true
        // }
        // if (!postJob.hospital_expenses_estimation_certificate) {
        //     error.hospital_expenses_estimation_certificate = "Enter hospital expenses estimation certificate"
        //     flag = true
        // }
        if (!postJob.thumbnail) {
            error.thumbnail = "Select thumbnail"
            flag = true
        }
        if (!postJob.bannerImage) {
            error.bannerImage = "Select bannerImage"
            flag = true
        }
        // if (!postJob.jobDetails) {
        //     error.jobDetails = "Enter jobDetails"
        //     flag = true
        // }
        if (!postJob.documentation) {
            error.documentation = "Enter documentation"
            flag = true
        }
        if (!postJob.pincode) {
            error.pincode = "Please enter pincode"
            flag = true
        } else if (postJob.pincode && !pincodeRegex.test(postJob.pincode)) {
            error.pincode = "Please enter valiad pincode"
            flag = true
        }
        if (!postJob.state) {
            error.state = "Please select state"
            flag = true
        }
        if (!postJob.district) {
            error.district = "Please select city"
            flag = true
        }
        if (!postJob.town) {
            error.town = "Please enter town"
            flag = true
        }
        if (!postJob.phone) {
            error.phone = "Please enter mobile no"
            flag = true
        } else if (postJob.phone && !phoneNumberRegex.test(postJob.phone)) {
            error.phone = "Please enter valiad mobile no"
            flag = true
        }
        if (!postJob.email) {
            error.email = "Please enter email"
            flag = true
        } else if (postJob.email && !regex.test(postJob.email)) {
            error.email = "Please enter valid email"
            flag = true
        }
        if (!postJob.startDate) {
            error.startDate = "Please select start date"
            flag = true
        }
        if (!postJob.endDate) {
            error.endDate = "Please select end date"
            flag = true
        }
        setFormErrors(error);
        return flag
    }

    const fileUpload = (e: any, name: any) => {
        let firsttemp = e.target.files[0]?.name?.split('.');
        if (firsttemp) {
            let fileexten = ['jpeg', 'jpg', 'png']
            if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
                setPostJob({ ...postJob, [name]: e.target.files[0] })
                setFormErrors({ ...formErrors, [name]: "" });
            }
            else {
                setFormErrors({ ...formErrors, [name]: 'Please select valid document file' })
            }
        }
        else {
            setFormErrors({ ...formErrors, [name]: 'Please select document file' })
        }
    }

    const clear = () => {
        setPostJob({
            ...postJob,
            name: "",
            jobType: "",
            jobRole: "",
            description: "",
            vacancies: "",
            reqExperience: "",
            salary: "",
            benifits: "",
            requirements: "",
            type: "",
            extraType: "",
            shifts: "",
            application_form: "",
            recommended_and_forwarded: "",
            application_process: "",
            medical_superintendent: "",
            hospital_expenses_estimation_certificate: "",
            priority: "",
            jobDetails: "",
            documentation: "",
            workingHours: "",
            isActive: "",
            thumbnail: "",
            bannerImage: "",
            pincode: "",
            state: "",
            district: "",
            town: "",
            phone: "",
            email: "",
            startDate: "",
            endDate: "",
        })
    }

    const save = () => {
        if (validation()) {
            return
        }
        let formData = new FormData();
        formData.append('name', postJob.name,)
        formData.append('state', postJob.state)
        formData.append('district', postJob.district,)
        formData.append('town', postJob.town,)
        formData.append('pincode', postJob.pincode,)
        formData.append('description', postJob.description,)
        formData.append('vacancies', postJob.vacancies)
        formData.append('reqExperience', postJob.reqExperience,)
        formData.append('salary', postJob.salary,)
        formData.append('benifits', postJob.benifits.toString('html'),)
        formData.append('requirements', postJob.requirements,)
        formData.append('type', postJob.type,)
        formData.append('extraType', postJob.extraType,)
        formData.append('isActive', postJob.isActive)
        formData.append('shifts', postJob.shifts,)
        formData.append('email', postJob.email,)
        formData.append('phone', postJob.phone,)
        formData.append('startDate', moment.utc(postJob.startDate).format(),)
        formData.append('endDate', moment.utc(postJob.endDate).format(),)
        formData.append('jobRole', postJob.jobRole,)
        formData.append('jobType', postJob.jobType,)
        formData.append('application_form', postJob.application_form,)
        formData.append('application_process', postJob.application_process,)
        formData.append('priority', postJob.priority ? postJob.priority : 0,)
        formData.append('thumbnail', postJob.thumbnail,)
        formData.append('bannerImg', postJob.bannerImage)
        formData.append('workingHours', postJob.workingHours,)
        formData.append('documentation', postJob.documentation.toString('html'),)
        formData.append('jobDetails', postJob.jobDetails,)

        if (jobId) {
            dispatch(updateJob(jobId, formData))
        } else {
            // formData.append('key', uuid());
            dispatch(addJob(formData));
        }
    }


    return (
        <div className='my_profile_main'>
            <Container fluid>
                <h1 className='heading-txt m-0'>{t("Employee.JobPost.title")}</h1>
                <div className='addtrainingpartner_main'>
                    <h1 className='heading-txt m-0'>{t("Employee.JobPost.generalinfo.title")}</h1>
                    <div className='General_Info'>
                        <Row>
                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.generalinfo.jobType")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.jobType}
                                        name="jobtype"
                                        label={t("Employee.JobPost.generalinfo.jobType")}
                                        onChange={(e) => handleChange(e, "jobType")}
                                    >
                                        {
                                            jobCategories && jobCategories.data && getJobRolesData.data?.length > 0 ?
                                                jobCategories.data.map((ele: any, i: number) => <MenuItem key={i} value={ele.id}>{ele.name}</MenuItem>) : ""
                                        }

                                    </Select>
                                </FormControl>
                                {formErrors?.jobType && <span style={{ color: "red" }}>{formErrors.jobType}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.generalinfo.jobRole")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.jobRole}
                                        name="jobRole"
                                        label={t("Employee.JobPost.generalinfo.jobRole")}
                                        onChange={(e) => handleChange(e, "jobRole")}
                                    >
                                        {
                                            getJobRolesData && getJobRolesData.data && getJobRolesData.data.length > 0 ?
                                                getJobRolesData.data.map((ele: any, i: number) => <MenuItem key={i} value={ele?.id}>{ele?.name}</MenuItem>) : ""
                                        }

                                    </Select>
                                </FormControl>
                                {formErrors?.jobRole && <span style={{ color: "red" }}>{formErrors.jobRole}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="priority" name='priority' type="number" value={postJob.priority} label={t("Employee.JobPost.generalinfo.DisplayOrder")} variant="outlined" onChange={(e) => handleChange(e, "priority")} />
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="description" name='description' value={postJob.description} type="text" label={t("Employee.JobPost.generalinfo.description")} variant="outlined" onChange={(e) => handleChange(e, "description")} />
                                {formErrors?.description && <span style={{ color: "red" }}>{formErrors.description}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="vacancies" name='vacancies' value={postJob.vacancies} type="number" label={t("Employee.JobPost.generalinfo.vacancies")} variant="outlined" onChange={(e) => handleChange(e, "vacancies")} />
                                {formErrors?.vacancies && <span style={{ color: "red" }}>{formErrors.vacancies}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="reqExperience" name='reqExperience' value={postJob.reqExperience} type="text" label={t("Employee.JobPost.generalinfo.requireExperience")} variant="outlined" onChange={(e) => handleChange(e, "reqExperience")} />
                                {formErrors?.reqExperience && <span style={{ color: "red" }}>{formErrors.reqExperience}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="salary" name='salary' type="number" value={postJob.salary} label={t("Employee.JobPost.generalinfo.salary")} variant="outlined" onChange={(e) => handleChange(e, "salary")} />
                                {formErrors?.salary && <span style={{ color: "red" }}>{formErrors.salary}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="benifits" name='benifits' value={postJob.benifits} type="text" label={t("Employee.JobPost.generalinfo.benifits")} variant="outlined" onChange={(e) => handleChange(e, "benifits")} />
                                {formErrors?.benifits && <span style={{ color: "red" }}>{formErrors.benifits}</span>}
                            </Col>

                            {/* <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="requirements" name='requirements' value={postJob.requirements} type="number" label={t("Employee.JobPost.generalinfo.requirements")} variant="outlined" onChange={(e) => handleChange(e, "requirements")} />
                                {formErrors?.requirements && <span style={{ color: "red" }}>{formErrors.requirements}</span>}
                            </Col> */}
                            <Col xl={3} lg={4} md={6} className="mt-3">
                                {/* <TextField id="type" name='type' value={postJob.type} type="text" label={t("Employee.JobPost.generalinfo.type")} variant="outlined" onChange={(e) => handleChange(e, "type")} /> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.generalinfo.type")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.type}
                                        name="type"
                                        label={t("Employee.JobPost.generalinfo.type")}
                                        onChange={(e) => handleChange(e, "type")}
                                    >
                                        <MenuItem value="PARTTIME">Part-time</MenuItem>
                                        <MenuItem value="FULLTIME">Full-time</MenuItem>
                                    </Select>
                                </FormControl>
                                {formErrors?.type && <span style={{ color: "red" }}>{formErrors.type}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                {/* <TextField id="extraType" name='extraType' value={postJob.extraType} type="text" label={t("Employee.JobPost.generalinfo.extraType")} variant="outlined" onChange={(e) => handleChange(e, "extraType")} /> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.generalinfo.extraType")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.extraType}
                                        name="extraType"
                                        label={t("Employee.JobPost.generalinfo.extraType")}
                                        onChange={(e) => handleChange(e, "extraType")}
                                    >
                                        <MenuItem value="CONTRACTUAL">Contractual</MenuItem>
                                        <MenuItem value="ONROLL">Onroll</MenuItem>
                                    </Select>
                                    {formErrors?.type && <span style={{ color: "red" }}>{formErrors.type}</span>}
                                </FormControl>
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.generalinfo.isActive")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.isActive}
                                        name="isActive"
                                        label={t("Employee.JobPost.generalinfo.isActive")}
                                        onChange={(e) => handleChange(e, "isActive")}
                                    >
                                        <MenuItem value="true">Active</MenuItem>
                                        <MenuItem value="false">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                                {formErrors?.isActive && <span style={{ color: "red" }}>{formErrors.isActive}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.generalinfo.shifts")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.shifts}
                                        name="shifts"
                                        label={t("Employee.JobPost.generalinfo.shifts")}
                                        onChange={(e) => handleChange(e, "shifts")}
                                    >
                                        <MenuItem value="DAY">Day</MenuItem>
                                        <MenuItem value="NIGHT">Night</MenuItem>
                                    </Select>
                                </FormControl>
                                {formErrors?.shifts && <span style={{ color: "red" }}>{formErrors.shifts}</span>}
                            </Col>
                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="application_form" name='application_form' value={postJob.application_form} type="text" label="Application  form" variant="outlined" onChange={(e) => handleChange(e, "application_form")} />
                                {formErrors?.application_form && <span style={{ color: "red" }}>{formErrors.application_form}</span>}
                            </Col>
                            {/* <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="recommended_and_forwarded" name='recommended_and_forwarded' value={postJob.recommended_and_forwarded} type="text" label="Recommended and forwarded" variant="outlined" onChange={(e) => handleChange(e, "recommended_and_forwarded")} />
                                {formErrors?.recommended_and_forwarded && <span style={{ color: "red" }}>{formErrors.recommended_and_forwarded}</span>}
                            </Col> */}
                            <Col xl={3} lg={4} md={6} className="mt-3" >
                                <TextField id="application_process" name='application_process' value={postJob.application_process} type="text" label="Application process" variant="outlined" onChange={(e) => handleChange(e, "application_process")} />
                                {formErrors?.application_process && <span style={{ color: "red" }}>{formErrors.application_process}</span>}
                            </Col>
                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="workingHours" name='workingHours' value={postJob.workingHours} type="number" label="Working Hours" variant="outlined" onChange={(e) => handleChange(e, "workingHours")} />
                                {formErrors?.workingHours && <span style={{ color: "red" }}>{formErrors.workingHours}</span>}
                            </Col>
                            {/* <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="jobDetails" name='jobDetails' value={postJob.jobDetails} type="text" label="jobDetails" variant="outlined" onChange={(e) => handleChange(e, "jobDetails")} />
                                {formErrors?.jobDetails && <span style={{ color: "red" }}>{formErrors.jobDetails}</span>}
                            </Col> */}
                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="documentation" name='documentation' value={postJob.documentation} type="text" label="Documentation" variant="outlined" onChange={(e) => handleChange(e, "documentation")} />
                                {formErrors?.documentation && <span style={{ color: "red" }}>{formErrors.documentation}</span>}
                            </Col>
                            {/* <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="medical_superintendent" name='medical_superintendent' value={postJob.medical_superintendent} type="text" label="Medical superintendent" variant="outlined" onChange={(e) => handleChange(e, "medical_superintendent")} />
                                {formErrors?.medical_superintendent && <span style={{ color: "red" }}>{formErrors.medical_superintendent}</span>}
                            </Col> */}
                            {/* <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="hospital_expenses_estimation_certificate" name='hospital_expenses_estimation_certificate' value={postJob.hospital_expenses_estimation_certificate} type="text" label="Hospital expenses estimation certificate" variant="outlined" onChange={(e) => handleChange(e, "hospital_expenses_estimation_certificate")} />
                                {formErrors?.hospital_expenses_estimation_certificate && <span style={{ color: "red" }}>{formErrors.hospital_expenses_estimation_certificate}</span>}
                            </Col> */}
                            <Col xl={3} lg={4} md={6} className="mt-3 file">
                                <TextField id="thumbnail" name='thumbnail' type="file" label="Choose a thumbnail"
                                    variant="outlined" onChange={(e) => fileUpload(e, "thumbnail")} InputLabelProps={{ shrink: true }} />
                                {formErrors?.thumbnail && <span style={{ color: "red" }}>{formErrors.thumbnail}</span>}
                            </Col>
                            <Col xl={3} lg={4} md={6} className="mt-3 file">
                                <TextField id="bannerImage" name='bannerImage' type="file" label="Choose a bannerImage"
                                    variant="outlined" onChange={(e) => fileUpload(e, "bannerImage")} focused />
                                {formErrors?.bannerImage && <span style={{ color: "red" }}>{formErrors.bannerImage}</span>}
                            </Col>

                        </Row>
                    </div>
                    <div className='mt-4 General_Info'>
                        <h1 className='heading-txt  mb-0'>{t("Employee.JobPost.location.title")}</h1>
                        <Row>
                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="pincode" name='pincode' value={postJob.pincode} inputProps={{ maxLength: 6 }} type="text" label="Pincode" variant="outlined" onChange={(e) => handleChange(e, "pincode")} />
                                {formErrors?.pincode && <span style={{ color: "red" }}>{formErrors.pincode}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.location.state")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.state}
                                        name="state"
                                        label={t("Employee.JobPost.location.state")}
                                        onChange={(e) => handleChange(e, "state")}
                                    >
                                        {
                                            getStateData && getStateData.data && getStateData.data.length > 0 ?
                                                getStateData.data.map((ele: any, i: number) => <MenuItem key={i} value={ele.id}>{ele.name}</MenuItem>)
                                                : ''
                                        }
                                    </Select>
                                </FormControl>
                                {formErrors?.state && <span style={{ color: "red" }}>{formErrors.state}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobPost.location.city")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postJob.district}
                                        name="city"
                                        label={t("Employee.JobPost.location.city")}
                                        onChange={(e) => handleChange(e, "district")}
                                    >
                                        {
                                            getDistrictData && getDistrictData.data &&
                                            getDistrictData.data.map((ele: any, i: number) => <MenuItem key={i} value={ele.id}>{ele.name}</MenuItem>)

                                        }
                                    </Select>
                                </FormControl>
                                {formErrors?.district && <span style={{ color: "red" }}>{formErrors.district}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="town" name='town' value={postJob.town} type="text" label={t("Employee.JobPost.location.town")} variant="outlined" onChange={(e) => handleChange(e, "town")} />
                                {formErrors?.town && <span style={{ color: "red" }}>{formErrors.town}</span>}
                            </Col>
                        </Row>
                    </div>
                    <div className='mt-4'>
                        <h1 className='heading-txt mb-0'>{t("Employee.JobPost.recruiterDetails.title")}</h1>
                        <Row>
                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="phone" name='phone' value={postJob.phone} inputProps={{ maxLength: 10 }} type="text" label={t("Employee.JobPost.recruiterDetails.phone")} variant="outlined" onChange={(e) => handleChange(e, "phone")} />
                                {formErrors?.phone && <span style={{ color: "red" }}>{formErrors.phone}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                <TextField id="email" name='email' value={postJob.email} type="text" label={t("Employee.JobPost.recruiterDetails.email")} variant="outlined" onChange={(e) => handleChange(e, "email")} />
                                {formErrors?.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                {/* <TextField id="startDate" name='startDate' value={postJob.startDate} type="date" label={t("Employee.JobPost.recruiterDetails.startData")} variant="outlined" onChange={(e) => handleChange(e, "startDate")} /> */}
                                <TextField id="startDate" InputLabelProps={{
                                    shrink: true,
                                }} name='startDate' value={postJob.startDate} type="date" label={t("Employee.JobPost.recruiterDetails.startData")} variant="outlined" onChange={(e) => handleChange(e, "startDate")} />
                                {formErrors?.startDate && <span style={{ color: "red" }}>{formErrors.startDate}</span>}
                            </Col>

                            <Col xl={3} lg={4} md={6} className="mt-3">
                                {/* <TextField id="endDate" name='endDate' value={postJob.endDate} type="date" label={t("Employee.JobPost.recruiterDetails.endDate")} variant="outlined" onChange={(e) => handleChange(e, "endDate")} /> */}
                                <TextField id="endDate" InputLabelProps={{
                                    shrink: true,
                                }} name='endDate' value={postJob.endDate} type="date" label={t("Employee.JobPost.recruiterDetails.endDate")} variant="outlined" onChange={(e) => handleChange(e, "endDate")} />
                                {formErrors?.endDate && <span style={{ color: "red" }}>{formErrors.endDate}</span>}
                            </Col >
                        </Row >
                    </div >
                    <div className='Save_Changes_btn'>
                        <button onClick={() => save()}>{t("Employee.JobPost.btn.saveChanges")}</button>
                    </div>
                </div >
            </Container >
        </div >

    )
}

export default PostJob