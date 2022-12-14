import AuthStorage from '../AuthStorage';
import { API } from '../../config/API/api.config';
import { log } from 'console';

export const BaseURL = API.endpoint;

const axios = require('axios').default;

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true
};

const defaultHeaders2 = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true,
    token: ''
};

interface apiResponse {
    data: {
        data: any,
        message: string,
        status: number
    },
    status: number
}


export const ApiGet = (type: string) => {
    // const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.get(`${BaseURL}${type}`, getHttpOptions())
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiGetNoAuth = (type: string) => {
    // const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.get(`${BaseURL}${type}`, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPost = (type: string, userData: any) => {
    // const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.post(`${BaseURL}${type}`, userData, getHttpOptions({ ...defaultHeaders }))
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPost2 = (type: string, userData: any, token: string) => {
    return new Promise((resolve, reject) => {
        axios.post(`${BaseURL}${type}`, userData, getHttpOptions2({ ...defaultHeaders2, token: token }))
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    // reject(error.response.data.error);
                    reject(error.response.data);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPostForWattsapp = (URL: any, userData: any, token: any) => {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}`, userData, getHttpOptions2({ ...defaultHeaders2, token: token }))
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPostForSms = (URL: any, userData: any,) => {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}`, userData, getHttpOptions2())
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPostNoAuth = (type: string, userData: any) => {
    // const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.post(`${BaseURL}${type}`, userData, getHttpOptions({ ...defaultHeaders, isAuth: false }))
            .then((responseJson: apiResponse) => {
                resolve(responseJson.data);
            })
            .catch((error: any) => {
                // if (error?.response?.status === 401) {
                //     AuthStorage.deauthenticateUser();
                //     window.location.href = "/"
                // }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('message') && error.response.data.message) {
                    reject(error.response.data.message);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiPatch = (type: String, userData: any) => {
    // const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.patch(`${BaseURL}${type}`, userData, getHttpOptions())
            .then((responseJson: apiResponse) => {
                resolve(responseJson);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}


export const ApiDelete = (type: string, userData: any) => {
    // const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.delete(`${BaseURL}${type}`, getHttpOptions())
            .then((responseJson: apiResponse) => {
                resolve(responseJson);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPut = (type: string, userData: any) => {
    // const s = type.includes('?') ? '&' : '?';
    return new Promise((resolve, reject) => {
        axios.put(`${BaseURL}${type}`, userData, getHttpOptions())
            .then((responseJson: any) => {
                resolve(responseJson);
            })
            .catch((error: any) => {
                if (error?.response?.status === 401) {
                    AuthStorage.deauthenticateUser();
                    window.location.href = "/"
                }
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}



export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {
        Authorization: "",
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': null,
        'Access-Control-Allow-credentials': true

    };
    // "Origin, X-Requested-With, Content-Type, Accept"

    if (options.hasOwnProperty('isAuth') && options.isAuth) {
        headers['Authorization'] = AuthStorage.getToken() ?? "";
    }

    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = { ...headers, ...options.AdditionalParams };
    }

    return { headers }
}

export const getHttpOptions2 = (options = defaultHeaders2) => {
    let headers = {
        Authorization: options.token,
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': null,
        'Access-Control-Allow-credentials': true
    };
    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = { ...headers, ...options.AdditionalParams };
    }

    return { headers }
}