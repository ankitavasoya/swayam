import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import ChooseLanguage from '../../components/modals/ChooseLanguage'
import NavbarModel from '../../components/modals/NavbarModel'
import NotificationsModel from '../../components/modals/NotificationsModel'
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
import profile_pic from '../../assets/img/profile-pic.png'
import mail from "../../assets/img/mail.png"
import notification from "../../assets/img/notification.png"
import Logo_white from "../../assets/img/Logo_white.png"
import AuthStorage from '../../helper/AuthStorage'
import STORAGEKEY from '../../config/APP/app.config'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Fade, Menu, MenuItem } from '@mui/material'
import { toast } from 'react-toastify'
import { IsProfileImage } from '../../redux/actions/isLoginAction'
const Header = () => {

    const { t } = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const [showNotifications, setShowNotifications] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [chooseLanguage, setChooseLanguage] = useState(false)
    const [profileImg, setProfileImg] = useState<string | null>()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const getUserData = useSelector((state: any) => state.login.getUserData)
    const profileImageURL = useSelector((state: any) => state.isProfile.isProfileImage)


    useEffect(() => {
        if (profileImageURL) {
            setProfileImg(profileImageURL)
        } else {
            setProfileImg(AuthStorage.getStorageData(STORAGEKEY.profileImg))
        }
    }, [profileImageURL])

    // useEffect(() => {
    //     setProfileImg(AuthStorage.getStorageData(STORAGEKEY.profileImg))
    // }, [AuthStorage.getStorageData(STORAGEKEY.profileImg)])

    // useEffect(() => {
    //     setProfileImg(AuthStorage.getStorageData(STORAGEKEY.profileImg) ? getUserData?.data?.avatar : getUserData?.data?.avatar)
    // }, [AuthStorage.getStorageData(STORAGEKEY.profileImg), scroll, getUserData])


    const navbardata = [
        {
            img: deshbord,
            img_active: deshbord_active,
            text: t("EmployeePanel.Sidebar.dashboard"),
            path: "/dashboard"
        },
        {
            img: job,
            img_active: active_job,
            text: t("EmployeePanel.Sidebar.activeJobs"),
            path: "/activejobs"
        },
        {
            img: inactive_job,
            img_active: active_Inactive_Jobs,
            text: t("EmployeePanel.Sidebar.inactiveJobs"),
            path: "/inactivejobs"
        },
        {
            img: Closed_Jobs,
            img_active: active_Closed_Jobs,
            text: t("EmployeePanel.Sidebar.closedJobs"),
            path: "/closedjobs"
        },
        {
            img: invitations,
            img_active: invitations_Active,
            text: t("EmployeePanel.Sidebar.postaJob"),
            path: "/postjob"
        },
        {
            img: Job_Application,
            img_active: jobapplication_active,
            text: t("EmployeePanel.Sidebar.jobApplication"),
            path: "/jobapplication"
        },
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

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
        toast.success("Logout successfully");
        // AuthStorage.deauthenticateUser()
        // AuthStorage.setStorageData(STORAGEKEY.language, "")
        handleClose()
        dispatch(IsProfileImage(''))
    }

    const gotoProfile = () => {
        navigate('/partner/myprofile')
        handleClose()
    }
    
    const gotoDashboard = () => {
        navigate('/partner/dashboard')
        handleClose()
    }


    return (
        <>
            <div className="white-navbar">
                <Navbar bg="" expand={false} fixed="top">
                    <Container fluid className='px-5'>
                        <div>
                            <img src={Logo_white} alt="" width="64px" className="ms-3" onClick={() => navigate('/partner/dashboard')} />
                        </div>
                        <div className='d-flex gap-5'>
                            {/* <div className="notification">
                                <img src={mail} alt="" width="30px" />
                                <div className="notification-text">
                                    20
                                </div>
                            </div>
                            <div className="notification cursor-pointer">
                                <img src={notification} alt="" width="30px" onClick={() => { setShowNotifications(!showNotifications) }} />
                                <div className="notification-text">
                                    7
                                </div>

                            </div> */}
                            <div className='language'>
                                <img src='../../assets/img/language.png' alt="language" height="30px" width="30px" onClick={() => setChooseLanguage(true)} />{t("Employee.Header.language")}
                            </div>
                            {/* <div className="header-profile position-relative p-0" onClick={() => setShowMenu(!showMenu)} >
                                <img src={profileImg ? profileImg : profile_pic} alt="" width="100%" height="100%" className="" style={{ cursor: "pointer" }} />
                                {
                                    showMenu && <NavbarModel show={showMenu} onHide={() => setShowMenu(false)} />
                                }
                            </div> */}
                            <>
                                <Button
                                    className="header-profile position-relative p-0"
                                    style={{ position: "relative", background: "transparent", width: "36px", height: "36px", padding: "0px" }}
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <div className="header-profile position-relative p-0">
                                        <img src={profileImg ? profileImg : profile_pic} alt="" width="100%" height="100%" className="" style={{ cursor: "pointer", objectFit: 'cover' }} />
                                        {/* {
                  showMenu && <NavbarModel show={showMenu} onHide={() => setShowMenu(false)} />
                } */}
                                    </div>
                                    {/* <img src={profileImg ? profileImg : profile_pic} alt="" width="100%" height="100%" className="" style={{ cursor: "pointer", objectFit: 'cover' }} /> */}
                                </Button>

                                <Menu
                                    className='navBar-model'
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={gotoDashboard}>
                                        <div className={'navbar-body'} >
                                            <img src={deshbord} className={"d-block"} alt="" />
                                            <Nav.Link onClick={() => { }}>Dashboard</Nav.Link>
                                        </div>
                                    </MenuItem>
                                    <MenuItem onClick={gotoProfile}>Profile</MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </Menu>
                            </>
                        </div>
                    </Container>
                </Navbar>
            </div>

            {
                showNotifications && <NotificationsModel show={showNotifications} onHide={() => setShowNotifications(false)} />
            }

            {
                chooseLanguage && <ChooseLanguage show={chooseLanguage} onHide={() => setChooseLanguage(false)} />
            }
            <div className="blue-navbar">
                <Navbar bg="" expand={false} fixed="top" style={{ height: "90px" }}>
                    <Container fluid>
                        <div>
                            <Navbar.Toggle aria-controls="offcanvasNavbar" />
                            <img src="../../assets/img/Logo_white.png" onClick={() => navigate('/partner/dashboard')} alt="" width="40px" className="ms-3 cursor-pointer" />
                        </div>
                        {/* <div className='profile-content gap-2 pt-0'>
              <img src={profile_pic} alt="" className='profile-img' />
              <div className='profile-name'>
                <h1>Priyanka Kadam</h1>
                <p>priyanka.kadam@gmail.com</p>
              </div>
              <img src={Profile_arrow} alt="" />
            </div> */}
                        {/* <button className='d-flex gap-5' onClick={() => setShowMenu(!showMenu)} onBlur={() => setShowMenu(false)}>
                            <div className="header-profile position-relative" >
                                <img src={profile_pic} alt="" width="100%" height="100%" className="" style={{ cursor: "pointer" }} />
                                {
                                    showMenu && <NavbarModel show={showMenu} onHide={() => setShowMenu(false)} />
                                }
                            </div>
                        </button> */}
                        <>
                            <Button
                                className="header-profile position-relative p-0"
                                style={{ position: "relative", background: "transparent", width: "36px", height: "36px", padding: "0px" }}
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <div className="header-profile position-relative p-0">
                                    <img src={profileImg ? profileImg : profile_pic} alt="" width="100%" height="100%" className="" style={{ cursor: "pointer", objectFit: 'cover' }} />
                                    {/* {
                  showMenu && <NavbarModel show={showMenu} onHide={() => setShowMenu(false)} />
                } */}
                                </div>
                                {/* <img src={profileImg ? profileImg : profile_pic} alt="" width="100%" height="100%" className="" style={{ cursor: "pointer", objectFit: 'cover' }} /> */}
                            </Button>

                            <Menu
                                className='navBar-model'
                                id="fade-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={gotoDashboard}>
                                    <div className={'navbar-body'} >
                                        <img src={deshbord} className={"d-block"} alt="" />
                                        <Nav.Link onClick={() => { }}>Dashboard</Nav.Link>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={gotoProfile}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </>
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="start"
                        >
                            <Offcanvas.Header className="px-0">
                                <Offcanvas.Title id="offcanvasNavbarLabel">
                                    <Offcanvas.Title id="offcanvasNavbarLabel">
                                        <img src="../../assets/img/Logo_white.png" onClick={() => navigate('/partner/dashboard')} className="cursor-pointer" alt="" width="100px" />
                                    </Offcanvas.Title>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="px-0">
                                <Nav>
                                    <div style={{ width: "100%" }}>
                                        {
                                            navbardata.map((item) => (
                                                <div className='sidebar-nav-body'>
                                                    <img src={`${IsActive(item.path) ? item.img_active : item.img}`} className={item.img ? "d-block" : "d-none"} alt="" />
                                                    <NavLink to={`/employer${item.path}`} className={`${IsActive(item.path) ? 'active' : 'disable'}`}>{item.text}</NavLink>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header