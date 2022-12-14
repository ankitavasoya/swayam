import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AcquireCard from '../../common/AcquireCard'
import { getArticle } from '../../redux/actions/articleAction'
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import NoDataFound from '../../common/NoDataFound'
import moment from 'moment'
import bgImg from '../../assets/img/about-bg.png'
import { ADD_SAVED_NEWS, DELETE_SAVED_NEWS } from '../../redux/type'
import { toast } from 'react-toastify'
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'




const ViewAllNews = () => {

    const userid = AuthStorage.getStorageData(STORAGEKEY.userId)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const article = useSelector((state: any) => state.articleData.getArticle)
    const addSavedNewsData = useSelector((state: any) => state.articleData.savedNews)
    const deleteSavedNewsData = useSelector((state: any) => state.articleData.deleteNews)

    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setpageNumber] = useState(1)
    const [articleData, setArticleData] = useState<any[]>([])

    useEffect(() => {
        dispatch(getArticle(perPage, pageNumber, userid))
    }, [perPage, pageNumber, userid])


    useEffect(() => {
        if (addSavedNewsData && addSavedNewsData.status === 200) {
            toast.success("News saved successfully")
            dispatch(getArticle(perPage, pageNumber, userid))

            dispatch({
                type: ADD_SAVED_NEWS,
                payload: null,
            })
        }
    }, [addSavedNewsData])

    useEffect(() => {
        if (deleteSavedNewsData && deleteSavedNewsData.status === 200) {
            toast.success("News unsaved successfully")
            dispatch(getArticle(perPage, pageNumber, userid))
            dispatch({
                type: DELETE_SAVED_NEWS,
                payload: null,
            })
        }
    }, [deleteSavedNewsData])

    useEffect(() => {
        if (article && article.data && article.data.data) {
            setArticleData(article?.data?.data)
        }
    }, [article, perPage, pageNumber])

    const viewAll = () => {
        let page = perPage
        let pageNo = pageNumber
        setPerPage(page += 8)
    }
    return (
        <>
            <Container>
                <div className="breadcrums">
                    <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p>  <button>View all News</button>
                </div>
            </Container>
            <div className='news-bg' style={{ width: "100%", backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <div className="courses-cards container position-absolute news-bg-title" style={{ left: "15%" }}>
                    <div className="title">
                        <h1>News & Updates</h1>
                    </div>
                </div>
            </div>
            <div className="container-lg px-0 pb-5">
                <div className="news-title">
                    <h1>In publishing and graphic design, Lorem ipsum is a get curated information relevant to you commonly</h1>
                </div>
                <Row className="gy-3">
                    {articleData ? articleData.map((item: any) => (
                        <Col lg="4" key={item.id}>
                            <AcquireCard
                                img={item.imageUrl}
                                title={item.title}
                                text={item.body}
                                btntext={"Read More"}
                                link={"item.link"}
                                isShowRating={false}
                                imgShow={false}
                                navigateTo={""}
                                time={moment(item.createdAt).format('MMMM D, YYYY')}
                                vidoUrl={item.videoUrl}
                                save={item.saved}
                                id={item.id}
                                type="NEWS"
                            />
                        </Col>
                    )) : <NoDataFound text="No Scheme Found" />}
                </Row>
            </div>

            {article?.data?.page_count > perPage ? <div className='text-center mb-5'> <button className='view_all_btn' onClick={() => viewAll()}>Load More</button> </div> : ""}
        </>
    )
}

export default ViewAllNews