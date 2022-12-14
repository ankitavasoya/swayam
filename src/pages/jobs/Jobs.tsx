import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import SilkSlider from "react-slick";
import AcquireCard from '../../common/AcquireCard';
import VideoCard from '../../common/VideoCard';
import ApplyForAJob from '../../components/modals/ApplyForAJob';
import VideoModal from '../../components/modals/VideoModal';
import SelectSearch from '../../components/selectandsearch/SelectSearch';
import Slider from '../../components/slider/Slider';
import { getCoursesAction } from '../../redux/actions/courseAction';
import { addSavedJob, deleteSavedJob, getJobCategories, getJobRoles, getJobsFilterForMain } from '../../redux/actions/jobAction';
import { getAllState } from '../../redux/actions/stateAction';
import { toast } from 'react-toastify';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADD_JOB_APPLICATION, ADD_SAVED_JOB, ADD_SAVE_COURSE, DELETE_SAVED_JOB, DELETE_SAVE_COURSE } from '../../redux/type';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import ForgotPasswordSuccesModel from '../../components/modals/ForgotPasswordSuccesModel';
import Loginmodal from '../../components/modals/Loginmodal';
import { Link } from 'react-router-dom';
import tabImg from "../../assets/img/noun-hr-admin-1792114.png";
import tabImg2 from "../../assets/img/noun-accountant-3029889@2x.png";
import tabImg3 from "../../assets/img/noun-developer-962487.png";
import { FiShare2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import NoDataFound from '../../common/NoDataFound';
import CreateAccountmodal from '../../components/modals/CreateAccountmodal';
import RegisterYourAccount from '../../components/modals/RegisterYourAccount';
import JobsHero from "../../assets/img/hero_home_image.png"
import ReactPlayer from 'react-player';
import { getAllUser } from '../../redux/actions/userAction';
import Share from '../../helper/sharer/Share';
import { inspirationalStorie } from '../../redux/actions/InspirationalStoriesActions';
import ReactHtmlParser from 'react-html-parser'
import { log } from 'console';
import ChangePasswordModal from '../../components/modals/ChangePassword';
interface Filter {
    state: string,
    categories: string,
    jobRole: string,
    search: string,
}

const Jobs = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [jobFilter, setJobFilter] = useState<Filter>({
        state: '',
        categories: '',
        jobRole: '',
        search: '',
    })
    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [applyJob, setApplyJob] = useState<boolean>(false);
    const [jobId, setJobId] = useState<string>('');
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [changePassTog, setChangePassTog] = useState(false)
    const [createAccountmodal, setCreateAccountmodal] = useState<boolean>(false)
    const [registermodal, setRegistermodal] = useState<boolean>(false)
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState<boolean>(false)
    const [showShare, setShowShare] = useState<string>("");
    const [forgotValue, setForgotValue] = useState<string>('')
    const [bottomTab, setBottomTab] = useState('');
    const [videoModal, setVideoModal] = useState(false);
    const [playVideo, setPlayVideo] = useState(false);
    const [selectedState, setSelectedState] = useState("Mumbai");
    const [coursesData, setCoursesData] = useState<any>([]);
    const [employerId, setEmployerId] = useState<any>();
    const [offLineCoursedata, setOffLineCoursedata] = useState<any>()
    const [onLineCoursedata, setOnLineCoursedata] = useState<any>()
    const [employer, setEmployer] = useState<any>()
    const [inspirationalData, setInspirationalData] = useState<any[]>([])
    const [inspirational, setInspirational] = useState<any>()
    const [JobsFilterTrueData, setJobsFilterTrueData] = useState<any>()

    const getStateData = useSelector((state: any) => state.stateData.stateData)
    const getJobCategoriesData = useSelector((state: any) => state.jobData.getJobCategories)
    const getJobRolesData = useSelector((state: any) => state.jobData.getJobRoles)
    const getJobsFilterForMainFalseData = useSelector((state: any) => state.jobData.getJobsFilterForMainFalse)
    const getJobsFilterForMainTrueData = useSelector((state: any) => state.jobData.getJobsFilterForMainTrue)
    const addSavedJobData = useSelector((state: any) => state.jobData.addSavedJob)
    const deleteSavedJobData = useSelector((state: any) => state.jobData.deleteSavedJob)
    const getPartner = useSelector((state: any) => state.userData.getAllUser)
    // const getBannerFalseData = useSelector((state: any) => state.courseData.getBannerFlaseData)
    const onLineCourseData = useSelector((state: any) => state.courseData.onLineCourseData)
    const offLineCourseData = useSelector((state: any) => state.courseData.offLineCourseData)
    const getEmployer = useSelector((state: any) => state.userData.getAllUser)
    const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
    const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)
    const inspirationalStories = useSelector((state: any) => state.inspirationalStoriesData.inspirationalStoriesJob)

    useEffect(() => {
        setOffLineCoursedata(offLineCourseData?.data?.data?.slice(0, 3))
    }, [offLineCourseData])

    useEffect(() => {
        setOnLineCoursedata(onLineCourseData?.data?.data?.slice(0, 3))
    }, [onLineCourseData])

    useEffect(() => {
        if (getEmployer && getEmployer.data && getEmployer.data.data) {
            setEmployer(getEmployer.data.data.sort((a: any, b: any) => a.priority - b.priority))
        }
    }, [getEmployer])

    useEffect(() => {
        dispatch(getAllState())
        dispatch(getJobCategories())
        dispatch(getJobRoles())
        dispatch(getAllUser("EMPLOYER"))
        dispatch(getCoursesAction(10, 1, "", "", "", "", "", false, "ONLINE"))
        dispatch(getCoursesAction(10, 1, "", "", "", "", "", false, "OFFLINE"))
    }, [])

    useEffect(() => {
        dispatch(inspirationalStorie(3, 1, "JOB"))
    }, [])

    const handleChange = (e: any, name: string) => {
        if (name === "state") {
            setJobFilter({ ...jobFilter, [name]: e.target.value })
        } else if (name === "categories") {
            setJobFilter({ ...jobFilter, [name]: e.target.value })
        } else if (name === "jobRole") {
            setJobFilter({ ...jobFilter, [name]: e.target.value })
        } else if (name === "search") {
            setJobFilter({ ...jobFilter, [name]: e.target.value })
        }
    };

    useEffect(() => {
        dispatch(getJobsFilterForMain(perPage, pageNumber, jobFilter.state, jobFilter.categories, jobFilter.jobRole, "", jobFilter.search, false, employerId))
    }, [jobFilter, employerId])

    useEffect(() => {
        dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", true, ""))
    }, [pageNumber, perPage])

    useEffect(() => {
        if (getJobsFilterForMainTrueData && getJobsFilterForMainTrueData.data && getJobsFilterForMainTrueData.data.data) {
            setJobsFilterTrueData(getJobsFilterForMainTrueData.data.data.sort((a: any, b: any) => a.priority - b.priority).slice(0, 3))
        }
    }, [getJobsFilterForMainTrueData])

    useEffect(() => {
        if (addSavedJobData && addSavedJobData?.status === 200) {
            toast.success("Job saved successfully")
            dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", true, ""))
            dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", false, ""))
            dispatch({
                type: ADD_SAVED_JOB,
                payload: []
            })
        }
    }, [addSavedJobData])

    useEffect(() => {
        if (deleteSavedJobData && deleteSavedJobData.message === "Job removed successfully") {
            toast.success("Job unsaved successfully")
            dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", true, ""))
            dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", false, ""))
            dispatch({
                type: DELETE_SAVED_JOB,
                payload: []
            })
        }
    }, [deleteSavedJobData])

    useEffect(() => {
        if (addSaveCourseData && addSaveCourseData.status === 200) {
            toast.success("Course saved successfully")
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "OFFLINE"))
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "ONLINE"))
            dispatch({
                type: ADD_SAVE_COURSE,
                payload: null,
            })
        }
    }, [addSaveCourseData])

    useEffect(() => {
        if (deleteSavedCourseData && deleteSavedCourseData.status === 200) {
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "OFFLINE"))
            dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", false, "ONLINE"))
            toast.success("Course unsaved successfully")
            dispatch({
                type: DELETE_SAVE_COURSE,
                payload: null,
            })
        }
    }, [deleteSavedCourseData])

    const clearFilter = () => {
        setJobFilter({
            state: "",
            categories: "",
            jobRole: "",
            search: "",
        })
    }

    const temp: any = {
        Healthcare: "Healthcare-bg",
        Prevention: "Prevention-bg",
        GDA: "GDA-bg"
    };

    useEffect(() => {
        if (inspirationalStories && inspirationalStories.data && inspirationalStories.data.data) {
            setInspirationalData(inspirationalStories.data.data)
            setBottomTab(inspirationalStories.data.data[0]?.title)
            setInspirational(inspirationalStories.data.data[0])
        }
    }, [inspirationalStories])

    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    autoplay: false,
                    arrows: false,
                }
            },
        ]
    };

    const acquirenewskills = {
        dots: false,
        infinite: true,
        autoplay: false,
        speed: 500,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 3,
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

    const topcompaniesjob = {
        dots: false,
        infinite: false,
        autoplay: true,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    arrows: true,
                }
            },
            {
                breakpoint: 574,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    }

    const saveJob = (jobId: string) => {
        if (AuthStorage.getStorageData(STORAGEKEY.token)) {
            let body = {
                job: jobId
            }
            dispatch(addSavedJob(body))
        } else {
            setLoginModal(true)
        }
    }

    const deleteJob = (jobId: string) => {
        if (AuthStorage.getStorageData(STORAGEKEY.token)) {
            let body = {
                job_id: jobId,
                user_id: AuthStorage.getStorageData(STORAGEKEY.userId)
            }
            dispatch(deleteSavedJob(body))
        } else {
            setLoginModal(true)
        }
    }

    const ApplyJob = (id: string) => {
        if (AuthStorage.getStorageData(STORAGEKEY.token)) {
            setApplyJob(true)
            setJobId(id)
        } else {
            setLoginModal(true)
        }
    }

    const applyJobHide = () => {
        setApplyJob(false)
        dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", true, ""))
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

    const openShareDropdown = (i: string) => {
        if (i === showShare) {
            setShowShare("")
        } else {
            setShowShare(i)
        }
    }

    const message = `Hey, Are you looking for Job? Swayam will really help you get job, here the link of job please click on this link ${window.location.origin}`

    return (
        <>

            <div className="slider jobs position-relative">
                <div className="carousel-slider">
                    <SilkSlider {...settings}>
                        {JobsFilterTrueData && JobsFilterTrueData.length > 0 ? JobsFilterTrueData.map((item: any, i: number) =>
                            <>
                                <img src={item.bannerImg ? item.bannerImg : ""} alt="" className='slider-bg' />
                                <Container>
                                    <div className="breadcrums">
                                        <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Discover New Opportunities</button>
                                    </div>
                                    <div className="learn-hearo-text">
                                        <div className="set-slider-text">
                                            <h3>
                                                {item?.name?.name}
                                            </h3>
                                            <div className="d-flex gap-2">
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="d-flex jobs-location gap-2 mt-3">
                                                <img src="./assets/img/white_location.png" alt="" />
                                                <p>{`${item.town} |`}</p>
                                                <p>{t("jobs.slider.jobType") + ":"} {item.jobType.name}</p>
                                            </div>
                                            <div className="gap-3 d-flex flex-wrap mt-4 mb-4">
                                                <button className={`border-red-btn-true ${item.saved ? 'border-red-btn-true' : ''}`} onClick={() => item.saved ? deleteJob(item.id) : saveJob(item.id)}>{item.saved ? `${t("jobs.slider.saved")}` : `${t("jobs.slider.saveJob")}`}</button>
                                                <button className={`border-red-btn-true ${item.applied ? 'border-red-btn-true' : ''}`} onClick={() => navigate(`/viewsinglejob?jobId=${item.id}`)}>{item.applied ? `${t("jobs.slider.applied")}` : `${t("jobs.slider.applyNow")}`}</button>
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                            </>
                        ) : <div
                            className="slider-white-space"
                        ></div>}
                    </SilkSlider>
                </div>
            </div>
            <div className="jobs-2nd-bg">
                <Container className='jobs-filter p-0'>
                    <div className='courses'>
                        <Row>
                            <Col md={12} lg={(!jobFilter.state && !jobFilter.search && !jobFilter.jobRole && !jobFilter.categories) ? 6 : 5}>
                                <Row>
                                    <Col sm={12} md={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">{t("jobs.filter.state")}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={jobFilter.state}
                                                label={t("jobs.filter.state")}
                                                onChange={(e) => handleChange(e, 'state')}
                                            >
                                                {getStateData && getStateData.data && getStateData.data.length > 0 ? getStateData.data.map((ele: any, i: number) =>
                                                    <MenuItem value={ele.id} key={i}>{ele.name}</MenuItem>
                                                ) : ''}
                                            </Select>
                                        </FormControl>
                                    </Col>
                                    <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">{t("jobs.filter.categories")}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={jobFilter.categories}
                                                label={t("jobs.filter.categories")}
                                                onChange={(e) => handleChange(e, 'categories')}
                                            >
                                                {getJobCategoriesData.data && getJobCategoriesData.data.length > 0 ? getJobCategoriesData.data.map((ele: any, i: number) =>
                                                    <MenuItem value={ele.id} key={i}>{ele.name}</MenuItem>
                                                ) : ''}
                                            </Select>
                                        </FormControl>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} lg={(!jobFilter.state && !jobFilter.search && !jobFilter.jobRole && !jobFilter.categories) ? 6 : 5} className="mt-md-3 mt-lg-0">
                                <Row>
                                    <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">{t("jobs.filter.jobRole")}</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={jobFilter.jobRole}
                                                label={t("jobs.filter.jobRole")}
                                                onChange={(e) => handleChange(e, 'jobRole')}
                                            >
                                                {getJobRolesData.data && getJobRolesData.data.length > 0 ? getJobRolesData.data.map((ele: any, i: number) =>
                                                    <MenuItem value={ele.id} key={i}>{ele.name}</MenuItem>
                                                ) : ''}
                                            </Select>
                                        </FormControl>
                                    </Col>
                                    <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                        <div className="search_input">
                                            <TextField id="outlined-danger" name='search' value={jobFilter.search} type="text" label={t("jobs.filter.search")} variant="outlined" onChange={(e: any) => handleChange(e, 'search')} />
                                            <img src="./assets/img/search.png" alt="" />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            {(jobFilter.state || jobFilter.search || jobFilter.jobRole || jobFilter.categories) && <Col lg={1} md={2} className="text-center">
                                <button onClick={() => clearFilter()} className="mt-sm-3 mt-md-3 mt-lg-0 clr-btn margin-courses-input">{t("jobs.filter.clear")}</button>
                            </Col>}
                        </Row>
                    </div>
                </Container>
                <Container className='know-employee'>
                    {/* <SilkSlider {...citynames}>
                        {
                            cityNames.map((item) => (
                                <div className="cityName text-center">
                                    <img className='' style={{ margin: "auto" }} src={item.name === selectedState ? item.redimg : item.img} alt="" onClick={() => setSelectedState(item.name)} />
                                    <p style={item.name === selectedState ? { color: "#000000" } : { color: "#7f7f7f" }}>{item.name}</p>
                                </div>
                            ))
                        }
                    </SilkSlider> */}
                    <div className="Top-Companies-job">
                        <h1>{t("jobs.lable")}</h1>
                        <SilkSlider {...topcompaniesjob}>
                            {employer?.length > 0 ? employer.map((item: any) => (
                                <div className="p-2"
                                    style={{ zIndex: "1" }}
                                >
                                    <div className="silk-slider" style={{ width: "100px", margin: "0 auto", overflow: "hidden", borderRadius: "10px", cursor: "pointer" }}>
                                        <img src={item.avatar && item.avatar !== "null" ? item.avatar : "../../assets/img/noImage.png"} alt="avatar" onClick={() => setEmployerId(item.id)} height="100px" width="100%" style={{ objectFit: "cover" }} />
                                    </div>
                                </div>
                            ))
                                : <NoDataFound text="No job by top companies found" style={{ color: "white" }} />
                            }
                        </SilkSlider>
                    </div>
                </Container>
                <div className="courses-cards tab-main">
                    <Container>
                        <div className="title d-flex justify-content-between">
                            <h1>{t("jobs.jobs")}</h1>
                            <span onClick={() => { employerId ? navigate(`/view_all_jobs?Eid=${employerId}`) : navigate(`/view_all_jobs`) }}>{t("jobs.viewAllJobs")}</span>
                        </div>
                        {getJobsFilterForMainFalseData?.data && getJobsFilterForMainFalseData.data.data && getJobsFilterForMainFalseData.data.data.length > 0 ? getJobsFilterForMainFalseData.data.data.map((items: any, i: number) =>
                            <div className='tab-body mb-4'>
                                <Row className='position-relative align-items-center'>
                                    <Col md={2} className="text-center">
                                        <img src={"../../assets/img/jobs-card-img.png"} alt="" />
                                    </Col>
                                    <Col lg={3}>
                                        <Col md={12}>
                                            <h1>{items?.jobType?.name}</h1>
                                        </Col>
                                        <Col md={12}>
                                            <h1>{`${items?.district?.name} , ${items?.state?.name}`}</h1>
                                        </Col>
                                        <Col md={12}>
                                            <h1 className='job-list' onClick={() => navigate(`/viewsinglejob?jobId=${items.id}`)}>{items?.name?.name}</h1>
                                        </Col>
                                    </Col>
                                    <Col md={4}>
                                        <h1>{items?.description}</h1>
                                    </Col>
                                    <Col md={3} className="d-flex justify-content-between align-items-center">
                                        <button onClick={() => navigate(`/viewsinglejob?jobId=${items.id}`)}>{t("jobs.job.applyNow")}</button>
                                        <button className="icon show-share-icon cursor-pointer" style={{ color: "#C90F22", fontSize: "22px", borderRadius: "0px", backgroundColor: "transparent", boxShadow: "none", width: "fit-content" }} onClick={() => openShareDropdown(i.toString())}>
                                            <FiShare2 />
                                            {showShare === i.toString() && (
                                                <div className="share">
                                                    <div className="social-share">
                                                        <ul>
                                                            <li onClick={() => Share('facebook', `${message}/viewsinglejob?jobId${items.id}`)}>
                                                                <span >{t("jobs.share.facebook")}</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img src="./assets/img/facebook.png" alt="facebook" />{" "}
                                                                </figure>
                                                            </li>
                                                            <li onClick={() => Share('linkedin', `${message}/viewsinglejob?jobId${items.id}`)}>
                                                                <span>{t("jobs.share.linkedin")}</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img src="./assets/img/linkedin.png" alt="Linkedin" />{" "}
                                                                </figure>
                                                            </li>
                                                            <li onClick={() => Share('twitter', `${message}/viewsinglejob?jobId${items.id}`)}>
                                                                <span >{t("jobs.share.twitter")}</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img src="./assets/img/twitter.png" alt="Twitter" />{" "}
                                                                </figure>
                                                            </li>
                                                            <li onClick={() => Share('whatsapp', `${message}/viewsinglejob?jobId${items.id}`)}>
                                                                <span >{t("jobs.share.whatsApp")}</span>
                                                                <figure>
                                                                    {" "}
                                                                    <img src="./assets/img/whatsapp.png" alt="WhatsApp" />{""}
                                                                </figure>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </Col >

                                </Row >
                            </div >
                        ) : <NoDataFound text="No Jobs Found" />
                        }
                    </Container >
                </div >
            </div >
            <div className="courses-cards mt-5 py-5">
                <Container>
                    <div className="title d-flex justify-content-between">
                        <h1>{t("jobs.videosCard.lable")}</h1>
                        <Link to={`/view_all_course?key=${"ONLINE"}`}>{t("View All Video")}</Link>
                    </div>
                </Container>
                <div className="know-employee container-lg px-0">
                    {
                        onLineCoursedata && onLineCoursedata.length < 3 && onLineCoursedata.length > 0 ?
                            <>
                                {
                                    window.innerWidth > 991 ?
                                        <div className="d-flex container-lg">
                                            {onLineCoursedata?.map((item: any) => (
                                                <div className="p-2 d-flex col-lg-4 col-lg-3"
                                                    style={{ zIndex: "1" }}
                                                >
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
                                                </div>
                                            ))
                                            }
                                        </div>
                                        :
                                        <SilkSlider {...acquirenewskills}>
                                            {onLineCoursedata?.map((item: any) => (
                                                <div className="p-2"
                                                    style={{ zIndex: "1" }}
                                                >
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
                                                </div>
                                            ))
                                            }
                                        </SilkSlider>
                                }
                            </>
                            :
                            <SilkSlider {...acquirenewskills}>
                                {onLineCoursedata?.map((item: any) => (
                                    <div className="p-2">
                                        {console.log('🎈', item.courseModules[0])}
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
                                            video_url={item.courseModules[0]?.videoUrl && item.courseModules[0]?.videoUrl}
                                            save={item.saved}
                                            id={item.id}
                                            type='COURSE'
                                        />
                                    </div>
                                ))
                                }
                            </SilkSlider>
                    }
                    {!onLineCoursedata?.length && <NoDataFound text="No Jobs Found" style={{ color: "white" }} />}
                </div>
                {/* <div className="know-employee container-lg px-0">
                        {
                            onLineCoursedata && onLineCoursedata.length < 3 && onLineCoursedata.length > 0 ?
                                <>
                                    {
                                        window.innerWidth > 991 ?
                                            <div className="d-flex container-lg">
                                                {
                                                    onLineCoursedata?.map((item: any) => (
                                                        <div className="p-2 d-flex"
                                                            style={{ zIndex: "1" }}
                                                        >
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
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            :
                                            <SilkSlider {...acquirenewskills}>
                                                {
                                                    onLineCoursedata?.map((item: any) => (
                                                        <div className="p-2"
                                                            style={{ zIndex: "1" }}
                                                        >
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
                                                        </div>
                                                    ))
                                                }
                                            </SilkSlider>

                                    }
                                </> :
                                <SilkSlider {...acquirenewskills}>
                                    {
                                        onLineCoursedata?.map((item: any) => (

                                            <div className="view-scheme-recommendation-card">
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
                                            </div>
                                        ))
                                    }
                                </SilkSlider>
                        }  {!onLineCoursedata?.length && <NoDataFound text="No Informative videos related to Jobs Found" style={{ color: "white" }} />}
                    </div> */}

            </div>

            <Container>

                <div className="know-employee view-scheme-recommendation container-xxl px-0">
                    <div className="title mt-4 mb-5 mb-md-0">
                        <h1>{t("jobs.recommendationJob.lable")}</h1>
                    </div>
                    {offLineCoursedata && offLineCoursedata.length < 3 && offLineCoursedata.length > 0 ?
                        <>
                            {window.innerWidth > 991 ?
                                <div className="d-flex">
                                    {
                                        offLineCoursedata?.map((item: any) => (
                                            <Col lg={4} md={6} style={{ zIndex: '1' }}>
                                                <div className="p-2 d-flex"
                                                >
                                                    <AcquireCard
                                                        img={item.thumbnail}
                                                        title={item.name}
                                                        text={ReactHtmlParser(item.detail)}
                                                        btntext={t("viewSingleJob.recommendationCourses.enrollNow")}
                                                        link={item.link}
                                                        isShowRating={true}
                                                        rating={item.courseRatings.map((item: any) => item.rating)}
                                                        rat_count={true}
                                                        rating_count={item.courseRatings.length}
                                                        navigateTo={`course?id=${item.id}`}
                                                        save={item.saved}
                                                        id={item.id}
                                                        type="COURSE"


                                                    />
                                                </div>
                                            </Col>
                                        ))
                                    }
                                </div>
                                :
                                <SilkSlider {...acquirenewskills}>
                                    {
                                        offLineCoursedata?.map((item: any) => (
                                            <div className="p-2"
                                                style={{ zIndex: "1" }}
                                            >
                                                <AcquireCard
                                                    img={item.thumbnail}
                                                    title={item.name}
                                                    text={ReactHtmlParser(item.detail)}
                                                    btntext={t("viewSingleJob.recommendationCourses.enrollNow")}
                                                    link={item.link}
                                                    isShowRating={true}
                                                    rating={item.courseRatings.map((item: any) => item.rating)}
                                                    rat_count={true}
                                                    rating_count={item.courseRatings.length}
                                                    navigateTo={`course?id=${item.id}`}
                                                    save={item.saved}
                                                    id={item.id}
                                                    type="COURSE"

                                                />
                                            </div>
                                        ))
                                    }
                                </SilkSlider>
                            }
                        </> :
                        <SilkSlider {...acquirenewskills}>
                            {
                                offLineCoursedata?.map((item: any) => (

                                    <div className="view-scheme-recommendation-card">
                                        <AcquireCard
                                            img={item.thumbnail}
                                            title={item.name}
                                            text={ReactHtmlParser(item.detail)}
                                            btntext={t("viewSingleJob.recommendationCourses.enrollNow")}
                                            link={item.link}
                                            isShowRating={true}
                                            rating={item.courseRatings.map((item: any) => item.rating)}
                                            rat_count={true}
                                            rating_count={item.courseRatings.length}
                                            navigateTo={`course?id=${item.id}`}
                                            save={item.saved}
                                            id={item.id}
                                            type="COURSE"

                                        />
                                    </div>
                                ))
                            }
                        </SilkSlider>
                    }
                    {!offLineCoursedata?.length && <NoDataFound text="No Course Found" style={{ color: "white" }} />}
                    <p className='text-end mt-2'>
                        {offLineCoursedata?.length > 3 ? <span className='view-all-modules cursor-pointer' onClick={() => navigate(`/view_all_course?key=${"OFFLINE"}`)}>View All Courses</span > : ""}
                    </p>
                </div>
            </Container>
            <div className={`Schemes_video pb-5`} style={{ backgroundImage: `url(${inspirational?.imageUrl ? inspirational?.imageUrl : './assets/img/Schemes_video.png'})` }} >
                <Container>
                    {/* <h1>Videos</h1> */}
                    <h2>WATCH OUR <br /> INSPIRATIONAL STORIES</h2>
                    <div className="play_button">
                        <img src="./assets/img/play_button.png" alt="" width="72px" height="72px" className='cursor-pointer' onClick={() => setPlayVideo(true)} />
                        <div className="text">
                            <p>Play Video</p>
                            <p>{inspirational?.title}</p>
                        </div>
                    </div>
                    <div className='bottom-tabs mt-5'>
                        {inspirationalData.map((item: any) => (
                            <Button onClick={() => { setBottomTab(item.title); setInspirational(item) }} className={bottomTab === item.title ? "active-btn" : ""}>{item.title}</Button>
                        ))}
                    </div>
                </Container>
            </div>
            {
                playVideo &&
                <div className='react-player'>
                    <img src='./assets/img/wrong.png' className="vedio_close_btn" onClick={() => setPlayVideo(false)} />
                    <ReactPlayer
                        url={inspirational?.videoUrl}
                        width='100%'
                        height='100%'
                        controls
                        playing={playVideo}
                        onEnded={() => {
                            setPlayVideo(false);
                        }}
                    />
                </div>
            }

            {
                applyJob && <ApplyForAJob show={applyJob} onHide={() => applyJobHide()} id={jobId} />
            }
            {
                loginModal && <Loginmodal show={loginModal} onHide={(item: any) => logginPopup(item)} />
            }
            {
                forgotPasswordModal && <ForgotPasswordModal show={forgotPasswordModal} onHide={(item: any) => forgotPopup(item)} emailValue={setForgotValue} />
            }
            {
                changePassTog && <ChangePasswordModal show={changePassTog} onHide={() => setChangePassTog(false)} forgotEmail={forgotValue} />
            }
            {
                createAccountmodal && <CreateAccountmodal show={createAccountmodal} onHide={() => setCreateAccountmodal(false)} forgotValue={forgotValue} />
            }
            {
                registermodal && <RegisterYourAccount show={registermodal} onHide={() => setRegistermodal(false)} />
            }
            {
                forgotPasswordSuccesModel && <ForgotPasswordSuccesModel show={forgotPasswordSuccesModel} onHide={() => setForgotPasswordSuccesModel(false)} />
            }
        </>
    )
}

export default Jobs