import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { Container } from 'react-bootstrap';
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCoursesAction } from '../redux/actions/courseAction';

interface Filter {
    search: string,
    location: string,
}

const Dashboard = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showCandidate, setShowCandidate] = useState<boolean>(false)
    const [findCandidate, setFindCandidate] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [perPage, setPerPage] = useState<number>(8)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [status, setStatus] = useState("active")
    const [DashboardCourses, setDashboardCourses] = useState<any[]>([])

    const dashboardCoursesData = useSelector((state: any) => state.courseData.getCourses)

    useEffect(() => {
        dispatch(getCoursesAction(perPage, pageNumber, "", "", status))
    }, [perPage, pageNumber,])

    useEffect(() => {
        if (dashboardCoursesData && dashboardCoursesData.data && dashboardCoursesData.data.data && dashboardCoursesData.data.data.length > 0) {
            setDashboardCourses(dashboardCoursesData.data.data)
        }
    }, [dashboardCoursesData])

    const changeCandidate = (event: SelectChangeEvent) => {
        setFindCandidate(event.target.value);
    };

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 5,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));

    const progressBarData = [
        {
            titel: "General Duty Assistant",
            value: 15,
            No_Of_app: `15 ${t("Employee.dashboard.progressTable.progressApp")}`
        },
        {
            titel: "UI Designer",
            value: 10,
            No_Of_app: `10 ${t("Employee.dashboard.progressTable.progressApp")}`
        },
        {
            titel: "Assistant Nurset",
            value: 35,
            No_Of_app: `35 ${t("Employee.dashboard.progressTable.progressApp")}`
        },
        {
            titel: "Lab Technician",
            value: 5,
            No_Of_app: `5 ${t("Employee.dashboard.progressTable.progressApp")}`
        },
    ]

    return (

        <>
            <div className='my_profile_main' >
                <Container fluid>
                    {/* <MyProfile /> */}
                    <div className='deshboard-header d-flex flex-wrap justify-content-between align-items-center mb-5' >
                        <h1 className='heading-txt m-3'>{t("Employee.dashboard.title")}</h1>
                        <div className='d-flex flex-wrap position-relative'>
                            <div className='position-relative find_candidate m-3'>
                                <input type="text" id='find-candidate' placeholder={t("Employee.dashboard.input.findCandi")} value={findCandidate} onClick={() => setShowCandidate(!showCandidate)} />
                            </div>
                            {
                                showCandidate &&
                                <div className='candidet-item position-absolute'>
                                    <div className='d-flex'>
                                        <h1>General Duty Assistant</h1>
                                        <input type="radio" name='candidate' className='form-check-input' onClick={() => { setFindCandidate('General Duty Assistant'); setShowCandidate(false) }} />
                                    </div>
                                    <div className='d-flex'>
                                        <h1>UI Designer</h1>
                                        <input type="radio" name='candidate' className='form-check-input' onClick={() => { setFindCandidate('UI Designer'); setShowCandidate(false) }} />
                                    </div>
                                    <div className='d-flex'>
                                        <h1>Assistant Nurse</h1>
                                        <input type="radio" name='candidate' className='form-check-input' onClick={() => { setFindCandidate('Assistant Nurse'); setShowCandidate(false) }} />
                                    </div>
                                    <div className='d-flex'>
                                        <h1>Lab Technician</h1>
                                        <input type="radio" name='candidate' className='form-check-input' onClick={() => { setFindCandidate('Lab Technician'); setShowCandidate(false) }} />
                                    </div>
                                </div>
                            }


                            <button className='Post_Job m-3' onClick={() => navigate('/partner/postcourses')}>{t("Post a Course")}</button>
                        </div>
                    </div>
                    <div>
                        <Row>
                            <Col lg={2}>
                                <div className='courses-count-box'>
                                    <h4>{dashboardCoursesData && dashboardCoursesData.data && dashboardCoursesData.data.allCoursesCount}</h4>
                                    <h6>All Courses Count</h6>
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className='courses-count-box'>
                                    <h4>{dashboardCoursesData && dashboardCoursesData.data && dashboardCoursesData.data.activeCoursesCount}</h4>
                                    <h6>Active Courses Count</h6>
                                </div>
                            </Col>
                            <Col lg={2}>
                                <div className='courses-count-box'>
                                    <h4>{dashboardCoursesData && dashboardCoursesData.data && dashboardCoursesData.data.inactiveCoursesCount}</h4>
                                    <h6>Inactive Courses Count</h6>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='deshboard-main mt-3' style={{ overflow: "auto" }}>
                        <div>
                            <h1 className='heading-txt m-0 ps-3 mb-3' style={{ padding: '15px' }}>{"Top courses"}</h1>
                            <div className='top_job_table'>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{t("Courses title")}</TableCell>
                                            {/* <TableCell align="right">{t("Active App")}</TableCell>
                                            <TableCell align="right">{t("Shortlisted")}</TableCell>
                                            <TableCell align="right">{t("HiredCand")}</TableCell> */}
                                            <TableCell align="right">{t("Job status")}</TableCell>
                                            <TableCell align="right">{t("Action")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className='text-center'>
                                        {DashboardCourses.length > 0 && DashboardCourses.map((row, i) => (
                                            <TableRow
                                                key={i}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align='left' scope="row">{row.name}</TableCell>
                                                {/* <TableCell>{row.all_applicants}</TableCell>
                                                <TableCell>{row.selected_applicants}</TableCell>
                                                <TableCell>{row.hired_applicants}</TableCell> */}
                                                <TableCell className='text-center'>{'Open'}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <div className='d-flex justify-content-around'>
                                                        <img src="../../../assets/img/shere_icon.png" alt="" className='' style={{ height: "20px", width: " 20px", }} />
                                                        <img src="../../../assets/img/edit.png" alt="" className='' />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex mt-3 justify-content-center table_pagination align-items-center mb-3'>
                        <button className='Post_Job ms-3' onClick={() => navigate('/partner/activecourses')}>{t("Employee.dashboard.btn.loadMore")}</button>
                        {/* <button className='btn'>First</button>
            <Pagination count={10} variant="outlined" shape="rounded" />
            <button className='btn'>Last</button> */}
                    </div>

                    <div className='deshboard-main p-4 progress_bar_main'>
                        <div className='d-flex progress_bar flex-wrap justify-content-between mb-4'>
                            <div className='progress_bar_title'>
                                <h1>{t("No of application by course type")}</h1>
                                <p>{'75'} {t("Employee.dashboard.progressTable.subTitle")}</p>
                            </div>
                            <FormControl fullWidth className='dropdown_in_td'>
                                <InputLabel id="demo-simple-select-label">Newest</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={date}
                                    label="Newest"
                                    onChange={(e) => console.log(e)}
                                >
                                    <MenuItem value={10}>Ten june</MenuItem>
                                    <MenuItem value={20}>Twenty june</MenuItem>
                                    <MenuItem value={30}>Thirty june</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {
                            progressBarData.map((item) => (
                                <Row className='align-items-center'>
                                    <Col lg={2}>
                                        <div className='jop_type_name'>
                                            <h1>{item.titel}</h1>
                                        </div>
                                    </Col>
                                    <Col lg={8}>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <BorderLinearProgress variant="determinate" value={item.value} className="progress-bar-content" />
                                        </Box>
                                    </Col>
                                    <Col lg={2}>
                                        <h2>{item.No_Of_app}</h2>
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                </Container>
            </div >
        </>
    )
}

export default Dashboard