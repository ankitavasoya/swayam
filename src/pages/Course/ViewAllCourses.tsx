import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { GrUserFemale } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import AcquireCard from '../../common/AcquireCard';
import NoDataFound from '../../common/NoDataFound';
import { getCourseCategoriesAction, getCoursesAction } from '../../redux/actions/courseAction';
import { getAllState } from '../../redux/actions/stateAction';
import { ADD_SAVE_COURSE, DELETE_SAVE_COURSE } from '../../redux/type';
import ReactHtmlParser from 'react-html-parser'
interface CourseFilters {
    star: string
    courseCategory: string
    state: string
    search: string
}

const ViewAllCourses = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();

    const [courseData, setCourseData] = React.useState<CourseFilters>({
        star: "",
        courseCategory: "",
        state: "",
        search: ""
    });
    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [coursesData, setCoursesData] = useState<any[]>([])
    const [bannerSelected, setBannerSelected] = useState(false)
    const [isClearBtn, setIsClearBtn] = useState(false)
    const [status, setStatus] = useState('BOTH');

    const allStateData = useSelector((state: any) => state.stateData.stateData)
    const courseCategoryData = useSelector((state: any) => state.courseData.courseCategory)
    const getAllCourseData = useSelector((state: any) => state.courseData.getCourses)
    const getAllCourse = useSelector((state: any) => state.courseData.getBannerFlaseData)
    const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
    const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)
    const onLineCourseData = useSelector((state: any) => state.courseData.onLineCourseData)
    const offLineCourseData = useSelector((state: any) => state.courseData.offLineCourseData)

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const search: any = queryParams.get("q")
    const key: any = queryParams.get("key")

    useEffect(() => {
        setCourseData({
            ...courseData,
            search: search?.toString()
        })
    }, [search])

    useEffect(() => {
        if (courseData.star || courseData.courseCategory || courseData.state || courseData.search) {
            setIsClearBtn(true)
        }
        else {
            setIsClearBtn(false)
        }
    }, [courseData])

    useEffect(() => {
        if (courseData.star || courseData.courseCategory || courseData.state || courseData.search) {
            setIsClearBtn(true)
        }
        else {
            setIsClearBtn(false)
        }
    }, [courseData])

    const handleChange = (event: SelectChangeEvent) => {
        setCourseData({ ...courseData, [event.target.name]: event.target.value as string });
    };

    useEffect(() => {
        if (getAllCourseData?.data?.data) {
            setCoursesData(getAllCourseData?.data?.data)
        }
    }, [getAllCourseData])

    useEffect(() => {
        dispatch(getCoursesAction(perPage, pageNumber, courseData.state ? courseData.state : "", courseData.courseCategory ? courseData.courseCategory : "", "", courseData.search ? courseData.search : search, courseData.star ? courseData.star : "", "", status))
    }, [perPage, pageNumber, courseData.state, courseData.courseCategory, courseData.star, courseData.search, status])

    // useEffect(() => {
    //     if (search) {
    //         dispatch(getCoursesAction(perPage, pageNumber, "", "", "", search, "", "", status))
    //     }
    // }, [perPage, pageNumber, search])


    useEffect(() => {
        dispatch(getCourseCategoriesAction())
    }, [])

    useEffect(() => {
        dispatch(getAllState())
    }, [])

    const onClear = () => {
        setCourseData({
            ...coursesData,
            star: "",
            courseCategory: "",
            state: "",
            search: "",
        })

    }
    useEffect(() => {
        if (addSaveCourseData && addSaveCourseData.status === 200) {
            toast.success("Course saved successfully")
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", "", status))
            dispatch({
                type: ADD_SAVE_COURSE,
                payload: null,
            })
        }
    }, [addSaveCourseData, status])

    useEffect(() => {
        if (deleteSavedCourseData && deleteSavedCourseData.status === 200) {
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", "", status))
            toast.success("Course unsaved successfully")
            dispatch({
                type: DELETE_SAVE_COURSE,
                payload: null,
            })
        }
    }, [deleteSavedCourseData, status])

    const loadMore = () => {
        let page = perPage
        setPerPage(page += 6)
    }

    const selectCourse = (key: any) => {
        setStatus(key);
    }

    return (
        <>
            <Container>
                <div className='courses'>
                    <Row>
                        {/* <Col md={12} lg={5}> */}
                        <Col md={12} lg={isClearBtn ? 5 : 6}>
                            <Row>
                                <Col sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("course.filter.courseType")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={courseData.courseCategory}
                                            label="Course Type"
                                            onChange={(e: any) => handleChange(e)}
                                            name="courseCategory"
                                        >
                                            {
                                                courseCategoryData.data?.map((item: any) => (
                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Col>

                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("course.filter.state")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={courseData.state}
                                            label="Location"
                                            onChange={(e) => handleChange(e)}
                                            name="state"
                                        >
                                            {
                                                allStateData.data?.map((item: any) => (
                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} lg={isClearBtn ? 5 : 6} className="mt-md-3 mt-lg-0">
                            <Row>

                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("course.filter.ratings")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={courseData.star}
                                            label="Ratings"
                                            onChange={(e) => handleChange(e)}
                                            name="star"
                                        >
                                            <MenuItem value={1}>
                                                <StarRatings
                                                    rating={1}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                <StarRatings
                                                    rating={2}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={3}>
                                                <StarRatings
                                                    rating={3}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={4}>
                                                <StarRatings
                                                    rating={4}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={5}>
                                                <StarRatings
                                                    rating={5}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>

                                {/* <Col sm={12} md={isClearBtn ? 5 : 6} className="mt-sm-3 mt-md-0 margin-courses-input"> */}
                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <div className="search_input">
                                        {/* <TextField id="outlined-danger" type="text" label="Search Schemes"  variant="outlined" onChange={handelSearch} /> */}
                                        <TextField id="outlined-danger" type="text" label={t("course.filter.search")} value={courseData.search} name={"search"} variant="outlined" onChange={(e: any) => handleChange(e)} />
                                        <img src="./assets/img/search.png" alt="" />
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                        {isClearBtn && <Col lg={1} md={2} className="text-end">
                            <button onClick={onClear} className="mt-sm-3 mt-md-3 mt-lg-0 clr-btn margin-courses-input">{t("course.filter.clear")}</button>
                        </Col>}

                    </Row>
                </div>
            </Container>

            <div className="courses-cards">
                <Container>
                    <div className="title d-flex justify-content-between">
                        <h1>{t("viewAllCouses.allCourses.lable")}</h1>
                        {/* <a href='/Course'>View All Courses</a> */}
                        {/* <Link to="/courses">View All Courses</Link> */}
                    </div>
                    <div className='learn-tab pb-5'>
                        <Container>
                            <Tabs onSelect={selectCourse} defaultActiveKey={key ? key : "BOTH"} >
                                {/* <Tab eventKey="Courses" title={t("leran.coursesLable")}> */}
                                <Tab eventKey="BOTH" title={"All"}>
                                    {/* <Courses /> */}
                                    <Row className="gy-3 pb-5">
                                        {coursesData && coursesData?.length ? coursesData?.map((item: any) => (
                                            <Col lg="4">
                                                <AcquireCard
                                                    img={item.thumbnail}
                                                    title={item.name}
                                                    text={ReactHtmlParser(item.detail)}
                                                    btntext={t("course.courses.readMore")}
                                                    navigateTo={`course?id=${item.id}`}
                                                    link={item.link}
                                                    isShowRating={true}
                                                    rating={item.courseRatings.map((item: any) => item.rating)}
                                                    save={item.saved}
                                                    id={item.id}
                                                    type="COURSE"
                                                />
                                            </Col>
                                        )) : <NoDataFound text="No Courses Found" />}
                                    </Row>

                                    {getAllCourseData?.data?.page_count >= perPage ?
                                        <div className='d-flex mt-3 justify-content-center table_pagination align-items-center mb-3' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => loadMore()}>
                                            <button className='load-more'>{t("viewAllJob.jobs.loadMore")} </button>
                                        </div> : ""
                                    }
                                </Tab>
                                {/* <Tab eventKey="Learn More" title={t("leran.learnMore")}> */}
                                <Tab eventKey="ONLINE" title={"Online"}>
                                    <Container>
                                        <Row className="gy-3 pb-5">
                                            {onLineCourseData && onLineCourseData.data && onLineCourseData.data.data.length ?
                                                onLineCourseData?.data?.data?.map((item: any) => (
                                                    <Col lg="4">
                                                        <AcquireCard
                                                            img={item.thumbnail}
                                                            title={item.name}
                                                            text={ReactHtmlParser(item.detail)}
                                                            btntext={t("course.courses.readMore")}
                                                            navigateTo={`course?id=${item.id}`}
                                                            link={item.link}
                                                            isShowRating={true}
                                                            rating={item.courseRatings.map((item: any) => item.rating)}
                                                            save={item.saved}
                                                            id={item.id}
                                                            type="COURSE"
                                                        />
                                                    </Col>
                                                )) : <NoDataFound text="No Courses Found" />}
                                        </Row>

                                        {onLineCourseData?.data?.page_count >= perPage ?
                                            <div className='d-flex mt-3 justify-content-center table_pagination align-items-center mb-3' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => loadMore()}>
                                                <button className='load-more'>{t("viewAllJob.jobs.loadMore")} </button>
                                            </div> : ""
                                        }
                                    </Container>
                                </Tab>
                                <Tab eventKey="OFFLINE" title={"Offline"}>
                                    <Container>
                                        <Row className="gy-3 pb-5">
                                            {offLineCourseData && offLineCourseData.data && offLineCourseData.data.data.length ?
                                                offLineCourseData?.data?.data?.map((item: any) => (
                                                    <Col lg="4">
                                                        <AcquireCard
                                                            img={item.thumbnail}
                                                            title={item.name}
                                                            text={ReactHtmlParser(item.detail)}
                                                            btntext={t("course.courses.readMore")}
                                                            navigateTo={`course?id=${item.id}`}
                                                            link={item.link}
                                                            isShowRating={true}
                                                            rating={item.courseRatings.map((item: any) => item.rating)}
                                                            save={item.saved}
                                                            id={item.id}
                                                            type="COURSE"
                                                        />
                                                    </Col>
                                                )) : <NoDataFound text="No Courses Found" />}
                                        </Row>

                                        {getAllCourseData?.data?.page_count >= perPage ?
                                            <div className='d-flex mt-3 justify-content-center table_pagination align-items-center mb-3' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => loadMore()}>
                                                <button className='load-more'>{t("viewAllJob.jobs.loadMore")} </button>
                                            </div> : ""
                                        }
                                    </Container>
                                </Tab>
                            </Tabs>
                        </Container>
                    </div>


                </Container>
            </div>
        </>
    )
}

export default ViewAllCourses