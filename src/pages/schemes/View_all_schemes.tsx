import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TablePagination, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import AcquireCard from '../../common/AcquireCard';
import NoDataFound from '../../common/NoDataFound';
import STORAGEKEY from '../../config/APP/app.config';
import AuthStorage from '../../helper/AuthStorage';
import { allScheme, schemeBenifits, schemesCategory } from '../../redux/actions/schemesAction';
import { getAllState } from '../../redux/actions/stateAction';
import { ADD_SAVEED_SCHEMES, DELETE_SAVEED_SCHEMES } from '../../redux/type';
import ReactHtmlParser from 'react-html-parser'



interface Filters {
    stateFilter: string
    benifitsFilter: string
    schemeCategory: string
    search: string
}
const View_all_schemes = () => {
    let userId = AuthStorage.getStorageData(STORAGEKEY.userId)

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [coursesData, setCoursesData] = useState<any[]>([])
    const [perPage, setPerPage] = useState<number>(6)
    const [pageNumber, setPageNumber] = useState(1)
    const [categoryId, setCategoryId] = useState("")
    const [schemeData, setSchemeData] = useState<any>()
    const [filters, setFilters] = useState<Filters>({
        stateFilter: "",
        benifitsFilter: "",
        schemeCategory: "",
        search: "",
    })
    const [clearBtn, setClearBtn] = useState(false)
    const [categoryData, setCategoryData] = useState([]);

    const getCoursesData = useSelector((state: any) => state.courseData.getCourses)
    const allSchemesData = useSelector((state: any) => state.schemesData.allSchemes)
    const allStateData = useSelector((state: any) => state.stateData.stateData)
    const schemeBenifitsData = useSelector((state: any) => state.schemesData.schemesBenifits)
    const addSavedScheme = useSelector((state: any) => state.schemesData.addSavedSchemes)
    const deleteSavedScheme = useSelector((state: any) => state.schemesData.deleteSavedSchemes)
    const schemesCategoryData = useSelector((state: any) => state.schemesData.schemesCategory)




    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const search: any = queryParams.get("q")?.split('+').join(' ');

    useEffect(() => {
        setFilters({
            ...filters,
            search: search?.toString()
        })
    }, [search])

    useEffect(() => {
        dispatch(getAllState())
        dispatch(schemesCategory())
    }, [])

    useEffect(() => {
        dispatch(schemeBenifits())
    }, [schemeBenifits])

    useEffect(() => {
        (schemesCategoryData && schemesCategoryData.data && schemesCategoryData.data.length > 0 ?
            setCategoryData(schemesCategoryData?.data?.map((item: any) => ({
                title: item.name,
                id: item.id
            }))) :
            <NoDataFound text="No Scheme Found" />
        )
        const temp = schemesCategoryData?.data?.map((item: any) => ({
            title: item.name,
            id: item.id
        }));
        setCategoryData(temp);
    }, [schemesCategoryData])



    useEffect(() => {
        dispatch(allScheme(perPage, pageNumber, "", filters.benifitsFilter, filters.schemeCategory, filters.search ? filters.search : search, '', "", userId, filters.stateFilter))
    }, [categoryId, perPage, pageNumber, filters])

    const handleChange = (event: any, name: any) => {
        if (name === 'state') {
            setFilters({
                ...filters, stateFilter: event
            })
        } else if (name === 'benifits') {
            setFilters({
                ...filters, benifitsFilter: event
            })
        } else if (name === 'schemeCategory') {
            setFilters({
                ...filters, schemeCategory: event
            })
        } else if (name === 'search') {
            setFilters({
                ...filters, search: event
            })
        }
    };
    const onClare = () => {
        setFilters({
            ...filters,
            stateFilter: "",
            benifitsFilter: "",
            schemeCategory: "",
            search: "",
        })
    }

    useEffect(() => {
        if (filters.stateFilter || filters.benifitsFilter || filters.schemeCategory || filters.search) {
            setClearBtn(true)
        }
        else {
            setClearBtn(false)
        }
    }, [filters])



    useEffect(() => {
        if (getCoursesData?.data?.data) {
            setCoursesData(getCoursesData?.data?.data)
        }
    }, [getCoursesData])


    useEffect(() => {
        if (allSchemesData) {
            setSchemeData(allSchemesData?.data?.data)
        }
    }, [allSchemesData])

    const lordMore = () => {
        let page = perPage
        setPerPage(page += 6)
    }

    useEffect(() => {
        if (addSavedScheme && addSavedScheme?.status === 200) {
            toast.success("Scheme saved successfully")
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", '', userId))
            dispatch({
                type: ADD_SAVEED_SCHEMES,
                payload: []
            })
        }
    }, [addSavedScheme])
    useEffect(() => {
        if (deleteSavedScheme && deleteSavedScheme?.status === 200) {
            dispatch(allScheme(perPage, pageNumber, "", "", "", "", "", '', userId))
            toast.success("Scheme unsave successfully")
            dispatch({
                type: DELETE_SAVEED_SCHEMES,
                payload: []
            })
        }
    }, [deleteSavedScheme])
    return (
        <>
            <Container>
                <div className='courses'>
                    <Row>
                        <Col md={12} lg={clearBtn ? 5 : 6}>
                            <Row>
                                <Col sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.state")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="state"
                                            value={filters.stateFilter}
                                            label={t("scheme.filter.state")}
                                            onChange={(e) => handleChange(e.target.value, "state")}
                                        >
                                            {allStateData && allStateData.data?.map((item: any) => (
                                                <MenuItem value={item.name}>{item.name}</MenuItem>
                                            ))}
                                            {/* <MenuItem value={10}>Nursing</MenuItem>
                                        <MenuItem value={20}>Nurse</MenuItem>
                                        <MenuItem value={30}>General Surgeon</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Col>
                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.benifits")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='benifits'
                                            value={filters.benifitsFilter}
                                            label={t("scheme.filter.benifits")}
                                            onChange={(e) => handleChange(e.target.value, "benifits")}
                                        >
                                            {schemeBenifitsData && schemeBenifitsData?.data?.map((item: any) => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}
                                            {/* <MenuItem value={10}>Thane</MenuItem>
                                        <MenuItem value={20}>Nurse</MenuItem>
                                        <MenuItem value={30}>General Surgeon</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12} lg={clearBtn ? 5 : 6} className="mt-md-3 mt-lg-0">
                            <Row>

                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.schemeCategory")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='benifits'
                                            value={filters.schemeCategory}
                                            label={t("scheme.filter.schemeCategory")}
                                            onChange={(e) => handleChange(e.target.value, "schemeCategory")}
                                        >
                                            {categoryData && categoryData.length && categoryData.map((item: any) => (
                                                <MenuItem key={item.id} value={item.id} >{item.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Col>
                                {/* <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">{t("scheme.filter.ratings")}</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='ratings'
                                            value={filters.ratingFilter}
                                            label={t("scheme.filter.ratings")}
                                            onChange={(e) => handleChange(e.target.value, "ratings")}
                                        >
                                            <MenuItem value={1}>
                                                <StarRatings
                                                    rating={1}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                <StarRatings
                                                    rating={2}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={3}>
                                                <StarRatings
                                                    rating={3}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={4}>
                                                <StarRatings
                                                    rating={4}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                            <MenuItem value={5}>
                                                <StarRatings
                                                    rating={5}
                                                    starRatedColor="#C90F22"
                                                    numberOfStars={5}
                                                    name="course"
                                                    starDimension="22px"
                                                />
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>

                                <Col sm={12} md={6} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <div className="search_input">
                                        <TextField id="outlined-danger" name='search' type="text" value={filters.search} label={t("scheme.filter.search")} variant="outlined" onChange={(e: any) => handleChange(e.target.value, "search")} />
                                        <img src="./assets/img/search.png" alt="" />
                                    </div>
                                </Col> */}

                                <Col sm={12} md={5} className="mt-sm-3 mt-md-0 margin-courses-input">
                                    <div className="search_input">
                                        {/* <TextField id="outlined-danger" type="text" label="Search Schemes" variant="outlined" onChange={handelSearch} /> */}
                                        <TextField id="outlined-danger" type="text" label="Search Schemes" value={filters.search} name={"search"} variant="outlined" onChange={(e) => handleChange(e.target.value, "search")} />
                                        <img src="./assets/img/search.png" alt="" />
                                    </div>
                                </Col>
                            </Row>

                        </Col>
                        {/* <Col lg={1} md={1} className="text-end">
                        <button onClick={() => onClare()} className="mt-sm-3 mt-md-3 mt-lg-0 clr-btn margin-courses-input">Clear</button>
                    </Col> */}
                        <Col>
                            {clearBtn && <Col lg={1} md={1} className="text-end">
                                <button onClick={() => onClare()} className="mt-sm-3 mt-md-3 mt-lg-0 clr-btn margin-courses-input">Clear</button>
                            </Col>}
                        </Col>

                    </Row>
                </div>
            </Container>

            <div className="courses-cards pb-5">
                <Container>
                    <div className="title d-flex justify-content-between">
                        <h1>{t("viewAllScheme.allScheme")}</h1>
                        {/* <a href='/Course'>View All Courses</a> */}
                        {/* <Link to="/courses">View All Courses</Link> */}
                    </div>
                    <Row className="gy-3">
                        {schemeData && schemeData?.length ? schemeData?.map((item: any) => (
                            <Col lg="4">
                                <AcquireCard
                                    img={item.thumbnail}
                                    title={item.name}
                                    text={ReactHtmlParser(item.detail)}
                                    btntext={t("allScheme.readMore")}
                                    navigateTo={`view_schemes?Id=${item.id}`}
                                    link={item.link}
                                    isShowRating={true}
                                    rating_count={item.schemeRatings.length.toString()}
                                    rating={item.schemeRatings.map((item: any) => item.rating)}
                                    rat_count={true}
                                    save={item.saved}
                                    id={item.id}
                                    type='SCHEME'
                                />
                            </Col>
                        )) : <NoDataFound text="No Scheme Found" />}
                    </Row>
                    {allSchemesData?.data?.page_count > perPage ? <div className='d-flex mt-3 justify-content-center table_pagination align-items-center' style={{ color: 'var(--red)', cursor: "pointer" }} onClick={() => lordMore()}>
                        {/* {t("viewAllScheme.loadMore")} */}
                        <button className='load-more mt-5'>{t("viewAllJob.jobs.loadMore")} </button>
                        {/* <Pagination count={allSchemesData?.data?.page_count} variant="outlined" shape="rounded" onChange={(event, value) => setPageNumber(value)} showFirstButton={true} showLastButton={true} /> */}
                    </div> : ""}
                </Container>
            </div >



            {/* <div className="courses-cards mt-5">
                <Container>
                    <div className="title d-flex justify-content-between">
                        <h1>Learn More (Informative Videos)</h1>
                        <a href=''>View All Courses</a>
                    </div>
                    <Row className="gy-3">
                        <Col lg="4">
                            <AcquireCard
                                img="news-update.svg"
                                title="Zensar Technologies Annual Investor Conference 2021"
                                text="Information on resume headlines how to include one on your resume, along with profiles …"
                                btntext="Read More"
                                link="Stars.png"
                                isShowRating={true}
                            />
                        </Col>
                    </Row>
                </Container>
            </div> */}
        </>
    )
}

export default View_all_schemes