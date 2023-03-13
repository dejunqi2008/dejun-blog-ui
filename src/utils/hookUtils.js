import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { UserContext } from "../userContext/user-context";

export const useRequest = (method, url) => {
    const [cookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken || '';

    switch (method) {
        case 'GET':
            return () => axios.get(url);
        case 'POST':
            return (reqBody, config={}) => axios.post(url, {...reqBody, accessToken}, config)
        case 'DELETE':
            return (reqBody) => axios.delete(url, {...reqBody, accessToken})
        default:
            return () => null;
    }    

}

export const useRequestWithCallback = (method, url, callback) => {
    const [cookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken || '';
    switch (method) {
        case 'GET':
            return () => axios.get(url).then(callback);
        case 'POST':
            return (reqBody) => axios.post(url, {...reqBody, accessToken}).then(callback);
        case 'DELETE':
            return (reqBody) => axios.delete(url, {...reqBody, accessToken}).then(callback)
        default:
            return () => null;
    }    
}

export const useAuth = () => {
    const { user } = useContext(UserContext);
    const loggedInUser = user.username; // loggedInUser: user store in session
    return (vistingUser) => { // visitingUser: the user (owner of current contents) you are visting
        return !!loggedInUser && vistingUser === loggedInUser;
    }
}

export const useDebounce = (data, delay) => {
    const [debounceData, setDebounceData] = useState(data);

    // every time data has change, we delay the update using settimeout
    // so if too many update happen to quick, previous scheduled (delay) update has been cancel, and wait for final update to complete
    useEffect(() => {
        let timeout = setTimeout(() => setDebounceData(data), delay);
        return () => clearTimeout(timeout);
    }, [data]);

    return debounceData;
}