import React from 'react'
import { Navbar } from 'react-bootstrap'
import deshbord_active from '../../assets/img/deshbord.png'
import deshbord from '../../assets/img/disable_deshboard.png'
import job from '../../assets/img/noun-search-job-4641981.png'
import active_job from '../../assets/img/active_job.png'
import inactive_job from '../../assets/img/active-job.png'
import Closed_Jobs from '../../assets/img/Closed Jobs.png'
import invitations from '../../assets/img/invitations.png'
import invitations_Active from '../../assets/img/invitations-active.png'
import jobapplication_active from '../../assets/img/jobapplication_active.png'
import Job_Application from '../../assets/img/Job Application.png'
import active_Inactive_Jobs from '../../assets/img/active_Inactive_Jobs.png'
import active_Closed_Jobs from '../../assets/img/active_Closed_Jobs.png'
import { NavLink, useLocation } from 'react-router-dom'
import Profile_arrow from '../../assets/img/Profile_arrow.svg'
import profile_pic from '../../assets/img/profile-pic.png'
import { useTranslation } from 'react-i18next'
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/actions/loginAction'
const Sidebar = () => {

  const { t } = useTranslation()
  const location = useLocation();
  const dispatch = useDispatch();

  const [userType, setUserType] = useState<any>()
  const [profileImg, setProfileImg] = useState<string | null>()
  const [profileName, setProfilName] = useState('')
  const [profileEmail, setProfilEmail] = useState('')

  const getUserData = useSelector((state: any) => state.login.getUserData)

  useEffect(() => {
    setUserType(AuthStorage.getStorageData(STORAGEKEY.userType)?.toLocaleLowerCase())
    setProfileImg(AuthStorage.getStorageData(STORAGEKEY.profileImg))
  }, [AuthStorage.getStorageData(STORAGEKEY.userType)])

  useEffect(() => {
    dispatch(getUser())
  }, [])

  useEffect(() => {
    setProfileImg(getUserData?.data?.avatar)
    setProfilName(getUserData?.data?.name)
    setProfilEmail(getUserData?.data?.email)
  }, [getUserData])

  const navbardata = [
    {
      img: deshbord,
      img_active: deshbord_active,
      text: t("EmployeePanel.Sidebar.dashboard"),
      path: `${userType}/dashboard`
    },
    {
      img: job,
      img_active: active_job,
      text: t("EmployeePanel.Sidebar.activeJobs"),
      path: `${userType}/activejobs`
    },
    {
      img: inactive_job,
      img_active: active_Inactive_Jobs,
      text: t("EmployeePanel.Sidebar.inactiveJobs"),
      path: `${userType}/inactivejobs`
    },
    // {
    //   img: Closed_Jobs,
    //   img_active: active_Closed_Jobs,
    //   text: t("EmployeePanel.Sidebar.closedJobs"),
    //   path: `${userType}/closedjobs`
    // },
    {
      img: invitations,
      img_active: invitations_Active,
      text: t("EmployeePanel.Sidebar.postaJob"),
      path: `${userType}/postjob`
    },
    // {
    //   img: Job_Application,
    //   img_active: jobapplication_active,
    //   text: t("EmployeePanel.Sidebar.jobApplication"),
    //   path: `${userType}/jobapplication`
    // },
    // {
    //   text: "My Profile"
    // },
    // {
    //   text: "Support"
    // },
    // {
    //   text: "Logout"
    // },
  ]

  const IsActive = (path: string) => {
    let currentLocation = location.pathname.split('/')[2]
    return currentLocation === path.split('/')[1]
  }
  return (
    <>
      <div className='sidebar-main' >
        <div className='profile-content'>
          <img src={profileImg ? profileImg : profile_pic} alt="" className='profile-img' />
          <div className='profile-name'>
            <h1>{profileName ? profileName : ""}</h1>
            <p>{profileEmail ? profileEmail : ""}</p>
          </div>
          <img src={Profile_arrow} alt="" />
        </div>

        <div className='sidebar-nav'>
          <Navbar  >
            <div style={{ width: "100%" }}>
              {
                navbardata.map((item, index) => (
                  <div key={index} className='sidebar-nav-body'>
                    <img src={`${IsActive(item.path) ? item.img_active : item.img}`} className={item.img ? "d-block" : "d-none"} alt="" />
                    <NavLink to={`${item.path}`} className={`${IsActive(item.path) ? 'active' : 'disable'}`}>{item.text}</NavLink>
                  </div>
                ))
              }
            </div>
          </Navbar>
        </div>
      </div>
    </>
  )
}

export default Sidebar