import { ApiPostNoAuth } from "../helper/API/ApiData";

const smsMessage = () => {
    let body = {
        senderId: "SWYCON",
        message: "First Message",
        mobileNumbers: "919898143050",
        apiKey: "hJrViz17w0BbPcU+cOnQ/AJ5fSFRxgtj+itPt0JUiLA=",
        clientId: "36029fba-3bac-4af4-9265-7849556a3acf"

    }
    ApiPostNoAuth('http://smspanel.digithoughts.co.in:6005/swagger/api/v2/SendSMS', body)
}

export default smsMessage