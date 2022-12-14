import { log } from "console";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ApiPost } from "../../helper/API/ApiData";

const DeleteProfile = ({ show, onHide, header, input }: any) => {
    const navigate = useNavigate()


    const submit = () => {
        let formData = new FormData();
        formData.append('name', input.name)
        formData.append('phone', input.phone)
        formData.append('email', input.email)
        formData.append('qualification', input.qualification)
        formData.append('avatar', input.avatar)
        formData.append('userType', input.userType)
        formData.append('priority', input.priority ? input.priority : 0)
        formData.append('resumeUrl', input.resumeUrl)
        formData.append('state', input.location)
        formData.append('availableForHire', input.availableForHire);
        formData.append('completeCourse', input.completeCourse)
        formData.append('experience', input.experience)
        formData.append('certification', input.certification)
        formData.append('workExperience', input.workExperience)
        formData.append('selectedJobRole', input.selectedJobRole)
        formData.append('aboutMe', input.aboutYou)
        formData.append('intrested', input.intrested)
        formData.append('facebookLink', input.facebook)
        formData.append('twitterLink', input.twitter)
        formData.append('linkedInLink', input.linkedIn)
        formData.append('instagramLink', input.instagram)
        formData.append('isActive', input.isActive);
        formData.append('isDeleted', "true");


        ApiPost(`user/auth/editProfile?id=${input.id}`, formData)
            .then((res: any) => {
                if (res.status === 200) {
                    localStorage.clear();
                    navigate('/');
                    toast.success("Profile deleted")
                }
            })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter" setLoginType
            centered
            className="upload-image-resume">
            <Modal.Header closeButton>{header}</Modal.Header>
            <Modal.Body>
                <div className="via-checkbox">
                    <div className="text-center">
                        <label htmlFor="female">Are you sure  you want to delete you profile</label>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <Button className="submit-btn" onClick={submit}>Submit</Button>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default DeleteProfile