import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import JobCard from '../../common/JobCard';

const ClosedJobs = () => {

    const { t } = useTranslation()

    const [age, setAge] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    const jobInfo = [
        {
            img: "../../../assets/img/grp1.png",
            title: "Health Executive",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
        {
            img: "../../../assets/img/grp1.png",
            title: "Nursing",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
        {
            img: "../../../assets/img/grp1.png",
            title: "Health Executive",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
        {
            img: "../../../assets/img/grp1.png",
            title: "Nursing",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
        {
            img: "../../../assets/img/grp1.png",
            title: "Health Executive",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
        {
            img: "../../../assets/img/grp1.png",
            title: "Nursing",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
        {
            img: "../../../assets/img/grp1.png",
            title: "Health Executive",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
        {
            img: "../../../assets/img/grp1.png",
            title: "Nursing",
            location_txt: "Andheri, Mumbai",
            vacancy_txt: `${t("Employee.ClosedJobs.card.noOfVacancies")}: 04`,
            calendar_txt: `${t("Employee.ClosedJobs.card.jobPostedOn")}: 09-03-2022`
        },
    ]
    return (
        <>
            <div className='my_profile_main'>
                <Container fluid>
                    <h1 className='heading-txt'>{t("Employee.ClosedJobs.title")}</h1>
                    <div className='ActiveJobs-contend'>
                        <div className='jobType-select d-flex justify-content-between'>
                            <div className="search_input">
                                <TextField id="outlined-danger" name='search' value={""} type="text" label={t("Employee.ClosedJobs.input.search")} variant="outlined" />
                                <img src="./assets/img/search.png" alt="" />
                            </div>
                        </div>
                        <div>
                            <Row>
                                {
                                    jobInfo.map((item) => (
                                        <Col lg={3} className="mb-3">
                                            <JobCard
                                                img={item.img}
                                                title={item.title}
                                                location_txt={item.location_txt}
                                                vacancy_txt={item.vacancy_txt}
                                                calendar_txt={item.calendar_txt}
                                                InactiveJobs_btn={true}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                        </div>
                        <div className='text-center mt-3'>
                            <button className='view_all_btn'>{t("Employee.ClosedJobs.Btn.viewAll")}</button>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default ClosedJobs