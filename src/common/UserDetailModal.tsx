import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { ApiGet } from '../helper/API/ApiData'

const UserDetailModal = ({ userId, show, onHide }: any) => {

    const [userData, setUserData] = useState<any>()

    useEffect(() => {
        ApiGet(`user/auth/singleUser?userId=${userId}`)
            .then((res: any) => {
                if (res && res.status === 200) {
                    if (res && res.data) {
                        setUserData(res.data)
                    }
                }
            })
    }, [userId])
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter" setLoginType
                centered
                className="loginmodal"
            >
                <Modal.Header closeButton> <h5> User Detail </h5> </Modal.Header>
                <Modal.Body>
                    <div className='user-detail-modal profile-view' style={{ padding: '20px' }}>
                        <Col lg={12}>
                            <Row className=''>
                                <Col lg={12}>
                                    <div className='profile-detail' style={{ justifyContent: 'space-between', display: 'flex' }}>
                                        <div style={{ display: 'flex', gap: '20px' }}>
                                            <img className='profile_picture' src={userData?.avatar} alt="" style={{ marginBottom: '0' }} />
                                            <Row style={{ rowGap: '20px' }}>
                                                <Col lg={12}>
                                                    <Row>
                                                        <Col lg={3}><label>User name :</label></Col>
                                                        <Col lg={9}><h6>{userData?.name}</h6></Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={12}>
                                                    <Row>
                                                        <Col lg={3}><label>email :</label></Col>
                                                        <Col lg={9}><h6>{userData?.email}</h6></Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={12}>
                                                    <Row>
                                                        <Col lg={3}><label>Mobil number :</label></Col>
                                                        <Col lg={9}><h6>{userData?.phone}</h6></Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={12}>
                                                    <Row>
                                                        <Col lg={3}><label>User type :</label></Col>
                                                        <Col lg={9}><h6>{userData?.userType}</h6></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src='../assets/img/Mask (1).png' />
                                            <a href={userData?.resumeUrl}
                                                download
                                                target={"_blank"} className="download-file"
                                                style={{ wordBreak: 'normal', whiteSpace: 'nowrap' }}>
                                                Download resume
                                            </a></button>
                                    </div>
                                </Col>
                                <Col lg={7}>
                                    <div className='employee-detail' style={{ marginBottom: '50px' }}>
                                        <div className='profile_social'>
                                            <img src="../assets/img/Path@2x.png" alt="one" style={{ width: "13px" }} onClick={() => { userData?.facebookLink ? window.open(userData?.facebookLink) : "" }} />
                                            <img src="../assets/img/Path-1@2x.png" alt="two" onClick={() => { userData.twitterLink ? window.open(userData?.twitterLink) : "" }} />
                                            <img src="../assets/img/Group 14@2x.png" alt="three" onClick={() => { userData?.linkedInLink ? window.open(userData?.linkedInLink) : "" }} />
                                            <img src="../assets/img/noun-insta-3324511.svg" alt="four" onClick={() => { userData?.instagramLink ? window.open(userData?.instagramLink) : "" }} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Row style={{ rowGap: '20px' }}>
                            <Col lg={6}>
                                <Row>
                                    <Col lg={4}><label>Experience :</label></Col>
                                    <Col lg={8}><h6>{userData?.experience}</h6></Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col lg={4}><label>Intrested :</label></Col>
                                    <Col lg={8}><h6>{userData?.intrested}</h6></Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col lg={4}><label>Complete course :</label></Col>
                                    <Col lg={8}><h6 style={{ wordBreak: "break-all" }}>{userData?.completeCourse}</h6></Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col lg={4}><label>Work experience :</label></Col>
                                    <Col lg={8}><h6>{userData?.workExperience ? "Yes" : "No"}</h6></Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col lg={4}><label>Available for hire :</label></Col>
                                    <Col lg={8}><h6>{userData?.availableForHire ? "Yes" : "No"}</h6></Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <Row>
                                    <Col lg={4}><label>Certification :</label></Col>
                                    <Col lg={8}><h6>{userData?.certification ? "Yes" : "No"}</h6></Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserDetailModal