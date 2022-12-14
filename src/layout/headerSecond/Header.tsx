import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import Loginmodal from "../../components/modals/Loginmodal";
import CreateAccountmodal from "../../components/modals/CreateAccountmodal";
import { BiChevronDown } from "react-icons/bi";
import NavbarModel from "../../components/modals/NavbarModel";
import ChooseLanguage from "../../components/modals/ChooseLanguage";
import AuthStorage from "../../helper/AuthStorage";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import STORAGEKEY from "../../config/APP/app.config";
import i18next from "i18next";
import { ApiGet, ApiGetNoAuth } from "../../helper/API/ApiData";
import RegisterYourAccount from "../../components/modals/RegisterYourAccount";
import ChangePasswordModal from "../../components/modals/ChangePassword";
import ForgotPasswordSuccesModel from "../../components/modals/ForgotPasswordSuccesModel";
import ForgotPasswordModal from "../../components/modals/ForgotPasswordModal";
import { Fade, Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import { IsProfileImage } from "../../redux/actions/isLoginAction";
interface langdata {
    name: string,
    id: string
}

const Header = () => {

    const { t } = useTranslation()
    const location = useLocation()
    const dispatch = useDispatch()
    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get("page")
    const token = queryParams.get("token")

    const loginData = useSelector((state: any) => state.login.loginData)
    const profileImageURL = useSelector((state: any) => state.isProfile.isProfileImage)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [scroll, setScroll] = useState(0);
    const [hideShowHeader, setHideShowHeader] = useState<boolean>(false);
    const [loginModal, setLoginModal] = useState<boolean>(false)
    const [chooseLanguage, setChooseLanguage] = useState<boolean>(false)
    const [createAccountmodal, setCreateAccountmodal] = useState<boolean>(false)
    const [selectorVal, setSelectorVal] = useState("Swayam Connect");
    const [showOpt, setShowOpt] = useState<boolean>(false);
    const [navBar, setNavBar] = useState<boolean>(false)
    const [langdata, setLangdata] = useState<langdata[]>([])
    const [registermodal, setRegistermodal] = useState<boolean>(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false)
    const [changePassTog, setChangePassTog] = useState<boolean>(false)
    const [forgotPasswordSuccesModel, setForgotPasswordSuccesModel] = useState<boolean>(false)
    const [forgotValue, setForgotValue] = useState<string>('')
    const [getStart, setGetStart] = useState(false)
    const [profileImg, setProfileImg] = useState<any>()
    const isLoginData = useSelector((state: any) => state.isLogin.isLoggedIn)
    const navigate = useNavigate()


    useEffect(() => {
        if (profileImageURL) {
            setProfileImg(profileImageURL)
        } else {
            setProfileImg(AuthStorage.getStorageData(STORAGEKEY.profileImg))
        }
    }, [profileImageURL])


    useEffect(() => {
        ApiGetNoAuth(`language/getLanguage`).then((res: any) => {
            if (res?.data?.length) {
                setLangdata(res.data.filter((item: any) => item.name === "English" || item.name === "Hindi" || item.name === "marathi"))
            }
        })
    }, [])

    const goToHome = () => {
        navigate("/")
    }

    window.addEventListener("scroll", () => {
        setScroll(window.pageYOffset);
    });
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

    const setLang = (id: any) => {
        AuthStorage.setStorageData(STORAGEKEY.language, id, true);
        ApiGetNoAuth(`language/getLanguage`).then((res: any) => {
            if (res?.data?.length) {
                let selected = res.data.find((ele: any) => ele.id === id).name.slice(0, 2).toLowerCase()
                AuthStorage.setStorageData(STORAGEKEY.lang, selected, true);
                i18next.changeLanguage(selected)
                // navigate(-1)
            }
        })
    }


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

    return (
        <>
            <div className="white-navbar">
                <div className="header bg-white">
                    <div className="toggler" onClick={() => setHideShowHeader(!hideShowHeader)}>
                        <FaBars />
                    </div>
                    <nav className="nav-sticky-header-sec bg-white px-2">
                        <Container className="d-flex justify-content-between">
                            <img src="./assets/img/Header_Logo.png" alt="" onClick={goToHome} className="cursor-pointer" />
                            <div className="header-links show-header me-5">
                                {/* <button onClick={() => { setCreateAccountmodal(true) }}>Get Started</button> */}
                                <button onClick={hadnalGetStart}>{t("Header.get_started")}</button>
                                <ul>
                                    {links.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                className="textcolorblue"
                                                to={item.path}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className="textcolorblue" onClick={() => setChooseLanguage(true)}>
                                    <img src="./assets/img/language-blue.png" alt="language" />{t("Header.lanFlag")}
                                </div>
                                <div className="user">
                                    {AuthStorage.getToken() ?
                                        // <img src={profileImg !== null ? profileImg : `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} alt="user" style={{ cursor: "pointer" }} onClick={() => { setNavBar(!navBar) }}
                                        // <img src={profileImg && profileImg !== "null" && profileImg !== "undefined" && profileImg !== "undefined" ? profileImg : './assets/img/user-blue.png'} alt="user" style={{ cursor: "pointer" }} onClick={() => { setNavBar(!navBar) }}
                                        //     onError={({ currentTarget }) => {
                                        //         currentTarget.onerror = null;
                                        //         currentTarget.src = './assets/img/user-blue.png'
                                        //     }} />
                                        <>
                                            <Button
                                                style={{ position: "relative", background: "transparent", width: "36px", height: "36px", padding: "0px" }}
                                                id="fade-button"
                                                aria-controls={open ? 'fade-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <img src={profileImg && profileImg !== "null" && profileImg !== "undefined" ? profileImg : `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} id="myProfile" alt="user" style={{ cursor: "pointer", objectFit: 'cover' }}
                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`
                                                    }}
                                                />
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

                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                            >
                                                <MenuItem onClick={gotoProfile}>Profile</MenuItem>
                                                <MenuItem onClick={logout}>Logout</MenuItem>
                                            </Menu>
                                        </>
                                        :
                                        <img src="./assets/img/user-blue.png" alt="user" onClick={() => { setLoginModal(true) }} />
                                    }
                                </div>
                            </div>
                        </Container>
                    </nav>
                    {/* </Container> */}

                    {
                        chooseLanguage && <ChooseLanguage show={chooseLanguage} onHide={() => setChooseLanguage(false)} />
                    }
                    {
                        loginModal && <Loginmodal show={loginModal} onHide={(item: any) => logginPopup(item)} getStart={getStart} />
                    }
                    {
                        forgotPasswordModal && <ForgotPasswordModal show={forgotPasswordModal} onHide={(item: any) => forgotPopup(item)} emailValue={setForgotValue} />
                    }
                    {
                        forgotPasswordSuccesModel && <ForgotPasswordSuccesModel show={forgotPasswordSuccesModel} onHide={() => setForgotPasswordSuccesModel(false)} forgotValue={forgotValue} />
                    }
                    {
                        changePassTog && <ChangePasswordModal show={changePassTog} onHide={() => setChangePassTog(false)} forgotEmail={forgotValue} />
                    }
                    {
                        createAccountmodal && <CreateAccountmodal show={createAccountmodal} onHide={() => setCreateAccountmodal(false)} />
                    }
                    {
                        registermodal && <RegisterYourAccount show={registermodal} onHide={(item: any) => { registerYourAccount(item), console.log("====") }} />
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
                            {/* <img src="./assets/img/Logo_white.png" onClick={goToHome} alt="" width="40px" className="ms-3 cursor-pointer" /> */}
                        </div>
                        <div className="responsive-header-profile-pic">
                            <img src="./assets/img/add-menu.png" alt="" width="30px" />
                            {/* <img src="./assets/img/user.png" alt="" width="30px" className="ms-3" style={{ cursor: "pointer" }} onClick={() => { setNavBar(!navBar) }} /> */}
                            <button className="user p-0" style={{ background: "transparent", marginLeft: '10px', border: 'none' }} onClick={() => setGetStart(false)}>
                                <>
                                    <Button
                                        style={{ position: "relative", background: "transparent", width: "36px", height: "36px", padding: "0px", border: 'none' }}
                                        id="fade-button"
                                        aria-controls={open ? 'fade-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <img src={profileImg !== null && profileImg !== "null" && profileImg !== "undefined" ? profileImg : `./assets/img/${scroll > 10 || hideShowHeader ? "user-blue" : "user"}.png`} alt="user" className="" style={{ cursor: "pointer", objectFit: 'cover' }}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = './assets/img/user.png'
                                            }}
                                        />
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

                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={gotoProfile}>Profile</MenuItem>
                                        <MenuItem onClick={logout}>Logout</MenuItem>
                                    </Menu>
                                </>
                            </button>
                        </div>
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="start"
                        >
                            <Offcanvas.Header className="px-0">
                                <Offcanvas.Title id="offcanvasNavbarLabel">
                                    <img src="./assets/img/Logo_white.png" onClick={goToHome} className="cursor-pointer" alt="" width="100px" />
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
                                                        <li key={item.list} onClick={() => setSelectorVal(item.list)}>
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

            {navBar && <NavbarModel show={navBar} onHide={() => setNavBar(false)} />}
        </>
    )
}

export default Header