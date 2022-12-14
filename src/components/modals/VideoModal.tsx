import React from 'react'
import { Modal } from 'react-bootstrap'

const VideoModal = ({ show, onHide, }: any) => {
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
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="video p-3">
                        {/* <iframe width="100%" height="100%" src="https://youtu.be/3KurNESaznU"/> */}
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/3KurNESaznU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default VideoModal