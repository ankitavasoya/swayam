import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducer } from './reducer/loginReducer'
import { courseRatingReucer } from './reducer/courseRatingReducer';
import { schemesReducer } from './reducer/schemesReducer';
import { schemesRatingReducer } from './reducer/schemeRatingReducer';
import { courseReducer } from './reducer/courseReducer';
import { languageReducer } from './reducer/langugageReducer';
import { stateReducer } from './reducer/stateReducer';
import { isLoginReducer, isProfileImage } from './reducer/IsLoginReducer';
import { jobReducer } from './reducer/jobReducer';
import { bannerReducer } from './reducer/bannerReducer';
import { userPanelReducer } from './reducer/userAnelReducer';
import { jobApplicationReducer } from './reducer/jobApplicationReducer';
import { activejobsReducer } from './reducer/activejobsReducer';
import { districtReducer } from './reducer/districtReducer';
import { signupReducer } from './reducer/signupReducer';
import { testimonialReducer } from "./reducer/testimonialReducer";
import { articleReducer } from './reducer/articelReduc';
import { carouselReducer } from './reducer/carouselReducer';
import { getAllUserReducer } from './reducer/userReducer';
import { activeCourseReducer } from './reducer/ActiveCourseReducer';
import { faqsReducer } from './reducer/faqsReducer';
import { contactUsReucer } from './reducer/ContactUs';
import { privacyReducer } from './reducer/PrivancypolicyReducer';
import { aboutUsReducer } from './reducer/aboutUs';
import { inspirationalStoriesReducer } from './reducer/InspirationalStoriesReduce';
import { sendMailReducer } from './reducer/sendMailToHRReducer';
import { getStartedReducer } from './reducer/getStartReducer';
export interface RootState {
  signupData: any,
  login: any,
}
const middleware = [thunk];

const rootReducer = combineReducers({
  signupData: signupReducer,
  login: loginReducer,
  isProfile: isProfileImage,
  isLogin: isLoginReducer,
  courseData: courseReducer,
  cosuesRatingData: courseRatingReucer,
  schemesData: schemesReducer,
  schemesRatingData: schemesRatingReducer,
  cosuesRating: courseRatingReucer,
  schemesRating: schemesRatingReducer,
  languageData: languageReducer,
  stateData: stateReducer,
  jobData: jobReducer,
  bannerData: bannerReducer,
  userPanelData: userPanelReducer,
  jobApplicationData: jobApplicationReducer,
  activeJobsData: activejobsReducer,
  districtData: districtReducer,
  articleData: articleReducer,
  testimonialData: testimonialReducer,
  carouselData: carouselReducer,
  userData: getAllUserReducer,
  activeCourse: activeCourseReducer,
  faqsData: faqsReducer,
  contactUs: contactUsReucer,
  privacy: privacyReducer,
  aboutUs: aboutUsReducer,
  inspirationalStoriesData: inspirationalStoriesReducer,
  sendMailData: sendMailReducer,
  getstartedData: getStartedReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;