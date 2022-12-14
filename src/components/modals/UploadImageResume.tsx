import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const UploadImageResume = ({ show, onHide, header, uploadPhotoResume, uploadtext, setImagesData, profileImage }: any) => {
    const [image, setImage] = useState<any>()
    const [error, setError] = useState<any>()
    const [imageName, setImageName] = useState<any>()

    const handalChnage = (e: any) => {
        setError('')
        let extensions = e.target.files[0].type
        let extensionsValidation = profileImage ? ["image/jpeg", 'image/png'] : ['image/jpeg', 'image/png', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
        if (extensionsValidation.includes(extensions)) {
            if (e.target.files[0].size / 1024 > 3063) {
                setError("File size larger than 3MB")
            }
            else if (e.target.files[0].size / 1024 < 3063 && e?.target?.files && e?.target?.files[0]) {
                setImage(e?.target?.files[0])
                setImageName(e?.target?.files[0].name)
                setError("")
            }
        } else {
            setError('Please select valid document file')
        }
    }
    const submit = () => {
        setImagesData(image)
        onHide()
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
                <div className="file-input mb-3">
                    <img src="./assets/img/add-file.png" alt="" />
                    <p>{uploadtext}</p>
                    <label htmlFor="myfile" className='file-input-lable'>{uploadPhotoResume}</label>
                    <input type="file" id="myfile" name="myfile" onChange={(e: any) => handalChnage(e)} />
                    {error && <span style={{ color: "red" }}>{error}</span>}
                    {!error && <span style={{ color: "green" }}>{imageName}</span>}
                </div>
                <div className="mt-4 text-center">
                    <Button className="submit-btn" onClick={submit}>Submit</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UploadImageResume