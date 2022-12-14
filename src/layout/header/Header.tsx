import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSlack } from 'react-icons/fa';
import Loginmodal from "../../components/modals/Loginmodal";
import CreateAccountmodal from "../../components/modals/CreateAccountmodal";
import { BiChevronDown } from "react-icons/bi";
import NavbarModel from "../../components/modals/NavbarModel";
import ChooseLanguage from "../../components/modals/ChooseLanguage";
import ForgotPasswordModal from "../../components/modals/ForgotPasswordModal";
import ForgotPasswordSuccesModel from "../../components/modals/ForgotPasswordSuccesModel";
import AuthStorage from "../../helper/AuthStorage";
import { useDispatch, useSelector } from 'react-redux'
import { ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData";
import STORAGEKEY from "../../config/APP/app.config";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import RegisterYourAccount from "../../components/modals/RegisterYourAccount";
import ChangePasswordModal from "../../components/modals/ChangePassword";
import { Button } from "react-bootstrap";
import { Fade, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { IsProfileImage } from "../../redux/actions/isLoginAction";
interface langdata {
  name: string,
  id: string
}
const Header = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get("page")
  const token = queryParams.get("token")

  const loginData = useSelector((state: any) => state.login.loginData)
  const profileImageURL = useSelector((state: any) => state.isProfile.isProfileImage)

  const getUserData = useSelector((state: any) => state.login.getUserData)



  const [scroll, setScroll] = useState(0);
  const [hideShowHeader, setHideShowHeader] = useState(false);
  const [loginModal, setLoginModal] = useState(false)
  const [chooseLanguage, setChooseLanguage] = useState(false)
  const [createAccountmodal, setCreateAccountmodal] = useState(false)
  const [registermodal, setRegistermodal] = useState(false)
  const [selectorVal, setSelectorVal] = useState("Swayam Connect");
  const [showOpt, setShowOpt] = useState(false);
  const [navBar, setNavBar] = useState(false)
  const [forgotValue, setForgotValue] = useState<string>('')
  const [changePassTog, setChangePassTog] = useState(false)
  const [getStart, setGetStart] = useState(false)

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>();
  const [langdata, setLangdata] = useState<langdata[]>([])
  const [profileImg, setProfileImg] = useState<string | null>()

  window.addEventListener("scroll", () => {
    setScroll(window.pageYOffset);
  });

  useEffect(() => {
    setProfileImg(AuthStorage.getStorageData(STORAGEKEY.profileImg))
  }, [AuthStorage.getStorageData(STORAGEKEY.profileImg)])

  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
  const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState(false)
  const isLoginData = useSelector((state: any) => state.isLogin.isLoggedIn)

  useEffect(() => {
    if (page === "changePassword" && token) {
      setChangePassTog(true)
    }
  }, [page, token])

  const logginPopup = (item: any) => {
    if (item === "ForgotPass") {
      setLoginModal(false)
      setForgotPasswordModal(true);
    } else if (item === "register") {
      setLoginModal(false)
      setRegistermodal(true);
    } else {
      setLoginModal(false)
    }
  }

  const registerYourAccount = (item: any) => {
    console.log('=====👍', item)
    if (item === 'login') {
      setRegistermodal(false)
      setLoginModal(true)
    } else {
      console.log('====👍')
      setRegistermodal(false)
    }
  }

  const forgotPopup = (item: any) => {
    if (item === "continue") {
      setForgotPasswordModal(false)
      setForgotPasswordSuccesModel(true);
      setTimeout(() => {
        setForgotPasswordSuccesModel(false);
        setChangePassTog(true)
      }, 5000);
    } else if (item === "register") {
      setLoginModal(false)
      setRegistermodal(true);
      setForgotPasswordModal(false)
    } else {
      setForgotPasswordModal(false)
    }
  }

  const setLang = (id: any) => {
    AuthStorage.setStorageData(STORAGEKEY.language, id, true);
    ApiGetNoAuth(`language/getLanguage`).then((res: any) => {
      if (res?.data?.length) {
        let selected = res.data.find((ele: any) => ele.id === id).name.slice(0, 2).toLowerCase()
        AuthStorage.setStorageData(STORAGEKEY.lang, selected, true);
        i18next.changeLanguage(selected)
      }
    })
  }

  const links = [
    {
      name: t("Header.Jobs"),
      path: "/jobs",
    },
    {
      name: t("Header.Schemes"),
      path: "/schemes",
    },
    {
      name: t("Header.Learn"),
      path: "/learn",
    },
  ];

  const selectorList = [
    {
      list: t("Header.Learn"),
    },
    {
      list: t("Header.Jobs"),
    },
    {
      list: t("Header.Schemes"),
    },
  ];

  useEffect(() => {
    ApiGetNoAuth(`language/getLanguage`).then((res: any) => {
      if (res?.data?.length) {
        setLangdata(res.data.filter((item: any) => item.name === "English" || item.name === "Hindi" || item.name === "marathi"))
      }
    })
  }, [])

  useEffect(() => {
    setSelectedLanguage(AuthStorage.getStorageData(STORAGEKEY.language ?? ''))
    handleClose()
  }, [])

  useEffect(() => {
    if (loginData?.status === 200 && getStart) {
      navigate("/get_started")
    }
  }, [loginData])

  const hadnalGetStart = () => {
    if (AuthStorage.getStorageData(STORAGEKEY.token)) {
      navigate("/get_started")
    } else if (!AuthStorage.getStorageData(STORAGEKEY.userId)) {
      setLoginModal(true)
    }
    setGetStart(true)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
    navigate('/myprofile')
    handleClose()
  }

  const [userType, setUserType] = useState<any>()
  useEffect(() => {
    setUserType(AuthStorage.getStorageData(STORAGEKEY.userType)?.toLowerCase())
  }, [AuthStorage.getStorageData(STORAGEKEY.userType)])

  return (
    <>
      <div className="white-navbar">
        <div className={`header ${hideShowHeader && "bg-white"} `}>
          <div className={`${hideShowHeader || scroll > 10 ? "toggler" : "toggler-white"}`} onClick={() => setHideShowHeader(!hideShowHeader)}>
            <FaBars />
          </div>
          <Container className="container-header">
            <nav className={`${scroll > 10 ? "nav-sticky" : ""} ${hideShowHeader && "bg-white"} px-2 `}>
              <Link to={"/"}>
                <img src="./assets/img/Header_Logo.png" alt="" />
              </Link>
              <div className={`header-links ${hideShowHeader ? "show-header" : "hide-header"} "`}>
                <button onClick={hadnalGetStart}>{t("Header.get_started")}</button>
                <ul>
                  {links.map((item, index) => (
                    <li key={index}>
                      <Link
                        className={`${(scroll > 10 || hideShowHeader) && "textcolorblue"}`}
                        to={item.path}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={`${(scroll > 10 || hideShowHeader) && "textcolorblue"} language`}>
                  <img src={`./assets/img/${scroll > 10 || hideShowHeader ? "language-blue" : "language"}.png`} alt="language" onClick={() => setChooseLanguage(true)} />{t("Header.lanFlag")}
                </div>
                {/* { location.pathname === "/about" &&
                      <div className={`${(scroll > 10 || hideShowHeader) && "textcolorblue"} language`}>
                        <img src={`./assets/img/${scroll > 10 || hideShowHeader ? "language-blue" : "language"}.png`} alt="language" onClick={() => setChooseLanguage(true)} />{t("Header.lanFlag")}
                      </div>
                    } */}
                <button className="user p-0" style={{ background: "transparent" }} onClick={() => setGetStart(false)}>
                  {AuthStorage.getToken() && isLoginData ?
                    // <button style={{ position: "relative", background: "transparent", width: "36px", height: "36px", padding: "0px" }} onClick={() => setNavBar(!navBar)}>
                    //   <img src={profileImg && profileImg !== "null" && profileImg !== "undefined" ? profileImg : `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} id="myProfile" alt="user" style={{ cursor: "pointer", objectFit: 'cover' }}
                    //     onError={({ currentTarget }) => {
                    //       currentTarget.onerror = null;
                    //       currentTarget.src = `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`
                    //     }}
                    //   />
                    //   {navBar && <NavbarModel show={navBar} onHide={() => setNavBar(false)} />}
                    // </button>
                    <>
                      <Button
                        style={{ position: "relative", background: "transparent", width: "36px", height: "36px", padding: "0px" }}
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e) => handleClick(e)}
                      >
                        <img src={profileImg && profileImg !== "null" && profileImg !== "undefined" ? profileImg : `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} id="myProfile" alt="user" style={{ cursor: "pointer", objectFit: 'cover' }}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`
                          }}
                        />
                      </Button>

                      {open && <Menu
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

                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={gotoProfile}>Profile</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </Menu>}
                    </>
                    :
                    <img src={`./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} alt="user" style={{ cursor: "pointer" }} onClick={() => { setLoginModal(true) }} />
                  }
                </button>
              </div>
            </nav>
          </Container>

          {
            chooseLanguage && <ChooseLanguage show={chooseLanguage} onHide={() => setChooseLanguage(false)} />
          }
          {
            loginModal && <Loginmodal show={loginModal} onHide={(item: any) => logginPopup(item)} getStart={getStart} />
          }
          {
            forgotPasswordModal && <ForgotPasswordModal show={forgotPasswordModal} onHide={(item: any) => forgotPopup(item)} emailValue={setForgotValue} />
            // forgotPasswordModal && <ForgotPasswordModal show={forgotPasswordModal} onHide={(item: any) => {item === "continue" ? continuePopup() : setForgotPasswordModal(false); item === "register" ? registermodals() : setForgotPasswordModal(false) ; item === "login" ? loginmodals() : setForgotPasswordModal(false)}} />
          }
          {
            forgotPasswordSuccesModel && <ForgotPasswordSuccesModel show={forgotPasswordSuccesModel} onHide={() => setForgotPasswordSuccesModel(false)} forgotValue={forgotValue} />
          }
          {
            changePassTog && <ChangePasswordModal show={changePassTog} onHide={() => setChangePassTog(false)} token={token} forgotEmail={forgotValue} />
          }
          {
            createAccountmodal && <CreateAccountmodal show={createAccountmodal} onHide={() => setCreateAccountmodal(false)} />
          }
          {
            // registermodal && <RegisterYourAccount show={registermodal} onHide={() => setRegistermodal(false)} />
            registermodal && <RegisterYourAccount show={registermodal} onHide={(item: any) => { registerYourAccount(item) }} />
          }


        </div>
      </div>
      <div className="blue-navbar">
        <Navbar bg="" expand={false} fixed="top">
          <Container fluid>
            <div>
              <Navbar.Toggle aria-controls="offcanvasNavbar" />
              <Link to={"/"}>
                <img src="./assets/img/Logo_white.png" alt="" width="40px" className="ms-3" />
              </Link>
            </div>
            <div className="responsive-header-profile-pic">
              <img src="./assets/img/add-menu.png" alt="" width="30px" />
              <button className="user p-0" style={{ background: "transparent", marginLeft: '10px', border: 'none' }} onClick={() => setGetStart(false)}>
                {AuthStorage.getStorageData(STORAGEKEY.token) ?
                  // <img src={profileImg !== null && profileImg !== "null" && profileImg !== "undefined" ? profileImg : `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} alt="user" width="30px" className="ms-3" style={{ cursor: "pointer" }} onClick={() => { setNavBar(!navBar) }}
                  //   onError={({ currentTarget }) => {
                  //     currentTarget.onerror = null;
                  //     currentTarget.src = './assets/img/user.png'
                  //   }}
                  // />
                  <>
                    <Button
                      style={{ position: "relative", background: "transparent", width: "36px", height: "36px", padding: "0px", border: 'none' }}
                      id="fade-button"
                      aria-controls={open ? 'fade-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(e) => handleClick(e)}
                    >
                      <img src={profileImg !== null && profileImg !== "null" && profileImg !== "undefined" ? profileImg : `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} alt="user" className="" style={{ cursor: "pointer", objectFit: 'cover' }}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = './assets/img/user.png'
                        }}
                      />
                    </Button>

                    {open && <Menu
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

                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={gotoProfile}>Profile</MenuItem>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>}
                  </>
                  :
                  <img src="./assets/img/user.png" alt="user" width="30px" onClick={() => { setLoginModal(true) }} />
                }
              </button>
            </div>
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
            >
              <Offcanvas.Header className="px-0">
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  <Link to={"/"}>
                    {/* <img src="./assets/img/Header_Logo.png" alt="" /> */}
                    <img src="./assets/img/Logo_white.png" alt="" width="100px" />
                  </Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="px-0">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">{t("Header.home")}</Nav.Link>
                  <Nav.Link href="/jobs">{t("Header.Jobs")}</Nav.Link>
                  <Nav.Link href="/schemes">{t("Header.Schemes")}</Nav.Link>
                  <Nav.Link href="/learn">{t("Header.Learn")}</Nav.Link>
                  <div className="slector-search-inner">
                    <div className="selector" onClick={() => setShowOpt(!showOpt)}>
                      <p>{selectorVal === "Swayam Connect" ? t('Header.swayamConnect') : selectorVal}</p>
                      <div className={showOpt ? "uparrow" : "downarrow"}>
                        <BiChevronDown />
                      </div>
                      {showOpt && <div className="selector-option">
                        <ul>
                          {selectorList.map((item) => (
                            <li key={item.list} onClick={() => setSelectorVal(t(`${item.list}`))}>
                              {item.list}
                            </li>
                          ))}
                        </ul>
                      </div>}
                    </div>
                  </div>
                </Nav>
              </Offcanvas.Body>
              <Offcanvas.Body className="px-0">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <img src="./assets/img/language.png" alt="" width="30px" />
                  {
                    langdata && langdata.map((item: any) =>
                      <Nav.Link key={item.id} onClick={() => setLang(item.id)}>{t(`Header.${item.name}`)}</Nav.Link>
                    )
                  }
                </Nav>
              </Offcanvas.Body>
              <Offcanvas.Body className="px-0  border-0">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>{t("Header.downloadOurApp")}</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
