import { TextField } from '@mui/material'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../common/CourseCard';
import { toast } from 'react-toastify';
import { DELETE_PARTNER_COURSE, EDIT_ACTIVE_PARTNER_COURSE } from '../redux/type';
import { getPatnerCourses } from '../redux/actions/ActiveCourseAction';
import NoDataFound from '../common/NoDataFound';
import { log } from 'console';

interface Filters {
    jobType: string,
    search: string,
}
const ActiveJobs = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();

    const getActiveCourseData = useSelector((state: any) => state.activeCourse.getActiveCourseData)
    const updateCourse = useSelector((state: any) => state.activeCourse.updateCourseActiveData)
    const editCourses = useSelector((state: any) => state.activeCourse.updateCourseActiveData)
    const deleteCourses = useSelector((state: any) => state.activeCourse.deletePartnerCourse)
    const inactiveCourse = useSelector((state: any) => state.activeCourse.deletePartnerCourse)


    const [perPage, setPerPage] = useState(8)
    const [pageNumber, setPageNumber] = useState(1)
    const [activeCourses, setActiveCourses] = useState<any[]>([])
    const [activeJobsFilter, setActiveJobsFilter] = useState<Filters>({
        jobType: "",
        search: "",
    })

    useEffect(() => {
        dispatch(getPatnerCourses(perPage, pageNumber, "", "", "active", activeJobsFilter.search))
    }, [perPage, pageNumber, activeJobsFilter])

    useEffect(() => {
        if (deleteCourses && deleteCourses.status === 200) {
            dispatch(getPatnerCourses(perPage, pageNumber, "", "", "active", activeJobsFilter.search))
        }
    }, [deleteCourses])

    useEffect(() => {
        if (editCourses && editCourses.status === 200) {
            dispatch(getPatnerCourses(perPage, pageNumber, "", "", "active", activeJobsFilter.search))
        }
    }, [editCourses])


    const onClear = () => {
        setActiveJobsFilter({
            ...activeJobsFilter,
            search: "",
            jobType: "",
        })
    }

    const loadMOre = () => {
        let page = perPage
        setPerPage(page += 6)
    }

    useEffect(() => {
        if (inactiveCourse && inactiveCourse.status === 200) {
            toast.success("Course deactived")
            dispatch({
                type: DELETE_PARTNER_COURSE,
                payload: [],
            })
        }
    }, [inactiveCourse])

    const handleChange = (e: any, name: any) => {
        if (name === "jobType") {
            setActiveJobsFilter({
                ...activeJobsFilter, jobType: e
            })
        }
        else if (name === 'search') {
            setActiveJobsFilter({
                ...activeJobsFilter, search: e,
            })
        }
    };

    useEffect(() => {
        if (getActiveCourseData && getActiveCourseData.data && getActiveCourseData.data.data) {
            setActiveCourses(getActiveCourseData.data.data)
        }
        else {
            setActiveCourses([])
        }
    }, [getActiveCourseData])

    // useEffect(() => {
    //     if (getActiveCourseData && getActiveCourseData.data && getActiveCourseData.data.data.length) {
    //         const temp = new Set(getActiveCourseData?.data?.data?.map((item: any) => item.jobTypes.map((item: any) => item.name)));
    //         setUniqueCoursesType(Array.from(temp));
    //     }
    // }, [getActiveCourseData])

    return (
        <>
            <div className='my_profile_main'>
                <Container fluid>
                    <h1 className='heading-txt'>{t("Employee.ActiveJobs.input.activecourses")}</h1>
                    <div className='ActiveJobs-contend'>
                        <div className='jobType-select d-flex flex-wrap justify-content-between'>
                            <div className='d-flex'>
                                <div className="search_input">
                                    <TextField id="outlined-danger" name='search' value={activeJobsFilter.search} type="text" label={t("Employee.ActiveJobs.input.search")} onChange={(event: any) => handleChange(event.target.value, "search")} variant="outlined" />
                                    <img src="../../assets/img/search.png" alt="" />
                                </div>
                                {(activeJobsFilter.jobType || activeJobsFilter.search) && <button onClick={() => onClear()} className="clr-btn margin-courses-input ms-3">{t("course.filter.clear")}</button>}
                            </div>
                        </div>
                        <div>
                            <Row>
                                {activeCourses.map((item) => (
                                    <Col lg={3} className="mb-3">
                                        <CourseCard
                                            img={item.thumbnail}
                                            title={item.name}
                                            location_txt={item.location}
                                            duration={`Duration: ${item.duration}`}
                                            vacancy_txt={`Category: ${item.courseCategory.name}`}
                                            calendar_txt={`${t("Employee.ActiveJobs.card.jobPostedOn")}: ${moment(item.createdAt).format("DD-MM-YYYY")}`}
                                            active_job_btn={true}
                                            allActiveData={item}
                                            inactiveData={item}
                                            id={item.id}
                                        />
                                    </Col>
                                ))
                                }
                            </Row>
                        </div>
                        <div className='text-center mt-3'>
                            {getActiveCourseData?.data?.page_count > perPage ? <button onClick={() => loadMOre()} className='view_all_btn'>{"Load More"}</button> : getActiveCourseData && getActiveCourseData.data && getActiveCourseData.data.data?.length ? "" : <NoDataFound text="No active course found" />}
                        </div>
                    </div>
                </Container>
            </div >
        </>
    )
}

export default ActiveJobs