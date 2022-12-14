import React from 'react'
import profile_pic from "../../assets/img/profile-pic-2.png";


interface Props {
    onHide: () => void;
    show?: boolean;
}
const NotificationsModel: React.FC<Props> = ({ show, onHide }) => {

    const massageDate = [
        {
            msg: "Your password has been successfully changed.",
            time: "April 12, 2022 at 09:15 AM",
            img: profile_pic
        },
        {
            msg: "Your password has been successfully changed.",
            time: "April 12, 2022 at 09:15 AM",
            img: profile_pic
        },
        {
            msg: "Your password has been successfully changed.",
            time: "April 12, 2022 at 09:15 AM",
            img: profile_pic
        },
    ]
    return (
        <>
            <div className='notification_main'>
                <div className='notification_header d-flex justify-content-between align-items-center mb-5'>
                    <h1>Notifications</h1>
                    <div className='d-flex align-items-center'>
                        <img src="./assets/img/seen.png" alt="" />
                        <h2>Mark as read</h2>
                    </div>
                </div>
                {
                    massageDate.map((item, i) => (
                        <div className='notifications_content d-flex justify-content-between align-items-center position-relative pt-2 pb-2' key={i}>
                            <div style={{ width: "330px" }} className="ps-5">
                                <h1>{item.msg}</h1>
                                <h2>{item.time}</h2>
                            </div>
                            <img src={item.img} alt="" />
                        </div>
                    ))
                }
                <div className='mt-4 text-center'>
                    <p >See all notifications</p>
                </div>
            </div>
        </>
    )
}

export default NotificationsModel