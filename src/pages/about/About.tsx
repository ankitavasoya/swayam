import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import GrowTogatherCard from '../../common/GrowTogatherCard'
import SilkSlider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs, getWomenTestimonial } from '../../redux/actions/aboutUs';
import NoDataFound from '../../common/NoDataFound';
import { CgOverflow } from 'react-icons/cg';

const About = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [employer, setEmployer] = useState('')
  const [jobVacancies, setJobVacancies] = useState('')
  const [partner, setpartner] = useState('')
  const [users, setUsers] = useState('')
  const [perPage, setPerpage] = useState(5)
  const [pageNum, setPageNum] = useState(1)

  const getAboutUsData = useSelector((state: any) => state.aboutUs.getAboutUs);
  const getWomenTestimonialData = useSelector((state: any) => state.aboutUs.getWomenTestimonial);

  useEffect(() => {
    dispatch(getAboutUs())
  }, [])

  useEffect(() => {
    dispatch(getWomenTestimonial(perPage, pageNum))
  }, [perPage, pageNum])

  useEffect(() => {
    setEmployer(getAboutUsData?.data?.counts.employer)
    setJobVacancies(getAboutUsData?.data?.counts.jobVacancies)
    setpartner(getAboutUsData?.data?.counts.partner)
    setUsers(getAboutUsData?.data?.counts.users)
  }, [getAboutUsData])

  const growtogathercard = [
    {
      img: "candidate.png",
      text: users ? `${users}+ Candidates` : `Candidates`,
      alts: "Candidates",
    },
    {
      img: "jobs.png",
      text: jobVacancies ? `${jobVacancies} Job Vacancies` : `Job Vacancies`,
      alts: "Vacancies",
    },
    {
      img: "leadership.png",
      text: employer ? `${employer} Employers` : `Employers`,
      alts: "govt scheme",
    },
    {
      img: "Training_Partners.png",
      text: partner ? `${partner}+ Training Partners` : `Training Partners`,
      alts: "Training Partners",
    },
  ]

  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const redirecthyperLink = (link: string) => {
    let doc = document;
    let a = doc.createElement("a");
    a.href = link;
    a.target = '_blank';
    a.click();
  }

  return (
    <>
      <div className='about-bg'>
      </div>
      <div className='about'>
        <Container>
          <div className="breadcrums">
            <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>About</button>
          </div>
        </Container>
        <div className='container-xl top-content'>
          <h1 className='title'>About Us</h1>
          <Row className='about-card'>
            <Col lg={2} md={3} sm={12} xs={12} className="text-center">
              <img src={getAboutUsData?.data?.logoUrl} alt="" />
            </Col>
            <Col lg={10} md={9} sm={12} xs={12} className="mt-4 mt-md-0">
              <h3>{getAboutUsData?.data?.title}</h3>
              <p>{getAboutUsData?.data?.description}</p>
            </Col>
          </Row>
        </div>
        <Container className='mt-4'>
          <Row>
            {
              growtogathercard.map((item) => (
                <Col lg={3} md={6} sm={6}>
                  <GrowTogatherCard
                    img={item.img}
                    text={item.text}
                    alts={item.alts}
                  />
                </Col>
              ))
            }
            {/* </div> */}
          </Row>
        </Container>
        <div className='container-xl'>
          <div className='mt-5'>
            <h2 className='title-2 mb-3'>A Women of Swayam Testimonial</h2>
          </div>
          <div className="know-employee" style={{ height: '400px', }}>
            <SilkSlider {...settings}>
              {getWomenTestimonialData && getWomenTestimonialData.data && getWomenTestimonialData.data.data && getWomenTestimonialData.data.data.length > 0 ? getWomenTestimonialData.data.data.map((item: any) => (
                <div className='px-1'>
                  <div className='mt-0' style={{ justifyContent: "space-evenly", color: '#FFFFFF', background: '#092B7E', borderRadius: '10px', overflow: "hidden" }}>
                    <Row style={{ alignItems: "center" }} className="py-5">
                      <Col xl={7} lg={6} md={6} className="about-slider-text">
                        <h3>{item.message}</h3>
                        <h4>{item.name}</h4>
                        <h5>{item.role}, {item.location}</h5>
                      </Col>
                      <Col xl={5} lg={6} md={6} className="px-5" style={{ overflow: "hidden" }} >
                        <img src={item.imageUrl} alt="" height="100%" width="100%" style={{ borderRadius: "15px" }} />
                      </Col>
                    </Row>
                  </div>
                </div>
              )) : <NoDataFound text="No a women of swayam testimonial found" style={{ color: "white" }} />
              }
            </SilkSlider>
          </div>
          <div className="banner">
            <Row style={{ alignItems: "center", justifyContent: "space-evenly" }}>
              <Col lg={5}>
                <img src="./assets/img/Banner_Bitmap.png" alt="" className='Banner_Bitmap' />
              </Col>
              <Col lg={5}>
                <div className="banner-content">
                  <h2>To know more about RPG Foundation's other initiatives visit our Website</h2>
                  <button onClick={() => redirecthyperLink(getAboutUsData?.data?.websiteLink)}>View Website </button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  )
}

export default About