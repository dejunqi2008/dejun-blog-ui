import moment from "moment/moment";


const getBaseAPIUrl = () => {
    return !!process.env.REACT_APP_BASE_URL ? 
        process.env.REACT_APP_BASE_URL : 'http://localhost:8000/api';
}

export const baseAPIUrl = getBaseAPIUrl();

export const getFormatDate = (num) => moment(num).format('LL');