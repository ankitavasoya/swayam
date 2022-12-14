import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const AddTrainingPartner = () => {
    const [data, setData] = useState({
        state: "",
        city: ""
    })

    const handleChange = (event: any) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className='my_profile_main'>
            <Container fluid>
                <h1 className='heading-txt m-0'> Add Training Partner</h1>
                <div className='addtrainingpartner_main'>
                    <h1 className='heading-txt m-0'>Training Partner's Info</h1>
                    <div className='patner_info mt-4 d-flex'>
                        <Row>
                            <Col lg={12}>
                                <Row>
                                    <Col lg={5}>
                                        <TextField id="" name='' value={""} type="text" label="Name of Organization" variant="outlined" />
                                        <label htmlFor="uploadlogo" className='Upload_Logo' >Upload Logo</label>
                                        <input type="file" id='uploadlogo' className='d-none' />
                                    </Col>
                                    <Col lg={5}>
                                        <TextField id="" name='' value={""} type="text" label="Name of Organization" variant="outlined" />
                                        <div className='d-flex logo_img_path align-items-center'>
                                            <img src="../../assets/img/gallery.png" alt="" className='me-3' />
                                            <p className='mb-0 me-3'>XYZXXX_Logo.jpg</p>
                                            <p className='mb-0 me-3'>987kb</p>
                                            <img src="../../assets/img/delete_logo.png" alt="" style={{ cursor: "pointer" }} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <h1 className='heading-txt mb-3 mt-4'>Location</h1>
                    <div className='Location_mian'>
                        <TextField id="" name='' value={""} type="text" label="Select Your PIN Code" variant="outlined" />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Your City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.city}
                                name="city"
                                label="city"
                                onChange={handleChange}
                            >
                                <MenuItem value="Surat">Surat</MenuItem>
                                <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                                <MenuItem value="Pune">Pune</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Your State</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={data.state}
                                name="state"
                                label="Select Your State"
                                onChange={handleChange}
                            >
                                <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                                <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                                <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <TextField id="" name='' value={""} type="text" label="Select Your State" variant="outlined" /> */}
                        <TextField id="" name='' value={""} type="text" label="What is enter your others?" variant="outlined" />
                    </div>
                    <h1 className='heading-txt mb-3 mt-4'>Primary User Details</h1>
                    <div className='Primary_User_Details_mian'>
                        <TextField id="" name='' value={""} type="text" label="Contact Person's Name" variant="outlined" />
                        <TextField id="" name='' value={""} type="text" label="Mobile Number" variant="outlined" />
                        <TextField id="" name='' value={""} type="text" label="Email ID" variant="outlined" />
                        <TextField id="" name='' value={""} type="text" label="Designation" variant="outlined" />
                    </div>
                    <div className='Save_Changes_btn'>
                        <button>Save Changes</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AddTrainingPartner