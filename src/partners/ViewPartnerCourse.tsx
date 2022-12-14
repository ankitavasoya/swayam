import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import STORAGEKEY from '../config/APP/app.config';
import AuthStorage from '../helper/AuthStorage';
import { getCourseById } from '../redux/actions/courseAction';

const ViewPartnerCourse = () => {
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const dispatch = useDispatch()
    const userId = AuthStorage.getStorageData(STORAGEKEY.userId)

    const getCourseByIds = useSelector((state: any) => {
        return state.courseData.getCoursesByIdData;
    });

    useEffect(() => {
        dispatch(getCourseById(id, userId))
    }, [])

    return (
        <div className='my_profile_main'>
            <Container fluid>
                <h1 className='heading-txt'>View partner course</h1>
                <div className='ActiveJobs-contend'>
                    <Button onClick={() => { navigate('/partner/activecourses') }} variant="outlined" color="inherit">Back</Button>
                    {/* <button onClick={() => { navigate('/partner/activecourses') }}>Back</button> */}
                    <div className='view-partner-course mb-3'>
                        <img src={getCourseByIds?.data?.data?.thumbnail} alt="" width="400px" />
                    </div>
                    <div className='view-partner-course-details'>
                        <Row style={{ rowGap: '15px' }}>
                            <Col lg={12}>
                                <label htmlFor="">Name:</label>
                                <span>{getCourseByIds?.data?.data?.name}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">Course category:</label>
                                <span>{getCourseByIds?.data?.data?.courseCategory?.name}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">Course duration:</label>
                                <span>{getCourseByIds?.data?.data?.duration}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">Certification body:</label>
                                <span>{getCourseByIds?.data?.data?.certificationBody}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">Mode:</label>
                                <span>{getCourseByIds?.data?.data?.mode}</span>
                            </Col>
                            {/* <Col lg={4}>
                                <label htmlFor="">Certification:</label>
                                <span>Yes</span>
                            </Col> */}
                            <Col lg={4}>
                                <label htmlFor="">Contact person name:</label>
                                <span>{getCourseByIds?.data?.data?.contactPersonName}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">Contact person email:</label>
                                <span>{getCourseByIds?.data?.data?.contactPersonEmail}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">Contact person phone:</label>
                                <span>{getCourseByIds?.data?.data?.contactPersonPhone}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">Pincode:</label>
                                <span>{getCourseByIds?.data?.data?.pincode}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">State:</label>
                                <span>{getCourseByIds?.data?.data?.state}</span>
                            </Col>
                            <Col lg={4}>
                                <label htmlFor="">District:</label>
                                <span>{getCourseByIds?.data?.data?.district}</span>
                            </Col>
                            <Col lg={12}>
                                <label htmlFor="">Application form:</label>
                                <span>{getCourseByIds?.data?.data?.application_form}</span>
                            </Col>
                            <Col lg={12}>
                                <label htmlFor="">Recommended and forwarded:</label>
                                <span>{getCourseByIds?.data?.data?.recommended_and_forwarded}</span>
                            </Col>
                            <Col lg={12}>
                                <label htmlFor="">Application process:</label>
                                <span>{getCourseByIds?.data?.data?.application_process}</span>
                            </Col>
                            <Col lg={12}>
                                <label htmlFor="">Medical superintendent:</label>
                                <span>{getCourseByIds?.data?.data?.medical_superintendent}</span>
                            </Col>
                            <Col lg={12}>
                                <label htmlFor="">Hospital expenses estimation certificate:</label>
                                <span>{getCourseByIds?.data?.data?.hospital_expenses_estimation_certificate}</span>
                            </Col>
                            <Col lg={12}>
                                <label htmlFor="">Course detail:</label>
                                <span>{getCourseByIds?.data?.data?.detail}</span>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        </div >
    )
}

export default ViewPartnerCourse