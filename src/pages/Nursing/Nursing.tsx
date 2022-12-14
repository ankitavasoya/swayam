import React, { useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import location_img from "../../assets/img/Shape.png";
import exp from "../../assets/img/noun-experience-4503584.png";
import salary from "../../assets/img/noun-monthly-salary-3302616.png";
import vacancy from "../../assets/img/noun-vacancy-3194977.png";
import email from "../../assets/img/noun-email-1569815@2x.png";
import work_time from "../../assets/img/noun-working-time-3835278@2x.png";
import job_type from "../../assets/img/noun-laptop-2230586.png";
import week from "../../assets/img/cala.png";
import applicants from "../../assets/img/noun-applicant-4058402@2x.png";
import How_To_Apply from '../schemes/view_schemes/tabs/How_To_Apply';
import Documentation from '../schemes/view_schemes/tabs/Documentation';
import AcquireCard from '../../common/AcquireCard';
import SilkSlider from "react-slick";
import WelcomeToSwayamConnect from '../../components/modals/WelcomeToSwayamConnect';
import { useNavigate } from 'react-router-dom';

const Nursing = () => {

    const navigate = useNavigate()
    const [showFaq, setShowFaq] = useState('');
    const [welcomeToSwayam, setWelcomeToSwayam] = useState(false)
    const readMore = (str: string, len: number) => {
        if (str.length < len) {
            return
        }
        let lessString = str.slice(0, len)
        return lessString + ' ...'
    }

    const jobDitails = [
        {
            img: location_img,
            txt: "Location",
            ditail: "Andheri, Mumbai",
        },
        {
            img: exp,
            txt: " Minimum Exp ",
            ditail: "2 - 3 Years",
        },
        {
            img: salary,
            txt: "    Monthly Salary",
            ditail: "₹ 10,000 to ₹ 2,00,000",
        },
        {
            img: vacancy,
            txt: "    Vacancies",
            ditail: "50",
        },
    ]

    const offiseDitail = [
        {
            col: 6,
            md: 12,
            img: email,
            txt: "Employer Email ID",
            ditail: "pankaj.kumar@porteamedical.com"
        },

        {
            col: 3,
            md: 6,
            img: work_time,
            txt: "Working hrs",
            ditail: "08:00pm to 08:00 am"
        },

        {
            col: 3,
            md: 6,
            img: job_type,
            txt: "  Job Type",
            ditail: "On roll, Full-time"
        },
    ]

    const otherDitail = [
        {
            col: 3,
            md: 6,
            img: week,
            txt: "7 days ago",
        },
        {
            col: 3,
            md: 6,
            img: applicants,
            txt: "Over 200 applicants",
        },
    ]

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

    const recommendationdata = [
        {
            img: "Schemes_card.png",
            title: "Lab Technician",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Apply Now",
            link: "",
        },
        {
            img: "Schemes_card.png",
            title: "General Duty Assistant",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Apply Now",
            link: "",
        },
        {
            img: "Schemes_card.png",
            title: "Job Headline with 1 lines ",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Apply Now",
            link: "",
        },
        {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Apply Now",
            link: "",
        },
    ]
    const acquirenewskillsdata = [
        {
            img: "Schemes_card.png",
            title: "Lab Technician",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Enroll  Now",
            link: "",
        },
        {
            img: "Schemes_card.png",
            title: "General Duty Assistant",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Enroll  Now",
            link: "",
        },
        {
            img: "Schemes_card.png",
            title: "Job Headline with 1 lines ",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Enroll  Now",
            link: "",
        },
        {
            img: "Schemes_card.png",
            title: "Free Artificial Limbs for …",
            text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
            btntext: "Enroll  Now",
            link: "",
        },
    ]

    const Testimonialsdata = [
        {
            profilePic: "profile-pic-2.png",
            text: " COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
            name: "Vineet Verma",
            role: "Lead Consultant",
        },
        {
            profilePic: "profile-pic.png",
            text: " COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
            name: "Vineet Verma",
            role: "Lead Consultant",
        },
        {
            profilePic: "profile-pic-2.png",
            text: " COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
            name: "Vineet Verma",
            role: "Lead Consultant",
        },
        {
            profilePic: "profile-pic.png",
            text: " COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
            name: "Vineet Verma",
            role: "Lead Consultant",
        },
        {
            profilePic: "profile-pic-2.png",
            text: " COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
            name: "Vineet Verma",
            role: "Lead Consultant",
        },
        {
            profilePic: "profile-pic.png",
            text: " COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
            name: "Vineet Verma",
            role: "Lead Consultant",
        },
        {
            profilePic: "profile-pic-2.png",
            text: " COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
            name: "Vineet Verma",
            role: "Lead Consultant",
        },
    ]

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

    const faqaccordion = [
        {
            number: "1",
            head: "What is a Schemes is designed for healthcare ?",
            body: "COVID 19 and your responsibilities as a healthcare or a frontline worker to protect yourself and others.The aim of these videos is to give you insights on COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
        },
        {
            number: "2",
            head: "What is a Schemes is designed for healthcare ?",
            body: "COVID 19 and your responsibilities as a healthcare or a frontline worker to protect yourself and others.The aim of these videos is to give you insights on COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
        },
        {
            number: "3",
            head: "What is a Schemes is designed for healthcare ?",
            body: "COVID 19 and your responsibilities as a healthcare or a frontline worker to protect yourself and others.The aim of these videos is to give you insights on COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
        },
        {
            number: "4",
            head: "What is a Schemes is designed for healthcare ?",
            body: "COVID 19 and your responsibilities as a healthcare or a frontline worker to protect yourself and others.The aim of these videos is to give you insights on COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
        },
        {
            number: "5",
            head: "What is a Schemes is designed for healthcare ?",
            body: "COVID 19 and your responsibilities as a healthcare or a frontline worker to protect yourself and others.The aim of these videos is to give you insights on COVID-19 precautions, steps to follow while performing your duties and protecting each other and your family. The course has been created as per the guidelines provided by Government of India & World Health Organization.",
        },
    ]
    return (
        <>

            <div className="breadcrums">
                <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Course</button>
            </div>
            <div className='nursing-bg' style={{ marginBottom: "" }}>
                <Container>
                    <div className='nursing-content'>
                        <img src="./assets/img/Screenshot 2022-01-05 at 3.48.58 PM Copy.png" alt="" style={{ marginBottom: "15px" }} />
                    </div>
                </Container>
            </div>
            <Container>
                <div className='nursing-ditails'>
                    <Row className='border-bottom'>
                        <Col lg={9} md={12}>
                            <div className='ditail'>
                                <h1>Nursing</h1>
                                <p>ICU Staff Nurse required for Home Health Care. Qualification - GNM/Bsc/Msc Nursing with registration Experience - 2-3 years minimum</p>
                                <div className='jobDitails-content'>
                                    <Row>
                                        {
                                            jobDitails.map((item) => (
                                                <Col lg={3} md={6} className=" mb-xs-3 mb-sm-5 mb-md-3 mb-lg-0">
                                                    <div className='location-pin'>
                                                        <div className='d-flex align-items-center'>
                                                            <img src={item.img} alt="" />
                                                            <p>{item.txt} </p>
                                                        </div>
                                                        <h1>{item.ditail}</h1>
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                                <div className='pt-4 jobDitails-content'>
                                    <Row>
                                        {
                                            offiseDitail.map((item) => (
                                                <Col lg={item.col} md={item.md} className="mb-xs-3 mb-md-3 mb-lg-0 ">
                                                    <div className='location-pin'>
                                                        <div className='d-flex align-items-center '>
                                                            <img src={item.img} alt="" />
                                                            <p>{item.txt} </p>
                                                        </div>
                                                        <h1>{item.ditail}</h1>
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                                <div className='pt-4 pb-4'>
                                    <Row>
                                        {
                                            otherDitail.map((item) => (
                                                <Col lg={item.col} md={item.md}>
                                                    <div className='location-pin'>
                                                        <div className='d-flex align-items-center'>
                                                            <img src={item.img} alt="" />
                                                            <p>{item.txt} </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} md={12}>
                            <div className='btn-content'>
                                <button className='apply_btn' onClick={() => setWelcomeToSwayam(true)}>Apply Now</button>
                                <button>Saved Job</button>
                                <button>Contact to HR</button>
                                <button>Share Job with your Friend</button>
                            </div>
                        </Col>
                    </Row>
                    <div>
                        <div className='job-detail'>
                            <h1>Greetings from PORTEA HEAL AT HOME !!</h1>
                            <h1 className='pt-4'>Job Details</h1>
                            <h1 className='pt-4'>Responsible for the End to End training for assigned therapy area for specified Geography.</h1>
                            <ul>
                                <li>Conduct certified training programs for Nurses in medical institutions.</li>
                                <li>Process Trainings: Provide new hires and existing team with trainings required to perform their jobs satisfactorily 	build resources to make them as a key member of the team.</li>
                                <li>Refresher Trainings/TNI: Conduct timely trainings based on the set process.</li>
                                <li>Build Knowledge Resources (Audio Visual Practices).</li>
                                <li>Analyzing Training Needs.</li>
                                <li>New Employee Performance Analysis- Measurement Certification.</li>
                                <li>Regularly meet HCPs and address their queries related to heart failure Nursing Care.</li>
                                <li>Align with the HO training team on the TNI of team members and ensure team members get adequate training 	required to perform as per expectation.</li>
                                <li>Deliberate on job training during joint field work.</li>
                                <li>Ensure quality of team members with respect to soft skills, medical knowledge, process knowledge is as per client 	expectations. </li>
                                <li>Conduct local level audits as a quality check on documentation and data entry of the team members.</li>
                            </ul>

                            <h1 className=''>Existing Employee Performance Analysis</h1>
                            <ul>
                                <li>Knowledge Checks: Assess Current Employees Training Needs through timely knowledge checks.Identify the Learning Opportunities.</li>
                                <li>	TNA: Analyzing Training Needs within the process.</li>
                                <li>Training Calendar: Build Own the Training Calendar.</li>
                                <li>Calendar Adherence: Complete all the process trainings as per the schedule.</li>
                                <li>Refresher / Re-trainings: Conduct trainings based on the identified calendar.</li>
                            </ul>

                            <h1>Process Management</h1>
                            <ul>
                                <li>Conduct Process Certification for New Hires</li>
                                <li>Manage Training Reporting as per defined SLA/Metrics</li>
                                <li>Ensure 100% compliance to the set Security Policies Procedures.</li>
                            </ul>

                            <h1>Compliance to quality, confidentiality and security of data.</h1>
                            <ul>
                                <li>Responsible to strictly adhere to quality standards, confidentiality and security policies of Indegene</li>
                                <li>Responsible to strictly adhere to quality, standards, confidentiality of client</li>
                            </ul>

                            <h1>Desired Skills (Education, Experience, Key Skills)</h1>
                            <ul>
                                <li>Fluent in English and any one regional language.</li>
                                <li>Good in Training and Presentation skill.</li>
                                <li>Good computer skills MS Office.</li>
                                <li>Ability to work in a process driven/ structured environment.</li>
                                <li>Remote training capability and willingness to travel to different locations based on the requirement.</li>
                                <li>Information seeking, listening and responsive, creative, think outside the box.</li>
                                <li>Should possess leadership qualities.</li>
                            </ul>

                            <h1>Education Qualification</h1>
                            <ul>
                                <li>BSc nursing, M.sc nursing, B.sc, M.sc</li>
                            </ul>

                            <h1 className='pt-4'>This job is provided by: PORTEA HEAL AT HOME</h1>
                        </div>
                    </div>
                </div>
                <div className='accordion-tab-div p-5'>
                    <div className='tab-main'>
                        <Tabs className=''>
                            <Tab eventKey="How to Apply" title="How to Apply">
                                <How_To_Apply />
                            </Tab>
                            <Tab eventKey="Documentation" title="Documentation">
                                <Documentation />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div>
                    <div className="know-employee view-scheme-recommendation container-xxl px-0">
                        <div className="title mt-4 mb-4">
                            <h1>Recommendation</h1>
                        </div>
                        <SilkSlider {...acquirenewskills}>
                            {
                                recommendationdata.map((item) => (
                                    <div className="view-scheme-recommendation-card">
                                        <AcquireCard
                                            img={item.img}
                                            title={item.title}
                                            text={item.text}
                                            btntext={item.btntext}
                                            link={item.link}
                                            isShowRating={false}
                                            navigateTo={"nursing"}
                                        />
                                    </div>
                                ))
                            }
                        </SilkSlider>
                        <p className='text-end'> <a href="">View All Schemes</a></p>
                    </div>
                </div>
                <div className="know-employee view-scheme-recommendation container-xxl px-0">
                    <div className="title mt-4 mb-4">
                        <h1>Recommendation Courses Related To Job</h1>
                    </div>
                    <SilkSlider {...acquirenewskills}>
                        {
                            acquirenewskillsdata.map((item) => (
                                <div className="view-scheme-recommendation-card">
                                    <AcquireCard
                                        img={item.img}
                                        title={item.title}
                                        text={item.text}
                                        btntext={item.btntext}
                                        link={item.link}
                                        isShowRating={true}
                                        navigateTo={"nursing"}
                                    />
                                </div>
                            ))
                        }
                    </SilkSlider>
                    <p className='text-end'> <a href="">View All Courses</a></p>
                </div>
            </Container>
            <div className="bg-f7f8f9">
                <div className="know-employee container-xxl px-0">
                    <div className="title mt-4 mb-4">
                        <h1>Testimonials</h1>
                    </div>
                    <Row className='justify-content-between'>
                        <Col lg={4}>
                            <h1 className='testimonials-text'>Here's what the Students and employers has to say</h1>
                        </Col>
                        <Col lg={6}>
                            <SilkSlider {...Testimonials}>
                                {
                                    Testimonialsdata.map((item) => (
                                        <>
                                            <div className="Testimonials-slider-popup">
                                                <h5 className="text">{item.text}</h5>
                                                <h5 className="name">{item.name}</h5>
                                                <h5 className="role">{item.role}</h5>
                                            </div>
                                            <div className="profile_pic Testimonials-image">
                                                <img src={`./assets/img/${item.profilePic}`} alt="Profile Pic" height="100%" width="100%" />
                                            </div>
                                        </>
                                    ))
                                }
                            </SilkSlider>
                        </Col>
                    </Row>
                </div>
            </div>
            <Container>
                <div className="view-schemes-faq">
                    <Row className='justify-content-between align-items-center'>
                        <Col lg={4}>
                            <img src="./assets/img/Question_Two Color.png" alt="" />
                        </Col>
                        <Col lg={7}>
                            <div className="know-employee container-xxl px-0">
                                <div className="title mt-4 mb-4">
                                    <h1>Frequently Asked Questions</h1>
                                </div>
                                {
                                    faqaccordion.map((item) => (

                                        <div className="faq-accordion mb-3" onClick={() => setShowFaq(item.number)}>
                                            <Col lg={2}>
                                                <div className="number">{item.number}</div>
                                            </Col>
                                            <Col lg={10}>
                                                <div className="text">
                                                    <div className="head">
                                                        <h1>{item.head}</h1>
                                                        <img src={`./assets/img/${showFaq == item.number ? 'Schemes-arrwo-up.png' : 'Schemes-arrwo-down.png'}`} alt="" width="20px" height="12px" />
                                                    </div>
                                                    <div className='body-text'>
                                                        {showFaq !== item.number ? readMore(item.body, 150) : item.body}
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    ))
                                }
                                <div className="view-faq">
                                    <a href="">View All FAQs</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

            {
                welcomeToSwayam && <WelcomeToSwayamConnect show={welcomeToSwayam} onHide={() => setWelcomeToSwayam(false)} />
            }
        </>
    )
}

export default Nursing