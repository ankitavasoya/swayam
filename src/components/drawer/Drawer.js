import React from 'react'
import { Offcanvas } from 'react-bootstrap'
import AcquireCard from '../../common/AcquireCard'

const Drawer = ({ show, handleClose }) => {
    return (
        <div className='drawer-canvas'>
            <Offcanvas show={show} onHide={handleClose} placement={"end"} style={{width:'480px'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Saved Jobs</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='px-0'>
                    <AcquireCard
                        img="labtech.svg"
                        title="my Profile"
                        text='demo text'
                        btntext={"applyNow"}
                        link="link"
                        navigateTo={"/"}
                        isShowRating={false}
                        imgShow={true}
                        type="JOB"
                    />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Drawer