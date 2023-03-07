import axios from "axios";

import { useCookies } from "react-cookie";

export const useReuqest = (method, url) => {
    const [cookies, _] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken || '';

    switch (method) {
        case 'GET':
            return () => axios.get(url);
        case 'POST':
            return (reqBody) => axios.post(url, {...reqBody, accessToken})
        default:
            return () => null;
    }    

}

export const useReuqestWithCallback = (method, url, callback) => {
    const [cookies, _] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken || '';
    switch (method) {
        case 'GET':
            return () => axios.get(url).then(callback);
        case 'POST':
            return (reqBody) => axios.post(url, {...reqBody, accessToken}).then(callback);
        default:
            return () => null;
    }    
}