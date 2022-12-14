import { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import NoDataFound from '../../common/NoDataFound';
import { getAllFaqs } from '../../redux/actions/faqsAction';

const FrequentlyAskedQuestions = () => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const stateType = queryParams.get("q");

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [showFaq, setShowFaq] = useState();
    const [status, setStatus] = useState<any>();

    useEffect(() => {
        if (stateType) {
            setStatus(stateType)
        }
    }, [stateType])
    useEffect(() => {
        if (!stateType) {
            dispatch(getAllFaqs("GENERAL"))
        }
    }, [])

    const readMore = (str: string, len: number) => {
        if (str.length < len) {
            return
        }
        let lessString = str.slice(0, len)
        return lessString + '...'
    }

    const faqs = useSelector((state: any) => state.faqsData.AllFaqs)

    useEffect(() => {
        if (status === 'General') {
            dispatch(getAllFaqs("GENERAL"))
        }
        if (status === 'Learn') {
            dispatch(getAllFaqs("COURSE"))
        }
        if (status === 'Schemes') {
            dispatch(getAllFaqs("SCHEME"))
        }
        if (status === 'Jobs') {
            dispatch(getAllFaqs("JOB"))
        }
    }, [status])

    const callback = (key: any) => {
        setStatus(key);
    };

    return (
        <>
            <Container>
                <div className="breadcrums blue-text">
                    <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>faqs</button>
                </div>
                <div className='GetStarted_main mb-5 mt-5'>
                    <h1 className='GetStarted_title'>Frequently Asked Questions</h1>
                </div>
                <div className="GetStarted_content mb-5">
                    <div className='learn-tab pb-5'>
                        <Container >
                            <Tabs onSelect={callback} defaultActiveKey={stateType ? stateType : "General"}>
                                <Tab eventKey="General" title={'General'} >
                                    <Container>
                                        {/* <div className="view-schemes-faq mt-3"> */}
                                        <Row className='justify-content-between align-items-center'>
                                            <Col lg={4}>
                                                <img src="./assets/img/Question_Two Color.png" alt="" />
                                            </Col>
                                            <Col lg={7}>
                                                <div className="know-employee container-xxl px-0">
                                                    <div className="title mt-4 mb-4">
                                                        <h1>Frequently Asked Questions</h1>
                                                    </div>

                                                    {faqs && faqs.data?.length > 0 ? faqs?.data?.map((item: any, index: any) => (
                                                        <div className="faq-accordion mb-3" onClick={() => setShowFaq(index + 1)}>
                                                            <Col lg={2}>
                                                                <div className="number">{index + 1}</div>
                                                            </Col>
                                                            <Col lg={10}>
                                                                <div className="text">
                                                                    <div className="head">
                                                                        <h1>{item.faq_question}</h1>
                                                                        <img src={`./assets/img/${showFaq == index + 1 ? 'Schemes-arrwo-up.png' : 'Schemes-arrwo-down.png'}`} alt="" width="20px" height="12px" />
                                                                    </div>
                                                                    <div className='body-text'>
                                                                        {showFaq !== index + 1 ? readMore(item.faq_answer, 150) : item.faq_answer}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </div>
                                                    )) : <NoDataFound text="No frequently asked questions found" />}
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* </div> */}
                                    </Container>
                                </Tab>

                                <Tab eventKey="Jobs" title={'Jobs'} >
                                    <Container>
                                        <Row className='justify-content-between align-items-center'>
                                            <Col lg={4}>
                                                <img src="./assets/img/Question_Two Color.png" alt="" />
                                            </Col>
                                            <Col lg={7}>
                                                <div className="know-employee container-xxl px-0">
                                                    <div className="title mt-4 mb-4">
                                                        <h1>Frequently Asked Questions</h1>
                                                    </div>
                                                    {faqs && faqs.data?.length > 0 ? faqs?.data?.map((item: any, index: any) => (
                                                        <div className="faq-accordion mb-3" onClick={() => setShowFaq(index + 1)}>
                                                            <Col lg={2}>
                                                                <div className="number">{index + 1}</div>
                                                            </Col>
                                                            <Col lg={10}>
                                                                <div className="text">
                                                                    <div className="head">
                                                                        <h1>{item.faq_question}</h1>
                                                                        <img src={`./assets/img/${showFaq == index + 1 ? 'Schemes-arrwo-up.png' : 'Schemes-arrwo-down.png'}`} alt="" width="20px" height="12px" />
                                                                    </div>
                                                                    <div className='body-text'>
                                                                        {showFaq !== index + 1 ? readMore(item.faq_answer, 150) : item.faq_answer}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </div>
                                                    )) : <NoDataFound text="No frequently asked questions found" />}
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* </div> */}
                                    </Container>
                                </Tab>

                                <Tab eventKey="Schemes" title={'Schemes'} >
                                    <Container>
                                        <Row className='justify-content-between align-items-center'>
                                            <Col lg={4}>
                                                <img src="./assets/img/Question_Two Color.png" alt="" />
                                            </Col>
                                            <Col lg={7}>
                                                <div className="know-employee container-xxl px-0">
                                                    <div className="title mt-4 mb-4">
                                                        <h1>Frequently Asked Questions</h1>
                                                    </div>
                                                    {faqs && faqs.data?.length > 0 ? faqs?.data?.map((item: any, index: any) => (
                                                        <div className="faq-accordion mb-3" onClick={() => setShowFaq(index + 1)}>
                                                            <Col lg={2}>
                                                                <div className="number">{index + 1}</div>
                                                            </Col>
                                                            <Col lg={10}>
                                                                <div className="text">
                                                                    <div className="head">
                                                                        <h1>{item.faq_question}</h1>
                                                                        <img src={`./assets/img/${showFaq == index + 1 ? 'Schemes-arrwo-up.png' : 'Schemes-arrwo-down.png'}`} alt="" width="20px" height="12px" />
                                                                    </div>
                                                                    <div className='body-text'>
                                                                        {showFaq !== index + 1 ? readMore(item.faq_answer, 150) : item.faq_answer}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </div>
                                                    )) : <NoDataFound text="No frequently asked questions found" />}
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* </div> */}
                                    </Container>
                                </Tab>

                                <Tab eventKey="Learn" title={'Learn'}>
                                    <Container>
                                        <Row className='justify-content-between align-items-center'>
                                            <Col lg={4}>
                                                <img src="./assets/img/Question_Two Color.png" alt="" />
                                            </Col>
                                            <Col lg={7}>
                                                <div className="know-employee container-xxl px-0">
                                                    <div className="title mt-4 mb-4">
                                                        <h1>Frequently Asked Questions</h1>
                                                    </div>
                                                    {faqs && faqs.data?.length > 0 ? faqs?.data?.map((item: any, index: any) => (
                                                        <div className="faq-accordion mb-3" onClick={() => setShowFaq(index + 1)}>
                                                            <Col lg={2}>
                                                                <div className="number">{index + 1}</div>
                                                            </Col>
                                                            <Col lg={10}>
                                                                <div className="text">
                                                                    <div className="head">
                                                                        <h1>{item.faq_question}</h1>
                                                                        <img src={`./assets/img/${showFaq == index + 1 ? 'Schemes-arrwo-up.png' : 'Schemes-arrwo-down.png'}`} alt="" width="20px" height="12px" />
                                                                    </div>
                                                                    <div className='body-text'>
                                                                        {showFaq !== index + 1 ? readMore(item.faq_answer, 150) : item.faq_answer}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </div>
                                                    )) : <NoDataFound text="No frequently asked questions found" />}
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* </div> */}
                                    </Container>
                                </Tab>
                            </Tabs>
                        </Container>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default FrequentlyAskedQuestions