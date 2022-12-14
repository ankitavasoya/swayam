import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import STORAGEKEY from '../../config/APP/app.config'
import AuthStorage from '../../helper/AuthStorage'
import { PrivancypolicyAction } from '../../redux/actions/PrivacypolicyAction'
import ReactHtmlParser from 'react-html-parser'

const TermsAndConditions = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getGeneralData = useSelector((state: any) => state.privacy.getGeneralData)

    useEffect(() => {
        dispatch(PrivancypolicyAction(AuthStorage.getStorageData(STORAGEKEY.language)))
    }, [AuthStorage.getStorageData(STORAGEKEY.language)])

    return (
        <>
            <div className="termsandconditions_bg">
            </div>
            <Container>
            <div className="breadcrums">
                <button onClick={() => navigate("/")}>Home</button> <p>{`>`}</p> <button>Terms and conditions</button>
            </div>
                <div className="termsandconditions_content">
                    <h1 className='title mb-3'>Terms and conditions</h1>
                    <div className="card">
                        <h5 className=''>Please read the following terms and conditions carefully</h5>
                        <div className="detail mb-2">
                            <h5>GENERAL TERMS & CONDITIONS</h5>
                            <p>
                                {ReactHtmlParser(getGeneralData?.data?.termsAndConditions)}
                            </p>
                            {/* <p>
                                This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of www.swayamconnect.org (for example) Website and/or Mobile App. The hypothetical domain name www.swayamconnect.org (hereinafter referred to as “Website”) is owned by RPG Foundation (RPGF) a registered Public Charitable Trust under the Bombay Public Trust, 1950. Foundation social intervention is majorly funded by CSR fund of RPG Group of companies. Your use of the Website and/or Mobile App (hereinafter only “Website”) and services and tools are governed by the following terms and conditions ("Terms of Use") as applicable to the Website including the applicable policies which are incorporated herein by way of reference. By accessing the Website, you agree to be bound by these Terms, so please read these Terms carefully before continuing to use this Website. If you do NOT agree with any of these Terms, please do not use this Site. These Terms constitute a legally binding agreement (“Agreement”) between you and the RPG Foundation (“Company” or “Swayam Connect”) regarding your use of the Website i.e., www.swayamconnect.org. You also acknowledge and agree that we may modify this Agreement at any time, at our sole discretion; that all modifications to this Agreement will be effective immediately upon our posting of the modifications on this Website; and that you will review this Agreement each time you access this site, so that you are aware of and agree to any and all modifications made to this Agreement. Your use of the Website after any amendment to the Terms of Use shall constitute your acceptance of these terms and you also agree to be bound by any such changes/revisions. You also acknowledge and agree that, unless we specifically provide otherwise, this Agreement only applies to this Website and our online activities, and does not apply to any of our offline activities. If you access the Website, you shall be subject to the policies that are applicable to the Website and/or Mobile App as on date. By mere use of the Website, You shall be contracting with RPG Foundation and these terms and conditions including the policies constitute your binding obligations, with www.swayamconnect.org
                                You hereby represent and warrant to the Company that you are at least eighteen (18) years of age or above and are capable of entering, performing and adhering to these Terms and that you agree to be bound by the following terms and conditions. While individuals under the age of 18 may utilize the benefits of the Website, they shall do so only with the involvement & guidance of their parents and / or legal guardians, under such Parent /Legal guardian's registered account.
                                For the purpose of these Terms of Use, wherever the context so requires "You" or "User" shall mean any natural or legal person who has agreed to become a user of the Website by providing Registration Data while registering on the Website as Registered User using the computer systems and/or mobile phones. The Website www.swayamconnect.org allows the Users to surf the Website and to gain information about various governmental schemes without registering on the Website. The term "We", "Us", "Our" shall mean RPG Foundation.</p> */}
                        </div>
                        {/* <div className="detail mb-2">
                            <h5>GENERAL CONTENTS</h5>
                            <ul>
                                <p>Government Schemes</p>
                                <li className='mt-3'>The Website presents a list of governmental schemes on its portal to be viewed and accessed by the public at large.</li>
                                <li className='mt-3'>The main aim of the Website is to provide information regarding the government schemes (sourced from government websites and other online sources) 	that would aid the underprivileged people to know more about each scheme in a much lucid manner. </li>
                                <li className='mt-3'>The algorithm of the Website helps in collecting all information about the running schemes or other government programs from the internet and other 	sources which would significantly benefit the people from all walks of life.</li>
                                <li className='mt-3'>The Website may contain details about the various schemes relating to monetary benefits and other pecuniary allowances and/or rebate for the beneficiary 	as notified by the government from time to time.	Demat Account details like beneficiary account no. etc.</li>
                                <p className='mt-3'>Online Training/ Skill Upgradation</p>
                                <li className='mt-3'>The Website presents a list of governmental schemes on its portal to be viewed and accessed by the public at large.</li>
                                <li className='mt-3'>The main aim of the Website is to provide information regarding the government schemes (sourced from government websites and other online sources) 	that would aid the underprivileged people to know more about each scheme in a much lucid manner. </li>
                                <li className='mt-3'>The algorithm of the Website helps in collecting all information about the running schemes or other government programs from the internet and other 	sources which would significantly benefit the people from all walks of life.</li>
                                <li className='mt-3'>The Website may contain details about the various schemes relating to monetary benefits and other pecuniary allowances and/or rebate for the beneficiary 	as notified by the government from time to time.	Demat Account details like beneficiary account no. etc.</li>
                                <p className='mt-3'>Job Portal</p>
                                <li className='mt-3'>The Website presents a list of governmental schemes on its portal to be viewed and accessed by the public at large.</li>
                                <li className='mt-3'>The main aim of the Website is to provide information regarding the government schemes (sourced from government websites and other online sources) 	that would aid the underprivileged people to know more about each scheme in a much lucid manner. </li>
                                <li className='mt-3'>The algorithm of the Website helps in collecting all information about the running schemes or other government programs from the internet and other 	sources which would significantly benefit the people from all walks of life.</li>
                                <li className='mt-3'>The Website may contain details about the various schemes relating to monetary benefits and other pecuniary allowances and/or rebate for the beneficiary 	as notified by the government from time to time.	Demat Account details like beneficiary account no. etc.</li>
                            </ul>
                        </div>
                        <div className="detail mb-2">
                            <h5>PERSONAL INFORMATION</h5>
                            <ul>
                                <li className='mt-3'>The Website presents a list of governmental schemes on its portal to be viewed and accessed by the public at large.</li>
                                <li className='mt-3'>The main aim of the Website is to provide information regarding the government schemes (sourced from government websites and other online sources) 	that would aid the underprivileged people to know more about each scheme in a much lucid manner. </li>
                                <li className='mt-3'>The algorithm of the Website helps in collecting all information about the running schemes or other government programs from the internet and other 	sources which would significantly benefit the people from all walks of life.</li>
                                <li className='mt-3'>The Website may contain details about the various schemes relating to monetary benefits and other pecuniary allowances and/or rebate for the beneficiary 	as notified by the government from time to time.	Demat Account details like beneficiary account no. etc.</li>
                                <p className='mt-3'>We collect and use personal information for the following purposes in order</p>
                                <li className='mt-3'>The Website presents a list of governmental schemes on its portal to be viewed and accessed by the public at large.</li>
                                <li className='mt-3'>The main aim of the Website is to provide information regarding the government schemes (sourced from government websites and other online sources) 	that would aid the underprivileged people to know more about each scheme in a much lucid manner. </li>
                                <li className='mt-3'>The algorithm of the Website helps in collecting all information about the running schemes or other government programs from the internet and other 	sources which would significantly benefit the people from all walks of life.</li>
                                <li className='mt-3'>The Website may contain details about the various schemes relating to monetary benefits and other pecuniary allowances and/or rebate for the beneficiary 	as notified by the government from time to time.	Demat Account details like beneficiary account no. etc.</li>
                                <li className='mt-3'>The Website presents a list of governmental schemes on its portal to be viewed and accessed by the public at large.</li>
                                <li className='mt-3'>The main aim of the Website is to provide information regarding the government schemes (sourced from government websites and other online sources) 	that would aid the underprivileged people to know more about each scheme in a much lucid manner. </li>
                                <li className='mt-3'>The algorithm of the Website helps in collecting all information about the running schemes or other government programs from the internet and other 	sources which would significantly benefit the people from all walks of life.</li>
                                <li className='mt-3'>The Website may contain details about the various schemes relating to monetary benefits and other pecuniary allowances and/or rebate for the beneficiary 	as notified by the government from time to time.	Demat Account details like beneficiary account no. etc.</li>
                            </ul>
                        </div>
                        <div className="detail mb-2">
                            <h5>INDEMNITY</h5>
                            <ul>
                                <li className='mt-3'>The main aim of the Website is to provide information regarding the government schemes (sourced from government websites and other online sources) 	that would aid the underprivileged people to know more about each scheme in a much lucid manner. </li>
                                <li className='mt-3'>The Website presents a list of governmental schemes on its portal to be viewed and accessed by the public at large.</li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default TermsAndConditions