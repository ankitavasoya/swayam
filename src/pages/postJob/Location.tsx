import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'


interface Props {
    stepname: () => void;
}
const Location:React.FC<Props> = ({stepname}) => {
    const [locationData, setlocationData] = useState({
        pin: "",
        city: "",
        state: "",
        otherInfo: ""
    })
    const handleChange = (event: any) => {
        setlocationData({
            ...locationData,
            [event.target.name]: event.target.value
        });
    };
    return (
        <>

            <Container>
                {/* <div className='post_job_content'> */}
                <Row>
                    <Col lg={6} className="border-right">

                        <div className='d-flex'>
                            <img src="./assets/img/noun-location-red.png" alt="" height="36px" />
                            <h1>What is your recruiter firm name</h1>
                        </div>
                        <div className='location_content justify-content-between mt-4 d-flex'>
                            <input type="text" placeholder='Enter your location' />
                            <div style={{ lineHeight: "40px" }}>
                                <button className='btn-bg-trans'>Locate Me</button>
                                <button className='btn_bg'>Find Location</button>
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className='mt-4'>
                            <Row>
                                <Col lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select PIN Code</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={locationData.pin}
                                            label="Select PIN Code"
                                            name='pin'
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={333333}>333333</MenuItem>
                                            <MenuItem value={444444}>444444</MenuItem>
                                            <MenuItem value={555555}>555555</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={locationData.city}
                                            label="Select City"
                                            name="city"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"Thane"}>Thane</MenuItem>
                                            <MenuItem value={"Pune"}>Pune</MenuItem>
                                            <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col lg={6} className="mt-3">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select State</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={locationData.state}
                                            label="Select State"
                                            name="state"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                                            <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                                            <MenuItem value={"Goa"}>Goa</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col lg={6} className="mt-3">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Enter Your Others</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={locationData.otherInfo}
                                            label="Enter Your Others"
                                            name="otherInfo"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"xyz"}>xyz</MenuItem>
                                            <MenuItem value={"xyz"}>xyz</MenuItem>
                                            <MenuItem value={"xyz"}>xyz</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                        </div>
                        <button className='mt-5 continue_btn' onClick={() =>stepname()}>Continue</button>
                    </Col>
                    <Col lg={6}>
                        <div className='Your_Profile_div'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h1>Your Profile</h1>
                                {/* <p>Edit Profile</p> */}
                            </div>
                            <div className='mt-4'>
                                <div>
                                    <h3>My recruiter firm name</h3>
                                    <h2>ABCD</h2>
                                </div>
                                <div className='mt-3'>
                                    <h3>My Job Type</h3>
                                    <h2>Nursing</h2>
                                </div>
                                <div className='mt-3'>
                                    <h3>Upload Document</h3>
                                    <h2>PAN card</h2>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}

export default Location