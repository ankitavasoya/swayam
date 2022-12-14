import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import CourseCard from '../common/CourseCard'
import moment from 'moment'
import { toast } from 'react-toastify'
import { EDIT_ACTIVE_PARTNER_COURSE } from '../redux/type'
import NoDataFound from '../common/NoDataFound'
import { getPatnerCourses } from '../redux/actions/ActiveCourseAction'
import { log } from 'console'
interface Filters {
    jobType: string,
    search: string,
}
function InactiveCourse() {

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [perPage, setPerPage] = useState<number>(8)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [filter, setFilter] = useState<Filters>({
        jobType: "",
        search: "",
    })
    const onClear = () => {
        setFilter({
            ...filter,
            jobType: "",
            search: "",
        })
    }
    const [inactiveCourses, setInactiveCourses] = useState<any[]>([])
    // const [uniqueCoursesType, setUniqueCoursesType] = useState<any>()
    const getActiveCourseData = useSelector((state: any) => state.activeCourse.getActiveCourseData)
    const updateCourse = useSelector((state: any) => state.activeCourse.updateCourseActiveData)


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

    const loadMOre = () => {
        let page = perPage
        setPerPage(page += 6)
    }

    useEffect(() => {
        if (updateCourse && updateCourse.status === 200) {
            toast.success("Course actived")
            dispatch({
                type: EDIT_ACTIVE_PARTNER_COURSE,
                payload: [],
            })
            dispatch(getPatnerCourses(perPage, pageNumber, "", "", "inactive", filter.search))
        }
    }, [updateCourse])

    useEffect(() => {
        dispatch(getPatnerCourses(perPage, pageNumber, "", "", "inactive", filter.search))
    }, [perPage, pageNumber, filter])

    useEffect(() => {
        if (getActiveCourseData && getActiveCourseData.data && getActiveCourseData.data.data) {
            setInactiveCourses(getActiveCourseData.data.data)
        }
        else {
            setInactiveCourses([])
        }
    }, [getActiveCourseData])

    return (
        <>
            <div className='my_profile_main'>
                <Container fluid>
                    <h1 className='heading-txt'>{t("Employee.InActiveJobs.input.inactivecourses")}</h1>
                    <div className='ActiveJobs-contend'>
                        <div className='jobType-select d-flex justify-content-between'>
                            <div className='d-flex'>
                                <div className="search_input">
                                    <TextField id="outlined-danger" name='search' value={filter.search} type="text" label={t("Employee.InActiveJobs.input.search")} variant="outlined" onChange={(event: any) => handleChange(event.target.value, "search")} />
                                    <img src="../../assets/img/search.png" alt="" />
                                </div>
                                {(filter.jobType || filter.search) && <button onClick={() => onClear()} className="clr-btn margin-courses-input ms-3">{t("course.filter.clear")}</button>}
                            </div>
                        </div>
                        <div>
                            <Row>
                                {
                                    inactiveCourses.map((item) => (
                                        <Col lg={3} className="mb-3">
                                            <CourseCard
                                                img={item.thumbnail}
                                                title={item.name}
                                                location_txt={item.location}
                                                duration={`Duration: ${item.duration}`}
                                                vacancy_txt={`Category: ${item.courseCategory.name}`}
                                                calendar_txt={`${t("Employee.ActiveJobs.card.jobPostedOn")}: ${moment(item.createdAt).format("DD-MM-YYYY")}`}
                                                InactiveJobs_btn={true}
                                                allActiveData={item}
                                                inactiveData={item}
                                                inactiveCourseId={item.id}
                                                sendEmail={true}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                        < div className='text-center mt-3'>
                            {getActiveCourseData?.data?.page_count > perPage ? <button onClick={() => loadMOre()} className='view_all_btn'>{"Load More"}</button> : getActiveCourseData && getActiveCourseData.data && getActiveCourseData.data.data?.length ? "" : <NoDataFound text="No active course found" />}
                        </div>
                    </div>
                </Container>
            </div >
        </>
    )
}

export default InactiveCourse