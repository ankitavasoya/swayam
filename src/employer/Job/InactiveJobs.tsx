import { FormControl, InputLabel, Select, TextField, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Container, } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../../common/JobCard';
import { getJobCategories, getJobsFilterForMain } from '../../redux/actions/jobAction';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { JOB_UPDATE_ACTIVE_MAIN } from '../../redux/type';
import { toast } from 'react-toastify';
import { getActiveJobsFilterForMain } from '../../redux/actions/activeJobsActions';
interface Filters {
    jobType: string,
    search: string,
}

const InactiveJobs = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [perPage, setPerPage] = useState<number>(8)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [inactiveJobs, setInactiveJobs] = useState<[]>([])
    const [filter, setFilter] = useState<Filters>({
        jobType: "",
        search: "",
    })

    const getInactiveJobData = useSelector((state: any) => state.activeJobsData.getJobsFilterForMainFalse)
    const updateJobActiveData = useSelector((state: any) => state.activeJobsData.updateJobActiveData)
    const jobCategories = useSelector((state: any) => state.jobData.getJobCategories)

    useEffect(() => {
        dispatch(getJobCategories())
    }, [])
    useEffect(() => {
        if (getInactiveJobData && getInactiveJobData.data && getInactiveJobData.data.data) {
            setInactiveJobs(getInactiveJobData.data.data)
        }
    }, [getInactiveJobData])


    const onClear = () => {
        setFilter({
            ...filter,
            jobType: "",
            search: "",
        })
    }

    const viewAll = () => {
        let page = perPage
        setPerPage(page += 8)
    }

    const handleChange = (event: any, name: any) => {
        if (name === "jobType") {
            setFilter({
                ...filter, jobType: event
            })
        }
        else if (name === 'search') {
            setFilter({
                ...filter, search: event,
            })
        }
    };

    useEffect(() => {
        dispatch(getActiveJobsFilterForMain(perPage, pageNumber, "", filter.jobType, "", "inactive", filter.search, false, ""))
    }, [perPage, pageNumber, filter])

    useEffect(() => {
        if (updateJobActiveData.status === 200) {
            dispatch(getActiveJobsFilterForMain(perPage, pageNumber, "", filter.jobType, "", "inactive", filter.search, false, ""))
            toast.success("Jobs reactive successfully")
            dispatch({
                type: JOB_UPDATE_ACTIVE_MAIN,
                payload: []
            })
        }
    }, [updateJobActiveData])

    return (
        <>
            <div className='my_profile_main'>
                <Container fluid>
                    <h1 className='heading-txt'>{t("Employee.InActiveJobs.title")}</h1>
                    <div className='ActiveJobs-contend'>
                        <div className='jobType-select d-block justify-content-between d-md-flex'>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">{t("Employee.InActiveJobs.input.jobType")}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='jobType'
                                    value={filter.jobType}
                                    style={{ width: '225px' }}
                                    label={t("Employee.InActiveJobs.input.jobType")}
                                    onChange={(event) => handleChange(event.target.value, "jobType")}>
                                    {jobCategories && jobCategories.data && jobCategories.data?.map((item: any) => (<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <div className='d-block d-md-flex mt-3 mt-md-0'>
                                <div className="search_input">
                                    <TextField id="outlined-danger" name='search' value={filter.search} type="text" label={t("Employee.InActiveJobs.input.search")} variant="outlined" onChange={(event: any) => handleChange(event.target.value, "search")} />
                                    <img src="./assets/img/search.png" alt="" />
                                </div>
                                {(filter.jobType || filter.search) && <button onClick={() => onClear()} className="clr-btn margin-courses-input ms-0 ms-md-3 mt-3 mt-md-0">{t("course.filter.clear")}</button>}
                            </div>
                        </div>
                        <div>
                            <Row>
                                {inactiveJobs && inactiveJobs.map((item: any) => (
                                    <Col key={item.id} xxl={3} xl={4} lg={6} md={6} sm={6} className="mb-3">
                                        <JobCard
                                            img={'../../../assets/img/logo.png'}
                                            title={item.jobRole.name}
                                            vacancy_txt={`${t("Employee.InActiveJobs.card.noOfVacancies")}: ${item.vacancies}`}
                                            calendar_txt={`${t("Employee.InActiveJobs.card.jobPostedOn")}: ${moment(item.startDate).format("DD-MM-YYYY")}`}
                                            InactiveJobs_btn={true}
                                            location_txt={`${item.town} , ${item.state.name}`}
                                            inactiveData={item}
                                            inActiveEdit={item.id}
                                        />
                                    </Col>
                                ))
                                }
                            </Row>
                        </div>
                        {getInactiveJobData?.data?.page_count > perPage ?
                            <div className='text-center mt-3'>
                                <button className='view_all_btn' onClick={() => viewAll()}>Load more</button>
                            </div> : ""
                        }

                    </div>
                </Container>
            </div >
        </>
    )
}

export default InactiveJobs