
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Container, Navbar } from 'react-bootstrap';
import deshbord from '../../assets/img/deshbord.png'
import Schems from '../../assets/img/Schems.png'
import Courses from '../../assets/img/Courses.png'
import ChangePassword from '../../assets/img/Change-password.png'
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { log } from 'console';
import { useDispatch } from 'react-redux';
import { IsProfileImage } from '../../redux/actions/isLoginAction';

interface Props {
  onHide: () => void;
  show?: boolean;
}

const NavbarModel: React.FC<Props> = ({ show, onHide }) => {
  const [userType, setUserType] = useState<any>()
  useEffect(() => {
    setUserType(AuthStorage.getStorageData(STORAGEKEY.userType)?.toLowerCase())
  }, [AuthStorage.getStorageData(STORAGEKEY.userType)])

  const { t } = useTranslation()

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showItem, setShowItem] = useState('')

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
    toast.success("Logout successfully");
    // AuthStorage.deauthenticateUser()
    // AuthStorage.setStorageData(STORAGEKEY.language, "")
    onHide();
    dispatch(IsProfileImage(''))
  }

  const showSubItem = (item: any) => {
    const { text, path } = item
    if (text === "Jobs") {
      if (text !== showItem) {
        setShowItem(text)
      } else {
        setShowItem('')
      }
    } else {
      navigate(`/${path}`)
    }
  }

  const navbardata = [
    {
      img: deshbord,
      text: t("Navbar.dashboard"),
      path: (userType === "user" ? "/" : userType === "employer" ? "employer/dashboard" : userType === "partner" ? "partner/dashboard" : "")
    }
    // {
    //   img: "",
    //   text: t("Navbar.jobs"),
    //   path: "jobs",
    //   subItem: [
    //     {
    //       img: "",
    //       text: t("Navbar.activate"),
    //       path: ""
    //     },
    //     {
    //       img: "",
    //       text: t("Navbar.saved"),
    //       path: ""
    //     },
    //   ]
    // },
    // {
    //   img: Schems,
    //   text: t("Navbar.schems"),
    //   path: "schemes"
    // },
    // {
    //   img: Courses,
    //   text: t("Navbar.courses"),
    //   path: "learn"
    // },
    // {
    //   img: "",
    //   text: t("Navbar.downloadCourses"),
    //   path: ""
    // },
    // {
    //   img: ChangePassword,
    //   text: t("Navbar.changePassword"),
    //   path: ""
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

  return (
    <>
      <div className="p-3 navBar-model text-start">
        <Navbar>
          {userType !== "user" ?
            <div style={{ width: "100%" }}>
              {navbardata.map((item, i) => (
                <div className={`${item.text === "Jobs" ? "d-block navbar-body" : 'navbar-body'}`} key={i}>
                  <img src={item.img} className={item.img ? "d-block" : "d-none"} alt="" />
                  <Nav.Link onClick={() => showSubItem({ text: item.text, path: item.path })}>{item.text}</Nav.Link>
                </div>
              ))
              }
            </div> : ""
          }
        </Navbar>
        <Link to={userType === "user" ? "myprofile" : userType === "employer" ? "employer/myprofile" : userType === "partner" ? "partner/myprofile" : ""}><p className='mt-3'>{t("Navbar.myProfile")}</p></Link>
        {/* <p>{t("Navbar.support")}</p> */}
        <p onClick={logout}>{t("Navbar.logout")}</p>
      </div>
    </>
  )
}

export default NavbarModel
