import { FormControl, FormControlLabel, Table, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import { getAllJobApplications, getJobApplication, updateJobApplication } from '../../redux/actions/jobApplicationAction'
import { DefaultRootState, useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { getJobCategories, getJobRoles } from '../../redux/actions/jobAction'
import { toast } from 'react-toastify'
import { CSVLink } from 'react-csv';
import { ApiPost } from '../../helper/API/ApiData'
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
import whatsAppMessage from '../../common/whatsAppMessage'
import UserDetailModal from '../../common/UserDetailModal'

const JobApplication = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const queryParams = new URLSearchParams(location.search)
    const jobId: any = queryParams.get("id")
    const CSVLinkRef = useRef<any>(null);

    const [pageNo, setPageNo] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(10)
    const [getAllJobApp, setGetAllJobApp] = useState<any[]>([])
    const [shortList, setShortList] = useState<any>()
    const [key, setKey] = useState();
    const [filter, setFilter] = useState({
        category: '',
        role: '',
    })
    const [jobApplication, setJobApplication] = useState('')
    const [exportTog, setExportTog] = useState(false);
    const [showUserDetail, setshowUserDetail] = useState(false);
    const [userId, setUsreId] = useState('');

    const getAllJobApplicationsData = useSelector((state: any) => state.jobApplicationData.getAllJobApplication)
    const getJobRolesData = useSelector((state: any) => state.jobData.getJobRoles)
    const jobCategories = useSelector((state: any) => state.jobData.getJobCategories)
    const updateApplication = useSelector((state: any) => state.jobApplicationData.updateJobApplication)
    const getJobApplications = useSelector((state: any) => state.jobApplicationData.getJobApplication)

    useEffect(() => {
        dispatch(getJobRoles())
        dispatch(getJobCategories())
    }, [])

    useEffect(() => {
        if (shortList === "shortList") {
            dispatch(getAllJobApplications(perPage, pageNo, filter.role, jobId, true, '', filter.category))
        } else if (shortList === "hire") {
            dispatch(getAllJobApplications(perPage, pageNo, filter.role, jobId, '', true, filter.category))
        } else {
            dispatch(getAllJobApplications(perPage, pageNo, filter.role, jobId, '', '', filter.category))
        }
    }, [filter, perPage, pageNo, shortList])

    useEffect(() => {
        if (getAllJobApplicationsData && getAllJobApplicationsData.data && getAllJobApplicationsData.data.data) {
            setGetAllJobApp(getAllJobApplicationsData.data.data)
        }
    }, [getAllJobApplicationsData, filter])

    useEffect(() => {
        if (updateApplication.status === 200) {
            dispatch(getAllJobApplications(perPage, pageNo, filter.role, jobId, "false", '', filter.category))
        }
    }, [updateApplication, jobId])

    const handleChange = (e: any, name: string) => {
        if (name === "category" || name === "role") {
            setFilter({ ...filter, [name]: e.target.value })
        }
    };
    const viewAll = () => {
        setPerPage(getAllJobApplicationsData.data.page_count)
    }
    const handalChnaegShortList = (id: any) => {
        dispatch(updateJobApplication(id, true))
        // whatsAppMessage()
    }
    const onChnaegRemoveShortList = (id: any) => {
        dispatch(updateJobApplication(id, false))
    }
    const updateHireAPI = (id: string, value: boolean, type?: any) => {

        ApiPost(`jobApplication/updateIsHired?id=${id}&hired=${value}&userId=${AuthStorage.getStorageData(STORAGEKEY.userId)}`, {})
            .then((res: any) => {
                if (res && res.status === 200) {
                    if (type) {
                        dispatch(getAllJobApplications(perPage, pageNo, filter.role, jobId, '', true, filter.category))
                    } else
                        dispatch(getAllJobApplications(perPage, pageNo, filter.role, jobId, true, '', filter.category))
                }
            })
    }
    const handalChnaegHire = (id: string) => {
        updateHireAPI(id, true)
        // whatsAppMessage()
    }
    const onChnaegRemoveHire = (id: string) => {
        updateHireAPI(id, false)
    }
    const onChangeRemove = (id: any) => {
        dispatch(updateHireAPI(id, false, true))
    }

    const onExportJobApplication = () => {
        dispatch(getJobApplication())
        // dispatch(getAllJobApplications(perPage, pageNo, filter.role, jobId, '', '', filter.category))
        setExportTog(true);
    }

    useEffect(() => {
        // if (getJobApplications && getJobApplications.data && getJobApplications.data.data) {
        //     setJobApplication(
        //         getJobApplications?.data?.data.map((item: any) => {
        if (getAllJobApplicationsData && getAllJobApplicationsData.data && getAllJobApplicationsData.data.data) {
            setJobApplication(
                getAllJobApplicationsData?.data?.data.map((item: any) => {
                    return {
                        ...item,
                        certification_url: item.certification_url,
                        createdAt: item.createdAt,
                        currently_working: item.currently_working,
                        experience: item.experience,
                        hired: item.hired,
                        id: item.id,
                        resume_url: item.resume_url,
                        selected: item.selected,
                        benifits: item.job_details.benifits,
                        description: item.job_details.description,
                        district: item.job_details.district.name,
                        email: item.job_details.email,
                        endDate: item.job_details.endDate,
                        extraType: item.job_details.extraType,
                        hiredNumber: item.job_details.hiredNumber,
                        jobRole: item.job_details.jobRole.name,
                        jobType: item.job_details.jobType.name,
                        phone: item.job_details.phone,
                        pincode: item.job_details.pincode,
                        reqExperience: item.job_details.reqExperience,
                        requirements: item.job_details.requirements,
                        salary: item.job_details.salary,
                        shifts: item.job_details.shifts,
                        startDate: item.job_details.startDate,
                        state: item.job_details.state.name,
                        town: item.job_details.town,
                        type: item.job_details.type,
                        vacancies: item.job_details.vacancies,
                        viewCount: item.job_details.viewCount,
                        avatar: item.user_details.avatar,
                        name: item.user_details.name,
                        useremail: item.user_details.email,
                    }
                })
            )

        }
    }, [getJobApplications])

    useEffect(() => {
        if (jobApplication.length && exportTog) {
            CSVLinkRef?.current?.link.click();
            toast.success('Job application exported');
            setExportTog(false)
        }
    }, [exportTog, jobApplication]);

    const header = [
        { label: "id", key: "id" },
        { label: "certification_url", key: "certification_url" },
        { label: "currently_working", key: "currently_working" },
        { label: "experience", key: "experience" },
        { label: "hired", key: "hired" },
        { label: "benifits", key: "benifits" },
        { label: "selected", key: "selected" },
        { label: "description", key: "description" },
        { label: "district", key: "district" },
        { label: "email", key: "email" },
        { label: "endDate", key: "endDate" },
        { label: "extraType", key: "extraType" },
        { label: "hiredNumber", key: "hiredNumber" },
        { label: "jobRole", key: "jobRole" },
        { label: "jobType", key: "jobType" },
        { label: "phone", key: "phone" },
        { label: "pincode", key: "pincode" },
        { label: "reqExperience", key: "reqExperience" },
        { label: "pincode", key: "pincode" },
        { label: "salary", key: "salary" },
        { label: "shifts", key: "shifts" },
        { label: "startDate", key: "startDate" },
        { label: "state", key: "state" },
        { label: "town", key: "town" },
        { label: "type", key: "type" },
        { label: "vacancies", key: "vacancies" },
        { label: "viewCount", key: "viewCount" },
        { label: "avatar", key: "avatar" },
        { label: "name", key: "name" },
        { label: "useremail", key: "useremail" },
    ];

    return (
        <>
            <CSVLink
                headers={header}
                data={jobApplication}
                ref={CSVLinkRef}
                filename="Jobapplication.csv"
                style={{ opacity: 0 }}
            ></CSVLink>

            <div className='my_profile_main'>
                <Container fluid>
                    <div className='d-flex flex-wrap justify-content-between align-items-center mb-2'>
                        <h1 className='heading-txt m-0'>{t("Employee.JobApp.title")}</h1>
                        <div className='d-flex flex-wrap'>
                            <div className='switch-btn-set'>
                                {/* <FormControlLabel
                                    label="Shortlisted"
                                    control={<IOSSwitch sx={{ m: 1 }} />}
                                /> */}
                            </div>
                            <div className='align-items-center eport_job_app'>
                                <button onClick={() => onExportJobApplication()} className=''><img src='../../../assets/img/Mask_white.png' className='mb-1 me-2' style={{ width: "14px" }} />{t("Employee.JobApp.Btn.exportJobApp")}</button>
                            </div>
                        </div>
                    </div>
                    <div className='Job_Application_Content position-relative'>
                        <div className=' justify-content-between'>
                            <div>
                                <Tabs activeKey={key} onSelect={(k) => setShortList(k)}>
                                    <Tab eventKey="all" title={t("Employee.JobApp.allApp")} >
                                        <div className='deshboard-main mt-5 all_applicants' style={{ overflow: "auto" }}>
                                            <div className='top_job_table'>
                                                <Table sx={{ minWidth: 650 }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>{t("Employee.JobApp.table.name")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.mobNo")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.location")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.doa")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.role")}</TableCell>
                                                            <TableCell align="right">Short liste application</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.action")}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody className='text-center'>
                                                        {getAllJobApp.length > 0 &&
                                                            getAllJobApp.map((item: any, i: number) => (
                                                                <TableRow
                                                                    key={i}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell align='left' scope="row" className='user-name' onClick={() => { setshowUserDetail(true), setUsreId(item.user_details.id) }}>{item.user_details?.name}</TableCell>
                                                                    <TableCell>{item.user_details?.phone}</TableCell>
                                                                    <TableCell>{item.job_details?.town}</TableCell>
                                                                    <TableCell>{item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : ""}</TableCell>
                                                                    <TableCell>{item.job_details.jobRole.name}</TableCell>
                                                                    {/* <TableCell className='text-center'>{'Open'}</TableCell> */}
                                                                    <TableCell align="right">
                                                                        <div className='d-flex justify-content-around'>
                                                                            {!item.selected ? <img src="../../../assets/img/edit.png" alt="" className='' onClick={(event: any) => handalChnaegShortList(item.id)} /> : <img src="../../../assets/img/cross.png" alt="" className='' onClick={(event: any) => onChnaegRemoveShortList(item.id)} />}
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <div className='d-flex justify-content-around'>
                                                                            <img src="../../../assets/img/shere_icon.png" alt="" className='' style={{ height: "20px", width: " 20px", }} />
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}

                                                    </TableBody>
                                                </Table>
                                            </div>

                                        </div>
                                        {getAllJobApplicationsData?.data?.page_count > perPage ?
                                            <div className='text-center mt-4'>
                                                <button className='view_all_btn' onClick={() => viewAll()}>{t("Employee.JobApp.Btn.viewAll")}</button>
                                            </div> : ""}
                                    </Tab>

                                    <Tab eventKey="shortList" title={t("Employee.JobApp.shortApp")}>
                                        <div className='deshboard-main mt-5 all_applicants' style={{ overflow: "auto" }}>
                                            <div className='top_job_table'>
                                                <Table sx={{ minWidth: 650 }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>{t("Employee.JobApp.table.name")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.mobNo")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.location")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.doa")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.role")}</TableCell>
                                                            <TableCell align="right">{`Hire`}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.action")}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody className='text-center'>
                                                        {getAllJobApp.length > 0 &&
                                                            getAllJobApp.map((item: any, i: number) => (
                                                                <TableRow
                                                                    key={i}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell align='left' scope="row" className='user-name' onClick={() => { setshowUserDetail(true), setUsreId(item.user_details.id) }} >{item.user_details?.name}</TableCell>
                                                                    <TableCell>{item.user_details?.phone}</TableCell>
                                                                    <TableCell>{item.job_details?.town}</TableCell>
                                                                    <TableCell>{item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : ""}</TableCell>
                                                                    <TableCell>{item.job_details.jobType.name}</TableCell>
                                                                    {/* <TableCell className='text-center'>{'Open'}</TableCell> */}
                                                                    <TableCell align="right">
                                                                        <div className='d-flex justify-content-around' style={{ cursor: "pointer" }}>
                                                                            {!item.hired ? <img src="../../../assets/img/edit.png" alt="" className='' onClick={() => handalChnaegHire(item.id)} /> : <img src="../../../assets/img/cross.png" alt="" className='' onClick={() => onChnaegRemoveHire(item.id)} />}
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell align="right">
                                                                        <div className='d-flex justify-content-around' style={{ cursor: "pointer" }}>
                                                                            <img src="../../../assets/img/shere_icon.png" alt="" className='' style={{ height: "20px", width: " 20px", }} />
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}

                                                    </TableBody>
                                                </Table>
                                            </div>

                                        </div>
                                        {getAllJobApplicationsData?.data?.page_count > perPage ?
                                            <div className='text-center mt-4'>
                                                <button className='view_all_btn' onClick={() => viewAll()}>{t("Employee.JobApp.Btn.viewAll")}</button>
                                            </div> : ""}
                                    </Tab>

                                    <Tab eventKey="hire" title={`Hired job application`}>
                                        <div className='deshboard-main mt-5 all_applicants' style={{ overflow: "auto" }}>
                                            <div className='top_job_table'>
                                                <Table sx={{ minWidth: 650 }}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>{t("Employee.JobApp.table.name")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.mobNo")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.location")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.doa")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.role")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.action")}</TableCell>
                                                            <TableCell align="right">{t("Employee.JobApp.table.action")}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody className='text-center'>
                                                        {getAllJobApp.length > 0 &&
                                                            getAllJobApp.map((item: any, i: number) => (
                                                                <TableRow
                                                                    key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                                    <TableCell align='left' scope="row" className='user-name' onClick={() => { setshowUserDetail(true), setUsreId(item.user_details.id) }}>{item.user_details?.name}</TableCell>
                                                                    <TableCell>{item.user_details?.phone}</TableCell>
                                                                    <TableCell>{item.job_details?.town}</TableCell>
                                                                    <TableCell>{item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : ""}</TableCell>
                                                                    <TableCell>{item.job_details.jobType.name}</TableCell>
                                                                    {/* <TableCell className='text-center'>{'Open'}</TableCell> */}
                                                                    <TableCell align="right" style={{ cursor: "pointer" }}>
                                                                        <div className='d-flex justify-content-around' style={{ cursor: "pointer" }}>
                                                                            <img src="../../../assets/img/cross.png" alt="" onClick={() => onChangeRemove(item.id)} style={{ height: "20px", width: " 20px", }} />
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell align="right" style={{ cursor: "pointer" }}>
                                                                        <div className='d-flex justify-content-around' style={{ cursor: "pointer" }}>
                                                                            <img src="../../../assets/img/shere_icon.png" alt="" className='' style={{ height: "20px", width: " 20px", }} />
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}

                                                    </TableBody>
                                                </Table>
                                            </div>

                                        </div>
                                        {getAllJobApplicationsData?.data?.page_count > perPage ?
                                            <div className='text-center mt-4'>
                                                <button className='view_all_btn' onClick={() => viewAll()}>{t("Employee.JobApp.Btn.viewAll")}</button>
                                            </div> : ""}
                                    </Tab>
                                </Tabs>
                            </div>
                            <div className='d-flex search-content position-absolute'>
                                <FormControl className='me-3'>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobApp.input.jobCate")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filter.category}
                                        label={t("Employee.JobApp.input.jobCate")}
                                        onChange={(e) => handleChange(e, 'category')}
                                        style={{ minWidth: '180px' }}
                                    >
                                        {jobCategories && jobCategories.data &&
                                            jobCategories.data.map((ele: any, i: number) =>
                                                <MenuItem value={ele.id}>{ele.name}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl >
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobApp.input.jobRole")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filter.role}
                                        label={t("Employee.JobApp.input.jobRole")}
                                        onChange={(e) => handleChange(e, 'role')}
                                        style={{ minWidth: '180px' }}
                                    >
                                        {getJobRolesData && getJobRolesData.data &&
                                            getJobRolesData.data.map((ele: any, i: number) =>
                                                <MenuItem value={ele.id}>{ele.name}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                {(filter.category || filter.role) && <button className='Post_Job ms-3' onClick={() => setFilter({ category: '', role: '' })}>{t("Employee.JobApp.Btn.clear")}</button>}
                            </div>
                        </div>
                    </div>
                </Container>
            </div >

            {
                showUserDetail && <UserDetailModal userId={userId} show={showUserDetail} onHide={() => setshowUserDetail(false)} />
            }

        </>
    )
}

export default JobApplication