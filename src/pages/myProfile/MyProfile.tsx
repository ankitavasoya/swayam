import { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import Applied from "../../assets/img/portfolio.png";
import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/drawer/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/actions/loginAction';
import { ApiGet } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const MyProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getUserData = useSelector((state: any) => state.login.getUserData)

    const [drawer, setDrawer] = useState(false)
    const [userData, setUserData] = useState<any>([])
    const [cardData, setCardData] = useState<any>([])
    const [title, setTitle] = useState<any>()

    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
        if (getUserData && getUserData.data) {
            setUserData(getUserData.data)
        }
        AuthStorage.setStorageData(STORAGEKEY.profileImg, getUserData?.data?.avatar, true);
    }, [getUserData])


    const editprofile = () => {
        navigate('/edit-profile')
    }
    const handalClick = (text: any, txt: any) => {
        let url = ''
        if (text === "Applied_jobs") {
            url = `user/auth/getAppliedJobsByUser`
        } else if (text === "Saved_jobs") {
            url = `user/auth/getSavedJobsByUser`
        } else if (text === "Ongoing_courses") {
            url = `user/auth/getOngoingCourseByUser`
        } else if (text === "Saved_courses") {
            url = `user/auth/getSavedCoursesByUser`
        } else if (text === "Saved_schemes") {
            url = `user/auth/getSavedSchemesByUser`
        } else if (text === "Saved_news") {
            url = `user/auth/getSavedNewsByUser`
        }
        ApiGet(`${url}?userId=${userData.id}`)
            .then((res: any) => {
                console.log("res", res);
                if (res && res.data && text === "Applied_jobs") {
                    setCardData(res && res.data && res.data.length && res.data.map((item: any) => {
                        return {
                            name: item.job_details?.jobType?.name,
                            thumbnail: item.job_details.thumbnail,
                            detail: item.job_details.description,
                            type: "JOB",
                            navigateTo: "view_all_jobs",
                        }
                    }))
                }
                else if (res && res.data && text === "Saved_jobs") {
                    setCardData(res && res.data && res.data.length && res.data.map((item: any) => {
                        return {
                            name: item.SelectedJob?.jobType?.name,
                            thumbnail: item.SelectedJob.thumbnail,
                            detail: item.SelectedJob.description,
                            type: "JOB",
                            navigateTo: "view_all_jobs",
                        }
                    }))
                } else if (res && res.data && text === "Ongoing_courses") {
                    setCardData(res && res.data && res.data.length && res.data.map((item: any) => {
                        return {
                            name: item.SelectedCourse?.name,
                            thumbnail: item.SelectedCourse.thumbnail,
                            detail: item.SelectedCourse.detail,
                            type: "COURSE",
                            navigateTo: "view_all_course",
                        }
                    }))
                } else if (res && res.data && text === "Saved_courses") {
                    setCardData(res && res.data && res.data.length && res.data.map((item: any) => {
                        return {
                            name: item.SelectedCourse?.name,
                            thumbnail: item.SelectedCourse.thumbnail,
                            detail: item.SelectedCourse.detail,
                            type: "COURSE",
                            navigateTo: "view_all_course",
                        }
                    }))
                } else if (res && res.data && text === "Saved_schemes") {
                    setCardData(res && res.data && res.data.length && res.data.map((item: any) => {
                        return {
                            name: item.SelectedScheme?.name,
                            thumbnail: item.SelectedScheme.thumbnail,
                            detail: item.SelectedScheme.detail,
                            type: "SCHEME",
                            navigateTo: "view_all_schemes",
                        }
                    }))
                } else if (res && res.data && text === "Saved_news") {
                    setCardData(res && res.data && res.data.length && res.data.map((item: any) => {
                        return {
                            name: item.SelectedNews?.title,
                            thumbnail: item.SelectedNews.imageUrl,
                            detail: item.SelectedNews.body,
                            type: "NEWS",
                            navigateTo: "viewAllNews",
                        }
                    }))
                }
            })
        setDrawer(true)
        setTitle(txt)
    }
    const otherInfo = [
        {
            img: Applied,
            txt: "Applied jobs",
            total: userData?.jobApplication,
            text: "Applied_jobs"
        },
        {
            img: Applied,
            txt: "Saved Jobs",
            total: userData?.savedJobs,
            text: "Saved_jobs"
        },
        {
            img: Applied,
            txt: "Ongoing courses",
            total: userData?.enrolledCourses,
            text: "Ongoing_courses"

        },
        {
            img: Applied,
            txt: "Saved Courses",
            total: userData?.savedCourses,
            text: "Saved_courses"

        },
        {
            img: Applied,
            txt: "Saved schemes",
            total: userData?.savedSchemes,
            text: "Saved_schemes"

        },
        {
            img: Applied,
            txt: "Saved News",
            total: userData?.savedNews,
            text: "Saved_news"
        },
    ]

    return (
        <>
            <div className='my_profile_main'>
                <Container>
                    <h1 className='heading-txt'>My Profile</h1>
                    <div className='profile-view'>
                        <Row>
                            <Col lg={4}>
                                <Row className='border-right'>
                                    <Col lg={5}>
                                        <div className='profile-detail'>
                                            <img className='profile_picture' src={userData?.avatar} alt="" />
                                            <button><img src='./assets/img/Mask (1).png' />
                                                <a href={userData?.resumeUrl}
                                                    download
                                                    target={"_blank"} className="download-file">
                                                    Click to download
                                                </a></button>
                                        </div>
                                    </Col>
                                    <Col lg={7}>
                                        <div className='employee-detail'>
                                            <h1>{ }</h1>
                                            <h2>General Duty Assistant</h2>
                                            <div className='d-flex align-items-center mt-3'>
                                                <img src="./assets/img/Shape_2.png" alt="" />
                                                <h2 className='ms-2'>{userData.state}</h2>
                                            </div>
                                            <div className='d-flex align-items-center mt-3'>
                                                <img src="./assets/img/telephone.png" alt="" />
                                                <h2 className='ms-2'>+91 {userData?.phone}</h2>
                                            </div>
                                            <div className='profile_social'>
                                                <img src="./assets/img/Path@2x.png" alt="" style={{ width: "13px" }} onClick={() => { userData?.facebookLink ? window.open(userData?.facebookLink) : "" }} />
                                                <img src="./assets/img/Path-1@2x.png" alt="" onClick={() => { userData.twitterLink ? window.open(userData?.twitterLink) : "" }} />
                                                <img src="./assets/img/Group 14@2x.png" alt="" onClick={() => { userData?.linkedInLink ? window.open(userData?.linkedInLink) : "" }} />
                                                <img src="./assets/img/noun-insta-3324511.svg" alt="" onClick={() => { userData?.instagramLink ? window.open(userData?.instagramLink) : "" }} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={8}>
                                <div className='social-detail-main'>
                                    <div className='social-detail'>
                                        <button onClick={() => editprofile()}>Edit Profile</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='mt-2'>
                        <Row className='' style={{ rowGap: '15px' }}>
                            {otherInfo.map((item, i) => (
                                <Col lg={2}>
                                    <div className='other-infos cursor-pointer' onClick={() => handalClick(item.text, item.txt)}>
                                        <img src={item.img} alt="" />
                                        <p>{item.txt}</p>
                                        <h1>{item.total}</h1>
                                    </div>
                                </Col>
                            ))
                            }

                        </Row>
                    </div>
                </Container>
            </div>
            {
                drawer && <Drawer handleClose={() => setDrawer(false)} show={drawer} data={cardData} heding={title} />
            }

        </>
    )
}

export default MyProfile