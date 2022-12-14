import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import AcquireCard from "../../common/AcquireCard";
import GrowTogatherCard from "../../common/GrowTogatherCard";
import SelectSearch from "../../components/selectandsearch/SelectSearch";
import Slider from "../../components/slider/Slider";
import SilkSlider from "react-slick";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../../components/modals/ForgotPasswordModal";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { ADD_SAVED_JOB, ADD_SAVED_NEWS, ADD_SAVE_COURSE, DELETE_SAVED_JOB, DELETE_SAVED_NEWS, DELETE_SAVE_COURSE, SIGNUP, SIGNUP_ERR } from "../../redux/type";
import ForgotPasswordSuccesModel from "../../components/modals/ForgotPasswordSuccesModel";
import ChangePasswordModal from "../../components/modals/ChangePassword";
import { useTranslation } from "react-i18next";
import { getBanner } from "../../redux/actions/bannerAction";
import { getArticle } from "../../redux/actions/articleAction";
import { getTestimonial } from "../../redux/actions/testimonialAction";
import { getCoursesAction } from "../../redux/actions/courseAction";
import AuthStorage from "../../helper/AuthStorage";
import STORAGEKEY from "../../config/APP/app.config";
import { getJobsFilterForMain } from "../../redux/actions/jobAction";
import NoDataFound from "../../common/NoDataFound";
import VideoModal from "../../components/modals/VideoModal";
import ReactPlayer from "react-player";
import moment from "moment";
import Socialfloating1 from '../../assets/img/social-floating-1.png'
import Socialfloating2 from '../../assets/img/social-floating-2.png'
import Socialfloating3 from '../../assets/img/social-floating-3.png'
import Socialfloating4 from '../../assets/img/social-floating-4.png'
import { getAllUser } from "../../redux/actions/userAction";
import Postjobbtn from '../../assets/img/post-job.png'
import Share from "../../helper/sharer/Share";
import Loginmodal from "../../components/modals/Loginmodal";
import CreateAccountmodal from "../../components/modals/CreateAccountmodal";
import RegisterYourAccount from "../../components/modals/RegisterYourAccount";
import { PrivancypolicyAction } from "../../redux/actions/PrivacypolicyAction";
import ReactHtmlParser from 'react-html-parser'

import { isProfileImage } from "../../redux/reducer/IsLoginReducer";
import { IsProfileImage } from "../../redux/actions/isLoginAction";
// import GetStarted from '../../assets/img/GetStarted-home.png';


interface language {
  name: string,
  id: string
}

const Home = () => {
  const { t } = useTranslation()
  const userid = AuthStorage.getStorageData(STORAGEKEY.userId)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
  const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState(false)
  const [changePassTog, setChangePassTog] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  // const [bannerData, setBannerData] = useState<any>()
  const [articleData, setaArticleData] = useState<any>()
  const [testimonialData, setaTestimonialData] = useState<any>()
  const [bannerSelected, setBannerSelected] = useState(false)
  const [firstThreeDataLearn, setFirstThreeDataLEarn] = useState([])
  const [firstThreeDataJobs, setFirstThreeDataJobs] = useState([])
  const [playVideo, setPlayVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<any>(false);
  const [employer, setEmployer] = useState([]);
  const [loginModal, setLoginModal] = useState(false)

  const [createAccountmodal, setCreateAccountmodal] = useState(false)
  const [registermodal, setRegistermodal] = useState<boolean>(false)
  const [forgotValue, setForgotValue] = useState<string>('')
  const [userType, setUserType] = useState<string>('')
  const [getStart, setGetStart] = useState(false)


  const signup = useSelector((state: RootStateOrAny) => state.signupData.signUpData)
  const signupError = useSelector((state: RootStateOrAny) => state.signupData.signupError)
  // const banner = useSelector((state: any) => state.bannerData.getBanner)
  const article = useSelector((state: any) => state.articleData.getArticle)
  const testimonial = useSelector((state: any) => state.testimonialData.getTestimonial)
  const getCourseBannerFalseData = useSelector((state: any) => state.courseData.getBannerFlaseData)
  const getJobsFilterForMainFalseData = useSelector((state: any) => state.jobData.getJobsFilterForMainFalse)
  const getLanguageNameData = useSelector((state: any) => state.languageData.getLanguageByName)
  const getEmployer = useSelector((state: any) => state.userData.getAllUser)
  const addSaveCourseData = useSelector((state: any) => state.courseData.addSaveCourseData)
  const deleteSavedCourseData = useSelector((state: any) => state.courseData.deleteSavedCourseRatingData)
  const addSavedJobData = useSelector((state: any) => state.jobData.addSavedJob)
  const deleteSavedJobData = useSelector((state: any) => state.jobData.deleteSavedJob)
  const addSavedNewsData = useSelector((state: any) => state.articleData.savedNews)
  const deleteSavedNewsData = useSelector((state: any) => state.articleData.deleteNews)
  const getGeneralData = useSelector((state: any) => state.privacy.getGeneralData)
  const loginData = useSelector((state: any) => state.login.loginData)

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.language)) {
      dispatch(getCoursesAction(perPage, pageNumber, "", "", "", "", "", bannerSelected))
    }
  }, [perPage, pageNumber, bannerSelected, userid, getLanguageNameData])

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.language)) {
      dispatch(getBanner(perPage, pageNumber))
      dispatch(getArticle(perPage, pageNumber, userid))
      dispatch(getTestimonial(perPage, pageNumber))
    }
  }, [perPage, pageNumber, getLanguageNameData, userid])

  useEffect(() => {
    dispatch(getAllUser("EMPLOYER"));
  }, [])

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.language)) {
      dispatch(PrivancypolicyAction((AuthStorage.getStorageData(STORAGEKEY.language))))
      // dispatch(getUser())
    }
  }, [AuthStorage.getStorageData(STORAGEKEY.language)])

  useEffect(() => {
    if (getEmployer && getEmployer.data && getEmployer.data.data) {
      setEmployer(getEmployer.data.data.sort((a: any, b: any) => a.priority - b.priority))
    }
  }, [getEmployer])

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.language)) {
      dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", false, ""))
    }
  }, [pageNumber, perPage, userid, getLanguageNameData])

  // useEffect(() => {
  //   setBannerData(banner?.data?.data[0])
  // }, [banner, article, perPage, pageNumber])

  useEffect(() => {
    setaArticleData(article?.data?.data?.slice(0, 3))
  }, [article, perPage, pageNumber])

  useEffect(() => {
    setaTestimonialData(testimonial.data?.data?.slice(0, 4))
  }, [testimonial, perPage, pageNumber])

  useEffect(() => {
    if (signup && signup.message === "user created") {
      toast.success("Signup successfully");
      dispatch({
        type: SIGNUP,
        payload: null,
      })
    }
    else if (signup && signup.message !== "user created") {
      toast.error("Something Wrong");
    }
  }, [signup])

  useEffect(() => {
    if (signupError) {
      toast.error("Something Wrong");
      dispatch({
        type: SIGNUP_ERR,
        payload: null,
      })
    }
  }, [signupError])

  useEffect(() => {
    if (getCourseBannerFalseData && getCourseBannerFalseData.data && getCourseBannerFalseData.data.data) {
      // setFirstThreeDataLEarn(getCourseBannerFalseData?.data?.data.filter((item: any, id: any) => id < 3))
      setFirstThreeDataLEarn(getCourseBannerFalseData.data.data.sort((a: any, b: any) => a.priority - b.priority).slice(0, 3))
    }
  }, [getCourseBannerFalseData])

  useEffect(() => {
    setFirstThreeDataJobs(getJobsFilterForMainFalseData?.data?.data.sort((a: any, b: any) => a.priority - b.priority).slice(0, 3))
  }, [getJobsFilterForMainFalseData])

  useEffect(() => {
    if (addSavedJobData && addSavedJobData?.status === 200) {
      toast.success("Job saved successfully")
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

  useEffect(() => {
    if (addSavedNewsData && addSavedNewsData.status === 200) {
      toast.success("News saved successfully")
      dispatch(getArticle(perPage, pageNumber, userid))

      dispatch({
        type: ADD_SAVED_NEWS,
        payload: null,
      })
    }
  }, [addSavedNewsData])

  useEffect(() => {
    if (deleteSavedNewsData && deleteSavedNewsData.status === 200) {
      toast.success("News unsaved successfully")
      dispatch(getArticle(perPage, pageNumber, userid))
      dispatch({
        type: DELETE_SAVED_NEWS,
        payload: null,
      })
    }
  }, [deleteSavedNewsData])


  // useEffect(() => {
  //   if (getLanguageNameData && getLanguageNameData.data) {
  //     dispatch(getJobsFilterForMain(perPage, pageNumber, "", "", "", "", "", false))
  //   }
  // }, [pageNumber, perPage, userid, getLanguageNameData])

  const onsubmit = () => {
    navigate("/viewAllNews")
  }

  const partners = () => {
    navigate("/partners")
  }

  const reDirect = () => {
    navigate("/view_all_course")
  }

  const redirectJobs = () => {
    navigate("/view_all_jobs")
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      },
    ]
  };

  const getstarted = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const getstarteddata = [
    {
      src: "./assets/img/grp2.png",
    },
    {
      src: "./assets/img/grp2.png",
    },
    {
      src: "./assets/img/grp2.png",
    },
    {
      src: "./assets/img/grp2.png",
    },
  ]

  // const getstarteddata = [
  //   {
  //     head: ,
  //     list1: ,
  //     list2: t("Home.getStatedBanner.step2"),
  //     list3: t("Home.getStatedBanner.step3"),
  //     hashTag: ,
  //   },
  //   {
  //     head: t("Home.getStatedBanner.subTitle"),
  //     list1: t("Home.getStatedBanner.step1"),
  //     list2: t("Home.getStatedBanner.step2"),
  //     list3: t("Home.getStatedBanner.step3"),
  //     hashTag: t("Home.getStatedBanner.#title"),
  //   },
  //   {
  //     head: t("Home.getStatedBanner.subTitle"),
  //     list1: t("Home.getStatedBanner.step1"),
  //     list2: t("Home.getStatedBanner.step2"),
  //     list3: t("Home.getStatedBanner.step3"),
  //     hashTag: t("Home.getStatedBanner.#title"),
  //   },
  // ]

  const growtogatherCard = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const acquirenewskills = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
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

  const discovernewopportunities = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
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


  const growtogathercard = [
    {
      img: "healthcare.svg",
      text: "Courses & Skills to upskill women",
      alts: "healthcare",
      link: "learn"
    },
    {
      img: "jobs.svg",
      text: t("Home.GrowToGratherCard.jobs"),
      alts: "Discover Jobs",
      link: "jobs"
    },
    {
      img: "govtscheme.svg",
      text: t("Home.GrowToGratherCard.schemes"),
      alts: "govt scheme",
      link: "schemes  "
    },
    {
      img: "latestupdate.svg",
      text: t("Home.GrowToGratherCard.update"),
      alts: "latest news",
      link: "viewAllNews"
    },
  ]

  const newsupdates = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    arrows: false,
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

  const continuePopup = () => {
    setForgotPasswordModal(false)
    setForgotPasswordSuccesModel(true);
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

  const redirecthyperLink = (link: string) => {
    let doc = document;
    let a = doc.createElement("a");
    a.href = link;
    a.target = '_blank';
    a.click();
  }

  const hadnalGetStart = () => {
    if (AuthStorage.getStorageData(STORAGEKEY.token)) {
      navigate("/get_started")
    } else if (!AuthStorage.getStorageData(STORAGEKEY.userId)) {
      setLoginModal(true)
    }
    setGetStart(true)
  }
  useEffect(() => {
    if (loginData?.status === 200 && getStart) {
      navigate("/get_started")
    }
  }, [loginData])


  return (
    <>
      <Button onClick={() => { setLoginModal(true), setUserType("employer") }} className="post-jobs-btn">
        <img src={Postjobbtn} alt='' />
        <span>Post a Job </span>
      </Button>
      <div className="slider position-relative">
        <Slider />
        <SelectSearch />
        <div className="become-trainingpartner">
          <Button onClick={() => { setRegistermodal(true), setUserType("partner") }}>Become a training partner </Button>
        </div>
        <div className="social-floating">
          <Button onClick={() => Share('facebook', 5)}> <img src={Socialfloating1} alt="" /> <span>Facebook</span> </Button>
          <Button onClick={() => Share('linkedin', 5)}> <img src={Socialfloating2} alt="" /> <span>Linkedin</span> </Button>
          <Button onClick={() => Share('twitter', 5)}> <img src={Socialfloating3} alt="" /> <span>Twitter</span></Button>
          <Button onClick={() => navigate("contact")}> <img src={Socialfloating4} alt="" /> <span>Contact Us</span></Button>
        </div>
      </div>
      <div className="grow-together mt-5">
        <Container className="p-0">
          <div className="title">
            <h1>{t("Header.title")}</h1>
          </div>
        </Container>

        <Container >
          {/* <div className="position-relative" style={{ width: 'fit-content', margin: 'auto' }}> */}
          <Row>
            {
              growtogathercard.map((item, i) => (
                <Col xl={3} lg={3} md={6} sm={6} key={i}>
                  <GrowTogatherCard
                    img={item.img}
                    text={item.text}
                    alts={item.alts}
                    link={item.link}
                  />
                </Col>
              ))
            }
          </Row>
          {/* </div> */}
        </Container>
        <Container className="mt-3 mb-3">
          <div className="grow-together-started">
            <h1>Discover boundaryless<span> career opportunities </span></h1>
            <button onClick={hadnalGetStart}>Get Started</button>
          </div>
        </Container>

      </div>

      <div className="acquire-new-skills px-0">
        <Container>
          <div className="title">
            <h1>{t("Home.Skill.title")}</h1>
            <p>{t("Home.Skill.subTitle")}</p>
          </div>
        </Container>
        <div className="know-employee container-lg px-0">
          {
            firstThreeDataLearn && firstThreeDataLearn.length < 3 && firstThreeDataLearn.length > 0 ?
              <>
                {
                  window.innerWidth > 991 ?
                    <div className="d-flex container-lg">
                      {
                        firstThreeDataLearn?.map((item: any, i) => (
                          <Col lg={4} md={6} style={{ zIndex: '1' }} key={i}>
                            <div className="p-2 d-flex"

                            >
                              <AcquireCard
                                img={item.thumbnail}
                                title={item.name}
                                text={ReactHtmlParser(item.detail)}
                                // btntext={item.btntext}
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
                        ))
                      }
                    </div>
                    :
                    <SilkSlider {...acquirenewskills}>
                      {
                        firstThreeDataLearn?.map((item: any, i) => (
                          <div className="p-2 " style={{ zIndex: '1' }} key={i}>
                            <AcquireCard
                              img={item.thumbnail}
                              title={item.name}
                              text={ReactHtmlParser(item.detail)}
                              // btntext={item.btntext}
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
                        ))
                      }
                    </SilkSlider>
                }
              </>
              :
              <SilkSlider {...acquirenewskills}>
                {
                  firstThreeDataLearn?.map((item: any, i) => (
                    <div className="p-2" key={i}>
                      <AcquireCard
                        img={item.thumbnail}
                        title={item.name}
                        text={ReactHtmlParser(item.detail)}
                        // btntext={item.btntext}
                        btntext={"Enroll Free"}
                        navigateTo={`course?id=${item.id}`}
                        link={item.link}
                        isShowRating={true}
                        rating={item.courseRatings.map((item: any) => item.rating)}
                        save={item.saved}
                        id={item.id}
                        type="COURSE"
                        redirectPath="course"
                      />
                    </div>
                  ))
                }
              </SilkSlider>
          }
          {!firstThreeDataLearn?.length && <NoDataFound text="No Courese Found" style={{ color: "white" }} />}
        </div>
        <div className="viewall-btn">
          {firstThreeDataLearn?.length ? <button onClick={reDirect}>{t("Home.Skill.viewAllBtn")}</button> : ""}
        </div>
        <div className="animation-imgs">
          <img src="./assets/img/red-roound.svg" alt="" className="right-red-round" data-aos="fade-left" />
          <img src="./assets/img/Shape-1@2x.png" alt="" width="50px" height="50px" className="small-bottom-red-round" data-aos="fade-up"
            data-aos-duration="3000" />
          <img src="./assets/img/big-red-circle.png" alt="" className="left-big-red-round" data-aos="fade-up"
            data-aos-duration="3000" />
          <img src="./assets/img/Shape-1@2x.png" alt="" width="50px" height="50px" className="left-small-red-round" data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" />
          <img src="./assets/img/dots.png" alt="" className="left-dots" data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine" />
          <img src="./assets/img/dots-2.png" alt="" className="right-dots" data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" />
        </div>
      </div>

      <div className="acquire-new-skills px-0">
        <Container>
          <div className="title">
            <h1>{t("Home.opportunities.title")}</h1>
            <p>{t("Home.opportunities.subTitle")}</p>
          </div>
        </Container>

        <div className="know-employee container-lg px-0">
          {
            firstThreeDataJobs && firstThreeDataJobs.length < 3 && firstThreeDataJobs.length > 0 ?
              <>
                {
                  window.innerWidth > 991 ?
                    <div className="d-flex container-lg">
                      {firstThreeDataJobs?.map((item: any, i) => (
                        <Col lg={4} md={6} style={{ zIndex: '1' }} key={i}>
                          <div className="p-2 d-flex"

                          >
                            <AcquireCard
                              img="./assets/img/labtech.svg"
                              title={item.name.name}
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
                      ))
                      }
                    </div>
                    :
                    <SilkSlider {...discovernewopportunities}>
                      {firstThreeDataJobs?.map((item: any, i) => (
                        <div className="p-2" style={{ zIndex: "1" }} key={i}>
                          <AcquireCard
                            img="./assets/img/labtech.svg"
                            title={item.name.name}
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
                      ))
                      }
                    </SilkSlider>
                }
              </>
              :
              <SilkSlider {...discovernewopportunities}>
                {firstThreeDataJobs?.map((item: any, i) => (
                  <div className="p-2" key={i}>
                    <AcquireCard
                      img="./assets/img/labtech.svg"
                      title={item.name.name}
                      text={item.description}
                      btntext={t("Home.opportunities.applyNow")}
                      navigateTo={`viewsinglejob?jobId=${item.id}`}
                      link={item.link}
                      location={true}
                      locationName={item.town}
                      isShowRating={false}
                      save={item.saved}
                      id={item.id}
                      type="JOB"
                      redirectPath="viewsinglejob"
                    />
                  </div>
                ))
                }
              </SilkSlider>
          }
          {!firstThreeDataJobs?.length && <NoDataFound text="No Jobs Found" style={{ color: "white" }} />}
        </div>
        <div className="viewall-btn">
          {firstThreeDataJobs?.length ? <button onClick={() => redirectJobs()}>{t("Home.opportunities.viewAllBtn")}</button> : ""}
        </div>
        <div className="animation-imgs">
          <img src="./assets/img/red-roound.svg" alt="" className="right-red-round" data-aos="fade-left" />
          <img src="./assets/img/Shape-1@2x.png" alt="" width="50px" height="50px" className="small-bottom-red-round" data-aos="fade-up"
            data-aos-duration="3000" />
          <img src="./assets/img/big-red-circle.png" alt="" className="left-big-red-round" data-aos="fade-up"
            data-aos-duration="3000" />
          <img src="./assets/img/Shape-1@2x.png" alt="" width="50px" height="50px" className="left-small-red-round" data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" />
          <img src="./assets/img/dots.png" alt="" className="left-dots" data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine" />
          <img src="./assets/img/dots-2.png" alt="" className="right-dots" data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" />
        </div>
      </div>

      <div className="know-employee p-4">
        <Container>
          <div className="title">
            <h1>{"KNOW YOUR EMPLOYERS"}</h1>
          </div>
          {employer && employer.length <= 3 && employer.length > 0 ?
            <>
              {window.innerWidth > 991 ?
                <div className="d-flex container-lg">
                  {employer && employer?.map((item: any, ind: any) => (
                    <div className="p-2 d-flex" style={{ zIndex: "1" }} key={ind}>
                      <div className="silk-slider" key={ind} style={{ width: "100px", margin: "0 auto", overflow: "hidden", borderRadius: "10px" }}>
                        <img src={item.avatar && item.avatar !== "null" ? item.avatar : "../../assets/img/noImage.png"} className="cursor-pointer" alt="slide1" height="100px" width="100%" style={{ objectFit: "cover" }} />
                      </div>
                    </div>
                  ))
                  }
                </div>
                :
                <SilkSlider {...settings}>
                  {employer && employer.map((item: any, ind: any) => (
                    <div className="p-2" style={{ zIndex: "1" }} key={ind}>
                      <div className="silk-slider" key={ind} style={{ width: "100px", margin: "0 auto", overflow: "hidden", borderRadius: "10px" }}>
                        <img src={item.avatar && item.avatar !== "null" ? item.avatar : "../../assets/img/noImage.png"} className="cursor-pointer" alt="slide1" height="100px" width="100%" style={{ objectFit: "cover" }} />
                      </div>
                    </div>
                  ))
                  }
                </SilkSlider>
              }
            </>
            :
            <SilkSlider {...settings}>
              {employer && employer.map((item: any, ind: any) => (
                <div className="p-2" key={ind}>
                  <div className="silk-slider" key={ind} style={{ width: "100px", margin: "0 auto", overflow: "hidden", borderRadius: "10px" }}>
                    <img src={item.avatar && item.avatar !== "null" ? item.avatar : "../../assets/img/noImage.png"} className="cursor-pointer" alt="slide1" height="100px" width="100%" style={{ objectFit: "cover" }} />
                  </div>
                </div>
              ))
              }
            </SilkSlider>
          }
          {/* <SilkSlider {...settings}>
            {employer && employer.length > 0 ? employer.map((item: any, ind: any) => (
              <div className="silk-slider" key={ind}>
                <img src={item.avatar} className="cursor-pointer" alt="slide1" />
              </div>
            )) }
          </SilkSlider> */}
        </Container>
        {!employer.length && <NoDataFound text="No employer found" />}
      </div>

      <div className="know-employee p-md-4 mt-5 position-relative lest-grow-slider">
        <Container>
          <div className="title pl-4">
            <h1>{"HEAR FROM OUR SWAYAM COMMUNITY"}</h1>
          </div>
          {/* === only text slider====== */}
          <SilkSlider {...growtogatherCard}>
            {testimonialData?.length > 0 ? testimonialData?.map((item: any, i: number) => (
              <div className="d-lg-flex mt-5 gy-3" key={i}>
                <Col lg="5">
                  <div className="community-members">
                    <img src="./assets/img/play-button.png" className="play-icon" onClick={() => { setPlayVideo(true); setVideoUrl(item.videoUrl) }} />
                    <img src={item.imageUrl} alt="member" />
                  </div>
                </Col>
                <Col lg="7">
                  <div className="text-slider">
                    <h3> {item.name} </h3>
                    <p className="post-name">{item.role}</p>
                    <div className="detail-text">
                      <p>
                        {item.message}
                      </p>
                    </div>
                  </div>
                </Col>
              </div>
            )) : <NoDataFound text="No swayam community Found" style={{ color: "white" }} />
            }
          </SilkSlider>
        </Container>

        {playVideo &&
          <div className='react-player'>
            <img src='./assets/img/wrong.png' className="vedio_close_btn" onClick={() => setPlayVideo(false)} />
            <ReactPlayer
              url={videoUrl}
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
      <div className="acquire-new-skills px-0">
        <Container>
          <div className="title">
            <h1>{t("Home.news.title")}</h1>
            <p>{t("Home.news.subTitle")}</p>
          </div>
        </Container>

        <div className="know-employee container-lg px-0">
          {articleData && articleData.length < 3 && articleData.length > 0 ?
            <>
              {window.innerWidth > 991 ?
                <div className="d-flex container-lg">
                  {articleData?.map((item: any, i: number) => (
                    <div className="p-2 d-flex" style={{ zIndex: "1" }} key={i}>
                      <AcquireCard
                        img={item.imageUrl}
                        title={item.title}
                        text={"itemtext"}
                        btntext={"Read More"}
                        link={"item.link"}
                        isShowRating={false}
                        imgShow={false}
                        time={item.createdAt}
                        vidoUrl={item.videoUrl}
                        save={item.saved}
                        id={item.id}
                        type="NEWS"
                      />
                    </div>
                  ))}
                </div>
                :
                <SilkSlider {...newsupdates}>
                  {articleData?.map((item: any, i: number) => (
                    <div className="p-2" style={{ zIndex: "1" }} key={i}>
                      <AcquireCard
                        img={item.imageUrl}
                        title={item.title}
                        text={"itemtext"}
                        btntext={"Read More"}
                        link={"item.link"}
                        isShowRating={false}
                        imgShow={true}
                        time={item.createdAt}
                        vidoUrl={item.videoUrl}
                        save={item.saved}
                        id={item.id}
                        type="NEWS"
                      />
                    </div>
                  ))
                  }
                </SilkSlider>
              }
            </>
            :
            <SilkSlider {...newsupdates}>
              {articleData?.map((item: any, i: number) => (
                <div className="p-2" style={{ zIndex: "1" }} key={i}>
                  <AcquireCard
                    img={item.imageUrl}
                    title={item.title}
                    text={item.body}
                    btntext={"Read More"}
                    link={"item.link"}
                    isShowRating={false}
                    imgShow={false}
                    navigateTo={""}
                    time={moment(item.createdAt).format('MMMM D, YYYY')}
                    vidoUrl={item.videoUrl}
                    save={item.saved}
                    id={item.id}
                    type="NEWS"
                  />
                </div>
              ))
              }
            </SilkSlider>
          }
          {!articleData?.length && <NoDataFound text="No Scheme Found" style={{ color: "white" }} />}
        </div>
        <div className="animation-imgs">
          <img src="./assets/img/red-roound.svg" alt="" className="right-red-round" data-aos="fade-left" />
          <img src="./assets/img/Shape-1@2x.png" alt="" width="50px" height="50px" className="small-bottom-red-round" data-aos="fade-up"
            data-aos-duration="3000" />
          <img src="./assets/img/big-red-circle.png" alt="" className="left-big-red-round" data-aos="fade-up"
            data-aos-duration="3000" />
          <img src="./assets/img/Shape-1@2x.png" alt="" width="50px" height="50px" className="left-small-red-round" data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" />
          <img src="./assets/img/dots.png" alt="" className="left-dots" data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine" />
          <img src="./assets/img/dots-2.png" alt="" className="right-dots" data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" />
        </div>
        <div className="viewall-btn">
          {articleData?.length ? <button onClick={() => onsubmit()}>{t("Home.news.viewAllBtn")}</button> : ""}
        </div>
        {/* </Row> */}
      </div >
      <div className="guid-download">
        <Container>
          <div className="download">
            {/* <Row className=""> */}
            {/* <Col xl="12">
                <figure style={{ height: "300px" }}>
                  <img src={bannerData?.imageUrl} alt="group" height="300px" style={{ borderRadius: "15px" }} />
                </figure>
              </Col> */}
            <Col xl={6}>
              <img src="./assets/img/grp1.png" alt="" width="100%" />
            </Col>
            <Col
              xl="6"
              className="d-flex flex-column justify-content-center align-items-start"
            >
              <div className="download-text">
                <h1>{t("Home.downBanner.title")}</h1>
                <p>{t("Home.downBanner.subTitle")}</p>
                <p>{t("Home.downBanner.downloadApp")}</p>
              </div>
              <div className="download-btn">
                {/* <div className="store">
                  <img src="./assets/img/Appstore.png" onClick={() => redirecthyperLink(getGeneralData.data.iosAppLink)} alt="appstore" />
                </div> */}
                <div className="store">
                  <img src="./assets/img/Playstore.png" onClick={() => redirecthyperLink(getGeneralData.data.appLink)} alt="Playstore" />
                </div>
              </div>
            </Col>
            {/* </Row> */}
          </div>
        </Container>
      </div>

      <div className="guid-download pb-5">
        <Container>
          <div className="get-started-carousel py-4">
            <div className="title">
              <h1>{t("Home.getStatedBanner.title")}</h1>
            </div>

            <div className="d-lg-flex mt-2 gy-3">
              <div className="getstarted-left w-50">
                <h1>{t("Home.getStatedBanner.subTitle")}</h1>
                <ol className="">
                  <li>{t("Home.getStatedBanner.step1")}</li>
                  <li>{t("Home.getStatedBanner.step2")}</li>
                  <li>{t("Home.getStatedBanner.step3")}</li>
                </ol>
                <div className="hashTag">
                  <p>{t("Home.getStatedBanner.#title")}</p>
                </div>
              </div>
              <div className="getstarted-right w-50">
                <SilkSlider {...getstarted}>
                  {
                    getstarteddata.map((item, i) => (
                      <img src={item.src} alt="member" key={i} />
                    ))
                  }
                </SilkSlider>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {
        loginModal && <Loginmodal show={loginModal} onHide={(item: any) => logginPopup(item)} userType={userType ? userType : ""} getStart={getStart} />
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
      {/* {changePassword && <ChangePasswordModal show={changePassword} onHide={() => setChangePassword(false)} />} */}

      {
        createAccountmodal && <CreateAccountmodal show={createAccountmodal} onHide={() => setCreateAccountmodal(false)} />
      }
      {
        registermodal && <RegisterYourAccount show={registermodal} onHide={() => setRegistermodal(false)} userType={userType ? userType : ""} />
      }


      {/* {
        forgotPasswordModal && <ForgotPasswordModal show={forgotPasswordModal} onHide={(item: any) => item === "continue" ? continuePopup() : setForgotPasswordModal(false)} />
      }

      {forgotPasswordSuccesModel && <ForgotPasswordSuccesModel show={forgotPasswordSuccesModel} onHide={() => setForgotPasswordSuccesModel(false)} />} */}

    </>
  );
};

export default Home;

