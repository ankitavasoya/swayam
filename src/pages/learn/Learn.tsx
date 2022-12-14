import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Courses from './tabs/Courses'
import SilkSlider from "react-slick";
import { addEnrolledCourse, addSavedCourse, deleteEnrolledCourse, deleteSavedCourse, getCourseById, getCoursesAction } from '../../redux/actions/courseAction';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { toast } from 'react-toastify';
import Loginmodal from '../../components/modals/Loginmodal';
import { ADD_SAVE_COURSE, ADD_SAVE_COURSE_ERROR, ADD_ENROLLED_COURSE, ADD_ENROLLED_COURSE_ERROR, DELETE_SAVE_COURSE, DELETE_ENROLLED_COURSE } from "../../redux/type";
import { useTranslation } from 'react-i18next';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import ForgotPasswordSuccesModel from '../../components/modals/ForgotPasswordSuccesModel';
import CreateAccountmodal from '../../components/modals/CreateAccountmodal';
import RegisterYourAccount from '../../components/modals/RegisterYourAccount';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoCard from '../../common/VideoCard';
import ReactHtmlParser from 'react-html-parser'
import NoDataFound from '../../common/NoDataFound';
import ChangePasswordModal from '../../components/modals/ChangePassword';

const Learn = () => {

    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch();
    let userid = AuthStorage.getStorageData(STORAGEKEY.userId)
    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [bannerSelected, setBannerSelected] = useState(true)
    const [loginModal, setLoginModal] = useState(false)
    const [createAccountmodal, setCreateAccountmodal] = useState(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
    const [registermodal, setRegistermodal] = useState(false)
    const [forgotValue, setForgotValue] = useState<string>('')
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState(false)
    const [changePassTog, setChangePassTog] = useState(false)
    const [selectdKey, setSelectdKey] = useState("Courses")

    const getBannerTrueData = useSelector((state: any) => state.courseData.getBannerData);
    const getCoursesByIdData = useSelector((state: any) => state.courseData.getCoursesByIdData)
    const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
    const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)
    const addEnrolledCourseData = useSelector((state: any) => state.courseData.addEnrolledCourseData)
    const deleteEnrolledCourseData = useSelector((state: any) => state.courseData.deleteEnrolledCourseData)
    const onlineCourse = useSelector((state: any) => state.courseData.onLineCourseData)


    useEffect(() => {
        dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", bannerSelected))
    }, [perPage, pageNumber, bannerSelected, userid])

    useEffect(() => {
        if (selectdKey === "Learn More") {
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "ONLINE"))
        }
    }, [perPage, pageNumber, bannerSelected, userid, selectdKey])

    useEffect(() => {
        if (addSaveCourseData && addSaveCourseData.status === 200) {
            toast.success("Course saved successfully")
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "ONLINE"))
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "OFFLINE"))
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", true))

            dispatch({
                type: ADD_SAVE_COURSE,
                payload: null,
            })
        }
    }, [addSaveCourseData])

    useEffect(() => {
        if (deleteSavedCourseData && deleteSavedCourseData.status === 200) {

            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "ONLINE"))

            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "OFFLINE"))
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", true))
            toast.success("Course unsaved successfully")
            dispatch({
                type: DELETE_SAVE_COURSE,
                payload: null,
            })
        }
    }, [deleteSavedCourseData])

    useEffect(() => {
        if (addEnrolledCourseData && addEnrolledCourseData.status === 200) {
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", bannerSelected))
            toast.success("Course enrolled successfully")
            dispatch({
                type: ADD_ENROLLED_COURSE,
                payload: null,
            })
        }
    }, [addEnrolledCourseData])

    useEffect(() => {
        if (deleteEnrolledCourseData && deleteEnrolledCourseData.status === 200) {
            toast.success("Course disenrolled successfully")
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", bannerSelected))
            dispatch({
                type: DELETE_ENROLLED_COURSE,
                payload: null,
            })
        }
    }, [deleteEnrolledCourseData])

    const handleSavedCourse = (getIdFromUrl: any, saved: any) => {
        if (!saved) {
            dispatch(addSavedCourse(getIdFromUrl))
        }
        else {
            let body = {
                user_id: userid,
                course_id: getIdFromUrl,
            }
            dispatch(deleteSavedCourse(body))
        }
    }

    const handleEnrolledCourse = (getIdFromUrl: any, enrolled: any) => {
        if (!enrolled) {
            dispatch(addEnrolledCourse(getIdFromUrl))
        }
        else {
            let body = {
                user_id: userid,
                course_id: getIdFromUrl
            }
            dispatch(deleteEnrolledCourse(body))
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const logginPopup = (item: any) => {
        if (item === "ForgotPass") {
            setLoginModal(false)
            setForgotPasswordModal(true);
        } else if (item === "register") {
            setLoginModal(false)
            setRegistermodal(true);
        } else {
            setLoginModal(false)
        }
    }
    const forgotPopup = (item: any) => {
        if (item === "continue") {
            setForgotPasswordModal(false)
            setForgotPasswordSuccesModel(true);
            setTimeout(() => {
                setForgotPasswordSuccesModel(false);
                setChangePassTog(true)
            }, 5000);
        } else if (item === "register") {
            setLoginModal(false)
            setRegistermodal(true);
            setForgotPasswordModal(false)
        } else {
            setForgotPasswordModal(false)
        }
    }


    const handalSelect = (key: any) => {
        setSelectdKey(key)

    }
    const loadMore = () => {
        let page = perPage
        setPerPage(page += 6)
    }
    return (
        <>

            <div className="slider position-relative">
                <div className="carousel-slider">
                    <SilkSlider {...settings}>
                        {getBannerTrueData && getBannerTrueData.data && getBannerTrueData.data.data?.length > 0 ? getBannerTrueData.data.data.map((item: any) => (
                            <>
                                <img src={item.bannerImg ? item.bannerImg : ""} alt="" className='slider-bg' />
                                <Container>
                                    <div className="breadcrums">
                                        <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Learn</button>
                                    </div>
                                    <div className="learn-hearo-text">
                                        <div className=" set-slider-text">
                                            <h3>
                                                {item.name}
                                            </h3>
                                            <div className="d-flex gap-2">
                                                <img src="../assets/img/history.png" alt="" />
                                                <p>
                                                    {item.duration}</p>
                                            </div>
                                            <div className="d-sm-flex mt-5 gap-5 ">
                                                <button className={`border-red-btn-true ${item.saved ? 'border-red-btn-true' : ''} mt-4`} onClick={() => AuthStorage.getStorageData(STORAGEKEY.token) ? handleSavedCourse(item.id, item.saved) : setLoginModal(true)}>{item.saved ? `${t("course.slider.savedCourse")}` : `${t("course.slider.saveCourse")}`}</button>
                                                <button className={`border-red-btn-true ${item.enrolled ? 'border-red-btn-true' : ''} mt-4`} onClick={() => AuthStorage.getStorageData(STORAGEKEY.token) ? handleEnrolledCourse(item.id, item.enrolled) : setLoginModal(true)}>{item.enrolled ? `${t("course.slider.enrolled")}` : `${t("course.slider.enroll")}`}</button>
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                            </>
                        )) : <div className="slider-white-space"></div>}
                    </SilkSlider>
                </div>
            </div>
            {
                loginModal && <Loginmodal show={loginModal} onHide={(item: any) => logginPopup(item)} />
            }
            {
                forgotPasswordModal && <ForgotPasswordModal show={forgotPasswordModal} onHide={(item: any) => forgotPopup(item)} emailValue={setForgotValue} />
            }
            {
                forgotPasswordSuccesModel && <ForgotPasswordSuccesModel show={forgotPasswordSuccesModel} onHide={() => setForgotPasswordSuccesModel(false)} forgotValue={forgotValue} />
            }
            {
                changePassTog && <ChangePasswordModal show={changePassTog} onHide={() => setChangePassTog(false)} forgotEmail={forgotValue} />
            }
            {
                createAccountmodal && <CreateAccountmodal show={createAccountmodal} onHide={() => setCreateAccountmodal(false)} />
            }
            {
                registermodal && <RegisterYourAccount show={registermodal} onHide={() => setRegistermodal(false)} />
            }
            <div className='learn-tab pb-5'>
                <Container>
                    <Tabs defaultActiveKey="Courses" onSelect={(key: any) => handalSelect(key)}>
                        <Tab eventKey="Courses" title={t("leran.coursesLable")}>
                            <Courses selectTab={selectdKey} courses={onlineCourse} />
                        </Tab>
                        <Tab eventKey="Learn More" title={t("leran.learnMore")}>
                            <Container>
                                <div className="titlen pt-3">
                                    <Row className="gy-3">
                                        {onlineCourse && onlineCourse.data && onlineCourse.data.data && onlineCourse.data.data.length > 0 ? onlineCourse.data.data.map((item: any, index: any) => (
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
                                    {onlineCourse?.data?.page_count >= perPage ?
                                        <div className='d-flex mt-3 justify-content-center table_pagination align-items-center mb-3' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => loadMore()}>
                                            <button className='load-more'>{t("viewAllJob.jobs.loadMore")} </button>
                                        </div> : ""
                                    }
                                </div>
                            </Container>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </>
    )
}

export default Learn