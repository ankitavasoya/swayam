import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import location_img from "../../assets/img/Shape.png";
import exp from "../../assets/img/noun-experience-4503584.png";
import salary from "../../assets/img/noun-monthly-salary-3302616.png";
import vacancy from "../../assets/img/noun-vacancy-3194977.png";
import email from "../../assets/img/noun-email-1569815@2x.png";
import work_time from "../../assets/img/noun-working-time-3835278@2x.png";
import job_type from "../../assets/img/noun-laptop-2230586.png";
import week from "../../assets/img/cala.png";
import applicants from "../../assets/img/noun-applicant-4058402@2x.png";
import How_To_Apply from '../schemes/view_schemes/tabs/How_To_Apply';
import Documentation from '../schemes/view_schemes/tabs/Documentation';
import AcquireCard from '../../common/AcquireCard';
import SilkSlider from "react-slick";
import WelcomeToSwayamConnect from '../../components/modals/WelcomeToSwayamConnect';
import { useLocation, useNavigate } from 'react-router-dom'
import { getJobByIdUserPanel } from '../../redux/actions/userPanelAction';
import { useDispatch, useSelector } from 'react-redux';
import ApplyForAJob from '../../components/modals/ApplyForAJob';
import moment from 'moment';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import Loginmodal from '../../components/modals/Loginmodal';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import ForgotPasswordSuccesModel from '../../components/modals/ForgotPasswordSuccesModel';
import { addSavedJob, deleteSavedJob, getJobsFilterForMain, getQueryAction } from '../../redux/actions/jobAction';
import { toast } from 'react-toastify';
import { ADD_JOB_APPLICATION, ADD_SAVED_JOB, ADD_SAVE_COURSE, DELETE_SAVED_JOB, DELETE_SAVE_COURSE } from '../../redux/type';
import { useTranslation } from 'react-i18next';
import { getCoursesAction } from '../../redux/actions/courseAction';
import CreateAccountmodal from '../../components/modals/CreateAccountmodal';
import RegisterYourAccount from '../../components/modals/RegisterYourAccount';
import JobsHero from "../../assets/img/hero_home_image.png"
import { getAllTestimonial, getTestimonial } from '../../redux/actions/testimonialAction';
import { getAllFaqs } from '../../redux/actions/faqsAction';
import NoDataFound from '../../common/NoDataFound';
import ContactToHR from '../../components/modals/ContactToHR';
import { Link } from 'react-router-dom';
import Share from '../../helper/sharer/Share';
import ReactHtmlParser from 'react-html-parser'
import ChangePasswordModal from '../../components/modals/ChangePassword';


const ViewSingleJob = () => {

    const navigate = useNavigate()
    const { t } = useTranslation()
    const location = useLocation()
    const dispatch = useDispatch()
    const [showShare, setShowShare] = useState(false);
    const queryParams = new URLSearchParams(location.search)
    const jobId = queryParams.get("jobId")

    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [getJobById, setGetJobById] = useState<any>()
    const [showFaq, setShowFaq] = useState<string>('');
    const [welcomeToSwayam, setWelcomeToSwayam] = useState<boolean>(false)
    const [applyJob, setApplyJob] = useState<boolean>(false);
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState<boolean>(false)
    const [changePassTog, setChangePassTog] = useState(false)
    const [createAccountmodal, setCreateAccountmodal] = useState<boolean>(false)
    const [registermodal, setRegistermodal] = useState<boolean>(false)
    const [forgotValue, setForgotValue] = useState<string>('')
    const [getQuery, setGetQuery] = useState<any[]>([])
    const [firstNineDataLearn, setFirstNineDataLearn] = useState([])
    const [firstNineDataJobs, setFirstNineDataJobs] = useState([])
    const [contactToHR, setcontactToHR] = useState(false)


    const getJobByIdUserPanelData = useSelector((state: any) => state.userPanelData.getJobById)
    const addSavedJobData = useSelector((state: any) => state.jobData.addSavedJob)
    const deleteSavedJobData = useSelector((state: any) => state.jobData.deleteSavedJob)
    const getQueryData = useSelector((state: any) => state.jobData.getQueryData)
    const getJobsFilterForMainFalseData = useSelector((state: any) => state.jobData.getJobsFilterForMainFalse)
    const getBannerFalseData = useSelector((state: any) => state.courseData.getBannerFlaseData)
    const testimonial = useSelector((state: any) => state.testimonialData.getAllTestimonial)
    const faqs = useSelector((state: any) => state.faqsData.AllFaqs)
    const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
    const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)

    let userId = AuthStorage.getStorageData(STORAGEKEY.userId)

    useEffect(() => {
        if (jobId) {
            if (userId && jobId) {
                dispatch(getJobByIdUserPanel(jobId))
            } else {
                getSingleJob(jobId)
            }
        }
    }, [userId, jobId])

    useEffect(() => {
        dispatch(getQueryAction(5, 1))
        dispatch(getAllFaqs("JOB"))
    }, [])

    useEffect(() => {
        setFirstNineDataLearn(getBannerFalseData?.data?.data.filter((item: any, id: any) => id < 9))
    }, [getBannerFalseData])

    useEffect(() => {
        setFirstNineDataJobs(getJobsFilterForMainFalseData?.data?.data.filter((item: any, id: any) => id < 9))
    }, [getJobsFilterForMainFalseData])

    useEffect(() => {
        dispatch(getJobsFilterForMain(9, 1, "", "", "", "", "", false, ""))
        dispatch(getCoursesAction(9, 1, "", "", "", "", "", false))
    }, [userId])

    useEffect(() => {
        dispatch(getAllTestimonial())
    }, [])

    const getSingleJob = (id: string) => {
        dispatch(getJobByIdUserPanel(id))
    }

    useEffect(() => {
        if (getJobByIdUserPanelData && getJobByIdUserPanelData.data && getJobByIdUserPanelData.data.data) {
            setGetJobById(getJobByIdUserPanelData.data)
        }
    }, [getJobByIdUserPanelData])


    useEffect(() => {
        if (addSavedJobData && jobId && addSavedJobData?.status === 200) {
            toast.success("Job saved successfully")
            dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", false, ""))
            getSingleJob(jobId)
            dispatch({
                type: ADD_SAVED_JOB,
                payload: []
            })
        }
    }, [addSavedJobData])

    useEffect(() => {
        if (deleteSavedJobData && jobId && deleteSavedJobData.message === "Job removed successfully") {
            toast.success("Job unsaved successfully")
            dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", false, ""))
            getSingleJob(jobId)
            dispatch({
                type: DELETE_SAVED_JOB,
                payload: []
            })
        }
    }, [deleteSavedJobData])

    useEffect(() => {
        if (addSaveCourseData && addSaveCourseData.status === 200) {
            toast.success("Course saved successfully")
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false))
            dispatch({
                type: ADD_SAVE_COURSE,
                payload: null,
            })
        }
    }, [addSaveCourseData])

    useEffect(() => {
        if (deleteSavedCourseData && deleteSavedCourseData.status === 200) {
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false))
            toast.success("Course unsaved successfully")
            dispatch({
                type: DELETE_SAVE_COURSE,
                payload: null,
            })
        }
    }, [deleteSavedCourseData])


    const readMore = (str: string, len: number) => {
        if (str?.length < len) {
            return str
        }
        let lessString = str?.slice(0, len)
        return lessString + ' ...'
    }

    // const ForgotPass = () => {
    //     setLoginModal(false)
    //     setForgotPasswordModal(true);
    // }
    // const Register = () => {
    //     setLoginModal(false)
    //     setRegistermodal(true);
    // }
    // const continuePopup = () => {
    //     setForgotPasswordModal(false)
    //     setForgotPasswordSuccesModel(true);
    // }

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

    const handalContactToHR = () => {
        setcontactToHR(true)
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

    useEffect(() => {
        if (getQueryData && getQueryData.data && getQueryData.data.data) {
            setGetQuery(getQueryData.data.data)
        }
    }, [getQueryData])


    const saveJob = (jobId: any) => {
        if (!getJobById?.saved) {
            let body = {
                job: jobId
            }
            dispatch(addSavedJob(body))
        } else {
            let body = {
                job_id: jobId,
                user_id: AuthStorage.getStorageData(STORAGEKEY.userId)
            }
            dispatch(deleteSavedJob(body))
        }
    }

    const applyJobHide = () => {
        setApplyJob(false)
        if (jobId) {
            getSingleJob(jobId)
        }
    }
    const contactToHRHide = () => [

        setcontactToHR(false)
    ]

    return (
        <>
            <img src={JobsHero} alt="" className='slider-bg' />
            <Container>
                <div className="breadcrums">
                    <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button onClick={() => navigate("/jobs")}>Discover New Opportunities</button> <p>{`>`}</p> <button>{getJobById?.data.name?.name}</button>
                </div>
            </Container>
            <Container style={{ marginTop: "-250px", position: "relative", zIndex: "2" }}>
                <img src="./assets/img/Screenshot 2022-01-05 at 3.48.58 PM Copy.png" alt="" />
                <div className='nursing-ditails' style={{ marginTop: "0px" }}>
                    <Row className='border-bottom'>
                        <Col lg={9} md={12}>
                            <div className='ditail'>
                                {getJobById?.data && <h1>{getJobById?.data.name?.name}</h1>}
                                {getJobById?.data && <p>{getJobById?.data?.description}</p>}
                                <div className='jobDitails-content'>
                                    <Row>
                                        <Col lg={3} md={6} className=" mb-xs-3 mb-sm-5 mb-md-3 mb-lg-0">
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={location_img} alt="" />
                                                    <p>{t("viewSingleJob.location")}</p>
                                                </div>
                                                <h1>{getJobById?.data?.town}</h1>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={6} className=" mb-xs-3 mb-sm-5 mb-md-3 mb-lg-0">
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={exp} alt="" />
                                                    <p>{t("viewSingleJob.experience")}</p>
                                                </div>
                                                <h1>{getJobById?.data?.reqExperience}</h1>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={6} className=" mb-xs-3 mb-sm-5 mb-md-3 mb-lg-0">
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={salary} alt="" />
                                                    <p>{t("viewSingleJob.salary")}</p>
                                                </div>
                                                <h1>{getJobById?.data?.salary}</h1>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={6} className=" mb-xs-3 mb-sm-5 mb-md-3 mb-lg-0">
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={vacancy} alt="" />
                                                    <p>{t("viewSingleJob.vacancies")}</p>
                                                </div>
                                                <h1>{getJobById?.data?.vacancies}</h1>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='pt-4 jobDitails-content'>
                                    <Row>
                                        <Col lg={3} md={6} className="mb-xs-3 mb-md-3 mb-lg-0 ">
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center '>
                                                    <img src={email} alt="" />
                                                    <p>{t("viewSingleJob.emailID")}</p>
                                                </div>
                                                <h1>{getJobById?.data?.email}</h1>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={6} className="mb-xs-3 mb-md-3 mb-lg-0 ">
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center '>
                                                    <img src={work_time} alt="" />
                                                    <p>{t("viewSingleJob.workingHrs")}</p>
                                                </div>
                                                <h1>{getJobById?.data?.workingHours}</h1>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={6} className="mb-xs-3 mb-md-3 mb-lg-0 ">
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center '>
                                                    <img src={job_type} alt="" />
                                                    <p>{t("viewSingleJob.jobType")}</p>
                                                </div>
                                                <h1>{getJobById?.data?.type}</h1>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={6}>
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={week} alt="" />
                                                    <p>Publish</p>
                                                </div>
                                                <h1>{moment(getJobById?.data?.startDate).startOf(getJobById?.data?.startDate).fromNow()}</h1>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* <div className='pt-4 pb-4'>
                                    <Row>
                                        <Col lg={3} md={6}>
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={week} alt="" />
                                                    <p>{moment(getJobById?.data?.startDate).startOf(getJobById?.data?.startDate).fromNow()}</p>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={6}>
                                            <div className='location-pin'>
                                                <div className='d-flex align-items-center'>
                                                    <img src={applicants} alt="" />
                                                    <p>{getJobById?.data?.hiredNumber}</p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div> */}
                            </div>
                        </Col>
                        <Col lg={3} md={12}>
                            <div className='btn-content scheme_name flex-column'>
                                <button className={getJobById?.applied ? 'apply_btn' : ''} onClick={() => AuthStorage.getStorageData(STORAGEKEY.token) ? getJobById?.applied ? '' : setApplyJob(true) : setLoginModal(true)}>{getJobById?.applied ? `${t("jobs.slider.applied")}` : `${t("jobs.slider.applyNow")}`}</button>
                                <button className={getJobById?.saved ? 'apply_btn' : ''} onClick={() => AuthStorage.getStorageData(STORAGEKEY.token) ? saveJob(jobId) : setLoginModal(true)}>{getJobById?.saved ? `${t("jobs.slider.saved")}` : `${t("jobs.slider.saveJob")}`}</button>
                                <button onClick={handalContactToHR}>{t("viewSingleJob.button.contactToHR")}</button>
                                <button className="border-red-btn-true position-relative" onBlur={() => setShowShare(false)} onClick={() => setShowShare(!showShare)}>
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
                    <div>
                        <div className='job-detail'>
                            <h1 className='pt-4'>{t("viewSingleJob.lable")}</h1>
                            {/* {getJobById && getJobById.data && getJobById.data.jobDetails && <pre style={{ whiteSpace: 'break-spaces' }}>{getJobById.data.jobDetails}</pre>} */}
                            {getJobById && getJobById.data && getJobById.data.jobDetails && ReactHtmlParser(getJobById.data.jobDetails)}
                        </div>
                    </div>
                </div>
                <div className='accordion-tab-div p-5 mt-5'>
                    <div className='tab-main'>
                        <Tabs className=''>
                            <Tab eventKey="How to Apply" title={t("viewSingleJob.howToApply")}>
                                {getJobById && <How_To_Apply getJobById={getJobById} />}
                            </Tab>
                            <Tab eventKey="Documentation" title={t("viewSingleJob.documentation")}>
                                {getJobById && <Documentation getJobById={getJobById?.data?.documentation} />}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div>
                    <div className="know-employee view-scheme-recommendation container-xxl px-0">
                        <div className="title mt-4 mb-4">
                            <h1>{t("viewSingleJob.recommendation.lable")}</h1>
                        </div>
                        {
                            firstNineDataJobs?.length ?
                                <>

                                    {
                                        firstNineDataJobs && firstNineDataJobs.length < 3 && firstNineDataJobs.length > 0 ?
                                            <>
                                                {
                                                    window.innerWidth > 991 ?
                                                        <div className="d-flex container-lg">
                                                            {firstNineDataJobs?.map((item: any) => (
                                                                <div className="p-2 d-flex"
                                                                    style={{ zIndex: "1" }}
                                                                >
                                                                    <AcquireCard
                                                                        img="labtech.svg"
                                                                        title={item.name.name}
                                                                        text={item.description}
                                                                        btntext={t("viewSingleJob.recommendation.applyNow")}
                                                                        link={item.link}
                                                                        navigateTo={`viewsinglejob?jobId=${item.id}`}
                                                                        isShowRating={false}
                                                                        imgShow={true}
                                                                        save={item.saved}
                                                                        id={item.id}
                                                                        type="JOB"
                                                                    />
                                                                </div>
                                                            ))
                                                            }
                                                        </div>
                                                        :
                                                        <SilkSlider {...acquirenewskills}>
                                                            {firstNineDataJobs?.map((item: any) => (
                                                                <div className="p-2"
                                                                    style={{ zIndex: "1" }}
                                                                >
                                                                    <AcquireCard
                                                                        img="labtech.svg"
                                                                        title={item.name.name}
                                                                        text={item.description}
                                                                        btntext={t("viewSingleJob.recommendation.applyNow")}
                                                                        link={item.link}
                                                                        navigateTo={`viewsinglejob?jobId=${item.id}`}
                                                                        isShowRating={false}
                                                                        imgShow={true}
                                                                        save={item.saved}
                                                                        id={item.id}
                                                                        type="JOB"
                                                                    />
                                                                </div>
                                                            ))
                                                            }
                                                        </SilkSlider>
                                                }
                                            </> :
                                            <SilkSlider {...acquirenewskills}>
                                                {
                                                    firstNineDataJobs?.map((item: any) => (
                                                        <div className="view-scheme-recommendation-card">
                                                            <AcquireCard
                                                                img="labtech.svg"
                                                                title={item.name.name}
                                                                text={item.description}
                                                                btntext={t("viewSingleJob.recommendation.applyNow")}
                                                                link={item.link}
                                                                navigateTo={`viewsinglejob?jobId=${item.id}`}
                                                                isShowRating={false}
                                                                imgShow={true}
                                                                save={item.saved}
                                                                id={item.id}
                                                                type="JOB"
                                                            />
                                                        </div>
                                                    ))
                                                }
                                            </SilkSlider>
                                    }
                                </>
                                : <NoDataFound text="No Recommendation Found" style={{ color: "white" }} />
                        }
                        {/* <p className='text-end'> <a href="">{t("viewSingleJob.recommendation.viewAllSchemes")}</a></p> */}
                    </div>
                </div>
                <div className="know-employee view-scheme-recommendation container-xxl px-0">
                    <div className="title mt-4 mb-4">
                        <h1>{t("viewSingleJob.recommendationCourses.lable")}</h1>
                    </div>

                    {
                        firstNineDataLearn?.length ?
                            <>

                                {
                                    firstNineDataLearn && firstNineDataLearn?.length < 3 && firstNineDataLearn?.length > 0 ?
                                        <>
                                            {
                                                window.innerWidth > 991 ?
                                                    <div className="d-flex container-lg">
                                                        {firstNineDataLearn?.map((item: any) => (
                                                            <div className="p-2 d-flex"
                                                                style={{ zIndex: "1" }}
                                                            >
                                                                <AcquireCard
                                                                    img={item.thumbnail}
                                                                    title={item.name}
                                                                    text={ReactHtmlParser(item.detail)}
                                                                    btntext={t("viewSingleJob.recommendationCourses.enrollNow")}
                                                                    link={item.link}
                                                                    navigateTo={`course?id=${item.id}`}
                                                                    isShowRating={true}
                                                                    rating={item.courseRatings.map((item: any) => item.rating)}
                                                                    // navigateTo={"nursing"}
                                                                    imgShow={false}
                                                                    avg={item.courseRatings?.length}
                                                                    save={item.saved}
                                                                    id={item.id}
                                                                    type="COURSE"
                                                                />
                                                            </div>
                                                        ))
                                                        }
                                                    </div>
                                                    :
                                                    <SilkSlider {...acquirenewskills}>
                                                        {firstNineDataLearn?.map((item: any) => (
                                                            <div className="p-2"
                                                                style={{ zIndex: "1" }}
                                                            >
                                                                <AcquireCard
                                                                    img={item.thumbnail}
                                                                    title={item.name}
                                                                    text={ReactHtmlParser(item.detail)}
                                                                    btntext={t("viewSingleJob.recommendationCourses.enrollNow")}
                                                                    link={item.link}
                                                                    navigateTo={`course?id=${item.id}`}
                                                                    isShowRating={true}
                                                                    rating={item.courseRatings.map((item: any) => item.rating)}
                                                                    // navigateTo={"nursing"}
                                                                    imgShow={false}
                                                                    avg={item.courseRatings?.length}
                                                                    save={item.saved}
                                                                    id={item.id}
                                                                    type="COURSE"
                                                                />
                                                            </div>
                                                        ))
                                                        }
                                                    </SilkSlider>
                                            }
                                        </>
                                        :
                                        <SilkSlider {...acquirenewskills}>
                                            {firstNineDataLearn?.map((item: any) => (
                                                <div className="view-scheme-recommendation-card">
                                                    <AcquireCard
                                                        img={item.thumbnail}
                                                        title={item.name}
                                                        text={ReactHtmlParser(item.detail)}
                                                        btntext={t("viewSingleJob.recommendationCourses.enrollNow")}
                                                        link={item.link}
                                                        navigateTo={`course?id=${item.id}`}
                                                        isShowRating={true}
                                                        rating={item.courseRatings.map((item: any) => item.rating)}
                                                        // navigateTo={"nursing"}
                                                        imgShow={false}
                                                        avg={item.courseRatings?.length}
                                                        save={item.saved}
                                                        id={item.id}
                                                        type="COURSE"
                                                    />
                                                </div>
                                            ))}
                                        </SilkSlider>
                                }
                            </>
                            : <NoDataFound text="No course Found" style={{ color: "white" }} />
                    }
                    {/* <p className='text-end'> <a href="">{t("viewSingleJob.recommendationCourses.viewAllCourses")}</a></p> */}
                </div>
            </Container>
            <div className="bg-f7f8f9">
                <Container>
                    <div className="know-employee container-xxl px-0">
                        <div className="title mt-4 mb-4">
                            <h1>{t("viewSingleJob.testimonials.lable")}</h1>
                        </div>
                        <Row className='justify-content-between'>
                            <Col lg={4}>
                                <h1 className='testimonials-text'>Here's what the Students and employers has to say</h1>
                            </Col>
                            <Col lg={6}>

                                <SilkSlider {...Testimonials}>
                                    {
                                        testimonial?.data?.length ?

                                            testimonial.data.map((item: any) => (
                                                <>
                                                    <div className="Testimonials-slider-popup">
                                                        <h5 className="text">{item.message}</h5>
                                                        <h5 className="name">{item.name}</h5>
                                                        <h5 className="role">{item.role}</h5>
                                                    </div>
                                                    <div className="profile_pic Testimonials-image">
                                                        {/* <img src={`./assets/img/${item.profilePic}`} alt="Profile Pic" height="100%" width="100%" /> */}
                                                        <img src={item.imageUrl} alt="Profile Pic" height="100%" width="100%" />
                                                    </div>
                                                </>
                                            ))
                                            : <NoDataFound text="No Testimonial Found" style={{ color: "white" }} />
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
                                    <h1>{t("viewSingleJob.questions.lable")}</h1>
                                </div>
                                {/* {
                                    getQuery.map((item,i) => (

                                        <div className="faq-accordion mb-3" onClick={() => setShowFaq(i + 1)}>
                                            <Col lg={2}>
                                                <div className="number">{i + 1}</div>
                                            </Col>
                                            <Col lg={10}>
                                                <div className="text">
                                                    <div className="head">
                                                        <h1>{item.name}</h1>
                                                        <img src={`./assets/img/${showFaq === i + 1 ? 'Schemes-arrwo-up.png' : 'Schemes-arrwo-down.png'}`} alt="" width="20px" height="12px" />
                                                    </div>
                                                    <div className='body-text'>
                                                        {showFaq !== i + 1 ? readMore(item.body, 150) : item.body}
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    ))
                                } */}
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
                                    {/* <a href="">{t("viewSingleJob.questions.viewAllFAQs")}</a> */}
                                    <Link to={`/faqs?q=${"Jobs"}`}>{t("viewSingleJob.questions.viewAllFAQs")}</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            {
                welcomeToSwayam && <WelcomeToSwayamConnect show={welcomeToSwayam} onHide={() => setWelcomeToSwayam(false)} />
            }
            {
                loginModal && <Loginmodal show={loginModal} onHide={(item: any) => logginPopup(item)} emailValue={setForgotValue} />
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
                applyJob && <ApplyForAJob show={applyJob} onHide={() => applyJobHide()} />
            }
            {
                contactToHR && <ContactToHR show={contactToHR} onHide={() => contactToHRHide()} getOneData={getJobById} />
            }
        </>
    )
}

export default ViewSingleJob