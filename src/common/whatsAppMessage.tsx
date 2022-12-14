import { ApiPostForWattsapp } from "../helper/API/ApiData";
let token = 'Bearer EAAPUMPBfdGUBAAIxDhEPoEgoMYogAGWFq2bcDxpzfH2XUwZCZBsQBTMRvpQlNT92uTZAUuoN8MnECBsaVUOr3yqHKaruxGWyZBVK0U6sb0qPwRdFF9TnOHQZCxeMEVRInBpPYxS9IT9x7lO08fVMt2vebHT8LGRKZB5PKVJ8txnmkInJ7qESIcidRONNiuSTXNVY46FHlRfZCiLaZCn5OcQZBHXNwX51j90EZD';

const whatsAppMessage = () => {
    let body = {
        messaging_product: "whatsapp",
        to: "+919898143050",
        type: "template",
        template: {
            name: "hello_world",
            language: {
                code: "en_US"
            }
        }
    }
    ApiPostForWattsapp('https://graph.facebook.com/v14.0/103777529174549/messages', body, token)
}

export default whatsAppMessage