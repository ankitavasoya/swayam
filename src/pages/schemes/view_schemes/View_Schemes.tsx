import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import Documentation from './tabs/Documentation';
import How_To_Apply from './tabs/How_To_Apply';
import location_img from "../../../assets/img/Shape.png";
import week from "../../../assets/img/cala.png";
import StarRatings from 'react-star-ratings';
import AcquireCard from '../../../common/AcquireCard';
import SilkSlider from "react-slick";
import { useDispatch, useSelector } from "react-redux"
import { addEnrolledSchemesAction, addSaveedSchemesAction, allScheme, deleteErollSchemesAction, deleteSaveedSchemesAction, getOneScheme, getRecomendedSchemes } from '../../../redux/actions/schemesAction';
import { toast } from 'react-toastify';
import Loginmodal from '../../../components/modals/Loginmodal';
import AuthStorage from "../../../helper/AuthStorage";
import Rating from '@mui/material/Rating';
import { specificSchemesRating } from '../../../redux/actions/schemeRatingAction';
import STORAGEKEY from '../../../config/APP/app.config';
import ForgotPasswordSuccesModel from '../../../components/modals/ForgotPasswordSuccesModel';
import ForgotPasswordModal from '../../../components/modals/ForgotPasswordModal';
import { ApiPost } from '../../../helper/API/ApiData';
import { ADD_ENROLLED_SCHEMES, ADD_SAVEED_SCHEMES, DELETE_ENROLL_SCHEMES, DELETE_SAVEED_SCHEMES } from '../../../redux/type';
import { useTranslation } from 'react-i18next';
import CreateAccountmodal from '../../../components/modals/CreateAccountmodal';
import RegisterYourAccount from '../../../components/modals/RegisterYourAccount';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { getAllTestimonial } from '../../../redux/actions/testimonialAction';
import { getAllFaqs } from '../../../redux/actions/faqsAction';
import NoDataFound from '../../../common/NoDataFound';
import { Link } from 'react-router-dom';
import Share from '../../../helper/sharer/Share';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser'
import { log } from 'console';
import ChangePasswordModal from '../../../components/modals/ChangePassword';

const View_Schemes = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    let userid = AuthStorage.getStorageData(STORAGEKEY.userId)

    const [perPage, setPerPage] = useState(6)
    const [playVideo, setPlayVideo] = useState(false);
    const [pageNumber, setPageNumber] = useState(1)
    const [showShare, setShowShare] = useState(false);
    const [showFaq, setShowFaq] = useState('');
    const [schemeshData, setSchemeshData] = useState<any>()
    const [loginModal, setLoginModal] = useState(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState(false)
    const [changePassTog, setChangePassTog] = useState(false)
    const [createAccountmodal, setCreateAccountmodal] = useState(false)
    const [starRating, setstarRating] = React.useState<number>(0);
    const [review, setReview] = useState<any>("")
    const [reviewError, setReviewError] = useState<any>()
    const [reviewData, setReviewData] = useState<any>()
    const [forgotValue, setForgotValue] = useState<string>('')
    const [registermodal, setRegistermodal] = useState<boolean>(false)
    const [getOneSchemedata, setGetOneSchemedata] = useState<any>()
    const [location, setLocation] = useState<any>([])
    const [avgRating, setAvgRating] = useState(0);
    const [recommendedScheme, setRecommendedScheme] = useState<any>();

    const testimonial = useSelector((state: any) => state.testimonialData.getAllTestimonial)
    const getOneSchemeData = useSelector((state: any) => state.schemesData.getOneScheme)
    const commentsData = useSelector((state: any) => state.schemesRating.specificSchemeRatings)
    const addSavedScheme = useSelector((state: any) => state.schemesData.addSavedSchemes)
    const addEnrollScheme = useSelector((state: any) => state.schemesData.AddEnrolledSChemes)
    const deleteSavedScheme = useSelector((state: any) => state.schemesData.deleteSavedSchemes)
    const deleteEnrollScheme = useSelector((state: any) => state.schemesData.deleteEnrollSchemes)
    const recommendationScheme = useSelector((state: any) => state.schemesData.getSchemeRecommendation)
    const faqs = useSelector((state: any) => state.faqsData.AllFaqs)

    let params = new URLSearchParams(document.location.search);
    let getUrlId: any = params.get("Id");

    useEffect(() => {
        if (getOneSchemeData && getOneSchemeData.data && getOneSchemeData.data.data) {
            setGetOneSchemedata(getOneSchemeData.data)
        }
    }, [getOneSchemeData])

    useEffect(() => {
        setLocation(schemeshData?.locations?.map((items: any) => items.name))
    }, [schemeshData])

    useEffect(() => {
        if (getUrlId) {
            dispatch(getOneScheme(getUrlId))
        }
    }, [getUrlId, userid])

    useEffect(() => {
        dispatch(getAllTestimonial())
        dispatch(getAllFaqs("SCHEME"))
    }, [])
    useEffect(() => {
        if (schemeshData) {
            dispatch(getRecomendedSchemes(schemeshData.schemeCategory?.id, userid))
        }
    }, [schemeshData, userid])
    useEffect(() => {
        if (recommendationScheme && recommendationScheme.data && recommendationScheme.data.length > 0) {
            setRecommendedScheme(recommendationScheme.data.sort((a: any, b: any) => a.priority - b.priority).slice(0, 3))
        }
    }, [recommendationScheme])


    useEffect(() => {
        if (getOneSchemeData.data) {
            setSchemeshData(getOneSchemeData?.data.data)
            let rating = getOneSchemeData?.data?.data?.schemeRatings?.map((item: any) => item.rating)
            var sum = 0;
            for (var i = 0; i < rating.length; i++) {
                sum += parseInt(rating[i]);
            }
            setAvgRating(sum / rating.length);
        }
    }, [getOneSchemeData])

    useEffect(() => {
        if (addSavedScheme && addSavedScheme?.status === 200) {
            toast.success("Scheme saved successfully")
            dispatch(getOneScheme(getUrlId))
            dispatch({
                type: ADD_SAVEED_SCHEMES,
                payload: []
            })
        }
    }, [addSavedScheme])

    useEffect(() => {
        if (addEnrollScheme && addEnrollScheme?.status === 200) {
            toast.success("Scheme enrolled successfully")
            dispatch(getOneScheme(getUrlId))
            dispatch({
                type: ADD_ENROLLED_SCHEMES,
                payload: []
            })
        }
    }, [addEnrollScheme])

    useEffect(() => {
        if (deleteSavedScheme && deleteSavedScheme?.status === 200) {
            dispatch(getOneScheme(getUrlId))
            toast.success("Scheme unsave successfully")
            dispatch({
                type: DELETE_SAVEED_SCHEMES,
                payload: []
            })
        }
    }, [deleteSavedScheme])

    useEffect(() => {
        if (deleteEnrollScheme && deleteEnrollScheme?.status === 200) {
            dispatch(getOneScheme(getUrlId))
            toast.success("Scheme disenrolled  successfully")
            dispatch({
                type: DELETE_ENROLL_SCHEMES,
                payload: []
            })
        }
    }, [deleteEnrollScheme])

    const handalSavedScheme = () => {
        if (AuthStorage.getToken()) {
            if (!getOneSchemeData?.data?.saved) {
                dispatch(addSaveedSchemesAction(getUrlId))
            }
            else {
                dispatch(deleteSaveedSchemesAction(getUrlId))
            }
        }
        else {
            setLoginModal(true)
        }
    }

    const handalEnrolledScheme = () => {
        if (AuthStorage.getToken()) {
            if (!getOneSchemeData?.data?.enrolled) {
                dispatch(addEnrolledSchemesAction(getUrlId))
            }
            else {
                dispatch(deleteErollSchemesAction(getUrlId))
            }
        }
        else {
            setLoginModal(true)
        }
    }

    const handalViewWebsite = () => {
        window.open(getOneSchemeData?.data?.data?.website)
    }

    const loadMore = () => {
        let page = perPage
        setPerPage(page += 6)
    }

    useEffect(() => {
        dispatch(specificSchemesRating(getUrlId, perPage, pageNumber))
    }, [specificSchemesRating, perPage, pageNumber])

    const handalSubmit = async () => {
        if (AuthStorage.getToken() && AuthStorage.getStorageData(STORAGEKEY.userType)) {
            if (review === "" && (starRating === 0 || starRating === null)) {
                setReviewError(`${t('viewScheme.reviewAndStartRequired')}`)
            }
            else if (review === "") {
                setReviewError(`${t('viewScheme.reviewRequired')}`)
            } else if (review !== "" && review.length < 50) {
                setReviewError(`${t('viewScheme.reviewRequiredLength')}`)
            }
            else {
                try {
                    const res: any = await ApiPost(`schemeRating/addSchemeRating`, { comment: review, rating: starRating, schemeId: getUrlId })
                    setReviewData(res)
                    if (res.status === 200) {
                        dispatch(specificSchemesRating(getUrlId, perPage, pageNumber))
                        setReview('')
                        setstarRating(0)
                        toast.success(res.message)
                        setReviewError('')
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        }
        else {
            setLoginModal(true)
        }
    }

    const readMore = (str: string, len: number) => {
        if (str?.length < len) {
            return
        }
        let lessString = str.slice(0, len)
        return lessString + ' ...'
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

    return (
        <>

            <div className="slider position-relative">
                <div className="carousel-slider">
                    {schemeshData && schemeshData.thumbnail ? < img src={schemeshData && schemeshData.thumbnail} alt="" className='slider-bg' /> : <div className="slider-white-space"></div>}
                    <Container>
                        <div className="breadcrums">
                            <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button onClick={() => navigate("/schemes")}>schemes</button> <p>{`>`}</p> <button>{schemeshData?.name}</button>
                        </div>
                    </Container>
                    <Container style={{ position: "relative", marginTop: "-120px", zIndex: "1", padding: "0px", borderRadius: "15px", background: "#FFFFFF" }}>

                        <Row className="about_Schemes">
                            <Col lg={8}>

                                <div className="scheme_name">
                                    <h1>{schemeshData?.name}</h1>
                                </div>
                                <div className="scheme_name_text">
                                    <p><span>{t("scheme.slider.benefit")}:</span> {schemeshData?.schemeBenifit?.name}</p>
                                    <p><span>{t("scheme.slider.beneficiary")}:</span> {schemeshData?.benificiary}</p>
                                    <p>{ReactHtmlParser(schemeshData?.detail)}</p>
                                    <p><span>{t("viewScheme.grievanceRedressa")}:</span> {schemeshData?.grievanceRedress}</p>

                                    <div className='d-flex align-items-center mt-3 justify-content-between'>
                                        <div className='d-flex align-items-center gap-5'>
                                            <div className='d-flex align-items-center'>
                                                <img src={location_img} alt="" />
                                                <p style={{ marginTop: "0px", marginLeft: "5px" }}>{location?.join()}</p>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <img src={week} alt="" />
                                                <p style={{ marginTop: "0px", marginLeft: "5px" }}>{moment(schemeshData?.updatedAt).format("DD-MM-YYYY hh:mm a")}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="d-flex rat-count">
                                                <StarRatings
                                                    rating={avgRating ? avgRating : 0}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="scheme"
                                                    starDimension="22px"
                                                />
                                                <p className='ms-2 mt-0'>({schemeshData?.schemeRatings?.length})</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div className="about_Schemes_buttons scheme_name">
                                    <button className={getOneSchemeData?.data?.saved ? 'view_btn mt-4' : 'border-red-btn-true mt-4'} onClick={() => handalSavedScheme()}>
                                        {getOneSchemeData?.data?.saved ? `${t("scheme.slider.savedScheme")}` : ` ${t("scheme.slider.saveScheme")}`}</button>
                                    <button className='border-red-btn-true mt-4' onClick={() => handalViewWebsite()}>{t("viewScheme.viewWebsite")}</button>
                                    <button className={getOneSchemeData?.data?.enrolled ? 'view_btn mt-4' : 'border-red-btn-true mt-4'} onClick={() => handalEnrolledScheme()}> {getOneSchemeData?.data?.enrolled ? ` ${t("scheme.slider.enrolled")}` : ` ${t("scheme.slider.enroll")}`}</button>
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
                                                                <img onClick={() => Share('facebook', 5)} src="./assets/img/facebook.png" alt="facebook" />{" "}
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
                                                            <span onClick={() => Share('whatsapp', 5)} >What’sApp</span>
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

            <div className="view_Schemes_video" style={{ backgroundImage: `url(${schemeshData?.bgImg})` }}>
                <Container>
                    {/* <h1>Videos</h1> */}
                    <h2>{schemeshData?.name}</h2>
                    {schemeshData?.videoUrl && <div className="play_button">
                        <img src="./assets/img/play_button.png" alt="" width="72px" height="72px" onClick={() => setPlayVideo(true)} style={{ cursor: "pointer" }} />
                        <div className="text">
                            <p>Play Video</p>
                            <p>Medical treatment for people with low income from minorities</p>
                        </div>
                    </div>}
                </Container>
            </div>
            <Container className='mt-4'>
                <div className="view_Schemes_accordion">
                    <Tabs className=''>
                        <Tab eventKey="How to Apply" title={t("viewScheme.howToApply")}>
                            {getOneSchemedata && <How_To_Apply getOneSchemeData={getOneSchemedata} />}
                        </Tab>
                        <Tab eventKey="Documentation" title={t("viewScheme.documentation")}>
                            <Documentation setDocumentationData={schemeshData?.documentation} />
                        </Tab>
                    </Tabs>
                </div>
            </Container>
            <Container>
                <div className="add_review know-employee">
                    <div className="title mt-4 mb-4">
                        <h1>{t("viewScheme.addAReview")}</h1>
                    </div>
                    <Col lg={12}>
                        <Row style={{ borderBottom: '1.5px solid #EBEBEB' }}>
                            <Col lg={6}>
                                <div className="review_form">
                                    <TextField
                                        onChange={(event: any) => setReview((event.target.value))}
                                        id="outlined-multiline-static"
                                        label={t("viewScheme.yourReview")}
                                        value={review}
                                        multiline
                                        rows={3}
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
                                                    className='starRating'
                                                    name="simple-controlled"
                                                    value={starRating}
                                                    onChange={(event: any) => {
                                                        setstarRating(event.target.value);
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
                                        <button className='view_btn mt-auto' onClick={() => handalSubmit()} >{t("viewScheme.submit")}</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>


                        <div className="title mt-4 mb-4">
                            <h1>{t("viewScheme.comments")}</h1>
                        </div>
                        {commentsData?.data?.data.map((item: any) => (
                            <div className="comments">
                                <Col lg={2}>
                                    <div className="profile_pic">
                                        <img src={`./assets/img/profile-pic.png`} alt="" height="100%" width="100%" />
                                    </div>
                                </Col>
                                <Col lg={10}>
                                    <div className="text">
                                        <h3 className="name m-0">{item.createdByUser.name}</h3>
                                        <p className="comment_text">{item.comment}</p>
                                    </div>
                                    <StarRatings
                                        rating={item.rating}
                                        starRatedColor="#C90F22"
                                        numberOfStars={5}
                                        name="scheme"
                                        starDimension="22px"
                                    />

                                    <div className="like_reply">
                                        <div className="reply">
                                            <a href={item.replyLink}>{t("viewScheme.reply")}</a>
                                        </div>
                                    </div>

                                </Col>
                            </div>
                        ))}
                    </Col>

                    <div className='d-flex mt-3 justify-content-end table_pagination align-items-center'>
                        {
                            commentsData?.data?.data?.length >= perPage ?
                                <div className='d-flex mt-3 justify-content-end table_pagination align-items-center ' style={{ color: 'var(--\red)', cursor: "pointer" }} onClick={() => loadMore()}>
                                    {t("loadMore.lable")}
                                </div> : ""
                        }
                    </div>

                </div>

                <div className="know-employee view-scheme-recommendation container-xxl px-0">
                    <div className="title mt-4 mb-4">
                        <h1>{t("viewScheme.recommendation.lable")}</h1>
                    </div>

                    {recommendedScheme && recommendedScheme.length < 3 && recommendedScheme.length > 0 ?
                        <>
                            {
                                window.innerWidth > 991 ?
                                    <div className="d-flex container-lg">
                                        {recommendedScheme?.map((item: any, i: number) => (
                                            <Col lg={4} md={6} style={{ zIndex: '1' }} key={i}>
                                                <div className="p-2 d-flex"
                                                >
                                                    <div className="view-scheme-recommendation-card">
                                                        <AcquireCard
                                                            img={item.thumbnail}
                                                            title={item.name}
                                                            text={ReactHtmlParser(item.detail)}
                                                            btntext={t("allScheme.readMore")}
                                                            navigateTo={`view_schemes?Id=${item.id}`}
                                                            link={item.link}
                                                            rating_count={item.schemeRatings?.length.toString()}
                                                            rating={item.schemeRatings?.map((item: any) => item.rating)}
                                                            rat_count={true}
                                                            isShowRating={true}
                                                            save={item.saved}
                                                            id={item.id}
                                                            type='SCHEME'
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                        ))
                                        }
                                    </div>
                                    :
                                    <SilkSlider {...recommendedScheme}>
                                        {recommendedScheme?.map((item: any) => (
                                            <div className="p-2"
                                                style={{ zIndex: "1" }}
                                            >
                                                <div className="view-scheme-recommendation-card">
                                                    <AcquireCard
                                                        img={item.thumbnail}
                                                        title={item.name}
                                                        text={ReactHtmlParser(item.detail)}
                                                        btntext={t("allScheme.readMore")}
                                                        navigateTo={`view_schemes?Id=${item.id}`}
                                                        link={item.link}
                                                        rating_count={item.schemeRatings?.length.toString()}
                                                        rating={item.schemeRatings?.map((item: any) => item.rating)}
                                                        rat_count={true}
                                                        isShowRating={true}
                                                        save={item.saved}
                                                        id={item.id}
                                                        type='SCHEME'
                                                    />
                                                </div>
                                            </div>
                                        ))
                                        }
                                    </SilkSlider>
                            }
                        </>
                        :
                        <SilkSlider {...recommendedScheme}>
                            {recommendedScheme?.map((item: any) => (
                                <div className="p-2">
                                    <div className="view-scheme-recommendation-card">
                                        <AcquireCard
                                            img={item.thumbnail}
                                            title={item.name}
                                            text={ReactHtmlParser(item.detail)}
                                            btntext={t("allScheme.readMore")}
                                            navigateTo={`view_schemes?Id=${item.id}`}
                                            link={item.link}
                                            rating_count={item.schemeRatings?.length.toString()}
                                            rating={item.schemeRatings?.map((item: any) => item.rating)}
                                            rat_count={true}
                                            isShowRating={true}
                                            save={item.saved}
                                            id={item.id}
                                            type='SCHEME'
                                        />
                                    </div>
                                </div>
                            ))
                            }
                        </SilkSlider>
                    }
                    {/* <SilkSlider {...acquirenewskills}>
                        {recommendedScheme && recommendedScheme.length > 0 && recommendedScheme.map((item: any) => (
                            <div className="view-scheme-recommendation-card">
                                <AcquireCard
                                    img={item.thumbnail}
                                    title={item.name}
                                    text={ReactHtmlParser(item.detail)}
                                    btntext={t("allScheme.readMore")}
                                    navigateTo={`view_schemes?Id=${item.id}`}
                                    link={item.link}
                                    rating_count={item.schemeRatings?.length.toString()}
                                    rating={item.schemeRatings?.map((item: any) => item.rating)}
                                    rat_count={true}
                                    isShowRating={true}
                                    save={item.saved}
                                    id={item.id}
                                    type='SCHEME'
                                />
                            </div>
                        ))
                        }
                    </SilkSlider> */}
                    {/* <p className='text-end'> <a href="">{t("viewScheme.recommendation.viewAllSchemes")}</a></p> */}
                </div>
            </Container>
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
                                                    {/* <img src={`./assets/img/${item.profilePic}`} alt="Profile Pic" height="100%" width="100%" /> */}
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
            {/* ====================== plz do not remove this comment code =============== */}
            {/* <Container>
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
                                    <Link to={`/faqs?q=${"Schemes"}`}>{t("viewSingleJob.questions.viewAllFAQs")}</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container> */}

            {
                playVideo &&
                <div className='react-player'>
                    <img src='./assets/img/wrong.png' className="vedio_close_btn" onClick={() => setPlayVideo(false)} />
                    <ReactPlayer
                        url={schemeshData.videoUrl}
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
        </>
    )
}

export default View_Schemes