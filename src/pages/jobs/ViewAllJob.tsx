import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import VideoModal from '../../components/modals/VideoModal';
import { getCoursesAction } from '../../redux/actions/courseAction';
import { addSavedJob, getJobCategories, getJobRoles, getJobsFilterForMain } from '../../redux/actions/jobAction';
import { getAllState } from '../../redux/actions/stateAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiShare2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import Share from '../../helper/sharer/Share';
import ReactPlayer from 'react-player';
import NoDataFound from '../../common/NoDataFound';
interface Filter {
    state: string,
    categories: string,
    jobRole: string,
    search: string,
}

const ViewAllJob = () => {
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
    const [showShare, setShowShare] = useState<string>("");
    const [bottomTab, setBottomTab] = useState("Healthcare");
    const [videoModal, setVideoModal] = useState(false);
    const [selectedState, setSelectedState] = useState("Mumbai");
    const [inspirational, setInspirational] = useState<any>()
    const [playVideo, setPlayVideo] = useState(false);
    const [inspirationalData, setInspirationalData] = useState<any[]>([])

    const getStateData = useSelector((state: any) => state.stateData.stateData)
    const getJobCategoriesData = useSelector((state: any) => state.jobData.getJobCategories)
    const getJobRolesData = useSelector((state: any) => state.jobData.getJobRoles)
    const getJobsFilterForMainFalseData = useSelector((state: any) => state.jobData.getJobsFilterForMainFalse)
    const inspirationalStories = useSelector((state: any) => state.inspirationalStoriesData.inspirationalStoriesJob)


    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const search: any = queryParams.get("q")?.split('+').join(' ');
    const EmployerId = queryParams.get("Eid");

    useEffect(() => {
        dispatch(getAllState())
        dispatch(getJobCategories())
        dispatch(getJobRoles())
        dispatch(getCoursesAction(10, 1, "", "", "", "", "", true))
    }, [])

    useEffect(() => {
        if (inspirationalStories && inspirationalStories.data && inspirationalStories.data.data) {
            setInspirationalData(inspirationalStories.data.data)
            setBottomTab(inspirationalStories.data.data[0]?.title)
            setInspirational(inspirationalStories.data.data[0])
        }
    }, [inspirationalStories])

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
        if (search) {
            setJobFilter({
                ...jobFilter,
                search: search?.toString()
            })
        }
    }, [search])

    useEffect(() => {
        if (getJobsFilterForMainFalseData && getJobsFilterForMainFalseData.data) {

        }
    }, [getJobsFilterForMainFalseData])

    useEffect(() => {
        dispatch(getJobsFilterForMain(perPage, pageNumber, jobFilter.state, jobFilter.categories, jobFilter.jobRole, "", jobFilter.search ? jobFilter.search : search, false, EmployerId))
    }, [pageNumber, perPage, jobFilter, EmployerId])

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

    const settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };


    const loadMore = () => {
        let page = perPage
        setPerPage(page += 6)
    }

    const openShareDropdown = (i: string) => {
        if (i === showShare) {
            setShowShare("")
        } else {
            setShowShare(i)
        }
    }

    const citynames = {
        dots: false,
        infinite: false,
        autoplay: true,
        speed: 500,
        arrows: false,
        slidesToShow: 8,
        slidesToScroll: 8,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 5,
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

    return (
        <>
            <div className="jobs-2nd-bg">
                <Container className='position-relative'>
                    <div className='courses' style={{ marginTop: "50px" }}>
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
                                            <TextField id="outlined-danger" name='search' value={jobFilter.search} type="text" label={t("jobs.filter.search")} variant="outlined" onChange={(e) => handleChange(e, 'search')} />
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
                <Container>
                    {/* <div className="job-location">
                        {
                            cityNames.map((item) => (
                                <div className="cityName">
                                    <img src={item.name === selectedState ? item.redimg : item.img} alt="" onClick={() => setSelectedState(item.name)} />
                                    <p>{item.name}</p>
                                </div>
                            ))
                        }
                    </div> */}
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
                </Container>
                <div className="courses-cards tab-main">
                    <Container>
                        <div className="title d-flex justify-content-between">
                            <h1>{t("jobs.viewAllJobs")}</h1>
                        </div>
                        {/* <Row className="gy-3">
                            {getJobsFilterForMainFalseData?.data && getJobsFilterForMainFalseData.data.data && getJobsFilterForMainFalseData.data.data.length > 0 ? getJobsFilterForMainFalseData.data.data.map((item: any, i: number) =>
                                <Col lg="4" key={i}>
                                    <AcquireCard
                                        img={item?.thumbnail ?? 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'}
                                        title={item?.name?.name}
                                        text={item?.description}
                                        btntext={'Apply Now'}
                                        link={item?.link}
                                        isShowRating={false}
                                        location={true}
                                        locationName={item?.town}
                                        navigateTo={`viewsinglejob?jobId=${item.id}`}
                                    />
                                </Col>
                            ) : ''}
                        </Row> */}

                        {getJobsFilterForMainFalseData?.data && getJobsFilterForMainFalseData.data.data && getJobsFilterForMainFalseData.data.data.length > 0 ?
                            getJobsFilterForMainFalseData.data.data.map((items: any, i: number) =>
                                <div className='tab-body mb-4'>
                                    <Row className='position-relative align-items-center'>
                                        <Col md={2} className="text-center">
                                            <img src={"../../assets/img/jobs-card-img.png"} alt="" />
                                        </Col>
                                        {/* <Col md={3}>
                                            <h1>{t("jobs.job.name")}</h1>
                                            <p>{items?.name?.name}</p>
                                        </Col> */}
                                        <Col lg={3}>
                                            <Col md={12}>
                                                <h1>{items?.jobType?.name}</h1>
                                            </Col>
                                            <Col md={12}>
                                                <h1>{`${items?.district?.name} , ${items?.state?.name}`}</h1>
                                            </Col>
                                            <Col md={12}>
                                                <h1>{items?.name?.name}</h1>
                                            </Col>
                                        </Col>
                                        <Col md={3}>
                                            <h1>{items?.description}</h1>
                                            {/* <p>{items?.Descripttxt}<Link to={"/#"} className="link">{items?.link}</Link></p> */}
                                        </Col>
                                        <Col md={4} className="d-flex justify-content-between align-items-center">
                                            <button onClick={() => navigate(`/viewsinglejob?jobId=${items.id}`)}>{t("jobs.job.applyNow")}</button>
                                            <button className="icon show-share-icon cursor-pointer" style={{ color: "#C90F22", fontSize: "22px", borderRadius: "0px", backgroundColor: "transparent", boxShadow: "none", width: "fit-content" }} onClick={() => openShareDropdown(i.toString())}>
                                                <FiShare2 />
                                            </button>
                                        </Col>
                                        {showShare === i.toString() && (
                                            <div className="share">
                                                <div className="social-share">
                                                    <ul>
                                                        <li>
                                                            <span onClick={() => Share('facebook', 5)}>{t("jobs.share.facebook")}</span>
                                                            <figure>
                                                                {" "}
                                                                <img onClick={() => Share('facebook', 5)} src="./assets/img/facebook.png" alt="facebook" />{" "}
                                                            </figure>
                                                        </li>
                                                        <li>
                                                            <span onClick={() => Share('linkedin', 5)}>{t("jobs.share.linkedin")}</span>
                                                            <figure>
                                                                {" "}
                                                                <img onClick={() => Share('linkedin', 5)} src="./assets/img/linkedin.png" alt="Linkedin" />{" "}
                                                            </figure>
                                                        </li>
                                                        <li>
                                                            <span onClick={() => Share('twitter', 5)}>{t("jobs.share.twitter")}</span>
                                                            <figure>
                                                                {" "}
                                                                <img onClick={() => Share('twitter', 5)} src="./assets/img/twitter.png" alt="Twitter" />{" "}
                                                            </figure>
                                                        </li>
                                                        <li>
                                                            <span onClick={() => Share('whatsapp', 5)}>{t("jobs.share.whatsApp")}</span>
                                                            <figure>
                                                                {" "}
                                                                <img onClick={() => Share('whatsapp', 5)} src="./assets/img/whatsapp.png" alt="WhatsApp" />{""}
                                                            </figure>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </Row>
                                </div>
                            ) : <NoDataFound text="No all jobs Found" style={{ color: "white" }} />
                        }

                        {getJobsFilterForMainFalseData?.data?.data?.length >= perPage && <div className='d-flex mt-3 justify-content-center table_pagination align-items-center' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => loadMore()}>
                            <button className='load-more'>{t("viewAllJob.jobs.loadMore")} </button>
                        </div>}
                    </Container>
                </div>
            </div>
            {/* <div className="courses-cards mt-5 py-5">
                <Container>
                    <div className="title d-flex justify-content-between">
                        <h1>Informative videos related to Jobs</h1>
                        <a href=''>View All Videos</a>
                    </div>
                    <Row className="gy-3">
                        {Informative_videos.map((item) => (
                            <Col lg="4">
                                <VideoCard
                                    img={item.img}
                                    title={item.title}
                                    text={item.text}
                                    btntext={item.btntext}
                                    link={item.link}
                                    isShowRating={true}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
            <div className="know-employee view-scheme-recommendation container-xxl px-0">
                <div className="title mt-4 mb-4">
                    <h1>Recommendation Courses Related To Job</h1>
                </div>
                <SilkSlider {...acquirenewskills}>
                    {
                        acquirenewskillsdata.map((item) => (
                            <div className="view-scheme-recommendation-card">
                                <AcquireCard
                                    img={item.img}
                                    title={item.title}
                                    text={item.text}
                                    btntext={item.btntext}
                                    link={item.link}
                                    isShowRating={true}
                                    navigateTo={"nursing"}
                                />
                            </div>
                        ))
                    }
                </SilkSlider>
                <p className='text-end'> <a href="">View All Courses</a></p>
            </div> */}

            {/* <div className={`Schemes_video pb-5 ${temp[bottomTab]}`}>
                <Container>
                    <h1>Videos</h1>
                    <h2>WATCH OUR <br /> INSPIRATIONAL STORIES</h2>
                    <div className="play_button">
                        <img src="./assets/img/play_button.png" alt="" width="72px" height="72px" className='cursor-pointer' onClick={() => setVideoModal(true)} />
                        <div className="text">
                            <p>Play Video</p>
                            <p>Healthcare Sector Skill Council</p>
                        </div>
                    </div>
                    <div className='bottom-tabs mt-5'>
                        <Button onClick={() => setBottomTab("Healthcare")} className={bottomTab === "Healthcare" ? "active-btn" : ""}>Healthcare sector skill council</Button>
                        <Button onClick={() => setBottomTab("Prevention")} className={bottomTab === "Prevention" ? "active-btn" : ""}>Prevention and Management</Button>
                        <Button onClick={() => setBottomTab("GDA")} className={bottomTab === "GDA" ? "active-btn" : ""}>GDA Candidate Course</Button>
                    </div>
                </Container>
            </div> */}
            {/* <div className={`Schemes_video pb-5 ${inspirational?.imageUrl ? inspirational?.imageUrl : temp[bottomTab]}`}> */}
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
            {playVideo &&
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
                videoModal && <VideoModal show={videoModal} onHide={() => setVideoModal(false)} />
            }

        </>
    )
}

export default ViewAllJob