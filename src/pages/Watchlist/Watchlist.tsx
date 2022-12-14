import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AcquireCard from '../../common/AcquireCard'
import Jobs from '../jobs/Jobs'

const Watchlist = () => {

  const navigate = useNavigate()

  const jobs = [
    {
      img: "../../assets/img/Schemes_card.png",
      title: "Free Artificial Limbs for …",
      text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
      btntext: "Apply Now",
      link: "",
    },
    {
      img: "../../assets/img/Schemes_card.png",
      title: "Free Artificial Limbs for …",
      text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
      btntext: "Apply Now",
      link: "",
    },
    {
      img: "../../assets/img/Schemes_card.png",
      title: "Free Artificial Limbs for …",
      text: "Free artificial calipers for polio and artificial limbs are provided to people who are…",
      btntext: "Apply Now",
      link: "",
    },

  ]
  return (
    <>
      <Container>
      <div className="breadcrums blue-text">
        <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Learn</button>
      </div>
        <div className='Watchlist-main'>
          <div className='Watchlist-titel'>
            <h1>Watchlist</h1>
            <h2>Jobs (3)</h2>
          </div>
          <Row className='mt-5'>
            {/* <Col xl={4}>
              <div className="job-card">
                <div className='job-img-content'>
                  <img className='job-img' src="./assets/img/Lab-Technician.png" alt="" />
                  <img src="./assets/img/noun_add_3376954-1.png" alt="" className='menu-img' />
                </div>
                <div className='job-card-body'>
                  <div className='d-flex align-items-center mb-2'>
                    <h1>Lab Technician</h1>
                    <img src="./assets/img/Shape.svg" alt="" className='ms-auto' />
                  </div>
                  <div>
                    <p>Information on resume headlines how to include one on your resume, along with profiles …</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex apply-txt'>
                      <p>Apply Now</p>
                      <img src="./assets/img/red-arrow.png" alt="" />
                    </div>
                    <div className='d-flex location'>
                      <img src="./assets/img/location-pin.png" alt="" />
                      <p>Andheri, Mumbai</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={4}>
              <div className="job-card">
                <div className='job-img-content'>
                  <img className='job-img' src="./assets/img/Lab-Technician.png" alt="" />
                  <img src="./assets/img/noun_add_3376954-1.png" alt="" className='menu-img' />
                </div>
                <div className='job-card-body'>
                  <div className='d-flex align-items-center mb-2'>
                    <h1>General Duty Assistant</h1>
                    <img src="./assets/img/Shape.svg" alt="" className='ms-auto' />
                  </div>
                  <div>
                    <p>Information on resume headlines how to include one on your resume, along with profiles …</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex apply-txt'>
                      <p>Apply Now</p>
                      <img src="./assets/img/red-arrow.png" alt="" />
                    </div>
                    <div className='d-flex location'>
                      <img src="./assets/img/location-pin.png" alt="" />
                      <p>Borivali, Mumbai</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={4}>
              <div className="job-card">
                <div className='job-img-content'>
                  <img className='job-img' src="./assets/img/Lab-Technician.png" alt="" />
                  <img src="./assets/img/noun_add_3376954-1.png" alt="" className='menu-img' />
                </div>
                <div className='job-card-body'>
                  <div className='d-flex mb-2 align-items-center'>
                    <h1>Job Headline with 1 lines </h1>
                    <img src="./assets/img/Shape.svg" alt="" className='ms-auto' />
                  </div>
                  <div>
                    <p>Information on resume headlines how to include one on your resume, along with profiles …</p>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex apply-txt'>
                      <p>Apply Now</p>
                      <img src="./assets/img/red-arrow.png" alt="" />
                    </div>
                    <div className='d-flex location'>
                      <img src="./assets/img/location-pin.png" alt="" />
                      <p>Parel, Mumbai</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col> */}
            {
              jobs.map((item) => (
                <Col lg="4" className='mb-md-3'>
                  <AcquireCard
                    img={item.img}
                    title={item.title}
                    text={item.text}
                    btntext={item.btntext}
                    link={item.link}
                    isShowRating={false}
                    location={true}
                  />
                </Col>
              ))
            }
          </Row>
        </div>
      </Container>
    </>
  )
}

export default Watchlist