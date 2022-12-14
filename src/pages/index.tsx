import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import About from "./about/About";
import Home from "./home/Home";
import Learn from "./learn/Learn";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import TermsAndConditions from "./termsandconditions/TermsAndConditions";
import Contact from "./contact/Contact";
import Schemes from "./schemes/Schemes";
import View_Schemes from "./schemes/view_schemes/View_Schemes";
import Courses from "./learn/tabs/Courses";
import Jobs from "./jobs/Jobs";
import LayOuts from "../layout/LayOuts";
import Watchlist from "./Watchlist/Watchlist";
import Course from "./Course/Course";
import Careers from "./Careers/Careers";
import Nursing from "./Nursing/Nursing";
import { log } from "console";
import AuthStorage from "../helper/AuthStorage";
import STORAGEKEY from "../config/APP/app.config";
import { IsLogin } from "../redux/actions/isLoginAction";
import { useDispatch, useSelector } from "react-redux";
import { ApiGet, ApiGetNoAuth } from "../helper/API/ApiData";
import { GET_LANGUAGE, GET_LANGUAGE_BY_NAME, LOGIN, LOGIN_ERROR, SIGNUP, SIGNUP_ERR, USER_AUTH_SIGNUP } from "../redux/type";
import { RootState } from "../redux/store";
import { toast } from 'react-toastify';
import ViewSingleJob from "./jobs/ViewSingleJob";
import View_all_schemes from "./schemes/View_all_schemes";
import ViewAllCourses from "./Course/ViewAllCourses";
import ViewAllJob from "./jobs/ViewAllJob";
import GetStarted from "./Get Started/GetStarted";
import Recommendation from "./Get Started/Recommendation ";
import i18next from "i18next";
import Partners from "./partners/Partners";
import PostJob from "./postJob/PostJob";
import PostJobLogIn from "./postJob/PostJobLogIn";
import News_Updates from "./news Updates/News_Updates";
import PrivacyPolicy from "./privacypolicy/PrivacyPolicy";
import FrequentlyAskedQuestions from "./frequentlyaskedquestions/FrequentlyAskedQuestions";
import MyProfile from "./myProfile/MyProfile";
import Testimonials from "./testimonials/Testimonials";
import EditProfile from "../employer/MyProfile/EditProfile";
import ViewAllNews from "./news Updates/ViewAllNews";

const Pages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let { pathname } = { ...location };
  const dispatch = useDispatch()

  const [loginFlag, setloginFlag] = useState(false)
  const [flag, setFlag] = useState(false)
  const loginData = useSelector((state: RootState) => state.login.loginData)

  const loginError = useSelector((state: RootState) => state.login.loginError)
  const singupData = useSelector((state: any) => state.signupData.userAuthSingup)
  const singupError = useSelector((state: any) => state.signupData.userAuthSingupError)
  const userAuthSingupData = useSelector((state: any) => state.signupData.userAuthSingup)

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.language) === null || AuthStorage.getStorageData(STORAGEKEY.language) === "null") {
      const lan = "English";
      ApiGetNoAuth(`language/getLanguageByName?name=${lan}`).then((res: any) => {
        AuthStorage.setStorageData(STORAGEKEY.language, res.data.id, true);
        AuthStorage.setStorageData(STORAGEKEY.lang, res.data.name.slice(0, 2).toLowerCase(), true);
      });
    }
  }, [AuthStorage.getStorageData(STORAGEKEY.language)])

  useEffect(() => {
    if (!AuthStorage.getStorageData(STORAGEKEY.language)) {
      const lan = "English";
      ApiGetNoAuth(`language/getLanguageByName?name=${lan}`).then((res: any) => {
        dispatch({
          type: GET_LANGUAGE_BY_NAME,
          payload: res
        })
        AuthStorage.setStorageData(STORAGEKEY.language, res.data.id, true);
        AuthStorage.setStorageData(STORAGEKEY.lang, res.data.name.slice(0, 2).toLowerCase(), true);
      });
    }
    else {
      ApiGetNoAuth(`language/getLanguage`).then((res: any) => {
        if (res?.data?.length) {
          let selected = res.data.find((ele: any) => ele.id === AuthStorage.getStorageData(STORAGEKEY.language)).name.slice(0, 2).toLowerCase()
          AuthStorage.setStorageData(STORAGEKEY.lang, selected, true);
          i18next.changeLanguage(selected)
        }
      })
    }
  }, [AuthStorage.getStorageData(STORAGEKEY.language)])

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    if (AuthStorage.getToken()) {
      dispatch(IsLogin(true))
    } else {
      dispatch(IsLogin(false))
    }
  }, []);


  useEffect(() => {
    if (loginData && loginData.status !== 200 && loginData.message === "Unauthorized User") {
      toast.error("User not found");
    }
  }, [loginData])

  useEffect(() => {
    if (singupData && singupData.message === "User already exists") {
      toast.warn(singupData.message)
    } else if (singupData && singupData.status === 200) {
      setloginFlag(true)
      toast.success("Singup successfully")
      setFlag(true)
      dispatch({
        type: USER_AUTH_SIGNUP,
        payload: null,
      })
    }
    else if (singupData && singupData.status !== 200) {
      toast.error("Something Wrong");
    }
  }, [singupData])

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
      dispatch({
        type: LOGIN_ERROR,
        payload: null,
      })
    }
  }, [loginError])

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.userType)?.toLowerCase() === 'employer') {
      navigate('/')
    }
  }, [AuthStorage.getStorageData(STORAGEKEY.userType)])

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.userType)?.toLowerCase() === 'partner') {
      navigate('/partner/dashboard')
    }
  }, [AuthStorage.getStorageData(STORAGEKEY.userType)])


  // if (["/", "/about", "/learn", "/termsandconditions", "/contact", "/schemes", "/view_schemes", "/jobs", "/viewsinglejob", "/course", "/nursing",].includes(pathname)) {
  if (["/", "/about", "/learn", "/termsandconditions", "/contact", "/schemes", "/view_schemes", "/jobs", "/viewsinglejob", "/course", "/nursing", "/privacypolicy"].includes(pathname)) {
    return (
      <>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/view_schemes" element={<View_Schemes />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/viewsinglejob" element={<ViewSingleJob />} />
            <Route path="/course" element={<Course />} />
            {/* <Route path="/careers" element={<Careers />} /> */}
            <Route path="/nursing" element={<Nursing />} />

            {/* <Route path="/view_all_schemes" element={<View_all_schemes />} /> */}
            {/* <Route path="/view_all_course" element={<ViewAllCourses />} /> */}
          </Routes>
        </Layout>
      </>
    );
  } else if (["/watchlist", "/view_all_schemes", "/view_all_course", "/get_started", "/recommendation", "/careers", "/view_all_jobs", "/partners", "/postjob", "/postjoblogin", "/news_updates", '/faqs', '/myprofile', '/testimonials', "/edit-profile", "/viewAllNews"].includes(pathname)) {
    return (
      <>
        <LayOuts>
          <Routes>
            <Route path="/postjob" element={<PostJob />} />
            <Route path="/postjoblogin" element={<PostJobLogIn />} />
            <Route path="/watchlist" element={<Watchlist />} />
            {/* <Route path="/courses" element={<Courses />} /> */}
            <Route path="/view_all_schemes" element={<View_all_schemes />} />
            <Route path="/view_all_course" element={<ViewAllCourses />} />
            <Route path="/view_all_jobs" element={<ViewAllJob />} />
            <Route path="/news_updates" element={<News_Updates />} />
            <Route path="/get_started" element={<GetStarted />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/recommendation" element={< Recommendation />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/viewAllNews" element={<ViewAllNews />} />
          </Routes>
        </LayOuts>
      </>
    );
  }
  else {
    return (
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center flex-column">

        <h2>404 Error </h2>
        <h2> Please Go back!</h2>
      </div>
    );
  }
};
export default Pages;
