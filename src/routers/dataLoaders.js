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


export const UserDataLoader = async ({ params }) => {
    const { username } = params;
    const res = {data: null, error: null};
    try {
        const {data, status} = await axios.get(`${baseAPIUrl}/user?username=${username}`);
        if (status === 200) {
            res.data = data;
        }
    } catch(err) {
        res.error = err;
    }
    return res;
}