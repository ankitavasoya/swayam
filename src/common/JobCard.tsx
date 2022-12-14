import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import JonApplicationModal from '../components/modals/JonApplicationModal'
import { updateJobForActive } from '../redux/actions/activeJobsActions'
import whatsAppMessage from './whatsAppMessage'
interface Props {
    img: string,
    title: string,
    location_txt: string,
    vacancy_txt: string,
    calendar_txt: string,
    active_job_btn?: boolean,
    InactiveJobs_btn?: boolean,
    inactiveData?: any,
    allActiveData?: any
    activeEdit?: any
    inActiveEdit?: any
    viewApplication?: any
}

const JobCard: FC<Props> = ({ img, title, location_txt, vacancy_txt, calendar_txt, active_job_btn, InactiveJobs_btn, allActiveData, inactiveData, activeEdit, inActiveEdit, viewApplication }) => {

    const { t } = useTranslation()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [jobApplicationModal, setJobApplicationModal] = useState(false)

    const handalReActive = () => { //inactive job
        let body = {
            name: inactiveData.name.id,
            state: inactiveData.state.id,
            district: inactiveData.district.id,
            town: inactiveData.town,
            pincode: inactiveData.pincode,
            description: inactiveData.description,
            vacancies: inactiveData.vacancies,
            reqExperience: inactiveData.reqExperience,
            salary: inactiveData.salary,
            benifits: inactiveData.benifits,
            requirements: inactiveData.requirements,
            type: inactiveData.type,
            isActive: true,
            extraType: inactiveData.extraType,
            shifts: inactiveData.shifts,
            email: inactiveData.email,
            phone: inactiveData.phone,
            startDate: inactiveData.startDate,
            endDate: inactiveData.endDate,
            jobRole: inactiveData.jobRole.id,
            jobType: inactiveData.jobType.id,
            application_form: inactiveData.application_form,
            application_process: inactiveData.application_process,
            hospital_expenses_estimation_certificate: inactiveData.hospital_expenses_estimation_certificate,
            medical_superintendent: inactiveData.medical_superintendent,
            recommended_and_forwarded: inactiveData.recommended_and_forwarded,
            sendEmail: true,
        }
        dispatch(updateJobForActive(inactiveData.id, body))
    }
    const handalEdit = (id: any) => {
        navigate(`/employer/postjob?id=${id}`)
    }
    const handalViewApp = (id: any) => {
        navigate(`/employer/jobapplication?id=${id}`)
        setJobApplicationModal(true)
        // whatsAppMessage()
    }

    const handalDeActive = () => {
        let body = {
            name: allActiveData.name.id,
            state: allActiveData.state.id,
            district: allActiveData.district.id,
            town: allActiveData.town,
            pincode: allActiveData.pincode,
            description: allActiveData.description,
            vacancies: allActiveData.vacancies,
            reqExperience: allActiveData.reqExperience,
            salary: allActiveData.salary,
            benifits: allActiveData.benifits,
            requirements: allActiveData.requirements,
            type: allActiveData.type,
            isActive: false,
            extraType: allActiveData.extraType,
            shifts: allActiveData.shifts,
            email: allActiveData.email,
            phone: allActiveData.phone,
            startDate: allActiveData.startDate,
            endDate: allActiveData.endDate,
            jobRole: allActiveData.jobRole.id,
            jobType: allActiveData.jobType.id,
            application_form: allActiveData.application_form,
            application_process: allActiveData.application_process,
            hospital_expenses_estimation_certificate: allActiveData.hospital_expenses_estimation_certificate,
            medical_superintendent: allActiveData.medical_superintendent,
            recommended_and_forwarded: allActiveData.recommended_and_forwarded,
            sendEmail: true,
        }
        dispatch(updateJobForActive(allActiveData.id, body))
    }
    return (
        <>
            <div className="acquire-card" style={{ height: "auto", maxWidth: '410px', margin: 'auto' }}>
                <div style={{ 'height': '111px' }}>
                    <figure className="m-0 text-center">
                        <img
                            className="mainImg"
                            style={{ height: "111px", width: "30%" }}
                            src={img}
                            alt="card-img"
                        />
                    </figure>
                </div>
                <div className="details job-card-detail">
                    <div className="details-title">
                        <h1>{title}</h1>
                    </div>
                    <div className='d-flex align-items-center mb-3 text-align: center'>
                        <img src="../../../assets/img/location-pin.png" alt="" style={{ width: "16px", height: "20px" }} />
                        <p className="text mb-0 ms-3" style={{ height: "auto" }}>
                            {location_txt}
                        </p>
                    </div>
                    <div className='d-flex align-items-center mb-3 text-align: center'>
                        <img src="../../../assets/img/noun-vacancy-3194977 (1).png" alt="" style={{ width: "15px", height: "20px" }} />
                        <p className="text mb-0 ms-3">
                            {vacancy_txt}
                        </p>
                    </div>
                    <div className='d-flex align-items-center mb-3'>
                        <img src="../../../assets/img/calendar.png" alt="" style={{ width: "15px", height: "16px" }} />
                        <p className="text mb-0 ms-3">
                            {calendar_txt}
                        </p>
                    </div>
                </div>
                {
                    active_job_btn && <div className='d-flex btn-content-jobcard' style={{ width: "100%" }}>
                        <button className='View_Applicants_btn' onClick={() => handalViewApp(activeEdit)}>{t("Employee.JobCard.action.viewApp")} </button>
                        <button className='Edit_btn' onClick={() => handalEdit(activeEdit)}>{t("Employee.JobCard.action.edit")}</button>
                        <button className='Deactivate_btn' onClick={() => handalDeActive()}>{t("Employee.JobCard.action.deActive")}</button>
                    </div>
                }
                {
                    InactiveJobs_btn &&
                    <div className='InactiveJobs_btn'>
                        <button className='Edit_btn' onClick={() => handalEdit(inActiveEdit)}>{t("Employee.JobCard.action.edit")}</button>
                        <button className='Deactivate_btn' onClick={() => handalReActive()}>{t("Employee.JobCard.action.reActive")}</button>
                    </div>
                }
            </div>
            {jobApplicationModal && <JonApplicationModal show={jobApplicationModal} jobId={activeEdit} onHide={() => setJobApplicationModal(false)} />}
        </>
    )
}

export default JobCard