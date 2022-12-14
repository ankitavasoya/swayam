import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import EmoployerLayout from '../layout/employer'
import PostJob from './PostJob'
import EmoployerOutlet from './EmoployerOutlet'
import ActiveJobs from './Job/ActiveJobs'
import AddTrainingPartner from './Job/AddTrainingPartner'
import ClosedJobs from './Job/ClosedJobs'
import Dashboard from './Job/Dashboard'
import InactiveJobs from './Job/InactiveJobs'
import JobApplication from './Job/JobApplication'
import EditProfile from './MyProfile/EditProfile'
import MyProfile from './MyProfile/MyProfile'
import { useLocation, useNavigate } from "react-router-dom";
import AuthStorage from '../helper/AuthStorage'
import STORAGEKEY from '../config/APP/app.config'
import { ApiGet, ApiGetNoAuth } from '../helper/API/ApiData'
import i18next from 'i18next'


const Index = () => {

    // const location = useLocation()
    // const navigate = useNavigate()

    // let userType = AuthStorage.getStorageData(STORAGEKEY.userType)
    // let EmployeeRoute = ['dashboard', 'activejobs', 'jobapplication', 'myprofile', 'edit-profile', 'inactivejobs', 'closedjobs']

    // useEffect(() => {
    //     if (userType === "employer") {
    //         if (EmployeeRoute.includes(location.pathname.split('/')[2])) {
    //             navigate(-1)
    //         }else{
    //             navigate('/employer/dashboard')
    //         }
    //     }
    // }, [userType])
    useEffect(() => {
        if (AuthStorage.getStorageData(STORAGEKEY.language) === null || AuthStorage.getStorageData(STORAGEKEY.language) === "null") {
            const lan = "English";
            ApiGetNoAuth(`language/getLanguageByName?name=${lan}`).then((res: any) => {
                AuthStorage.setStorageData(STORAGEKEY.language, res.data.id, true);
                AuthStorage.setStorageData(STORAGEKEY.lang, res.data.name.slice(0, 2).toLowerCase(), true);
            });
        }
    }, [AuthStorage.getStorageData(STORAGEKEY.language)])

    useEffect(() => {
        if (!AuthStorage.getStorageData(STORAGEKEY.language)) {
            const lan = "English";
            ApiGetNoAuth(`language/getLanguageByName?name=${lan}`).then((res: any) => {
                AuthStorage.setStorageData(STORAGEKEY.language, res.data.id, true);
                AuthStorage.setStorageData(STORAGEKEY.lang, res.data.name.slice(0, 2).toLowerCase(), true);
            });
        }
        else {
            ApiGetNoAuth(`language/getLanguage`).then((res: any) => {
                if (res?.data?.length) {
                    let selected = res.data.find((ele: any) => ele.id === AuthStorage.getStorageData(STORAGEKEY.language)).name.slice(0, 2).toLowerCase()
                    AuthStorage.setStorageData(STORAGEKEY.lang, selected, true);
                    i18next.changeLanguage(selected)
                }
            })
        }
    }, [AuthStorage.getStorageData(STORAGEKEY.lang)])


    return (
        <EmoployerLayout>
            <Routes>
                <Route path="/employer" element={<EmoployerOutlet />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="activejobs" element={<ActiveJobs />} />
                    <Route path="jobapplication" element={<JobApplication />} />
                    <Route path="myprofile" element={<MyProfile />} />
                    <Route path="edit-employer-profile" element={<EditProfile />} />
                    <Route path="inactivejobs" element={<InactiveJobs />} />
                    {/* <Route path="closedjobs" element={<ClosedJobs />} /> */}
                    <Route path="addtrainingpartner" element={<AddTrainingPartner />} />
                    <Route path="postjob" element={<PostJob />} />
                </Route>
            </Routes>
        </EmoployerLayout>
    )
}

export default Index