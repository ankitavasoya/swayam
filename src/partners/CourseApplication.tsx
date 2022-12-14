import styled from '@emotion/styled'
import { FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Container, Tab, Table, Tabs } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobApplications } from '../redux/actions/jobApplicationAction'

function CourseApplication() {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [pageNo, setPageNo] = useState<number>(1)
    const [perPage, setPerPage] = useState<number>(6)
    const [getAllJobApp, setGetAllJobApp] = useState<any[]>([])
    const [shortListedApp, setShortListedApp] = useState<any[]>([])
    const [jobCategory, setJobCategory] = useState<any[]>([])
    const [jobRole, setJobRole] = useState<any[]>([])
    const [filter, setFilter] = useState({
        category: '',
        role: '',
    })

    const getAllJobApplicationsData = useSelector((state: any) => state.jobApplicationData.getAllJobApplication)

    useEffect(() => {
        dispatch(getAllJobApplications(perPage, pageNo, filter.role, '', '', '', filter.category))
    }, [filter, perPage, pageNo, filter])

    useEffect(() => {
        if (getAllJobApplicationsData && getAllJobApplicationsData.data && getAllJobApplicationsData.data.data && getAllJobApplicationsData.data.data.length > 0) {
            setGetAllJobApp(getAllJobApplicationsData.data.data)
            setShortListedApp(getAllJobApplicationsData.data.data.filter((ele: any, i: number) => ele.selected === true))

            let tempRoleId = Array.from(new Set(getAllJobApplicationsData.data.data.map((ele: any, i: number) => ele.job_details.jobRole.id)))
            let tempRoleObj = tempRoleId.map((ele) => getAllJobApplicationsData.data.data.find((item: any) => item.job_details.jobRole.id === ele).job_details?.jobRole)
            setJobRole(tempRoleObj)

            let tempCatId = Array.from(new Set(getAllJobApplicationsData.data.data.map((ele: any, i: number) => ele.job_details.jobType.id)))
            let tempCatObj = tempCatId.map((ele) => getAllJobApplicationsData.data.data.find((item: any) => item.job_details.jobType.id === ele).job_details?.jobType)
            setJobCategory(tempCatObj)
        }
    }, [getAllJobApplicationsData])


    const IOSSwitch = styled((props: any) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} checkedIcon={<img src='.../../../assets/img/tick.png' />} defaultChecked />
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

    const handleChange = (e: any, name: string) => {
        if (name === "category" || name === "role") {
            setFilter({ ...filter, [name]: e.target.value })
        }
    };

    const viewAll = () => {

    }
    return (
        <>
            <div className='my_profile_main'>
                <Container fluid>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                        <h1 className='heading-txt m-0'>{t("Employee.JobApp.title")}</h1>
                        <div className='d-flex'>
                            <div className='switch-btn-set'>
                                {/* <FormControlLabel
                                label="Shortlisted"
                                control={<IOSSwitch sx={{ m: 1 }} />}
                            /> */}
                            </div>
                            <div className='align-items-center eport_job_app'>
                                <button className=''><img src='../../../assets/img/Mask_white.png' className='mb-1 me-2' style={{ width: "14px" }} />{t("Employee.JobApp.Btn.exportJobApp")}</button>
                            </div>
                        </div>
                    </div>
                    <div className='Job_Application_Content position-relative'>
                        <div className=' justify-content-between'>
                            <div>
                                <Tabs>
                                    <Tab eventKey="All_applicants" title={t("Employee.JobApp.allApp")}>
                                        <div className='all_applicants' style={{ marginTop: "80px" }}>
                                            <Table >
                                                <thead>
                                                    <tr>
                                                        <th>{t("Employee.JobApp.table.name")}</th>
                                                        <th>{t("Employee.JobApp.table.mobNo")}</th>
                                                        <th>{t("Employee.JobApp.table.location")}</th>
                                                        <th>{t("Employee.JobApp.table.doa")}</th>
                                                        <th>{t("Employee.JobApp.table.role")}</th>
                                                        <th>{t("Employee.JobApp.table.action")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        getAllJobApp.length > 0 &&
                                                        getAllJobApp.map((item: any, i: number) => (
                                                            <tr key={i}>
                                                                <td>{item.user_details?.name}</td>
                                                                <td>{item.user_details?.phone}</td>
                                                                <td>{item.job_details?.town}</td>
                                                                <td>{item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : ""}</td>
                                                                <td>{item.job_details.jobType.name}</td>
                                                                <td className='pt-3'>
                                                                    <div className='d-flex justify-content-around'>
                                                                        <img src={"../../../assets/img/Shape@2x.png"} alt="" className='me-auto' style={{ height: "10.91px", width: " 16px", cursor: "pointer" }} />
                                                                        <img src="../../../assets/img/edit.png" alt="" className='' style={{ cursor: "pointer" }} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className='text-center mt-4'>
                                            <button className='view_all_btn' onClick={() => viewAll()}>{t("Employee.JobApp.Btn.viewAll")}</button>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Shortlisted_applicants" title={t("Employee.JobApp.shortApp")}>
                                        <div className='all_applicants' style={{ marginTop: "80px" }}>
                                            <Table >
                                                <thead>
                                                    <tr>
                                                        <th>{t("Employee.JobApp.table.name")}</th>
                                                        <th>{t("Employee.JobApp.table.mobNo")}</th>
                                                        <th>{t("Employee.JobApp.table.location")}</th>
                                                        <th>{t("Employee.JobApp.table.doa")}</th>
                                                        <th>{t("Employee.JobApp.table.role")}</th>
                                                        <th>{t("Employee.JobApp.table.action")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        shortListedApp.length > 0 &&
                                                        shortListedApp.map((item: any, i: number) => (
                                                            <tr key={i}>
                                                                <td>{item.user_details?.name}</td>
                                                                <td>{item.user_details?.phone}</td>
                                                                <td>{item.job_details?.town}</td>
                                                                <td>{item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : ""}</td>
                                                                <td>{item.job_details.jobType.name}</td>
                                                                <td className='pt-3'>
                                                                    <div className='d-flex justify-content-around'>
                                                                        <img src={"../../../assets/img/Shape@2x.png"} alt="" className='me-auto' style={{ height: "10.91px", width: " 16px", cursor: "pointer" }} />
                                                                        <img src="../../../assets/img/edit.png" alt="" className='' style={{ cursor: "pointer" }} />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className='text-center mt-4'>
                                            <button className='view_all_btn' onClick={() => viewAll()}>{t("Employee.JobApp.Btn.viewAll")}</button>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                            <div className='d-flex search-content position-absolute'>
                                <FormControl fullWidth className='me-3'>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobApp.input.jobCate")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filter.category}
                                        label={t("Employee.JobApp.input.jobCate")}
                                        onChange={(e) => handleChange(e, 'category')}
                                    >
                                        {
                                            jobCategory.map((ele: any, i: number) =>
                                                <MenuItem value={ele.id}>{ele.name}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{t("Employee.JobApp.input.jobRole")}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={filter.role}
                                        label={t("Employee.JobApp.input.jobRole")}
                                        onChange={(e) => handleChange(e, 'role')}
                                    >
                                        {
                                            jobRole.map((ele: any, i: number) =>
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

        </>
    )
}

export default CourseApplication