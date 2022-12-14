import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { log } from 'console';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import AcquireCard from '../../../common/AcquireCard';
import GrowTogatherCard from '../../../common/GrowTogatherCard';
import NoDataFound from '../../../common/NoDataFound';
import VideoCard from '../../../common/VideoCard';
import STORAGEKEY from '../../../config/APP/app.config';
import AuthStorage from '../../../helper/AuthStorage';
import { getCourseCategoriesAction, getCoursesAction } from '../../../redux/actions/courseAction';
import { getAllState } from '../../../redux/actions/stateAction';
import { ADD_SAVE_COURSE, DELETE_SAVE_COURSE } from '../../../redux/type';
import ReactHtmlParser from 'react-html-parser'

interface CourseFilters {
    star: string
    courseCategory: string
    state: string
    search: string
}

const Courses = ({ selectTab, courses }: any) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    // let history = useHistory();

    const [courseData, setCourseData] = React.useState<CourseFilters>({
        star: "",
        courseCategory: "",
        state: "",
        search: ""
    });
    // const [searchFilter, setSearchFilter] = useState<any>("");
    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [coursesData, setCoursesData] = useState<any[]>([])
    const [bannerSelected, setBannerSelected] = useState(false)
    const [isClearBtn, setIsClearBtn] = useState(false)

    const allStateData = useSelector((state: any) => state.stateData.stateData)
    const courseCategoryData = useSelector((state: any) => state.courseData.courseCategory)
    const offLineCourseData = useSelector((state: any) => state.courseData.offLineCourseData)
    const onlineCourseData = useSelector((state: any) => state.courseData.onLineCourseData)
    const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
    const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)



    const userId = AuthStorage.getStorageData(STORAGEKEY.userId)

    const handleChange = (event: SelectChangeEvent) => {
        setCourseData({ ...courseData, [event.target.name]: event.target.value as string });
    };

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
        dispatch(getCourseCategoriesAction())
    }, [])

    useEffect(() => {
        dispatch(getAllState())
    }, [])

    useEffect(() => {
        if (courseData.star || courseData.courseCategory || courseData.state || courseData.search) {
            setIsClearBtn(true)
        }
        else {
            setIsClearBtn(false)
        }
    }, [courseData])

    useEffect(() => {
        if (offLineCourseData && offLineCourseData.data && offLineCourseData.data.data) {
            setCoursesData(offLineCourseData?.data?.data)
        }
    }, [offLineCourseData])
    useEffect(() => {
        if (selectTab === "Courses") {
            dispatch(getCoursesAction(perPage, pageNumber, courseData.state ? courseData.state : "", courseData.courseCategory ? courseData.courseCategory : "", "", courseData.search ? courseData.search : "",
                courseData.star ? courseData.star : "", bannerSelected, "OFFLINE"))
        }
    }, [perPage, pageNumber, courseData.state, courseData.courseCategory, courseData.star, courseData.search, userId, selectTab])

    useEffect(() => {
        dispatch(getCoursesAction(perPage, pageNumber, courseData.state ? courseData.state : "", courseData.courseCategory ? courseData.courseCategory : "", "", courseData.search ? courseData.search : "",
            courseData.star ? courseData.star : "", bannerSelected, "ONLINE"))
    }, [perPage, pageNumber, courseData.state, courseData.courseCategory, courseData.star, courseData.search, userId])

    return (
        <>
            {/* <div className="breadcrums blue-text">
                <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Courses</button>
            </div> */}
            <Container>
                <div className='courses'>
                    <Row>
                        {/* <Col md={12} lg={5}> */}
                        <Col md={12} lg={isClearBtn ? 5 : 6}>
                            <Row>
                                <Col sm={12} md={6}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">{t("course.filter.courseType")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={courseData.courseCategory}
                                            label={t("course.filter.courseType")}
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
                                            label={t("course.filter.state")}
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
                                            label={t("course.filter.ratings")}
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
                        <h1>{t("course.courses.lable")}</h1>
                        {/* <a href='/Course'>View All Courses</a> */}
                        <Link to={`/view_all_course?key=${"OFFLINE"}`}>{t("course.courses.viewAllCourses")}</Link>
                    </div>
                    <Row className="gy-3">
                        {coursesData && coursesData.length > 0 ? coursesData?.map((item: any) => (
                            <Col lg="4">
                                <AcquireCard
                                    img={item.thumbnail}
                                    title={item.name}
                                    text={ReactHtmlParser(item.detail)}
                                    btntext={t("course.courses.readMore")}
                                    navigateTo={`course?id=${item.id}`}
                                    // link={item.courseCategory.name}
                                    link={item.link}
                                    isShowRating={true}
                                    rating={item.courseRatings.map((item: any) => item.rating)}
                                    rat_count={true}
                                    rating_count={item.courseRatings.length}
                                    save={item.saved}
                                    id={item.id}
                                    type='COURSE'
                                />
                            </Col>
                        )) : <NoDataFound text="No Course Found" />}
                    </Row>
                </Container>
            </div>
            <div className="courses-cards mt-5">
                <Container>
                    <div className="title d-flex justify-content-between">
                        <h1>{t("course.videos.learnMore.lable")}</h1>
                        <Link to={`/view_all_course?key=${"ONLINE"}`}>{t("View All Video")}</Link>
                    </div>
                    <Row className="gy-3">
                        {onlineCourseData && onlineCourseData.data && onlineCourseData.data.data && onlineCourseData.data.data.length > 0 ? onlineCourseData.data.data.map((item: any, index: any) => (
                            <Col lg="4">
                                <VideoCard
                                    img={item.thumbnail}
                                    title={item.name}
                                    text={ReactHtmlParser(item.detail)}
                                    btntext={t("jobs.videosCard.watchNow")}
                                    rating={item.courseRatings.map((item: any) => item.rating)}
                                    rat_count={true}
                                    rating_count={item.courseRatings.length}
                                    link={item.link}
                                    isShowRating={true}
                                    imgShow={true}
                                    time={item.time}
                                    video_url={item.courseModules[0]?.videoUrl}
                                    save={item.saved}
                                    id={item.id}
                                    type='COURSE'
                                />
                            </Col>
                        )) : <NoDataFound text="No learn more informative video Found" style={{ color: "white" }} />}
                    </Row>

                </Container>
            </div>
        </>
    )
}

export default Courses