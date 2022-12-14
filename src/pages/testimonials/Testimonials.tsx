import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AcquireCard from '../../common/AcquireCard'
import NoDataFound from '../../common/NoDataFound'
import TestimonialCard from '../../common/TestimonialsCard'
import VideoCard from '../../common/VideoCard'
import { getWomenTestimonial } from '../../redux/actions/aboutUs'
import { getTestimonial } from '../../redux/actions/testimonialAction'

const Testimonials = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const testimonial = useSelector((state: any) => state.testimonialData.getTestimonial)
    const womenTestimonial = useSelector((state: any) => state.aboutUs.getWomenTestimonial);

    const [testimonialData, setaTestimonialData] = useState<any>()
    const [womenTestimonialData, setaWomenTestimonialData] = useState<any>()
    const [pageNumber, setPageNumber] = useState<any>(20)
    const [perPage, stePerPage] = useState<any>(1)


    const queryParams = new URLSearchParams(location.search)
    const stateType = queryParams.get("");

    useEffect(() => {
        dispatch(getTestimonial(pageNumber, perPage))
        dispatch(getWomenTestimonial(pageNumber, perPage))
    }, [pageNumber, perPage])

    useEffect(() => {
        if (testimonial && testimonial.data && testimonial.data.data) {
            setaTestimonialData(testimonial.data.data)
        }
    }, [testimonial, perPage, pageNumber])

    useEffect(() => {
        if (womenTestimonial && womenTestimonial.data && womenTestimonial.data.data) {
            setaWomenTestimonialData(womenTestimonial.data.data)
        }
    }, [womenTestimonial, pageNumber, perPage])


    const callback = (key: any) => {
        // setStatus(key);
    };

    return (
        <>
            <Container>
                <div className="breadcrums blue-text">
                    <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Testimonials</button>
                </div>
                <div className='GetStarted_main mb-5 mt-5'>
                    <h1 className='GetStarted_title'>Testimonials</h1>
                </div>
                {/* <div className="GetStarted_content mb-5"> */}
                <div className='learn-tab pb-5'>
                    <Container >
                        <Tabs onSelect={callback} defaultActiveKey={stateType ? stateType : "Testimonial"}>
                            <Tab eventKey="Testimonial" title={'Testimonial'} >
                                <Container className='pt-3'>
                                    {testimonialData && testimonialData.length > 0 ? testimonialData.map((ele: any) => (
                                        <TestimonialCard
                                            img={ele.imageUrl}
                                            title={ele.name}
                                            text={ele.message}
                                            role={ele.role}
                                            time={moment(ele.createdAt).format('yyyy-MM-DD')}
                                            vidoUrl={ele.videoUrl}
                                            imgShow={false}
                                            playBtn={true}
                                        />
                                    )) : <NoDataFound text="Testimonial not found" />}
                                </Container>
                            </Tab>
                            <Tab eventKey="Women Testimonial" title={'Women Testimonial'} >
                                <Container className='pt-3'>
                                    {womenTestimonialData && womenTestimonialData.length > 0 ? womenTestimonialData.map((ele: any) => (
                                        <TestimonialCard
                                            img={ele.imageUrl}
                                            title={ele.name}
                                            text={ele.message}
                                            role={ele.role}
                                            time={moment(ele.createdAt).format('yyyy-MM-DD')}
                                            vidoUrl={ele.videoUrl}
                                            imgShow={false}
                                            playBtn={false}
                                        />
                                    )) : <NoDataFound text="Women testimonial not found" />}
                                </Container>
                            </Tab>
                        </Tabs>
                    </Container>
                </div>
            </Container>
        </>
    )
}

export default Testimonials