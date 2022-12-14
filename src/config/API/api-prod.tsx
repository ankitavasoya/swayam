// const protocol = 'http';
// const host = '192.168.1.48';
// const host = 'http://digiprojer.in:5000';
// const host = 'http://192.168.1.2:5001';
const host = 'http://43.204.81.60:5001';
// const host = 'http://localhost:5001';
// const port = '5000';
const trailUrl = 'api/v1/';

const hostUrl = `${host}/`;
// const endpoint = `${protocol}://${host}${(port ? ':' + port : '')}/${trailUrl}`;
const endpoint = `${host}/${trailUrl}`;

export default {
    // protocol: protocol,
    host: host,
    // port: port,
    apiUrl: trailUrl,
    endpoint: endpoint,
    hostUrl: hostUrl
};
