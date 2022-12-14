import { MenuItem, FormControl, InputLabel, Select, SelectChangeEvent, TextField } from '@mui/material'
import { log } from 'console';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import JobCard from '../../common/JobCard';
import { getActiveJobsFilterForMain } from '../../redux/actions/activeJobsActions';
import { getJobCategories } from '../../redux/actions/jobAction';
import { JOB_UPDATE_ACTIVE_MAIN } from '../../redux/type';
interface Filter {
    search: string
    jobType: string
}

const ActiveJobs = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();

    const [perPage, setPerPage] = useState<number>(8)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [active, setActive] = useState("Active")
    const [activeJobData, setActiveJobData] = useState<[]>([])
    const [activeJobsFilter, setActiveJobsFilter] = React.useState<Filter>({
        search: "",
        jobType: "",
    })

    const activeJobs = useSelector((state: any) => state.activeJobsData.getJobsFilterForMainFalse)
    const updateJobActiveData = useSelector((state: any) => state.activeJobsData.updateJobActiveData)
    const jobCategories = useSelector((state: any) => state.jobData.getJobCategories)

    useEffect(() => {
        dispatch(getJobCategories)
    }, [])
    useEffect(() => {
        if (activeJobs && activeJobs.data && activeJobs.data.data) {
            setActiveJobData(activeJobs.data.data)
        }
    }, [activeJobs])

    useEffect(() => {
        dispatch(getActiveJobsFilterForMain(perPage, pageNumber, "", "", "", active, activeJobsFilter.search, false, activeJobsFilter.jobType))
    }, [perPage, pageNumber, activeJobsFilter])


    useEffect(() => {
        if (updateJobActiveData.status === 200) {
            dispatch(getActiveJobsFilterForMain(perPage, pageNumber, "", "", "", active, activeJobsFilter.search, false, activeJobsFilter.jobType))
            toast.success("Jobs Deactive successfully")
            dispatch({
                type: JOB_UPDATE_ACTIVE_MAIN,
                payload: []
            })
        }
    }, [updateJobActiveData])


    const onClear = () => {
        setActiveJobsFilter({
            ...activeJobsFilter,
            search: "",
            jobType: "",
        })
    }

    const handleChange = (e: SelectChangeEvent) => {
        setActiveJobsFilter({ ...activeJobsFilter, [e.target.name]: e.target.value });
    };

    const viewAll = () => {
        let page = perPage
        let pageNo = pageNumber
        setPerPage(page += 8)
    }

    return (
        <>
            <div className='my_profile_main'>
                <Container fluid>
                    <h1 className='heading-txt'>{t("Employee.ActiveJobs.title")}</h1>
                    <div className='ActiveJobs-contend'>
                        <div className='jobType-select d-block justify-content-between d-md-flex'>
                            <FormControl >
                                <InputLabel id="demo-simple-select-label">{t("Employee.ActiveJobs.input.jobType")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={activeJobsFilter.jobType}
                                    label={t("Employee.ActiveJobs.input.jobType")}
                                    onChange={(e: any) => handleChange(e)}
                                    name="jobType"
                                    style={{ width: '225px' }}
                                >
                                    {jobCategories && jobCategories.data && jobCategories.data?.map((item: any) => (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <div className='d-block d-md-flex mt-3 mt-md-0'>
                                <div className="search_input">
                                    <TextField id="outlined-danger" name={'search'} value={activeJobsFilter.search} type="text" label={t("Employee.ActiveJobs.input.search")} onChange={(e: any) => handleChange(e)} variant="outlined" />
                                    <img src="./assets/img/search.png" alt="" />
                                </div>
                                {(activeJobsFilter.jobType || activeJobsFilter.search) && <button onClick={() => onClear()} className="clr-btn margin-courses-input ms-0 ms-md-3 mt-3 mt-md-0">{t("course.filter.clear")}</button>}
                            </div>
                        </div>
                        <div>
                            <Row>
                                {activeJobData && activeJobData.map((item: any) => (
                                    <Col xxl={3} xl={4} lg={6} md={6} sm={6} className="mb-3">
                                        <JobCard
                                            img="../../../assets/img/logo.png"
                                            title={item.jobRole.name}
                                            location_txt={`${item.town}, ${item.state.name}`}
                                            vacancy_txt={`${t("Employee.ActiveJobs.card.noOfVacancies")}: ${item.vacancies}`}
                                            calendar_txt={`${t("Employee.ActiveJobs.card.jobPostedOn")}: ${moment(item.startDate).format("DD-MM-YYYY")}`}
                                            active_job_btn={true}
                                            allActiveData={item}
                                            inactiveData={item}
                                            activeEdit={item.id}
                                            viewApplication={item}
                                        />
                                    </Col>
                                ))
                                }
                            </Row>
                        </div>
                        {activeJobs?.data?.page_count > perPage ? <div className='text-center mt-3'>
                            <button className='view_all_btn' onClick={() => viewAll()}>Load More</button> </div> : ""}
                    </div>
                </Container>
            </div >
        </>
    )
}

export default ActiveJobs