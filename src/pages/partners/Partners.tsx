import { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../redux/actions/userAction'

const Partners = () => {

    const getPartner = useSelector((state: any) => state.userData.getAllUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUser("PARTNER"))
    }, [])

    return (
        <>
            <div className='bg-partners'></div>
            <div className="partners-main mb-5">
                <Container>
                    <div className='careers-titel'>
                        <h1>Partners</h1>
                    </div>
                    <div className='mt-3 accord-main'>
                        {getPartner && getPartner.data && getPartner.data.data &&
                            getPartner.data.data.map((item: any) => (
                                <Row className="" style={{ justifyContent: "space-between" }}>
                                    <Col xl={3} lg={4} md={6} className="silk-slider text-center" >
                                        <img src={item.avatar} className="cursor-pointer" alt="slide1" width="100%" />
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Partners