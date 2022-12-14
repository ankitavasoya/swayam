import i18next from 'i18next'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import STORAGEKEY from '../config/APP/app.config'
import EmoployerOutlet from '../employer/EmoployerOutlet'
import AddTrainingPartner from '../employer/Job/AddTrainingPartner'
import JobApplication from '../employer/Job/JobApplication'
// import PostJob from '../employer/PostJob'
import { ApiGet, ApiGetNoAuth } from '../helper/API/ApiData'
import AuthStorage from '../helper/AuthStorage'
import PartnersLayout from '../layout/partners'
import ActiveCourse from './ActiveCourse'
import Dashboard from './Dashboard'
import InactiveCourse from './InactiveCourse'
import EditProfile from '../employer/MyProfile/EditProfile'
import MyProfile from './MyProfile/MyProfile'
import PartnersOutlet from './PartnersOutlet'
import PostCourse from './PostCourse'
import ViewPartnerCourse from './ViewPartnerCourse'

const index = () => {

    useEffect(() => {
        if (AuthStorage.getStorageData(STORAGEKEY.language) === null || AuthStorage.getStorageData(STORAGEKEY.language) === "null") {
            const lan = "English";
            ApiGetNoAuth(`language/getLanguageByName?name=${lan}`).then((res: any) => {
                AuthStorage.setStorageData(STORAGEKEY.language, res.data.id, true);
                AuthStorage.setStorageData(STORAGEKEY.lang, res.data.name.slice(0, 2).toLowerCase(), true);
            });
        }
    }, [AuthStorage.getStorageData(STORAGEKEY.language)])

    return (
        <PartnersLayout>
            <Routes>
                <Route path="/partner" element={<PartnersOutlet />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="activecourses" element={<ActiveCourse />} />
                    <Route path="coursesapplication" element={<JobApplication />} />
                    <Route path="myprofile" element={<MyProfile />} />
                    <Route path="edit-partner-profile" element={<EditProfile />} />
                    <Route path="inactivecourses" element={<InactiveCourse />} />
                    {/* <Route path="closedjobs" element={<ClosedJobs />} /> */}
                    <Route path="addtrainingpartner" element={<AddTrainingPartner />} />
                    <Route path="postcourses" element={<PostCourse />} />
                    <Route path="viewpartnercourse" element={<ViewPartnerCourse />} />
                </Route>
            </Routes>
        </PartnersLayout>
    )
}

export default index