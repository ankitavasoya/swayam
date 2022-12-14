import { log } from 'console'
import React from 'react'

// const GetMessage = (channel: any) => {

//     switch (channel) {
//         case 'facebook': {
//             // return `Hey, Are you looking for Job? Swayam will really help you get job.`
//             return `http://localhost:3000`
//         }
//         case 'twitter': {
//             return `Hey, Are you looking for Job? Swayam will really help you get job.`
//         }
//         case 'linkedin': {
//             return `Hey, Are you looking for Job? Swayam will really help you get job.`
//         }
//         case 'whatsapp': {
//             return `Hey, Are you looking for Job? Swayam will really help you get job.`
//         }
//     }

// }

const Share = (type: string, navigateTo: any) => {
    const message = `Hey, Are you looking for Job? Swayam will really help you get job, here the link of job please click on this link ${window.location.origin}/${navigateTo}`
    switch (type) {
        case 'facebook': {
            // let temp = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fgithub.com&quote=GitHub`;
            // let temp = `https://www.facebook.com/sharer.php?u=${message}`;
            let temp = `https://www.facebook.com/sharer.php?u=${window.location.origin}/${navigateTo}`;
            const win = window.open(temp);
            win?.open();
            break;
        }
        case 'twitter': {
            const win = window.open(`https://twitter.com/intent/tweet?text=${message}`);
            win?.open();
            break;
        }
        case 'linkedin': {
            // const win = window.open(`https://www.linkedin.com/sharing/share-offsite/?url=https://www.linkedin.com`);
            // const win = window.open(`https://www.linkedin.com/shareArticle?url=${window.location.origin}/${navigateTo}`);
            const win = window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/${navigateTo}`);
            win?.open();
            break;
        }
        case 'whatsapp': {
            const win = window.open(`https://api.whatsapp.com/send?text=${message}`);
            win?.open();
            break;
        }
    }
}
export default Share