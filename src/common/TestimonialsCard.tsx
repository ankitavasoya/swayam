import { height } from "@mui/system";
import React, { FC, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import ReactPlayer from "react-player";
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

interface Props {
    img: any;
    text: any;
    title: String;
    time?: string;
    vidoUrl?: string
    imgShow?: any
    playBtn?: boolean
    role?: string
}

const TestimonialCard: FC<Props> = ({ img, title, text, vidoUrl, imgShow, playBtn, role }) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [playVideo, setPlayVideo] = useState(false);

    return (
        <>
            <div className="acquire-card d-lg-flex mt-5 gy-3" style={{ height: "100%" }}>
                <Col lg="4">
                    <div className="testimonial-card" style={{ padding: "5px" }}>
                        {playBtn ? <img src="./assets/img/play-button.png" className="play-icon" onClick={() => { setPlayVideo(true) }} /> : ""}
                        <img src={img} className="" width="100%" height="100%" style={{ borderRadius: '15px' }} />
                    </div>
                </Col>
                <Col lg="8">
                    <div className="text-slider">
                        <h3> {title} </h3>
                        <p className="post-name">{role}</p>
                        <div className="detail-text">
                            <p>
                                {text}
                            </p>
                        </div>
                    </div>
                </Col>
            </div>
            {playVideo &&
                <div className='react-player'>
                    <img src='./assets/img/wrong.png' className="vedio_close_btn" onClick={() => setPlayVideo(false)} />
                    <ReactPlayer
                        url={vidoUrl}
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
        </>

    );
};

export default TestimonialCard;
