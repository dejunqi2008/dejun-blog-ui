import moment from "moment/moment";


const getBaseAPIUrl = () => {
    console.log('getBaseAPIUrl', process.env.NODE_ENV )
    console.log('BASE_API_URL', process.env.BASE_API_URL);
    const isDevEnv = process.env.NODE_ENV === 'development';
    return  isDevEnv ? 'http://localhost:8000/api': 'https://dejun-blog-server.herokuapp.com/api';
}

export const baseAPIUrl = getBaseAPIUrl();

export const getFormatDate = (num) => moment(num).format('LL');