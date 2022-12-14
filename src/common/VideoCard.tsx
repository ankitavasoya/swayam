import { log } from "console";
import React, { FC, useEffect, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import ReactPlayer from "react-player";
import Rating from "react-rating";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import ChangePasswordModal from "../components/modals/ChangePassword";
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
interface Props {
    img: String;
    text: any;
    title: String;
    btntext: String;
    link: string;
    isShowRating: boolean;
    time?: any;
    rat_count?: boolean;
    imgShow?: boolean;
    rating?: any,
    rating_count?: any,
    save?: string
    id?: string
    type?: string
    d_none?: string;
    video_url?: string;
}

const VideoCard: FC<Props> = ({ img, title, text, btntext, link, isShowRating, time, rat_count, d_none, imgShow, rating, rating_count, save, id, type, video_url }) => {
    const dispatch = useDispatch()
    const [showShare, setShowShare] = useState(false);
    const [avgRating, setAvgRating] = useState(0);
    const [loginModal, setLoginModal] = useState(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState(false)
    const [changePassTog, setChangePassTog] = useState(false)
    const [createAccountmodal, setCreateAccountmodal] = useState(false)
    const [registermodal, setRegistermodal] = useState<boolean>(false)
    const [forgotValue, setForgotValue] = useState<string>('')
    const [playVideo, setPlayVideo] = useState(false);

    let userid = AuthStorage.getStorageData(STORAGEKEY.userId)

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
            <div
                className={`acquire-card video-card ${time && 'acquire-card-time'}`}
            >
                <div className="addon-btn">
                    {/* <img src="./assets/img/noun_add.png" alt="add" /> */}
                    {save ? < img src="./assets/img/noun_add_3376954-1.png" alt="" className='menu-img' onClick={unSave} /> : <img src="./assets/img/noun_add.png" alt="add" className={`${d_none && "d-none"}`} onClick={saved} />}


                </div>
                <figure className="m-0">
                    <img
                        className="mainImg"
                        // src={imgShow ? `./assets/img/${img}` : `${img}`}
                        src={imgShow ? `./assets/img/video-1.svg` : `${img}`}
                        alt="card-img"
                    />
                </figure>
                <img src="./assets/img/small-play_button.png" alt="" width="88px" className="play_btn" onClick={() => setPlayVideo(true)} />
                <div className="details">
                    <div className="details-title">
                        <div className="video-card-title">
                            <h1>{title}</h1>
                        </div>
                        {/* <button className="icon show-share-icon" onBlur={() => { setShowShare(false) }} onClick={() => setShowShare(!showShare)}> */}
                        <button className="icon show-share-icon" onClick={() => setShowShare(!showShare)} onBlur={() => setShowShare(false)}>
                            <FiShare2 />
                        </button>
                    </div>
                    <p className="text">
                        {text}
                    </p>
                    {
                        time && <div className='d-flex time-ago'>
                            <img src="./assets/img/history (2).png" alt="" />
                            <h2>{time} minute</h2>
                        </div>
                    }
                    <div className="d-flex justify-content-between align-items-center">
                        <button className="enroll-btn">
                            <span className="enroll-btn-text" onClick={() => window.open(`${video_url}`, '_blank')}>{btntext}</span>
                            <span>
                                <HiOutlineArrowNarrowRight />
                            </span>
                        </button>


                        <div className="d-flex rat-count">
                            {
                                isShowRating &&
                                // <div className="d-flex star-row">
                                //   <div className="star-list">
                                //     <Rating
                                //       emptySymbol={<img src="./assets/img/Star.png" className="mr-1" alt="" />}
                                //       fullSymbol={<img src="./assets/img/fillstar.png" className="mr-1" alt="" />}
                                //       initialRating={4}
                                //       readonly={true}
                                //       stop={5}
                                //     />
                                //   </div>
                                // </div>
                                // :
                                // <img src={`./assets/img/${link}`} alt="" />
                                <StarRatings
                                    rating={avgRating}
                                    starRatedColor="#C90F22"
                                    numberOfStars={5}
                                    name="scheme"
                                    starDimension="22px"
                                />
                            }
                            {
                                rat_count && <p className='ms-2'>({rating_count ? rating_count : "0"})</p>
                            }
                        </div>
                    </div>
                </div>
                {showShare && (
                    <div className="share">
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
                                    <span onClick={() => Share('linkedin', 5)}>Linkedin</span>
                                    <figure>
                                        {" "}
                                        <img onClick={() => Share('linkedin', 5)} src="./assets/img/linkedin.png" alt="Linkedin" />{" "}
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
            </div>
            {playVideo &&
                <div className='react-player'>
                    <img src='./assets/img/wrong.png' className="vedio_close_btn" onClick={() => setPlayVideo(false)} />
                    <ReactPlayer
                        url={video_url ? video_url : "no Video"}
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

export default VideoCard