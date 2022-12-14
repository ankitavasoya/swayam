import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { GrFacebookOption, GrTwitter, GrLinkedinOption } from 'react-icons/gr';
import { RiInstagramFill } from 'react-icons/ri';
import { useTranslation } from "react-i18next";
import FooterLogo from '../../assets/img/Logo_white.png'
import { useDispatch, useSelector } from "react-redux";
import { PrivancypolicyAction } from "../../redux/actions/PrivacypolicyAction";
import AuthStorage from "../../helper/AuthStorage";
import STORAGEKEY from "../../config/APP/app.config";
import { getContactUs } from "../../redux/actions/ContactUs";

const Footer = () => {

  const { t } = useTranslation()
  const dispatch = useDispatch()

  const getGeneralData = useSelector((state: any) => state.privacy.getGeneralData)
  const contactUsData = useSelector((state: any) => state.contactUs.contactUsData)

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.language)) {
      dispatch(PrivancypolicyAction((AuthStorage.getStorageData(STORAGEKEY.language))))
    }
  }, [AuthStorage.getStorageData(STORAGEKEY.language)])

  useEffect(() => {
    if (AuthStorage.getStorageData(STORAGEKEY.language)) {
      dispatch(getContactUs(AuthStorage.getStorageData(STORAGEKEY.language)))
    }
  }, [AuthStorage.getStorageData(STORAGEKEY.language)])

  const redirecthyperLink = (link: string) => {
    let doc = document;
    let a = doc.createElement("a");
    a.href = link;
    a.target = '_blank';
    a.click();
  }
  return (
    <>
      <div className="footer">
        <Container>
          <Row className="align-items-center">
            <Col lg="4" md="4">
              <div className="footer-logo">
                <Link to={"/"}>
                  <img src={FooterLogo} alt="logo" />
                </Link>
                {/* <Link to="/contact">
                  <div className="contact-text mt-3">
                    <img src="./assets/img/Contact.svg" alt="contsct" />
                    <span>{t("Footer.contactUs")}</span>
                  </div>
                </Link> */}
              </div>
            </Col>
            <Col lg="8" md="8">
              <Row>
                <Col lg="4" md="4">
                  <div className="links">
                    <p style={{ width: '70%' }}>{t("Footer.swayamConnect.title")}</p>
                    <ul>
                      <li>
                        <Link to="/about">{t("Footer.swayamConnect.aboutUs")}</Link>
                      </li>
                      {/* <li>
                        <Link to="/careers">{t("Footer.swayamConnect.careers")}</Link>
                      </li> */}
                      <li>
                        <Link to="/testimonials">{t("Footer.swayamConnect.testimonials")}</Link>
                      </li>
                      <li>
                        <Link to="/viewAllNews">{t("Footer.swayamConnect.press")}</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg="4" md="4">
                  <div className="links">
                    <p style={{ width: '70%' }}>{t("Footer.quickLinks.title")}</p>
                    <ul>
                      <li>
                        <Link to="/jobs">{t("Footer.quickLinks.jobs")}</Link>
                      </li>
                      <li>
                        <Link to="/learn">Learn</Link>
                      </li>
                      <li>
                        <Link to="/schemes">{t("Footer.quickLinks.govSchemes")}</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg="4" md="4">
                  <div className="links">
                    <p style={{ width: '70%' }}>{t("Footer.help.title")}</p>
                    <ul>
                      <li>
                        <Link to="/contact">{t("Footer.help.contactUs")}</Link>
                      </li>
                      <li>
                        <Link to="/faqs">{t("Footer.help.freAskQues")}</Link>
                      </li>
                      {/* <li>
                        <Link to="/#">{t("Footer.help.regLocator")}</Link>
                      </li> */}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="footer-download d-flex gap-3 align-items-center">
              <p>{t("Footer.downOurApp")}</p>
              <div className="appstore">
                {/* <figure>
                  <img src="./assets/img/Appstore.png" alt="appstore" />
                </figure> */}
                <figure>
                  <img src="./assets/img/Playstore.png" alt="Playstore" onClick={() => redirecthyperLink(getGeneralData.data.appLink)} />
                </figure>
              </div>
            </div>
            <div className="contact-with-social">
              <span>{t("Footer.connectWith")} : </span>
              <Link to={"/#"} onClick={() => redirecthyperLink(contactUsData?.data?.facebookLink)}> <GrFacebookOption /> </Link>
              <Link to={"/#"} onClick={() => redirecthyperLink(contactUsData?.data?.twitterLink)}> <GrTwitter /> </Link>
              <Link to={"/#"} onClick={() => redirecthyperLink(contactUsData?.data?.linkedinLink)}> <GrLinkedinOption /> </Link>
              <Link to={"/#"} onClick={() => redirecthyperLink(contactUsData?.data?.instagramLink)}> <RiInstagramFill /> </Link>
            </div>
          </div>
        </Container>
        <div className="copyright">
          <Container>
            <div className="copyright-text">
              {/* <p>{t("Footer.copyright")}</p> */}
              <p>{getGeneralData?.data?.copyRight}</p>
              <div className="privacy-policy">
                {/* <button onClick={() => privacyClick()}>{t("Footer.privacy")}</button> */}
                <Link to={"/privacypolicy"}>{t("Footer.privacy")}</Link>
                <Link to={"/termsandconditions"}>{t("Footer.termAndCond")}</Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Footer;
