
import { log } from 'console';
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import STORAGEKEY from '../config/APP/app.config';
import { ApiGet } from '../helper/API/ApiData';
import AuthStorage from '../helper/AuthStorage';
import { deletePartnerCourse, editActivePartnerCourse, getPatnerCourses } from '../redux/actions/ActiveCourseAction';
import { editPartnerCourse } from '../redux/actions/courseAction';
interface Props {
    img: string,
    title: string,
    location_txt: string,
    duration?: string,
    vacancy_txt: string,
    calendar_txt: string,
    active_job_btn?: boolean,
    InactiveJobs_btn?: boolean,
    inactiveData?: any,
    allActiveData?: any,
    id?: Number,
    inactiveCourseId?: Number,
    sendEmail?: any
}

const CourseCard: FC<Props> = ({ img, title, location_txt, duration, vacancy_txt, calendar_txt, active_job_btn, InactiveJobs_btn, allActiveData, inactiveData, id, inactiveCourseId, sendEmail }) => {

    const { t } = useTranslation()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const activeCourses = () => {
        let formData = new FormData();
        formData.append('courseId', inactiveData.id);
        formData.append('key', inactiveData.key);
        formData.append('name', inactiveData.name);
        formData.append('categoryId', inactiveData.courseCategory.id);
        formData.append('detail', inactiveData.detail);
        formData.append('duration', inactiveData.duration);
        formData.append('thumbnail', inactiveData.thumbnail);
        formData.append('certificationBody', inactiveData.certificationBody);
        formData.append('mode', inactiveData.mode);
        formData.append('certification', inactiveData.certificate);
        formData.append('application_form', inactiveData.application_form);
        formData.append('recommended_and_forwarded', inactiveData.recommended_and_forwarded);
        formData.append('application_process', inactiveData.application_process);
        formData.append('medical_superintendent', inactiveData.medical_superintendent);
        formData.append('hospital_expenses_estimation_certificate', inactiveData.hospital_expenses_estimation_certificate);
        formData.append('state', inactiveData.state);
        formData.append('district', inactiveData.district);
        formData.append('location', inactiveData.location);
        formData.append('pincode', inactiveData.pincode);
        formData.append('contactPersonPhone', inactiveData.contactPersonPhone);
        formData.append('contactPersonEmail', inactiveData.contactPersonEmail);
        formData.append('contactPersonName', inactiveData.contactPersonName);
        formData.append('eligibility', inactiveData.eligibility);
        formData.append('component', inactiveData.component);
        formData.append('organization', inactiveData.organization);
        formData.append('isActive', "true");
        formData.append('isDeleted', "false");
        formData.append('sendEmail', sendEmail);
        dispatch(editActivePartnerCourse(formData, inactiveData?.courseCategory?.id));
    }

    const deActiveCourses = () => {
        dispatch(deletePartnerCourse(inactiveData.id, inactiveData.key, 'single', inactiveData.courseCategory.id))
    }

    const editCourse = () => {
        navigate(`/partner/postcourses?id=${id}&type=${"active"}`)
    }

    const viewCourse = () => {
        navigate(`/partner/viewpartnercourse?id=${id}`)
    }

    const editCourseInactive = () => {
        navigate(`/partner/postcourses?id=${inactiveCourseId}&type=${"inactive"}`)
    }

    return (
        <>
            <div className="acquire-card" style={{ height: "auto" }}>
                <div style={{ 'height': '111px' }}>
                    <figure className="m-0 text-center">
                        <img
                            className="mainImg"
                            style={{ height: "111px", width: "100%" }}
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
                        <img src="../../../assets/img/duration.png" alt="" />
                        <p className="text mb-0 ms-3  text-ellips" style={{ height: "auto" }}>
                            {duration}
                        </p>
                    </div>
                    <div className='d-flex align-items-center mb-3 text-align: center'>
                        <img src="../../../assets/img/category.png" alt="" />
                        <p className="text mb-0 ms-3 text-ellips">
                            {vacancy_txt}
                        </p>
                    </div>
                    <div className='d-flex align-items-center mb-3'>
                        <img src="../../../assets/img/calendar.png" alt="" style={{ width: "15px", height: "16px" }} />
                        <p className="text mb-0 ms-3 text-ellips">
                            {calendar_txt}
                        </p>
                    </div>
                </div>
                {
                    active_job_btn && <div className='d-flex btn-content-jobcard' style={{ width: "100%" }}>
                        <button className='View_Applicants_btn' onClick={() => viewCourse()}>View course</button>
                        <button className='Edit_btn' onClick={() => editCourse()}>Edit</button>
                        <button className='Deactivate_btn' onClick={() => deActiveCourses()}>Deactive</button>
                    </div>
                }
                {
                    InactiveJobs_btn &&
                    <div className='InactiveJobs_btn'>
                        <button className='Edit_btn' onClick={() => editCourseInactive()}>Edit</button>
                        <button className='Deactivate_btn' onClick={() => activeCourses()}>Re-active</button>
                    </div>
                }
            </div>
        </>
    )
}

export default CourseCard