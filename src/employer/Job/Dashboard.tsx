import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import { Container } from 'react-bootstrap';
import Applied from "../../assets/img/portfolio.png";
import AcquireCard from '../../common/AcquireCard';
import imgs from "../../assets/img/1-SM580561@2x.png";
import MyProfile from '../MyProfile/MyProfile';
// import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
// import MyProfile from '../../pages/MyProfile/MyProfile';
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Active_Posts from "../../assets/img/No. of Active Posts.png";
import recruitment from "../../assets/img/noun-recruitment-2376612.png";
import Shortlisted_Candidates from "../../assets/img/Shortlisted Candidates.png";
import Candidates_hired from "../../assets/img/Candidates hired.png";
import User_Rating from "../../assets/img/User Rating.png";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
// import eyes from "../../assets/img/shere_icon.png";
// import click from "../../assets/img/Shape-1.png";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardJobs, getJobsFilterForMain } from '../../redux/actions/jobAction';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Filter {
  search: string,
  location: string,
}

const Dashboard = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [date, setDate] = useState<string>('');
  const [showCandidate, setShowCandidate] = useState<boolean>(false)
  const [findCandidate, setFindCandidate] = useState<string>('');
  const [pageNo, setPageNo] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(5)
  const [filter, setFilter] = useState<Filter>({
    search: '',
    location: '',
  })
  const [dashboardJob, setDashboardJob] = useState<any[]>([])

  const dashboardJobsData = useSelector((state: any) => state.jobData.dashboardJobs)

  useEffect(() => {
    dispatch(dashboardJobs(perPage, pageNo))
  }, [])

  useEffect(() => {
    if (dashboardJobsData && dashboardJobsData.data && dashboardJobsData.data.data && dashboardJobsData.data.data.length > 0) {
      setDashboardJob(dashboardJobsData.data.data)
    }
  }, [dashboardJobsData])

  const handleChange = (e: any, name: string) => {
    setDate(e.target.value);
    if (name === "search" || name === "location") {
      setFilter({ ...filter, [name]: e.target.value })
    }
  };

  const changeCandidate = (event: SelectChangeEvent) => {
    setFindCandidate(event.target.value);
  };

  const deshboard_Card = [
    {
      title: "No. of Active Posts",
      img: Active_Posts,
      nuOfJob: "30",
      watch: "See Job posts",
      height: "24.91px",
      width: "36px"
    },
    {
      title: "Candidates applied",
      img: recruitment,
      nuOfJob: "30",
      watch: "View Candidates",
      height: "33.85px",
      width: " 36px"
    },
    {
      title: "Shortlisted Candidates",
      img: Shortlisted_Candidates,
      nuOfJob: "30",
      watch: "See Shortlisted ",
      height: "36px",
      width: "29.72px"
    },
    {
      title: "Candidates hired",
      img: Candidates_hired,
      nuOfJob: "30",
      watch: "See Hired ",
      height: "36px",
      width: "36px"
    },
    {
      title: "User Rating",
      img: User_Rating,
      nuOfJob: "30",
      watch: "See Rating ",
      height: " 30px",
      width: "25.21px"
    },
  ]

  const TEMP = [
    {
      name: 'General Duty Assistant Mumbai',
      active_app: 120,
      new_app: 10,
      shhortlisted: 10,
      hired: 10,
    },
    {
      name: 'Assistant Nurse Thane',
      active_app: 120,
      new_app: 10,
      shhortlisted: 10,
      hired: 10,
    },
    {
      name: 'Lab Technician Mumbai',
      active_app: 120,
      new_app: 10,
      shhortlisted: 10,
      hired: 10,
    },
  ]

  function createData(name: string, Active_applicants: any, New_applicants: any, Shortlisted: any, Hired_Candidate: any,) {
    return { name, Active_applicants, New_applicants, Shortlisted, Hired_Candidate, };
  }

  const rows = TEMP.map((i) => createData(i.name, i.active_app, i.new_app, i.shhortlisted, i.hired))


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
                <img src="./assets/img/search.png" alt="" />
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
              <button className='Post_Job m-3' onClick={() => navigate('/employer/postjob')}>{t("Employee.dashboard.btn.postAJob")}</button>
            </div>
          </div>
          {/* <div>
            <Row className='justify-content-between'>
              {
                deshboard_Card.map((item) => (
                  <Col lg={2}>
                    <div className='deshboard_card text-center'>
                      <h1>{item.title}</h1>
                      <div className='d-flex align-items-center justify-content-center'>
                        <img src={item.img} alt="" className='me-3' style={{ width: item.width, height: item.height }} />
                        <h2>{item.nuOfJob}</h2>
                      </div>
                      <p style={{ cursor: "pointer" }}>{item.watch}</p>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </div> */}
          <div className='deshboard-main mt-3' style={{ overflow: "auto" }}>
            {/* <div className='d-flex justify-content-between Top_Jobs_header'>
              <div className='d-flex'>
                <div className="search_input me-4">
                  <TextField id="outlined-danger" name='search' value={filter.search} type="text" label="Search By Job Title" onChange={(e) => handleChange(e, 'search')} variant="outlined" />
                  <img src="./assets/img/search.png" alt="" />
                </div>
                <div className="search_input">
                  <TextField id="outlined-danger" name='search' value={filter.location} type="text" label="Search By Location" onChange={(e) => handleChange(e, 'location')} variant="outlined" />
                  <img src="./assets/img/location-pin.png" alt="" />
                </div>
              </div>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Posting Date</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    label="Age"
                    onChange={(e) => console.log(e)}
                  >
                    <MenuItem value={10}>Ten june</MenuItem>
                    <MenuItem value={20}>Twenty june</MenuItem>
                    <MenuItem value={30}>Thirty june</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div> */}
            <div>
              <h1 className='heading-txt m-0 ps-3 mb-3' style={{ padding: '15px' }}>{t("Employee.dashboard.table.title")}</h1>
              <div className='top_job_table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("Employee.dashboard.table.label.jobTitle")}</TableCell>
                      <TableCell align="right">{t("Employee.dashboard.table.label.activeApp")}</TableCell>
                      <TableCell align="right">{t("Employee.dashboard.table.label.shortlisted")}</TableCell>
                      <TableCell align="right">{t("Employee.dashboard.table.label.hiredCand")}</TableCell>
                      <TableCell align="right">{t("Employee.dashboard.table.label.jobStatus")}</TableCell>
                      <TableCell align="right">{t("Employee.dashboard.table.label.action")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className='text-center'>
                    {dashboardJob.length > 0 && dashboardJob.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align='left' scope="row">{row.description}</TableCell>
                        <TableCell>{row.all_applicants}</TableCell>
                        <TableCell>{row.selected_applicants}</TableCell>
                        <TableCell>{row.hired_applicants}</TableCell>
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
            <button className='Post_Job ms-3' onClick={() => navigate('/employer/activejobs')}>{t("Employee.dashboard.btn.loadMore")}</button>
            {/* <button className='btn'>First</button>
            <Pagination count={10} variant="outlined" shape="rounded" />
            <button className='btn'>Last</button> */}
          </div>

          <div className='deshboard-main p-4 progress_bar_main'>
            <div className='d-flex progress_bar flex-wrap justify-content-between mb-4'>
              <div className='progress_bar_title'>
                <h1>{t("Employee.dashboard.progressTable.title")}</h1>
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