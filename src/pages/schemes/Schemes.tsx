import React, { useEffect, useState } from 'react';
import SilkSlider from "react-slick";
import { FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import All_Schemes from './tabs/All_Schemes';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addEnrolledSchemesAction, addSaveedSchemesAction, deleteErollSchemesAction, deleteSaveedSchemesAction, schemeBenifits, schemesCategory } from '../../redux/actions/schemesAction';
import { allScheme } from '../../redux/actions/schemesAction';
import { getAllState } from '../../redux/actions/stateAction';
import StarRatings from 'react-star-ratings';
import ReactPlayer from "react-player";
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import ForgotPasswordSuccesModel from '../../components/modals/ForgotPasswordSuccesModel';
import Loginmodal from '../../components/modals/Loginmodal';
import { ADD_ENROLLED_SCHEMES, ADD_SAVEED_SCHEMES, DELETE_ENROLL_SCHEMES, DELETE_SAVEED_SCHEMES } from '../../redux/type';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import CreateAccountmodal from '../../components/modals/CreateAccountmodal';
import RegisterYourAccount from '../../components/modals/RegisterYourAccount';
import NoDataFound from '../../common/NoDataFound';
import { inspirationalStorie } from '../../redux/actions/InspirationalStoriesActions';
import ChangePasswordModal from '../../components/modals/ChangePassword';
interface Filters {
    stateFilter: string
    benifitsFilter: string
    schemeCategory: string
    // ratingFilter: string
    search: string
}
const Schemes = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const allStateData = useSelector((state: any) => state.stateData.stateData)
    const schemesCategoryData = useSelector((state: any) => state.schemesData.schemesCategory)
    const schemeBenifitsData = useSelector((state: any) => state.schemesData.schemesBenifits)
    const allSchemesBannerData = useSelector((state: any) => state.schemesData.allSchemesTrue)
    const addSavedScheme = useSelector((state: any) => state.schemesData.addSavedSchemes)
    const addEnrollScheme = useSelector((state: any) => state.schemesData.AddEnrolledSChemes)
    const deleteSavedScheme = useSelector((state: any) => state.schemesData.deleteSavedSchemes)
    const deleteEnrollScheme = useSelector((state: any) => state.schemesData.deleteEnrollSchemes)

    let userid = AuthStorage.getStorageData(STORAGEKEY.userId)
    const inspirationalStories = useSelector((state: any) => state.inspirationalStoriesData.inspirationalStoriesScheme)

    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [categoryData, setCategoryData] = useState([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [bottomTab, setBottomTab] = useState<any>()
    const [playVideo, setPlayVideo] = useState(false);
    const [loginModal, setLoginModal] = useState(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState(false)
    const [changePassTog, setChangePassTog] = useState(false)
    const [createAccountmodal, setCreateAccountmodal] = useState(false)
    const [clearBtn, setClearBtn] = useState(false)
    const [registermodal, setRegistermodal] = useState<boolean>(false)
    const [forgotValue, setForgotValue] = useState<string>('')
    const [inspirationalData, setInspirationalData] = useState<any[]>([])
    const [inspirational, setInspirational] = useState<any>()

    const [filters, setFilters] = useState<Filters>({
        stateFilter: "",
        benifitsFilter: "",
        // ratingFilter: "",
        schemeCategory: "",
        search: "",
    })

    useEffect(() => {
        dispatch(getAllState())
    }, [])

    useEffect(() => {
        dispatch(schemeBenifits())
    }, [])

    useEffect(() => {
        dispatch(inspirationalStorie(3, 1, "SCHEME"))
    }, [])


    const handleChange = (event: any, name: any) => {
        if (name === 'state') {
            setFilters({
                ...filters, stateFilter: event
            })
        } else if (name === 'benifits') {
            setFilters({
                ...filters, benifitsFilter: event
            })
        } else if (name === 'schemeCategory') {
            setFilters({
                ...filters, schemeCategory: event
            })
        }
        //  else if (name === 'ratings') {
        //     setFilters({
        //         ...filters, ratingFilter: event
        //     })
        // }
        else if (name === 'search') {
            setFilters({
                ...filters, search: event
            })
        }
    };

    const onClare = () => {
        setFilters({
            ...filters,
            stateFilter: "",
            benifitsFilter: "",
            schemeCategory: "",
            // ratingFilter: "",
            search: "",
        })
    }

    useEffect(() => {
        if (filters.stateFilter || filters.benifitsFilter || filters.schemeCategory || filters.search) {
            setClearBtn(true)
        }
        else {
            setClearBtn(false)
        }
    }, [filters])

    useEffect(() => {
        dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", true, userid))
    }, [perPage, pageNumber])

    useEffect(() => {
        dispatch(allScheme(perPage, pageNumber, "", filters.benifitsFilter, filters.schemeCategory, filters.search, '', false, userid, filters.stateFilter))
    }, [categoryId, filters,])

    useEffect(() => {
        dispatch(schemesCategory())
    }, [schemesCategory])

    useEffect(() => {
        (schemesCategoryData && schemesCategoryData.data && schemesCategoryData.data.length > 0 ?
            setCategoryData(schemesCategoryData?.data?.map((item: any) => ({
                title: item.name,
                id: item.id
            }))) :
            <NoDataFound text="No Scheme Found" />
        )
        const temp = schemesCategoryData?.data?.map((item: any) => ({
            title: item.name,
            id: item.id
        }));
        // temp?.unshift({
        //     title: "AllScheme",
        //     id: ""
        // })
        setCategoryData(temp);
    }, [schemesCategoryData])


    useEffect(() => {
        if (inspirationalStories && inspirationalStories.data && inspirationalStories.data.data) {
            setInspirationalData(inspirationalStories.data.data)
            setBottomTab(inspirationalStories.data.data[0]?.title)
            setInspirational(inspirationalStories.data.data[0])
        }
    }, [inspirationalStories])

    const temp: any = {
        Healthcare: "Healthcare-bg",
        Prevention: "Prevention-bg",
        GDA: "GDA-bg"
    }
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            },
        ]
    };

    const tebs = {
        dots: false,
        infinite: false,
        autoplay: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    useEffect(() => {
        if (addSavedScheme && addSavedScheme?.status === 200) {
            toast.success("Scheme saved successfully")
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", true, userid))
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", false, userid))
            dispatch({
                type: ADD_SAVEED_SCHEMES,
                payload: []
            })
        }
    }, [addSavedScheme])

    useEffect(() => {
        if (addEnrollScheme && addEnrollScheme?.status === 200) {
            toast.success("Scheme enrolled successfully")
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", true, userid))
            dispatch({
                type: ADD_ENROLLED_SCHEMES,
                payload: []
            })
        }
    }, [addEnrollScheme])

    useEffect(() => {
        if (deleteSavedScheme && deleteSavedScheme?.status === 200) {
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", true, userid))
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", false, userid))
            toast.success("Scheme unsave successfully")
            dispatch({
                type: DELETE_SAVEED_SCHEMES,
                payload: []
            })
        }
    }, [deleteSavedScheme])

    useEffect(() => {
        if (deleteEnrollScheme && deleteEnrollScheme?.status === 200) {
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", true, userid))
            toast.success("Scheme disenrolled  successfully")
            dispatch({
                type: DELETE_ENROLL_SCHEMES,
                payload: []
            })
        }
    }, [deleteEnrollScheme])

    const handalSavedScheme = (flag: any, Id: any) => {
        if (AuthStorage.getToken()) {
            if (!flag) {
                dispatch(addSaveedSchemesAction(Id))
            }
            else {
                dispatch(deleteSaveedSchemesAction(Id))
            }
        }
        else {
            setLoginModal(true)
        }
    }

    const handalEnrolledScheme = (flag: any, Id: any) => {
        if (AuthStorage.getToken()) {
            if (!flag) {
                dispatch(addEnrolledSchemesAction(Id))
            }
            else {
                dispatch(deleteErollSchemesAction(Id))
                dispatch({
                    type: DELETE_ENROLL_SCHEMES,
                    payload: []
                })
            }
        }
        else {
            setLoginModal(true)
        }
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
                    <SilkSlider {...settings}>
                        {allSchemesBannerData && allSchemesBannerData.data && allSchemesBannerData.data.data?.length > 0 ? allSchemesBannerData?.data?.data?.map((item: any) =>
                            <div key={item.id}>
                                <img src={item.bannerImg ? item.bannerImg : ""} alt="" className='slider-bg' />
                                <Container>
                                    <div className="breadcrums">
                                        <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Schemes</button>
                                    </div>
                                    <div className="learn-hearo-text">
                                        <div className="set-slider-text">
                                            <h3>
                                                {item.name}
                                            </h3>
                                            <h4>{t("scheme.slider.benefit")}: {item.schemeBenifit?.name}</h4>
                                            <div className="d-flex gap-2">
                                                <img src="./assets/img/white_location.png" alt="" />
                                                <h5 className='mb-0'>{item.locations.map((value: any) => value.name + " | ")}</h5>
                                            </div>
                                            <div className='Beneficiary'>{t("scheme.slider.beneficiary")}:{item?.benificiary}</div>
                                            <div className="d-sm-flex mt-2 gap-5">
                                                <button className={item.saved ? 'view_btn d-block mt-3' : 'border-red-btn-true d-block mt-3'} onClick={() =>
                                                    handalSavedScheme(item.saved, item.id)}>{item.saved ? ` ${t("scheme.slider.savedScheme")}` : `${t("scheme.slider.saveScheme")}`}</button>
                                                <button className={item.enrolled ? 'view_btn d-block mt-3' : 'border-red-btn-true d-block mt-3'} onClick={() =>
                                                    handalEnrolledScheme(item.enrolled, item.id)}> {item.enrolled ? ` ${t("scheme.slider.enrolled")}` : ` ${t("scheme.slider.enroll")}`}</button>
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                            </div>
                        ) : <div
                            className="slider-white-space"
                        ></div>}
                    </SilkSlider>
                </div>
            </div>

            <Container className='jobs-filter p-0'>
                <div className='courses'>
                    <Row>
                        <Col md={12} lg={clearBtn ? 5 : 6} className="mt-md-3 mt-lg-0">
                            <Row>
                                <Col sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.state")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="state"
                                            value={filters.stateFilter}
                                            label={t("scheme.filter.state")}
                                            onChange={(e) => handleChange(e.target.value, "state")}
                                        >
                                            {allStateData && allStateData.data?.map((item: any) => (
                                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>

                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.benifits")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='benifits'
                                            value={filters.benifitsFilter}
                                            label={t("scheme.filter.benifits")}
                                            onChange={(e) => handleChange(e.target.value, "benifits")}
                                        >
                                            {schemeBenifitsData && schemeBenifitsData?.data?.map((item: any) => (
                                                <MenuItem key={item.id} value={item.id}
                                                    style={{}}
                                                >{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={12} lg={clearBtn ? 5 : 6} className="mt-md-3 mt-lg-0">
                            <Row>
                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.schemeCategory")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='benifits'
                                            value={filters.schemeCategory}
                                            label={t("scheme.filter.schemeCategory")}
                                            onChange={(e) => handleChange(e.target.value, "schemeCategory")}
                                        >
                                            {categoryData && categoryData.length && categoryData.map((item: any) => (
                                                <MenuItem key={item.id} value={item.id} >{item.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>
                                {/* <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.ratings")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='ratings'
                                            value={filters.ratingFilter}
                                            label={t("scheme.filter.ratings")}
                                            onChange={(e) => handleChange(e.target.value, "ratings")}
                                        >
                                            <MenuItem value={1}>
                                                <StarRatings
                                                    rating={1}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="scheme"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                <StarRatings
                                                    rating={2}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="scheme"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={3}>
                                                <StarRatings
                                                    rating={3}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="scheme"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={4}>
                                                <StarRatings
                                                    rating={4}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="scheme"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={5}>
                                                <StarRatings
                                                    rating={5}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="scheme"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col> */}
                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <div className="search_input">
                                        <TextField id="outlined-danger" name='search' value={filters.search} type="text" label={t("scheme.filter.search")} variant="outlined" onChange={(e: any) => handleChange(e.target.value, "search")} />
                                        <img src="./assets/img/search.png" alt="" />
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                        {clearBtn && <Col lg={1} md={2} className="text-center">
                            <button onClick={() => onClare()} className="mt-sm-3 mt-md-3 mt-lg-0 clr-btn margin-courses-input">{t("scheme.filter.clear")}</button>
                        </Col>}

                    </Row>
                </div>
            </Container >

            <div className='learn-tab Schemes_Tab'>
                <Container>
                    {/* <ul style={{ paddingRight: "2rem" }} className="view-scheme"> */}
                    {/* <SilkSlider {...tebs}>
                            {categoryData?.map((item: any) => (
                                <li className={`${item.id === categoryId && "active-tab"}`} onClick={(event) => { setCategoryId(item?.id), setCategoryName(item.title) }}>{item?.title}</li>

                            ))}
                        </SilkSlider> */}
                    {/* </ul> */}
                    <All_Schemes categoryName={categoryName} />
                </Container>
            </div>

            <div className={`Schemes_video pb-5`} style={{ backgroundImage: `url(${inspirational?.imageUrl ? inspirational?.imageUrl : './assets/img/Schemes_video.png'})` }} >
                <Container>
                    {/* <h1>Videos</h1> */}
                    <h2>WATCH OUR <br /> INSPIRATIONAL STORIES</h2>
                    <div className="play_button">
                        <img src="./assets/img/play_button.png" alt="" width="72px" height="72px" onClick={() => setPlayVideo(true)} style={{ cursor: "pointer" }} />
                        <div className="text">
                            <p>Play Video</p>
                            <p>{inspirational?.title}</p>
                        </div>
                    </div>
                    <div className='bottom-tabs mt-5'>
                        {inspirationalData.map((item: any) => (
                            <Button onClick={() => { setBottomTab(item.title), setInspirational(item) }} className={bottomTab === item.title ? "active-btn" : ""}>{item.title}</Button>
                        ))}
                    </div>
                </Container>
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
            </div>

            {
                loginModal && <Loginmodal show={loginModal} onHide={(item: any) => logginPopup(item)} />
            }
            {
                forgotPasswordModal && <ForgotPasswordModal show={forgotPasswordModal} onHide={(item: any) => forgotPopup(item)} emailValue={setForgotValue} />
            }
            {
                forgotPasswordSuccesModel && <ForgotPasswordSuccesModel show={forgotPasswordSuccesModel} onHide={(item: any) => setForgotPasswordSuccesModel(false)} forgotValue={forgotValue} />
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

export default Schemes