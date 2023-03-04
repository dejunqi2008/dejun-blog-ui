import axios from "axios";
import { baseAPIUrl } from "../utils/commUtils";

export const BlogDetailDataLoader = async ({ params }) => {
    const { blogId } = params;
    const res = {data: null, error: null};
    try {
        const {data, status} =  await axios.get(baseAPIUrl + `/blog/detail?id=${blogId}`);
        if (status === 200) {
            res.data = data.data;
        }
    } catch(err) {
        res.error = err;
    }   

    return res;
}

export const HomepageDataLoader = async () => {
    const resp = {data: null, error: null};
    try {
        const { data, status } = await axios.get(baseAPIUrl + '/blog/list');
        if (status === 200) {
            resp.data = data.data;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        resp.error = err;
    }

    return resp;
}