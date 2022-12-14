import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WriteToUs from '../../components/modals/WriteToUs';
import STORAGEKEY from '../../config/APP/app.config';
import AuthStorage from '../../helper/AuthStorage';
import { getContactUs } from '../../redux/actions/ContactUs';

const Contact = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [writeToUs, setWriteToUs] = useState(false);

    const openWriteToUs = () => {
        setWriteToUs(true)
    }

    const contactUsData = useSelector((state: any) => state.contactUs.contactUsData)

    useEffect(() => {
        if (AuthStorage.getStorageData(STORAGEKEY.language)) {
            dispatch(getContactUs(AuthStorage.getStorageData(STORAGEKEY.language)))
        }
    }, [AuthStorage.getStorageData(STORAGEKEY.language)])


    useEffect(() => {
        console.log('🎈', contactUsData?.data?.mapLink)
    }, [contactUsData])


    const growtogathercard = [
        {
            img: "./assets/img/Group 16.png",
            text: "Our answers to some Frequently Asked Questions can resolve your queries",
            alts: "Group 4",
            title: "Need help",
            button: "Explore FAQs"
        },
        {
            img: "./assets/img/Group 4.png",
            text: "Mr. Samuel Carvalho",
            email: 'samuel@rpgf.in',
            alts: "Group 4 (1)",
            title: "Collaborate with us:"
        },
        {
            img: "./assets/img/Group 19.png",
            text: "Be it queries or want to know more about Jobs, Courses and Partners",
            alts: "Group 16",
            title: "Write to us",
            button: "Write to us",
            onclick: () => openWriteToUs()
        },
        {
            img: "./assets/img/Group 4 (1).png",
            text: "Monday to Friday 8 AM to 8 PM Saturday and Sunday 9 AM to 6 PM",
            alts: "Group 4",
            title: "Call us on",
            number: '1234 980 222 / 1800 200 022'
        },
    ]

    const redirecthyperLink = (link: string) => {
        let doc = document;
        let a = doc.createElement("a");
        a.href = link;
        a.target = '_blank';
        a.click();
    }

    const redirectFaq = () => {
        navigate("/frequentlyaskedquestions")
    }

    return (
        <>
            <div className="termsandconditions_bg contact">
                <Container style={{ paddingTop: '180px' }}>
                    <div className="breadcrums">
                        <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Contact Us</button>
                    </div>
                    <div className='careers-titel'>
                        <h1>Contact</h1>
                    </div>
                    <div className="growtogathercard gy-3">
                        {/* {
                            growtogathercard.map((item) => (
                                <div className="m-3 contact-card">
                                    <img src={item.img} alt={item.alts} />
                                    <h4 className="title">{item.title}</h4>
                                    {item.number && <p style={{ color: '#C90F22', fontWeight: 'bold' }}>{item.number}</p>}
                                    <p className="text mb-0">{item.text}</p>
                                    {item.email && <p style={{ color: '#C90F22', fontWeight: 'bold' }}>{item.email}</p>}
                                    {item?.button && <button onClick={item.onclick} className='red-button mt-3'>{item.button}</button>}
                                </div>
                            ))
                        } */}

                        <div className="m-3 contact-card">
                            <img src="./assets/img/Group 16.png" />
                            <h4 className="title">Need help</h4>
                            <p className="text mb-0">Our answers to some Frequently Asked Questions can resolve your queries</p>
                            <button className='red-button mt-3' onClick={() => navigate('/faqs')}>Explore FAQs</button>
                        </div>

                        <div className="m-3 contact-card">
                            <img src="./assets/img/Group 4.png" />
                            <h4 className="title">Collaborate with us:</h4>
                            <p className="text mb-0">{contactUsData?.data?.collaborateName}</p>
                            <p style={{ color: '#C90F22', fontWeight: 'bold' }}>{contactUsData?.data?.collaborateEmail}</p>
                        </div>

                        <div className="m-3 contact-card">
                            <img src="./assets/img/Group 19.png" />
                            <h4 className="title">Write to us</h4>
                            <p className="text mb-0">Be it queries or want to know more about Jobs, Courses and Partners</p>
                            <button onClick={() => openWriteToUs()} className='red-button mt-3'>Write to us</button>
                        </div>

                        <div className="m-3 contact-card">
                            <img src="./assets/img/Group 4 (1).png" />
                            <h4 className="title">Call us on</h4>
                            <p style={{ color: '#C90F22', fontWeight: 'bold' }}>{contactUsData?.data?.mobile} / {contactUsData?.data?.contactNo}</p>
                            <p className="text mb-0">{contactUsData?.data?.officeHours}</p>
                        </div>

                    </div>
                </Container>
            </div>
            <div className="connect-map">
                {/* <iframe src="https://maps.google.com/maps?q=silver%50business%50point&t=&z=17&ie=UTF8&iwloc=&output=embed" allowFullScreen></iframe> */}
                <iframe src={contactUsData.data.mapLink} allowFullScreen></iframe>
            </div>
            <Container>

                <div className="contact-detail">
                    <Row>
                        <Col lg={8}>
                            <h1 className="title">
                                {contactUsData?.data?.location}
                            </h1>
                            <div className="registered-address">
                                <h2>Registered Address</h2>
                                <h2>{contactUsData?.data?.companyName}</h2>
                                <h6>{contactUsData?.data?.companyAddress}</h6>
                            </div>
                            <div className="registered-address mt-3">
                                <h2>Office Hours</h2>
                                {/* <h6>Monday to Friday 9 am to 6pm</h6> */}
                                <h6>{contactUsData?.data?.officeHours}</h6>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <h1 className='link-title'>Connect with us</h1>
                            <div className="connect-logos">
                                <img src="./assets/img/connect-facebook.png" alt="fb" onClick={() => redirecthyperLink(contactUsData?.data?.facebookLink)} />
                                <img src="./assets/img/connect-twitter.png" alt="twitter" onClick={() => redirecthyperLink(contactUsData?.data?.twitterLink)} />
                                <img src="./assets/img/connect-in.png" alt="in" onClick={() => redirecthyperLink(contactUsData?.data?.linkedinLink)} />
                                <img src="./assets/img/connect-insta.png" alt="insta" onClick={() => redirecthyperLink(contactUsData?.data?.instagramLink)} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            {
                writeToUs && <WriteToUs show={writeToUs} onHide={() => setWriteToUs(false)} />
            }
        </>
    )
}

export default Contact