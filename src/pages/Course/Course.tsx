import { Pagination, Rating, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { FiShare2 } from 'react-icons/fi';
import StarRatings from 'react-star-ratings';
import SilkSlider from "react-slick";
import AcquireCard from '../../common/AcquireCard';
import VideoCard from '../../common/VideoCard';
import { addCourseRating, addEnrolledCourse, addSavedCourse, deleteEnrolledCourse, deleteSavedCourse, getCourseById, getCourseRatings, getCoursesAction, getSpecificCourseRatings } from '../../redux/actions/courseAction';
import { useDispatch, useSelector } from 'react-redux';
import AuthStorage from '../../helper/AuthStorage';
import { toast } from 'react-toastify';
import { ADD_SAVE_COURSE, ADD_SAVE_COURSE_ERROR, ADD_ENROLLED_COURSE, ADD_ENROLLED_COURSE_ERROR, DELETE_SAVE_COURSE, DELETE_ENROLLED_COURSE } from "../../redux/type";
import STORAGEKEY from '../../config/APP/app.config';
import Loginmodal from '../../components/modals/Loginmodal';
import WelcomeToSwayamConnect from '../../components/modals/WelcomeToSwayamConnect';
import ApplyForAJob from '../../components/modals/ApplyForAJob';
import ForgotPasswordSuccesModel from '../../components/modals/ForgotPasswordSuccesModel';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import { useTranslation } from 'react-i18next';
import CreateAccountmodal from '../../components/modals/CreateAccountmodal';
import RegisterYourAccount from '../../components/modals/RegisterYourAccount';
import { useNavigate } from 'react-router-dom';
import DrAmbedkar from '../../assets/img/Dr_Ambedkar.png'
import { getAllTestimonial } from '../../redux/actions/testimonialAction';
import { getAllFaqs } from '../../redux/actions/faqsAction';
import NoDataFound from '../../common/NoDataFound';
import Share from '../../helper/sharer/Share';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser'
import ChangePasswordModal from '../../components/modals/ChangePassword';

interface CourseReview {
    comment: string
    rating: number
    courseId: any
}

const Course = () => {

    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search)
    const getIdFromUrl: string | null = queryParams.get("id")
    const { t } = useTranslation()
    const dispatch = useDispatch();

    const [showShare, setShowShare] = useState(false);
    const [viewAllModules, setViewAllModules] = useState(false);
    const [showFaq, setShowFaq] = useState('');
    const [getCoursesByIDData, setGetCoursesByIDData] = useState<any>({});
    const [courseByid, setCourseByid] = useState<any>();
    const [avgRating, setAvgRating] = useState(0);
    const [review, setReview] = useState<CourseReview>({
        comment: "",
        rating: 0,
        courseId: getIdFromUrl,
    })
    const [loginModal, setLoginModal] = useState(false);
    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [welcomeToSwayam, setWelcomeToSwayam] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [registermodal, setRegistermodal] = useState<boolean>(false)
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState<boolean>(false)
    const [changePassTog, setChangePassTog] = useState(false)
    const [createAccountmodal, setCreateAccountmodal] = useState<boolean>(false)
    const [reviewError, setReviewError] = useState<any>("")
    const [forgotValue, setForgotValue] = useState<string>('')
    const [filteredModule, setFilteredModule] = useState([])
    const [courses, setCourses] = useState<any[]>([])

    const getCoursesByIdData = useSelector((state: any) => state.courseData.getCoursesByIdData)
    const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
    const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)
    const addSaveCourseError = useSelector((state: any) => state.courseData.addSaveCourseError)
    const addEnrolledCourseData = useSelector((state: any) => state.courseData.addEnrolledCourseData)
    const deleteEnrolledCourseData = useSelector((state: any) => state.courseData.deleteEnrolledCourseData)
    const addEnrolledCourseError = useSelector((state: any) => state.courseData.addEnrolledCourseError)
    const getCourseData = useSelector((state: any) => state.courseData.getCourseData)
    const getSpecificCourseRatingData = useSelector((state: any) => state.courseData.getSpecificCourseRatingData)
    const testimonial = useSelector((state: any) => state.testimonialData.getAllTestimonial)
    const faqs = useSelector((state: any) => state.faqsData.AllFaqs)
    const getCourses = useSelector((state: any) => state.courseData.getCourses)

    let userid = AuthStorage.getStorageData(STORAGEKEY.userId)

    useEffect(() => {
        if (getCourses && getCourses.data && getCourses.data.data) {
            setCourses(getCourses.data.data)
        }
    }, [getCourses])

    useEffect(() => {
        if (getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.data) {
            setFilteredModule(getCoursesByIdData.data.data.courseModules.filter((item: any, i: number) => i < 3))
        }
    }, [getCoursesByIdData])

    useEffect(() => {
        if (filteredModule.length < 3) {
            setViewAllModules(false)
        }
    }, [filteredModule])

    useEffect(() => {
        if (getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.data) {
            setCourseByid(getCoursesByIdData.data)
        }
    }, [getCoursesByIdData])

    useEffect(() => {
        dispatch(getAllTestimonial())
        dispatch(getAllFaqs("COURSE"))

    }, [])

    useEffect(() => {
        dispatch(getCourseById(getIdFromUrl, userid))
    }, [userid])

    useEffect(() => {
        if (courseByid && courseByid.data) {
            dispatch(getCoursesAction(0, 0, courseByid.data.state, courseByid.data.courseCategory?.id, "", "", "", "", courseByid.data.mode))
        }
    }, [courseByid])

    useEffect(() => {
        dispatch(getSpecificCourseRatings(getIdFromUrl, perPage, pageNumber))
    }, [getIdFromUrl, perPage, pageNumber])

    useEffect(() => {
        if (addSaveCourseData && addSaveCourseData.status === 200) {
            dispatch(getCourseById(getIdFromUrl, userid))
            toast.success("Course saved successfully")
            dispatch({
                type: ADD_SAVE_COURSE,
                payload: null,
            })
        }
    }, [addSaveCourseData])

    useEffect(() => {
        if (deleteSavedCourseData && deleteSavedCourseData.status === 200) {
            dispatch(getCourseById(getIdFromUrl, userid))
            toast.success("Course unsaved successfully")
            dispatch({
                type: DELETE_SAVE_COURSE,
                payload: null,
            })
        }
    }, [deleteSavedCourseData])

    useEffect(() => {
        if (addEnrolledCourseData && addEnrolledCourseData.status === 200) {
            toast.success("Course enrolled Successfull")
            dispatch(getCourseById(getIdFromUrl, userid))
            dispatch({
                type: ADD_ENROLLED_COURSE,
                payload: null,
            })
        }
    }, [addEnrolledCourseData])

    useEffect(() => {
        if (deleteEnrolledCourseData && deleteEnrolledCourseData.status === 200) {
            toast.success("Course disenrolled successfully")
            dispatch(getCourseById(getIdFromUrl, userid))
            dispatch({
                type: DELETE_ENROLLED_COURSE,
                payload: null,
            })
        }
    }, [deleteEnrolledCourseData])

    useEffect(() => {
        if (getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.data) {
            setGetCoursesByIDData(getCoursesByIdData.data.data)
            let rating = getCoursesByIdData.data.data.courseRatings.map((item: any) => item.rating)
            var sum = 0;
            for (var i = 0; i < rating.length; i++) {
                sum += parseInt(rating[i]);
            }
            setAvgRating(sum / rating.length);
        }
    }, [getCoursesByIdData])

    const readMore = (str: string, len: number) => {
        if (str?.length < len) {
            return
        }
        let lessString = str?.slice(0, len)
        return lessString + ' ...'
    }

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

    useEffect(() => {
        if (getIdFromUrl && AuthStorage.getToken()) {
            dispatch(getCourseById(getIdFromUrl, userid))
        }
        else {
            dispatch(getCourseById(getIdFromUrl, ""))
        }
    }, [getIdFromUrl])

    useEffect(() => {
        console.log('🎈')
        console.log('🎈', getCoursesByIDData)
    }, [getCoursesByIDData])


    const showAllData = () => {
        if (getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.data) {
            setFilteredModule(getCoursesByIdData.data.data.courseModules)
            setViewAllModules(true)
        }
    }

    const handleSavedCourse = (getIdFromUrl: any) => {
        if (!courseByid?.saved) {
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

    const handleEnrolledCourse = (getIdFromUrl: any) => {
        if (!courseByid?.enrolled) {
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

    const handleChange = (e: any) => {
        setReview({ ...review, [e.target.name]: e.target.value })
    }

    const handleChangeForRating = (e: any, newValue: any) => {
        setReview({ ...review, [e.target.name]: e.target.value })
    }

    const onsubmit = () => {
        if (AuthStorage.getToken()) {
            if (review.comment === "" && (review.rating === 0 || review.rating === null)) {
                setReviewError(`${t('viewScheme.reviewAndStartRequired')}`);
            }
            else if (review.comment === "") {
                setReviewError(`${t('viewScheme.reviewRequired')}`);
            }
            else if (review.comment !== "" && review.comment.length < 50) {
                setReviewError(`${t('viewScheme.reviewRequiredLength')}`)
            }
            else {
                dispatch(addCourseRating(review))
                setReview({
                    ...review,
                    comment: "",
                    rating: 0,
                });
                toast.success("Review added successfully");
                setReviewError('');
            }

        }
        else {
            setLoginModal(true)
            setReview({
                ...review,
                comment: "",
                rating: 0,
                // courseId: "",
            });
        }
    }
    const loadMore = () => {
        let page = perPage
        setPerPage(page += 6)
    }
    const acquirenewskills = {
        dots: false,
        infinite: true,
        autoplay: false,
        speed: 500,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        // className: "center",
        // centerMode: true,
        // centerPadding: "520px",
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    centerMode: true,
                    centerPadding: "220px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: "120px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 574,
                settings: {
                    centerMode: true,
                    centerPadding: "30px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    }

    const Testimonials = {
        dots: false,
        infinite: true,
        autoplay: false,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        centerPadding: "254px",
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    centerMode: true,
                    centerPadding: "220px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: "120px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 574,
                settings: {
                    centerMode: true,
                    centerPadding: "30px",
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    }
    return (
        <>
            <div style={{ backgroundColor: "#f7f8f9", paddingBottom: "50px" }}>
                <div className="position-relative bg-color">
                    {/* {getCoursesByIDData && getCoursesByIDData.thumbnail ? <img src={getCoursesByIDData && getCoursesByIDData.thumbnail} alt="" className='slider-bg' /> : <div className="slider-white-space"></div>} */}
                    {getCoursesByIDData && getCoursesByIDData.bannerImg ? <img src={getCoursesByIDData && getCoursesByIDData.bannerImg} alt="" className='slider-bg' /> : <div className="slider-white-space"></div>}
                    <Container>
                        <div className="breadcrums">
                            <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button onClick={() => navigate("/learn")}>Learn</button> <p>{`>`}</p> <button>{getCoursesByIDData?.name}</button>
                        </div>
                    </Container>
                    <div className="about_Schemes_card tab-main mt-0">
                        <Container>
                            <Row className="about_Schemes">
                                <Col lg={8} className="position-relative">
                                    <div className="course_name">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <h1>{getCoursesByIDData?.name}</h1>
                                            {/* <button className="icon show-share-icon" onBlur={() => { setShowShare(false) }} onClick={() => setShowShare(!showShare)}>
                                                <FiShare2 />
                                            </button> */}
                                        </div>
                                        <div className='d-flex history-time'>
                                            <img src="./assets/img/history.png" alt="" />
                                            <h2>{getCoursesByIDData?.duration} minutes</h2>
                                        </div>
                                    </div>
                                    <div className="scheme_name_text">
                                        <p>{ReactHtmlParser(getCoursesByIDData?.detail)}</p>
                                        <div className='d-flex align-items-center rating-count'>
                                            <StarRatings
                                                rating={avgRating ? avgRating : 0}
                                                starRatedColor="#C90F22"
                                                numberOfStars={5}
                                                name="scheme"
                                                starDimension="22px" />
                                            <p className='ms-2'>({getCoursesByIDData?.courseRatings?.length})</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="about_Schemes_buttons">
                                        <button className={`border-red-btn-true ${getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.saved ? 'border-red-btn-true' : ''} mt-4`} onClick={() => AuthStorage.getStorageData(STORAGEKEY.token) ? handleSavedCourse(getIdFromUrl) : setLoginModal(true)}>{getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.saved ? `${t("course.slider.savedCourse")}` : `${t("course.slider.saveCourse")}`}</button>
                                        <button className={`border-red-btn-true ${getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.enrolled ? 'border-red-btn-true' : ''} mt-4`} onClick={() => AuthStorage.getStorageData(STORAGEKEY.token) ? handleEnrolledCourse(getIdFromUrl) : setLoginModal(true)}>{getCoursesByIdData && getCoursesByIdData.data && getCoursesByIdData.data.enrolled ? `${t("course.slider.enrolled")}` : `${t("course.slider.enroll")}`}</button>
                                        <button className="border-red-btn-true mt-4 position-relative" onBlur={() => setShowShare(false)} onClick={() => setShowShare(!showShare)}>
                                            Share with your Friend
                                            {showShare && (
                                                <div className="share" style={{ left: '-180px' }}>
                                                    <div className="social-share">
                                                        <ul>
                                                            <li>
                                                                <span onClick={() => Share('facebook', 5)}>Facebook</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img onClick={() => Share('facebook', 5)} src="./assets/img/facebook.png"
                                                                        alt="facebook" />{" "}
                                                                </figure>

                                                            </li>
                                                            <li>
                                                                <span>Linkedin</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img src="./assets/img/linkedin.png" alt="Linkedin" />{" "}
                                                                </figure>
                                                            </li>
                                                            <li>
                                                                <span onClick={() => Share('twitter', 5)}>Twitter</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img onClick={() => Share('twitter', 5)} src="./assets/img/twitter.png" alt="Twitter" />{" "}
                                                                </figure>
                                                            </li>
                                                            <li>
                                                                <span onClick={() => Share('whatsapp', 5)}>What’sApp</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img onClick={() => Share('whatsapp', 5)} src="./assets/img/whatsapp.png" alt="WhatsApp" />{""}
                                                                </figure>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <div className='bg-color p-150'>
                    <Container className=''>
                        <div className="know-employee view-scheme-recommendation container-xxl px-0 bg-color">
                            <div className="title mt-4 mb-4">
                                <h1>{t("viewSingalCourse.modules.lable")}</h1>
                            </div>
                            <Row>
                                {filteredModule.map((item: any) => (
                                    <Col lg="4" className='course_video_card pb-4'>
                                        <VideoCard
                                            img={item.videoUrl}
                                            title={item.name}
                                            text={item.detail}
                                            btntext={"Watch  Now"}
                                            link={item.link}
                                            isShowRating={false}
                                            time={item.duration}
                                            rat_count={false}
                                            imgShow={true}
                                            video_url={item.videoUrl}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            {!filteredModule.length ? <NoDataFound text="No modules found" /> : filteredModule.length === 3 ? <p className={`${viewAllModules ? "d-none" : 'text-end mt-2'}`}> <span className='view-all-modules cursor-pointer' onClick={() => showAllData()}>{t("viewSingalCourse.modules.viewAllModules")}</span></p> : ""}
                        </div>
                    </Container>
                    <Container>
                        <div className="add_review know-employee bg-color">
                            <div className="title mt-4 mb-4">
                                <h1>{t("viewScheme.addAReview")}</h1>
                            </div>
                            <Col lg={12}>
                                <Row style={{ borderBottom: '1.5px solid #EBEBEB' }}>
                                    <Col lg={6}>
                                        <div className="review_form">
                                            <TextField
                                                id="outlined-multiline-static"
                                                label={t("viewScheme.yourReview")}
                                                multiline
                                                rows={3}
                                                name="comment"
                                                value={review.comment}
                                                onChange={(e) => handleChange(e)}
                                            />
                                            <p className='review-error-massage'>{reviewError}</p>
                                            <p>{t("viewScheme.reviewErrorMessage")}<span>{t("viewScheme.reviewErrorMessageSpan")}</span></p>
                                        </div>
                                    </Col>
                                    <Col lg={6}>
                                        <div className="rating pb-5 border-0">
                                            <div className="d-flex justify-content-between">
                                                <div className="">
                                                    <div className='mb-3'>
                                                        <h2>{t("viewScheme.addRating")}</h2>
                                                        <Rating
                                                            name="rating"
                                                            value={review.rating}
                                                            onChange={(event, newValue: any) => {
                                                                handleChangeForRating(event, newValue)
                                                            }}
                                                        />
                                                    </div>
                                                    <h2>{t("viewScheme.overallRating")}</h2>
                                                    <StarRatings
                                                        rating={avgRating ? avgRating : 0}
                                                        starRatedColor="#C90F22"
                                                        numberOfStars={5}
                                                        name="scheme"
                                                        starDimension="22px"
                                                    />
                                                </div>
                                                <button className='view_btn mt-auto' onClick={() => onsubmit()}>{t("viewScheme.submit")}</button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <div className="title mt-4 mb-4">
                                    <h1>{t("viewScheme.comments")}</h1>
                                </div>
                                {
                                    getSpecificCourseRatingData?.data?.data.map((item: any) => (
                                        <div className="comments">
                                            <Col lg={2}>
                                                <div className="profile_pic">
                                                    <img src={`./assets/img/profile-pic.png`} alt="" height="100%" width="100%" />
                                                </div>
                                            </Col>
                                            <Col lg={10}>
                                                <div className="text">
                                                    <h3 className="name">{item.createdByUser.name}</h3>
                                                    <p className="comment_text">{item.comment}</p>
                                                    <h3 className='comment_text'>
                                                        <StarRatings
                                                            rating={item.rating}
                                                            starRatedColor="#C90F22"
                                                            numberOfStars={5}
                                                            name="scheme"
                                                            starDimension="22px"
                                                        />
                                                    </h3>
                                                </div>
                                                <div className="like_reply">
                                                    <div className="reply">
                                                        <a href={""}>{t("viewScheme.reply")}</a>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    ))}
                            </Col>
                            <div className='d-flex mt-3 justify-content-end table_pagination align-items-center'>
                                {getSpecificCourseRatingData?.data?.data?.length >= perPage ?
                                    <div className='d-flex mt-3 justify-content-end table_pagination align-items-center ' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => loadMore()}>
                                        {t("loadMore.lable")}
                                    </div> : ""
                                }
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
                        {
                            welcomeToSwayam && <WelcomeToSwayamConnect show={welcomeToSwayam} onHide={() => setWelcomeToSwayam(false)} />
                        }
                    </Container>
                    <Container>
                        <div className="know-employee view-scheme-recommendation container-xxl px-0">
                            <div className="title mt-4 mb-4">
                                <h1>{t("viewScheme.recommendation.lable")}</h1>
                            </div>
                            {courses && courses.length < 3 && courses.length > 0 ?
                                <>
                                    {window.innerWidth > 991 ?
                                        <div className="d-flex container-lg">
                                            {courses.map((item) => (
                                                <Col lg={4} md={6} style={{ zIndex: '1' }}>
                                                    <div className="p-2 d-flex">
                                                        <AcquireCard
                                                            img={item.thumbnail}
                                                            title={item.name}
                                                            text={item.detail}
                                                            btntext={t("course.courses.readMore")}
                                                            navigateTo={`course?id=${item.id}`}
                                                            link={item.link}
                                                            isShowRating={true}
                                                            rating={item.courseRatings.map((item: any) => item.rating)}
                                                            rat_count={true}
                                                            rating_count={item.courseRatings.length}
                                                            save={item.saved}
                                                            id={item.id}
                                                            type='COURSE'
                                                        />
                                                    </div>
                                                </Col>
                                            ))}
                                        </div>
                                        :
                                        <SilkSlider {...acquirenewskills}>
                                            {courses.map((item) => (
                                                <div className="view-scheme-recommendation-card">
                                                    <AcquireCard
                                                        img={item.thumbnail}
                                                        title={item.name}
                                                        text={item.detail}
                                                        btntext={t("course.courses.readMore")}
                                                        navigateTo={`course?id=${item.id}`}
                                                        link={item.link}
                                                        isShowRating={true}
                                                        rating={item.courseRatings.map((item: any) => item.rating)}
                                                        rat_count={true}
                                                        rating_count={item.courseRatings.length}
                                                        save={item.saved}
                                                        id={item.id}
                                                        type='COURSE'
                                                    />
                                                </div>
                                            ))}
                                        </SilkSlider>
                                    }
                                </>
                                :
                                <SilkSlider {...acquirenewskills}>
                                    {courses.map((item) => (
                                        <div className="view-scheme-recommendation-card">
                                            <AcquireCard
                                                img={item.thumbnail}
                                                title={item.name}
                                                text={item.detail}
                                                btntext={t("course.courses.readMore")}
                                                navigateTo={`course?id=${item.id}`}
                                                link={item.link}
                                                isShowRating={true}
                                                rating={item.courseRatings.map((item: any) => item.rating)}
                                                rat_count={true}
                                                rating_count={item.courseRatings.length}
                                                save={item.saved}
                                                id={item.id}
                                                type='COURSE'
                                            />
                                        </div>
                                    ))}
                                </SilkSlider>
                            }
                        </div>
                    </Container>
                </div>
                <div className="bg-f7f8f9">
                    <Container>
                        <div className="know-employee container-xxl px-0">
                            <div className="title mt-4 mb-4">
                                <h1>{t("viewScheme.testimonials.lable")}</h1>
                            </div>
                            <Row className='justify-content-between'>
                                <Col lg={4}>
                                    <h1 className='testimonials-text'>Here's what the Students and employers has to say</h1>
                                </Col>
                                <Col lg={6}>
                                    <SilkSlider {...Testimonials}>
                                        {
                                            testimonial?.data?.map((item: any) => (
                                                <>
                                                    <div className="Testimonials-slider-popup">
                                                        <h5 className="text">{item.message}</h5>
                                                        <h5 className="name">{item.name}</h5>
                                                        <h5 className="role">{item.role}</h5>
                                                    </div>
                                                    <div className="profile_pic Testimonials-image">
                                                        <img src={item.imageUrl} alt="Profile Pic" height="100%" width="100%" />
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </SilkSlider>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
                <Container>
                    <div className="view-schemes-faq">
                        <Row className='justify-content-between align-items-center'>
                            <Col lg={4}>
                                <img src="./assets/img/Question_Two Color.png" alt="" />
                            </Col>
                            <Col lg={7}>
                                <div className="know-employee container-xxl px-0">
                                    <div className="title mt-4 mb-4">
                                        <h1>{t("viewScheme.questions.lable")}</h1>
                                    </div>
                                    {faqs && faqs.data?.length > 0 ? faqs?.data?.map((item: any, index: any) => (

                                        <div className="faq-accordion mb-3" onClick={() => setShowFaq(index + 1)}>
                                            <Col lg={2}>
                                                <div className="number">{index + 1}</div>
                                            </Col>
                                            <Col lg={10}>
                                                <div className="text">
                                                    <div className="head">
                                                        <h1>{item.faq_question}</h1>
                                                        <img src={`./assets/img/${showFaq == index + 1 ? 'Schemes-arrwo-up.png' : 'Schemes-arrwo-down.png'}`} alt="" width="20px" height="12px" />
                                                    </div>
                                                    <div className='body-text'>
                                                        {showFaq !== index + 1 ? readMore(item.faq_answer, 150) : item.faq_answer}
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    )) : <NoDataFound text="No frequently asked questions found" />}
                                    <div className="view-faq">
                                        <Link to={`/faqs?q=${"Learn"}`}>{t("viewScheme.questions.viewAllFAQs")}</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div >
        </>
    )
}

export default Course