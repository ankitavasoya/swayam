import { Col, Row } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SilkSlider from "react-slick";
import AcquireCard from '../../../common/AcquireCard';
import { getLanguageAction } from '../../../redux/actions/languageAction';
import { allScheme } from '../../../redux/actions/schemesAction';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NoDataFound from '../../../common/NoDataFound';
import ReactHtmlParser from 'react-html-parser'

const All_Schemes = ({ categoryName }: any) => {
    const { t } = useTranslation()
    let dispatch = useDispatch();
    let navigate = useNavigate()
    const allSchemesData = useSelector((state: any) => state.schemesData.allSchemesFalse)

    const [perPage, setPerPage] = useState<any>(10)
    const [pageNumber, setPageNumber] = useState<any>(1)


    return (
        <>
            <div className="container-xxl px-0 pb-5">
                <div className="courses-cards">
                    <div className="title d-flex justify-content-between p-3">
                        <h1>{categoryName ? categoryName : "AllScheme"}</h1>
                        <Link to="/view_all_schemes">{t("allScheme.viewAllSchemes")}</Link>
                    </div>
                </div>


                <Row className="gy-3">
                    {allSchemesData && allSchemesData?.data && allSchemesData?.data?.data?.length ? allSchemesData?.data?.data?.map((item: any) => (
                        <Col lg="4" key={item.id}>
                            <AcquireCard
                                img={item.thumbnail}
                                title={item.name}
                                text={ReactHtmlParser(item.detail)}
                                btntext={t("allScheme.readMore")}
                                navigateTo={`view_schemes?Id=${item.id}`}
                                link={item.link}
                                rating_count={item.schemeRatings.length.toString()}
                                rating={item.schemeRatings.map((item: any) => item.rating)}
                                rat_count={true}
                                isShowRating={true}
                                save={item.saved}
                                id={item.id}
                                type='SCHEME'
                            />
                        </Col>
                    )) : <NoDataFound text="No Scheme Found" />}
                </Row>
            </div>
        </>
    )
}

export default All_Schemes