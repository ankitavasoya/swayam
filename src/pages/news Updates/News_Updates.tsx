import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import AcquireCard from '../../common/AcquireCard'
import NoDataFound from '../../common/NoDataFound'
import STORAGEKEY from '../../config/APP/app.config'
import AuthStorage from '../../helper/AuthStorage'
import { getArticle } from '../../redux/actions/articleAction'

const News_Updates = () => {
    let userid = AuthStorage.getStorageData(STORAGEKEY.userId)

    const [perPage, setPerPage] = useState(6)
    const [pageNumber, setPageNumber] = useState(1)
    const dispatch = useDispatch()

    const article = useSelector((state: any) => state.articleData.getArticle)

    useEffect(() => {
        if (AuthStorage.getStorageData(STORAGEKEY.language)) {
            dispatch(getArticle(perPage, pageNumber, userid))
        }
    }, [perPage, pageNumber])

    const loadMore = () => {
        let page = perPage
        setPerPage(page += 6)
    }

    return (
        <>
            <div className="courses-cards pb-5 mt-5">
                <Container>
                    <div className="title d-flex justify-content-between">
                        <h1>NEWS & UPDATES</h1>
                        {/* <a href='/Course'>View All Courses</a> */}
                        {/* <Link to="/courses">View All Courses</Link> */}
                    </div>
                    <Row className="gy-3">
                        {article && article.data && article.data.data.length ?
                            article?.data?.data.map((item: any) => (
                                <Col lg={4}>
                                    <div className="p-2"
                                        style={{ zIndex: "1" }}
                                    >
                                        <AcquireCard
                                            saveArticle={true}
                                            img={item.imageUrl}
                                            title={item.title}
                                            text={item.body}
                                            btntext={"Read More"}
                                            link={"item.link"}
                                            isShowRating={false}
                                            imgShow={true}
                                            vidoUrl={item.videoUrl}

                                        />
                                    </div>
                                </Col>
                            ))
                            : <NoDataFound text="No Scheme Found" />
                        }
                    </Row>
                    {
                        article && article.data && article.data.page_count >= perPage ?
                            <div className='d-flex mt-3 justify-content-center table_pagination align-items-center' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => loadMore()}>
                                <button className='load-more mt-5'>LoadMore</button>
                            </div> : ""
                    }
                </Container>
            </div >
        </>
    )
}

export default News_Updates