import { useTheme } from "@emotion/react";
import { style } from "@mui/system";
import React, { createElement, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import CreateAccountmodal from "../components/modals/CreateAccountmodal";
import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";
import ForgotPasswordSuccesModel from "../components/modals/ForgotPasswordSuccesModel";
import Loginmodal from "../components/modals/Loginmodal";
import RegisterYourAccount from "../components/modals/RegisterYourAccount";
import STORAGEKEY from "../config/APP/app.config";
import AuthStorage from "../helper/AuthStorage";
import Share from "../helper/sharer/Share";
import { addSavedCourse, deleteSavedCourse } from "../redux/actions/courseAction";
import { addSavedJob, deleteSavedJob } from "../redux/actions/jobAction";
import { addSaveedSchemesAction, deleteSaveedSchemesAction } from "../redux/actions/schemesAction";
import dotenv from 'dotenv';
import { Helmet } from "react-helmet";
import { addSavedNews, deleteSavedNews } from "../redux/actions/articleAction";
import ChangePasswordModal from "../components/modals/ChangePassword";

let userid = AuthStorage.getStorageData(STORAGEKEY.userId)

interface Props {
  img: String;
  text: any;
  title: String;
  btntext: String;
  link: string;
  isShowRating: boolean;
  location?: boolean;
  rat_count?: boolean;
  navigateTo?: string;
  rating?: [];
  time?: string;
  d_none?: string;
  locationName?: string;
  Job_Recommendation?: boolean;
  imgShow?: boolean;
  avg?: [];
  locations?: [];
  rating_count?: string;
  vidoUrl?: string
  save?: string
  id?: string
  type?: string
  saveArticle?: any
  redirectPath?: any
}

const AcquireCard: FC<Props> = ({ img, title, text, btntext, link, isShowRating, location, rat_count, navigateTo, rating, time, d_none, locationName, Job_Recommendation, imgShow, rating_count, vidoUrl, save, id, type, saveArticle, redirectPath }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const [showShare, setShowShare] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [loginModal, setLoginModal] = useState(false)
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
  const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState(false)
  const [createAccountmodal, setCreateAccountmodal] = useState(false)
  const [registermodal, setRegistermodal] = useState<boolean>(false)
  const [changePassTog, setChangePassTog] = useState(false)
  const [forgotValue, setForgotValue] = useState<string>('')

  let userid = AuthStorage.getStorageData(STORAGEKEY.userId)

  const readMore = () => {
    if (vidoUrl) {
      {
        window.open(`${vidoUrl}`, '_blank',)
      }
    } else {
      navigate(`/${navigateTo}`)
    }
  }

  useEffect(() => {
    if (rating?.length) {
      var sum = 0;
      for (var i = 0; i < rating.length; i++) {
        sum += parseInt(rating[i]);
      }
      setAvgRating(sum / rating.length);
    }
  }, [rating])


  const saved = () => {
    if (AuthStorage.getToken()) {
      if (type === "SCHEME") {
        dispatch(addSaveedSchemesAction(id))
      }
      if (type === "COURSE") {
        dispatch(addSavedCourse(id))
      }
      if (type === "JOB") {
        let body = {
          job: id
        }
        dispatch(addSavedJob(body))
      }
      if (type === "NEWS") {
        let body = {
          newsId: id
        }
        dispatch(addSavedNews(body))
      }
    } else {
      setLoginModal(true)
    }
  }

  const unSave = () => {
    if (AuthStorage.getToken()) {
      if (type === "SCHEME") {
        dispatch(deleteSaveedSchemesAction(id))
      }
      if (type === "COURSE") {
        let body = {
          user_id: userid,
          course_id: id,
        }
        dispatch(deleteSavedCourse(body))
      }
      if (type === "JOB") {
        let body = {
          job_id: id,
          user_id: userid
        }
        dispatch(deleteSavedJob(body))
      }
      if (type === "NEWS") {
        let body = {
          news_id: id,
          user_id: userid
        }
        dispatch(deleteSavedNews(body))
      }
    } else {
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
      <div className="acquire-card">
        <div className="addon-btn">
          {save ? < img src="./assets/img/noun_add_3376954-1.png" alt="" className='menu-img' onClick={unSave} /> : !saveArticle ? <img src="./assets/img/noun_add.png" alt="add" className={`${d_none && "d-none"}`} onClick={saved} /> : ""}
        </div>
        <div style={{ 'height': '264px' }}>
          <figure className="m-0">
            <img
              className="mainImg"
              src={imgShow ? `./assets/img/${img}` : `${img}`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `./assets/img/1-SM580561@2x.png`
              }}
              alt="card-img"
              onClick={() => readMore()}
              style={{ cursor: "pointer" }}
            />
          </figure>
        </div>
        <div className="details">
          <div className="details-title">
            <h1 title={`${title}`} onClick={() => readMore()} style={{ cursor: "pointer" }}>{title}</h1>
            <button className="icon show-share-icon" onClick={() => setShowShare(!showShare)}>
              <FiShare2 />
              {showShare && (
                <div className="share">
                  <div className="social-share">
                    <ul>
                      <li onClick={() => Share('facebook', navigateTo)}>
                        <span >{t("jobs.share.facebook")}</span>
                        <figure>
                          {" "}
                          <img src="./assets/img/facebook.png" alt="facebook" />{" "}
                        </figure>
                      </li>
                      <li>
                        <span onClick={() => Share('linkedin', navigateTo)}>{t("jobs.share.linkedin")}</span>
                        <figure>
                          {" "}
                          <img src="./assets/img/linkedin.png" alt="Linkedin" />{" "}
                        </figure>
                      </li>
                      <li onClick={() => Share('twitter', navigateTo)}>
                        <span >{t("jobs.share.twitter")}</span>
                        <figure>
                          {" "}
                          <img src="./assets/img/twitter.png" alt="Twitter" />{" "}
                        </figure>
                      </li>
                      <li className="cursor-pointer" onClick={() => Share('whatsapp', navigateTo)}>
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
          </div>

          <p className="text">
            {text}
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <button className="enroll-btn" onClick={() => readMore()}>
              <span className="enroll-btn-text">{btntext}</span>
              <span>
                <HiOutlineArrowNarrowRight />
              </span>
            </button>

            <div className="d-flex rat-count">
              {
                isShowRating &&
                <StarRatings
                  rating={avgRating}
                  starRatedColor="#C90F22"
                  numberOfStars={5}
                  name="scheme"
                  starDimension="22px"
                />
              }
              {
                rat_count && <p className='ms-2'>({rating_count ? rating_count : 0})</p>
              }

            </div>

            {
              time &&
              <div className="post-time">
                <p>{time ?? ''}</p>
              </div>
            }

            {location && (
              <div className='d-flex justify-content-between'>
                <div className='d-flex location'>
                  <img src="./assets/img/location-pin.png" alt="" />
                  <p>{locationName ?? ''}</p>
                </div>
              </div>
            )}
          </div>
        </div>
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
  );
};

export default AcquireCard;
