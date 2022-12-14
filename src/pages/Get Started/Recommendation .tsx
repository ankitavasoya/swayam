import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AcquireCard from '../../common/AcquireCard'
import SilkSlider from "react-slick";
import slide_img_1 from "../../assets/img/slide_img_1.png";
import slide_img_2 from "../../assets/img/slide_img_2.png";
import slide_img_3 from "../../assets/img/slide_img_3.png";
import slide_img_4 from "../../assets/img/slide_img_4.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ApiGet } from '../../helper/API/ApiData';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ADD_SAVED_JOB, ADD_SAVE_COURSE, DELETE_SAVED_JOB, DELETE_SAVE_COURSE } from '../../redux/type';
import ReactHtmlParser from 'react-html-parser'
import NoDataFound from '../../common/NoDataFound';

const Recommendation = () => {
    const { t } = useTranslation()
    const location: any = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const languageId = AuthStorage.getStorageData(STORAGEKEY.language)
    const userId = AuthStorage.getStorageData(STORAGEKEY.userId)

    const [recommendationsJob, setRecommendationsJob] = useState<any[]>([])
    const [recommendationsCourses, setRecommendationsCourses] = useState<any[]>([])

    const addSavedJobData = useSelector((state: any) => state.jobData.addSavedJob)
    const deleteSavedJobData = useSelector((state: any) => state.jobData.deleteSavedJob)
    const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
    const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)

    const getRecomendedJobs = () => {
        ApiGet(`job/getStartRecomendedJobs?langId=${languageId}&state=${location.state.stateId}&jobRole=${location.state.jobRolesId}&user_id=${userId}`)
            .then((res: any) => {
                if (res && res.data && res.data.data) {
                    setRecommendationsJob(res.data.data.sort((a: any, b: any) => a.priority - b.priority).slice(0, 3))
                }
            })
    }

    const getRecomendedCourses = () => {
        ApiGet(`course/getStartRecomendedCourse?langId=${languageId}&courseCategory=${location.state.coursesCategoryId}&user_id=${userId}`)
            .then((res: any) => {
                if (res && res.data && res.data.data) {
                    setRecommendationsCourses(res.data.data.sort((a: any, b: any) => a.priority - b.priority).slice(0, 3))
                }
            })
    }

    useEffect(() => {
        getRecomendedJobs()
        getRecomendedCourses()
    }, [])

    useEffect(() => {
        if (addSavedJobData && addSavedJobData?.status === 200) {
            toast.success("Job saved successfully")
            getRecomendedJobs()
            dispatch({
                type: ADD_SAVED_JOB,
                payload: []
            })
        }
    }, [addSavedJobData])

    useEffect(() => {
        if (deleteSavedJobData && deleteSavedJobData.message === "Job removed successfully") {
            toast.success("Job unsaved successfully")
            getRecomendedJobs()
            dispatch({
                type: DELETE_SAVED_JOB,
                payload: []
            })
        }
    }, [deleteSavedJobData])

    useEffect(() => {
        if (addSaveCourseData && addSaveCourseData.status === 200) {
            toast.success("Course saved successfully")
            getRecomendedCourses()
            dispatch({
                type: ADD_SAVE_COURSE,
                payload: null,
            })
        }
    }, [addSaveCourseData])

    useEffect(() => {
        if (deleteSavedCourseData && deleteSavedCourseData.status === 200) {
            toast.success("Course unsaved successfully")
            getRecomendedCourses()
            dispatch({
                type: DELETE_SAVE_COURSE,
                payload: null,
            })
        }
    }, [deleteSavedCourseData])


    const slideImg = [
        {
            img: slide_img_1
        },
        {
            img: slide_img_2
        },
        {
            img: slide_img_3
        },
        {
            img: slide_img_4
        },
        {
            img: slide_img_1
        },
    ]

    const slideImgs = {
        dots: true,
        infinite: false,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className="Recommendation_main mt-5">
                <Container>
                    <h1 className='Recommendation_title'>Career Recommendations based on your profile & interests</h1>
                    <div className='Job_Recommendations_main'>
                        <div className="courses-cards">
                            <div className="title d-flex justify-content-between p-3" style={{ alignItems: "center" }}>
                                <h1>Job Recommendations</h1>
                                <Link to="/view_all_jobs">View More</Link>
                            </div>
                        </div>
                        <Row>
                            <div className="d-flex container-lg">
                                {recommendationsJob && recommendationsJob?.length > 1 ? recommendationsJob?.map((item: any, i) => (
                                    <Col lg={4} md={6} style={{ zIndex: '1' }} key={i}>
                                        <div className="p-2 d-flex"
                                        >
                                            <AcquireCard
                                                img="./assets/img/labtech.svg"
                                                title={item.name}
                                                text={item.description}
                                                btntext={t("Home.opportunities.applyNow")}
                                                navigateTo={`viewsinglejob?jobId=${item.id}`}
                                                link={item.link}
                                                isShowRating={false}
                                                location={true}
                                                locationName={item.town}
                                                save={item.saved}
                                                id={item.id}
                                                type="JOB"
                                                redirectPath="viewsinglejob"
                                            />
                                        </div>
                                    </Col>
                                )) : <NoDataFound text="No job recommendations  Found" />
                                }
                            </div>
                        </Row>
                        <div style={{ marginTop: "55px" }}>
                            <div className="courses-cards">
                                <div className="title d-flex justify-content-between p-3" style={{ alignItems: "center" }}>
                                    <h1>Course Recommendations</h1>
                                    <Link to="/view_all_course">View More</Link>
                                </div>
                            </div>
                            <Row>
                                <div className="d-flex container-lg">
                                    {recommendationsCourses && recommendationsCourses?.length > 1 ? recommendationsCourses?.map((item: any, i) => (
                                        <Col lg={4} md={6} style={{ zIndex: '1' }} key={i}>
                                            <div className="p-2 d-flex"
                                            >
                                                <AcquireCard
                                                    img={item.thumbnail}
                                                    title={item.name}
                                                    text={ReactHtmlParser(item.detail)}
                                                    btntext={"Enroll Free"}
                                                    navigateTo={`course?id=${item.id}`}
                                                    link={item.link}
                                                    isShowRating={true}
                                                    rating={item.courseRatings.map((item: any) => item.rating)}
                                                    save={item.saved}
                                                    id={item.id}
                                                    type="COURSE"
                                                />
                                            </div>
                                        </Col>
                                    )) : <NoDataFound text="No course recommendations Found" />
                                    }
                                </div>
                            </Row>
                        </div>
                        <div style={{ marginTop: "55px" }}>
                            <h1 className='Job_Recommendations_sub_title'>View More Healthcare Courses</h1>
                            <div className='carousel-slider Healthcare_Courses_slide'>
                                <SilkSlider {...slideImgs}>
                                    {
                                        slideImg.map((item) => (
                                            <img src={item.img} alt="" />
                                        ))
                                    }
                                </SilkSlider>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mt-5 gap-3 d-flex justify-content-center mb-3 Get_Recommendations'>
                        <button onClick={() => navigate("/")}>Go to home</button>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Recommendation 