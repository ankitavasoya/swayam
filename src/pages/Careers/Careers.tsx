import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import { Col, Tab, Tabs } from 'react-bootstrap';
import { Accordion, Container, Row } from 'react-bootstrap'
import { BiChevronDown } from 'react-icons/bi';
import { CgSearch } from 'react-icons/cg';
import SelectSearch from '../../components/selectandsearch/SelectSearch';
import tabImg from "../../assets/img/noun-hr-admin-1792114.png";
import tabImg2 from "../../assets/img/noun-accountant-3029889@2x.png";
import tabImg3 from "../../assets/img/noun-developer-962487.png";
import Benefitscardimg from "../../assets/img/@1xEmployee.png";
import Benefitscardimg1 from "../../assets/img/@1xnoun_life insurance.png";
import Benefitscardimg2 from "../../assets/img/@1xnoun_Health.png";
import { Link, useNavigate } from 'react-router-dom';

const Careers = () => {
  const navigate = useNavigate();
  const [age, setAge] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [selectorVal, setSelectorVal] = useState("Learn");
  const [showOpt, setShowOpt] = useState(false);
  const selectorList = [
    {
      list: "Learn",
    },
    {
      list: "Jobs",
    },
    {
      list: "Schemes",
    },
  ];

  const tabs = [
    {
      img: tabImg,
      post: "HR Executive",
      postDate: "Posted on 13-March-22 / Mumbai, Fulltime",
      Description: "Job Description ",
      Descripttxt: "Swayam Connect is hiringfresher's...! Do you…",
      link: "Read More",
      Applybtn: "Apply Now"
    },
    {
      img: tabImg2,
      post: "HR Executive",
      postDate: "Posted on 13-March-22 / Mumbai, Fulltime",
      Description: "Job Description ",
      Descripttxt: "Swayam Connect is hiringfresher's...! Do you…",
      link: "Read More",
      Applybtn: "Apply Now",

    },
    {
      img: tabImg3,
      post: "HR Executive",
      postDate: "Posted on 13-March-22 / Mumbai, Fulltime",
      Description: "Job Description ",
      Descripttxt: "Swayam Connect is hiringfresher's...! Do you…",
      link: "Read More",
      Applybtn: "Apply Now"
    },
  ]

  const Benefitscard = [
    {
      img1: Benefitscardimg,
      title: "Life Insurance",
      txt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
    },
    {
      img1: Benefitscardimg1,
      title: "Annual Health Check up",
      txt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.  "
    },
    {
      img1: Benefitscardimg2,
      title: "Health Coverage",
      txt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      img1: Benefitscardimg2,
      title: "Employee Assistance Program",
      txt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
  ]

  return (
    <>
      <div className='bg-img-blue'></div>
      <Container>
        <div className="breadcrums">
          <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Careers</button>
        </div>
      </Container>
      <div className="careers-main">
        <Container>
          <div className='careers-titel mt-5'>
            <h1>Careers</h1>
          </div>
          <div className='mt-3 accord-main'>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className='accord-header'> Work with Swayam Connect - Current Openings</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col sm={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select your State</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Select Your State"
                          onChange={handleChange}
                        >
                          <MenuItem value={10}>Maharashtra</MenuItem>
                          <MenuItem value={20}>Gujrat</MenuItem>
                          <MenuItem value={30}>Delhi</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                    <Col sm={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select your city</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={age}
                          label="Select Your State"
                          onChange={handleChange}
                        >
                          <MenuItem value={10}>Mumbai</MenuItem>
                          <MenuItem value={20}>Surat</MenuItem>
                          <MenuItem value={30}>Delhi</MenuItem>
                        </Select>
                      </FormControl>
                    </Col> <Col sm={12} md={4}>
                      <div className="search-position d-flex">
                        <input type="text" placeholder="Search Positions" />
                        <div className="search-icon">
                          <CgSearch />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <div className='tab-main mt-4'>
                    <Tabs defaultActiveKey="Devloper" id="uncontrolled-tab-example" className="mb-3">
                      <Tab eventKey="Devloper" title="Devloper">

                        {
                          tabs.map((items) => (
                            <div className='tab-body mb-4'>
                              <Row>
                                <Col md={2} className="text-center">
                                  <img src={items.img} alt="" />
                                </Col>
                                <Col md={3}>
                                  <h1>{items.post}</h1>
                                  <p>{items.postDate}</p>
                                </Col>
                                <Col md={4}>
                                  <h1>{items.Description}</h1>
                                  <p>{items.Descripttxt}<Link to={"/#"} className="link">{items.link}</Link></p>
                                </Col>
                                <Col md={3}>
                                  <button>{items.Applybtn}</button>
                                </Col>
                              </Row>
                            </div>
                          ))
                        }
                      </Tab>
                      <Tab eventKey="Marketing" title="Marketing">
                        {/* <Sonnet /> */}
                        <h1>ddddddddddddddddddddddd</h1>
                      </Tab>
                      <Tab eventKey="Product" title="Product">
                        {/* <Sonnet /> */}
                        <h1>ddddddddddddddddddddddd</h1>
                      </Tab>
                      <Tab eventKey="Researcher" title="Researcher">
                        {/* <Sonnet /> */}
                        <h1>ddddddddddddddddddddddd</h1>
                      </Tab>
                    </Tabs>
                    <div className='load-more-btn'>
                      <button >Load more</button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>
        {/* </div> */}
        <div >
          <Container>
            <div className='sec-tab-main tab-main mt-5'>
              <Tabs defaultActiveKey="CareerGrowth" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="CareerGrowth" title="Career Growth">
                  <div className='CareerGrowth mb-4'>
                    <Row className='mt-4'>
                      <Col md={4} className="text-center">
                        <img src='./assets/img/Sailor_Two Color.png' alt="" />
                      </Col>
                      <Col md={8} >
                        <h1>Discover a world of growth, passion and excellence.</h1>
                        <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac velit id dui ultrices dignissim vel vitae mauris. Proin dignissim mauris nec ex efficitur fermentum. Vivamus eget congue mauris, ac interdum purus. In ornare faucibus arcu sed lacinia. Praesent congue, lorem nec pharetra consectetur, sem felis porttitor mauris, vitae accumsan enim sapien nec lorem. </p>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="Culture" title="Culture">
                  <div className='CareerGrowth mb-4'>
                    <Row className='mt-4'>
                      <Col md={4} className="text-center">
                        <img src='./assets/img/Team success _Two Color@2x.png' alt="" style={{ width: "307px", height: "249px" }} />
                      </Col>
                      <Col md={8} >
                        <h1>Believes in creating success together, it believes in its people and stands by them.</h1>
                        <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac velit id dui ultrices dignissim vel vitae mauris. Proin dignissim mauris nec ex efficitur fermentum. Vivamus eget congue mauris, ac interdum purus. In ornare faucibus arcu sed lacinia. Praesent congue, lorem nec pharetra consectetur, sem felis porttitor mauris, vitae accumsan enim sapien nec lorem. </p>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="WorkBalance" title="Work Balance">
                  <div className='CareerGrowth mb-4'>
                    <Row className='mt-4'>
                      <Col md={4} className="text-center">
                        <img src='./assets/img/Team meeting_Two Color@2x.png' alt="" style={{ width: "307px", height: "249px" }} />
                      </Col>
                      <Col md={8} >
                        <h1>Work environment good.
                          Seniors are very supportive.</h1>
                        <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac velit id dui ultrices dignissim vel vitae mauris. Proin dignissim mauris nec ex efficitur fermentum. Vivamus eget congue mauris, ac interdum purus. In ornare faucibus arcu sed lacinia. Praesent congue, lorem nec pharetra consectetur, sem felis porttitor mauris, vitae accumsan enim sapien nec lorem. </p>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="CoreValues" title="Core Values">
                  <div className='CareerGrowth mb-4'>
                    <Row className='mt-4'>
                      <Col md={4} className="text-center">
                        <img src='./assets/img/Ethereum_Two Color@2x.png' alt="" style={{ width: "307px", height: "249px" }} />
                      </Col>
                      <Col md={8} >
                        <h1>Customer Sovereignty, People Orientation, Innovation & Entrepreneurship, Transparency </h1>
                        <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac velit id dui ultrices dignissim vel vitae mauris. Proin dignissim mauris nec ex efficitur fermentum. Vivamus eget congue mauris, ac interdum purus. In ornare faucibus arcu sed lacinia. Praesent congue, lorem nec pharetra consectetur, sem felis porttitor mauris, vitae accumsan enim sapien nec lorem. </p>
                      </Col>
                    </Row>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Container>
        </div>
        <Container>
          <div className='mt-4 Benefits-main mb-5'>
            <Row>
              <Col md={4}>
                <div className='txt-content'>
                  <h1>Benefits</h1>
                  <p>Benefits to grow horizontal and vertical in the career.</p>
                </div>
              </Col>
              <Col md={8}>
                <Row>

                  {
                    Benefitscard.map((item) => (

                      <Col md={6} className="mb-3">
                        <div className='card-body'>
                          <img src={item.img1} alt="" className='ms-4' />
                          <h1 className='mt-5'>{item.title}</h1>
                          <p>{item.txt}</p>
                        </div>
                      </Col>
                    ))
                  }
                  {/* <Col md={6}></Col> */}
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Careers