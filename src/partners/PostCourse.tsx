import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import React, { Component, FC, ReactElement, useEffect, useState } from 'react'
import { Col, Container, FormLabel, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrict } from '../redux/actions/districtAction';
import { getJobCategories, getJobRoles } from '../redux/actions/jobAction';
import { getAllState } from '../redux/actions/stateAction';
import { v1 as uuidv1 } from 'uuid';
import { addPartnerCourse, editPartnerCourse, getCourseCategoriesAction, getSingleCourseById } from '../redux/actions/courseAction';
import { toast } from 'react-toastify';
import { ADD_PARTNER_COURSE, EDIT_PARTNER_COURSE } from '../redux/type';
import TimePicker from '../components/timePicker/TimePicker';
import { useNavigate } from 'react-router';

function PostCourse(): ReactElement<any | null, any> {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    const navigate = useNavigate();

    const [postCourse, setpostCourse] = useState<any>({
        name: "",
        categoryId: "",
        duration: "",
        certificationBody: "",
        thumbnail: "",
        mode: "",
        certification: "",
        application_form: "",
        recommended_and_forwarded: "",
        application_process: "",
        medical_superintendent: "",
        hospital_expenses_estimation_certificate: "",
        detail: "",
        organization: "",
        state: "",
        district: "",
        location: "",
        pincode: "",
        contactPersonPhone: "",
        contactPersonEmail: "",
        contactPersonName: "",
        component: "",
        eligibility: "",
    })

    const [formErrors, setFormErrors] = useState<any>({
        name: "",
        categoryId: "",
        duration: "",
        certificationBody: "",
        thumbnail: "",
        mode: "",
        certification: "",
        application_form: "",
        recommended_and_forwarded: "",
        application_process: "",
        medical_superintendent: "",
        hospital_expenses_estimation_certificate: "",
        detail: "",
        organization: "",
        state: "",
        district: "",
        location: "",
        pincode: "",
        contactPersonPhone: "",
        contactPersonEmail: "",
        contactPersonName: "",
        component: "",
        eligibility: "",

    })

    const courseCategoryData = useSelector((state: any) => state.courseData.courseCategory)
    const courseDataById = useSelector((state: any) => state.courseData.course)
    const addPartnerCourseData = useSelector((state: any) => state.courseData.addPartnerCourseData)
    const editPartnerCourseData = useSelector((state: any) => state.courseData.editPartnerCourseData)
    const getStateData = useSelector((state: any) => state.stateData.stateData)
    const getDistrictData = useSelector((state: any) => state.districtData.districtData)

    useEffect(() => {
        if (courseDataById && courseDataById.data && courseDataById.data.data && id) {
            setpostCourse({
                ...postCourse,

                name: courseDataById.data.data.name,
                categoryId: courseDataById.data.data.courseCategory.id,
                duration: courseDataById.data.data.duration,
                thumbnail: courseDataById.data.data.thumbnail,
                mode: courseDataById.data.data.mode,
                certification: courseDataById.data.data.certificate,
                application_form: courseDataById.data.data.application_form,
                recommended_and_forwarded: courseDataById.data.data.recommended_and_forwarded,
                application_process: courseDataById.data.data.application_process,
                medical_superintendent: courseDataById.data.data.medical_superintendent,
                hospital_expenses_estimation_certificate: courseDataById.data.data.hospital_expenses_estimation_certificate,
                detail: courseDataById.data.data.detail,
                organization: courseDataById.data.data.organization,
                certificationBody: courseDataById.data.data.certificationBody,
                eligibility: courseDataById.data.data.eligibility,
                state: courseDataById.data.data.state,
                district: courseDataById.data.data.district,
                location: courseDataById.data.data.location,
                pincode: courseDataById.data.data.pincode,
                contactPersonPhone: courseDataById.data.data.contactPersonPhone,
                contactPersonEmail: courseDataById.data.data.contactPersonEmail,
                contactPersonName: courseDataById.data.data.contactPersonName,
                component: courseDataById.data.data.component,
            })
        }
    }, [courseDataById])

    useEffect(() => {
        dispatch(getAllState())
        dispatch(getJobRoles())
        dispatch(getCourseCategoriesAction())
        dispatch(getJobCategories())
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(getSingleCourseById(id))
        }
    }, [])

    useEffect(() => {
        if (postCourse.state) {
            dispatch(getDistrict(postCourse.state))
        }
    }, [postCourse.state])

    useEffect(() => {
        if (addPartnerCourseData?.status === 200) {
            toast.success("Course added")
        }
        dispatch({
            type: ADD_PARTNER_COURSE,
            payload: null,
        })
    }, [addPartnerCourseData])

    useEffect(() => {
        if (editPartnerCourseData?.status === 200) {
            if (type === 'active') {
                navigate('/partner/activecourses')
            } else if (type === 'inactive') {
                navigate('/partner/inactivecourses')
            }
            // toast.success("Course updated")
        }

        dispatch({
            type: EDIT_PARTNER_COURSE,
            payload: null,
        })
    }, [editPartnerCourseData])

    const handleChange = (e: any, name: string) => {
        setFormErrors({ ...formErrors, [name]: '' })
        if (name === "name" || name === "categoryId" || name === "duration" || name === "certificationBody" || name === "thumbnail" || name === "mode" || name === "certification" || name === "application_form" || name === "recommended_and_forwarded" || name === "application_process" || name === "medical_superintendent" || name === "hospital_expenses_estimation_certificate" || name === "detail" || name === "state" || name === "district" || name === "location" || name === "contactPersonName" || name === "component" || name === "eligibility" || name === "contactPersonEmail" || name === "organization") {
            setpostCourse({ ...postCourse, [name]: e.target.value })
        }
    }

    const handleChangeDuration = (e: any, name: string) => {
        setpostCourse({ ...postCourse, [name]: e })
    }

    const onChangeValue = (e: any, name: string) => {
        const regexphone = /^[0-9\b]+$/;
        const regexpincode = /^[0-9]*$/;

        if (name === "contactPersonPhone") {
            if (e.target.value === '' || regexphone.test(e.target.value)) {
                setpostCourse({ ...postCourse, contactPersonPhone: e.target.value })
                setFormErrors({ ...formErrors, contactPersonPhone: '' })
            }
        }
        if (name === "pincode") {
            if (e.target.value === '' || regexpincode.test(e.target.value)) {
                setpostCourse({ ...postCourse, pincode: e.target.value })
                setFormErrors({ ...formErrors, pincode: '' })
            }
        }
    }

    const fileUpload = (e: any, name: any) => {
        let firsttemp = e.target.files[0]?.name?.split('.');

        if (firsttemp) {
            let fileexten = ['jpeg', 'jpg', 'png']
            if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
                setpostCourse({ ...postCourse, [name]: e.target.files[0] })
                setFormErrors({ ...formErrors, thumbnail: "" });
            }
            else {
                setFormErrors({ ...formErrors, thumbnail: 'Please select valid document file' })
                setpostCourse({ ...postCourse, thumbnail: '' })
            }
        }
        else {
            setFormErrors({ ...formErrors, thumbnail: 'Please select document file' })
        }
    }

    const validation = () => {
        let flag = false
        const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const error = {
            name: "",
            categoryId: "",
            duration: "",
            certificationBody: "",
            thumbnail: "",
            mode: "",
            certification: "",
            application_form: "",
            recommended_and_forwarded: "",
            application_process: "",
            medical_superintendent: "",
            hospital_expenses_estimation_certificate: "",
            detail: "",
            organization: "",
            state: "",
            district: "",
            location: "",
            pincode: "",
            contactPersonPhone: "",
            contactPersonEmail: "",
            contactPersonName: "",
            component: "",
            eligibility: "",
        };
        if (!postCourse.name) {
            error.name = "Enter course"
            flag = true
        }
        if (!postCourse.categoryId) {
            error.categoryId = "Select category"
            flag = true
        }
        if (!postCourse.duration) {
            error.duration = "Enter course duration"
            flag = true
        }
        if (!postCourse.certificationBody) {
            error.certificationBody = "Enter certification body"
            flag = true
        }
        if (!postCourse.thumbnail) {
            error.thumbnail = "choose thumbnail"
            flag = true
        }
        // if (!postCourse.mode) {
        //     error.mode = "Select mode"
        //     flag = true
        // }
        if (postCourse.certification === "") {
            error.certification = "Select certification"
            flag = true
        }
        if (!postCourse.application_form) {
            error.application_form = "Enter application form"
            flag = true
        }
        if (!postCourse.recommended_and_forwarded) {
            error.recommended_and_forwarded = "Enter recommended"
            flag = true
        }
        if (!postCourse.application_process) {
            error.application_process = "Enter application process"
            flag = true
        }
        if (!postCourse.medical_superintendent) {
            error.medical_superintendent = "Enter medical superintendent"
            flag = true
        }
        if (!postCourse.hospital_expenses_estimation_certificate) {
            error.hospital_expenses_estimation_certificate = "Enter hospital expenses estimation certificate"
            flag = true
        }
        if (!postCourse.detail) {
            error.detail = "Enter course detail"
            flag = true
        }
        if (!postCourse.organization) {
            error.organization = "Enter organization"
            flag = true
        }
        if (!postCourse.location) {
            error.location = "Enter location"
            flag = true
        }
        if (!postCourse.pincode) {
            error.pincode = "Enter pincode "
            flag = true
        }
        if (postCourse.pincode && postCourse.pincode.length < 6) {
            error.pincode = 'Please enter valid pincode'
            flag = true
        }
        if (!postCourse.contactPersonPhone) {
            error.contactPersonPhone = "Enter  phone"
            flag = true
        }
        if (postCourse.contactPersonPhone && postCourse.contactPersonPhone.length < 10) {
            error.contactPersonPhone = 'Please enter valid phone number'
            flag = true
        }
        if (!postCourse.contactPersonEmail) {
            error.contactPersonEmail = "Enter email"
            flag = true;
        }
        if (postCourse.contactPersonEmail && !postCourse.contactPersonEmail.match(regexForEmail)) {
            error.contactPersonEmail = "Please enter a valid email address"
            flag = true;
        }
        if (!postCourse.contactPersonName) {
            error.contactPersonName = "Enter name"
            flag = true
        }
        if (!postCourse.component) {
            error.component = "Enter component"
            flag = true
        }
        if (!postCourse.eligibility) {
            error.eligibility = "Enter eligibility"
            flag = true
        }
        if (!postCourse.state) {
            error.state = "Select state"
            flag = true
        }
        if (!postCourse.district) {
            error.district = "Select district"
            flag = true
        }
        setFormErrors(error);
        return flag
    }

    const clear = () => {
        setpostCourse({
            ...postCourse,
            name: "",
            categoryId: "",
            duration: "",
            certificationBody: "",
            mode: "",
            certification: '',
            application_form: "",
            recommended_and_forwarded: "",
            application_process: "",
            medical_superintendent: "",
            hospital_expenses_estimation_certificate: "",
            detail: "",
            thumbnail: "",
            state: "",
            district: "",
            location: "",
            pincode: "",
            contactPersonPhone: "",
            contactPersonEmail: "",
            contactPersonName: "",
            component: "",
            eligibility: "",
            organization: "",
        })
    }

    const save = () => {
        if (validation()) {
            return
        }
        if (!id) {
            let formData = new FormData();
            formData.append('key', uuidv1());
            formData.append('name', postCourse.name);
            formData.append('categoryId', postCourse.categoryId);
            formData.append('detail', postCourse.detail);
            formData.append('duration', postCourse.duration);
            formData.append('thumbnail', postCourse.thumbnail);
            formData.append('certificationBody', postCourse.certificationBody);
            formData.append('mode', 'PARTNER');
            formData.append('certification', postCourse.certification);
            formData.append('application_form', postCourse.application_form);
            formData.append('recommended_and_forwarded', postCourse.recommended_and_forwarded);
            formData.append('application_process', postCourse.application_process);
            formData.append('medical_superintendent', postCourse.medical_superintendent);
            formData.append('hospital_expenses_estimation_certificate', postCourse.hospital_expenses_estimation_certificate);
            formData.append('state', postCourse.state);
            formData.append('district', postCourse.district);
            formData.append('location', postCourse.location);
            formData.append('pincode', postCourse.pincode);
            formData.append('contactPersonPhone', postCourse.contactPersonPhone);
            formData.append('contactPersonEmail', postCourse.contactPersonEmail);
            formData.append('contactPersonName', postCourse.contactPersonName);
            formData.append('eligibility', postCourse.eligibility);
            formData.append('component', postCourse.component);
            formData.append('organization', postCourse.organization);
            dispatch(addPartnerCourse(formData));
            clear();
        } else {
            let formData = new FormData();
            formData.append('courseId', id);
            formData.append('key', courseDataById.data.data.key);
            formData.append('name', postCourse.name);
            formData.append('categoryId', postCourse.categoryId);
            formData.append('detail', postCourse.detail);
            formData.append('duration', postCourse.duration);
            formData.append('thumbnail', postCourse.thumbnail);
            formData.append('certificationBody', postCourse.certificationBody);
            formData.append('mode', postCourse.mode);
            formData.append('certification', postCourse.certification);
            formData.append('application_form', postCourse.application_form);
            formData.append('recommended_and_forwarded', postCourse.recommended_and_forwarded);
            formData.append('application_process', postCourse.application_process);
            formData.append('medical_superintendent', postCourse.medical_superintendent);
            formData.append('hospital_expenses_estimation_certificate', postCourse.hospital_expenses_estimation_certificate);
            formData.append('state', postCourse.state);
            formData.append('district', postCourse.district);
            formData.append('location', postCourse.location);
            formData.append('pincode', postCourse.pincode);
            formData.append('contactPersonPhone', postCourse.contactPersonPhone);
            formData.append('contactPersonEmail', postCourse.contactPersonEmail);
            formData.append('contactPersonName', postCourse.contactPersonName);
            formData.append('eligibility', postCourse.eligibility);
            formData.append('component', postCourse.component);
            formData.append('organization', postCourse.organization);

            if (type === "active") {
                formData.append('isActive', "true");
                formData.append('isDeleted', "false");

            }
            else if (type === 'inactive') {
                formData.append('isActive', "false");
                formData.append('isDeleted', "true");

            }

            dispatch(editPartnerCourse(formData));
            clear();
        }
    }

    return (
        <div className='my_profile_main'>
            <Container fluid>
                <h1 className='heading-txt m-0'>{id ? t("Employee.JobPost.generalinfo.Post course2") : t("Employee.JobPost.generalinfo.Post course")}</h1>
                <div className='addtrainingpartner_main'>
                    <h1 className='heading-txt m-0'>{t("Employee.JobPost.generalinfo.title")}</h1>
                    <div className='General_Info border-none'>
                        <Row>
                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField id="description" value={postCourse.name} name='name' type="text" label="Name of the course" variant="outlined" onChange={(e) => handleChange(e, "name")} />
                                {formErrors?.name && <span style={{ color: "red" }}>{formErrors.name}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="selecter mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Course category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postCourse?.categoryId}
                                        name="categoryId"
                                        label="Course category"
                                        onChange={(e: any) => handleChange(e, "categoryId")}>
                                        {
                                            courseCategoryData && courseCategoryData?.data && courseCategoryData.data.length > 0 ?
                                                courseCategoryData?.data.map((ele: any, i: number) => <MenuItem key={i} value={ele?.id}>{ele?.name}</MenuItem>) : <></>
                                        }
                                    </Select>
                                </FormControl>
                                {formErrors?.categoryId && <span style={{ color: "red" }}>{formErrors.categoryId}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TimePicker value={postCourse.duration} getdata={(e: any) => handleChangeDuration(e, "duration")} />
                                {formErrors?.duration && <span style={{ color: "red" }}>{formErrors.duration}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField name='certificationBody' type="text" value={postCourse.certificationBody} label="Certification body" variant="outlined" onChange={(e) => handleChange(e, "certificationBody")} />
                                {formErrors?.certificationBody && <span style={{ color: "red" }}>{formErrors.certificationBody}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3 file">
                                <TextField id="thumbnail" name='thumbnail' type="file" label="Choose a thumbnail "
                                    variant="outlined" onChange={(e) => fileUpload(e, "thumbnail")} InputLabelProps={{ shrink: true }} />
                                {formErrors?.thumbnail && <span style={{ color: "red" }}>{formErrors.thumbnail}</span>}
                            </Col>


                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <div className='Certification'>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='me-3 mb-0'>Certification</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="certification"
                                        onChange={(e) => handleChange(e, "certification")}
                                        value={postCourse.certification}>
                                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                        <FormControlLabel value={false} control={<Radio />} label="No" />
                                    </RadioGroup>
                                </div>
                                {formErrors?.certification && <span style={{ color: "red" }}>{formErrors.certification}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField id="application" name='application_form' value={postCourse.application_form} type="text" label="Application form" variant="outlined" onChange={(e) => handleChange(e, "application_form")} />
                                {formErrors?.application_form && <span style={{ color: "red" }}>{formErrors.application_form}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField id="recommended_and_forwarded" name='recommended_and_forwarded' value={postCourse.recommended_and_forwarded} type="text" label="Recommended and forwarded" variant="outlined" onChange={(e) => handleChange(e, "recommended_and_forwarded")} />
                                {formErrors?.recommended_and_forwarded && <span style={{ color: "red" }}>{formErrors.recommended_and_forwarded}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField id="application_process" name='application_process' value={postCourse.application_process} type="text" label="Application process" variant="outlined" onChange={(e) => handleChange(e, "application_process")} />
                                {formErrors?.application_process && <span style={{ color: "red" }}>{formErrors.application_process}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField id="medical_superintendent" name='medical_superintendent' value={postCourse.medical_superintendent} type="text" label="Medical superintendent" variant="outlined" onChange={(e) => handleChange(e, "medical_superintendent")} />
                                {formErrors?.medical_superintendent && <span style={{ color: "red" }}>{formErrors.medical_superintendent}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField id="requirements" name='hospital_expenses_estimation_certificate' value={postCourse.hospital_expenses_estimation_certificate} type="text" label="Hospital expenses estimate certificate" variant="outlined" onChange={(e) => handleChange(e, "hospital_expenses_estimation_certificate")} />
                                {formErrors?.hospital_expenses_estimation_certificate && <span style={{ color: "red" }}>{formErrors.hospital_expenses_estimation_certificate}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField id="requirements" name='detail' value={postCourse.detail} type="text" label="Course details" variant="outlined" onChange={(e) => handleChange(e, "detail")} />
                                {formErrors?.detail && <span style={{ color: "red" }}>{formErrors.detail}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField name='organization' value={postCourse.organization} type="text" label="Organization" variant="outlined" onChange={(e) => handleChange(e, "organization")} />
                                {formErrors?.organization && <span style={{ color: "red" }}>{formErrors.organization}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField name='eligibility' value={postCourse.eligibility} type="text" label="Eligibility" variant="outlined" onChange={(e) => handleChange(e, "eligibility")} />
                                {formErrors?.eligibility && <span style={{ color: "red" }}>{formErrors.eligibility}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField name='component' value={postCourse.component} type="text" label="Component" variant="outlined" onChange={(e) => handleChange(e, "component")} />
                                {formErrors?.component && <span style={{ color: "red" }}>{formErrors.component}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField name='contactPersonName' value={postCourse.contactPersonName} type="text" label="Contact person name" variant="outlined" onChange={(e) => handleChange(e, "contactPersonName")} />
                                {formErrors?.contactPersonName && <span style={{ color: "red" }}>{formErrors.contactPersonName}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField
                                    name='contactPersonEmail'
                                    value={postCourse.contactPersonEmail}
                                    type="text"
                                    label="Contact person email"
                                    variant="outlined"
                                    onChange={(e) => handleChange(e, "contactPersonEmail")}

                                />

                                {formErrors?.contactPersonEmail && <span style={{ color: "red" }}>{formErrors.contactPersonEmail}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField
                                    name='contactPersonPhone'
                                    value={postCourse.contactPersonPhone}
                                    type="text"
                                    label="Contact person phone"
                                    variant="outlined"
                                    onChange={(e) => onChangeValue(e, "contactPersonPhone")}
                                    inputProps={{
                                        maxLength: 10,
                                    }}
                                />
                                {formErrors?.contactPersonPhone && <span style={{ color: "red" }}>{formErrors.contactPersonPhone}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField name='pincode' value={postCourse.pincode} type="text" label="Pincode" variant="outlined" inputProps={{ maxLength: 6 }} onChange={(e) => onChangeValue(e, "pincode")} />
                                {formErrors?.pincode && <span style={{ color: "red" }}>{formErrors.pincode}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <TextField name='location' value={postCourse.location} type="text" label="Location" variant="outlined" onChange={(e) => handleChange(e, "location")} />
                                {formErrors?.location && <span style={{ color: "red" }}>{formErrors.location}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postCourse?.state}
                                        name="state"
                                        label="Select State"
                                        onChange={(e: any) => handleChange(e, "state")}>
                                        {
                                            getStateData && getStateData.data && getStateData.data.length > 0 ?
                                                getStateData.data.map((ele: any, i: number) => <MenuItem key={i} value={ele.id}>{ele.name}</MenuItem>)
                                                : <></>
                                        }
                                    </Select>
                                </FormControl>
                                {formErrors?.state && <span style={{ color: "red" }}>{formErrors.state}</span>}
                            </Col>

                            <Col xl={4} lg={4} md={6} className="mt-3">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">District</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={postCourse?.district}
                                        name="district"
                                        label="Select district"
                                        onChange={(e: any) => handleChange(e, "district")}>
                                        {
                                            getDistrictData && getDistrictData.data && getDistrictData.data.length > 0 ?
                                                getDistrictData.data.map((ele: any, i: number) => <MenuItem key={i} value={ele?.id}>{ele?.name}</MenuItem>)
                                                : <></>
                                        }
                                    </Select>
                                </FormControl>
                                {formErrors?.district && <span style={{ color: "red" }}>{formErrors.district}</span>}
                            </Col>
                        </Row>
                    </div>
                    <div className='Save_Changes_btn'>
                        <button onClick={() => save()}>{t("Employee.JobPost.btn.saveChanges")}</button>
                    </div>
                </div>
            </Container >
        </div >
    )
}

export default PostCourse