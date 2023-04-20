import axios from "axios";
import { baseAPIUrl } from "../utils/commUtils";


export const BlogDetailDataLoader = async (args) => {
    const { params: { blogId } } = args;
    const res = {};
    try {
        const results = await Promise.all([
            axios.get(`${baseAPIUrl}/blog/detail?id=${blogId}`),
            axios.get(`${baseAPIUrl}/tags`),
            axios.get(`${baseAPIUrl}/tags?blog_id=${blogId}`)
        ]);

        res.data = results[0].data.data;
        res.tags = results[1].data;
        res.tagsAssociatedWithBlog = results[2].data;
    } catch (err) {
        res.error = err;
    }

    return res;
};

export const TagsBlogDataLoader = async () => {
    const res = {};
    try {
        const resp = await axios.get(`${baseAPIUrl}/tags`);
        res.tags = resp.data
    } catch(err) {
        res.error = err;
    }

    return res;
};


export const UserDataLoader = async ({ params }) => {
    const { username } = params;
    const res = {data: null, error: null};
    try {
        const resp = await axios.get(`${baseAPIUrl}/user?username=${username}`);
        if (resp.status === 200) {
            res.data = resp.data;
        }
    } catch(err) {
        res.error = err;
    }
    return res;
}

export const albumDataLoader = async ({ params }) => {
    const { username } = params;
    const res = {};
    try {
        const resp = await axios.get(`${baseAPIUrl}/albums?username=${username}`);
        if (resp.status === 200) {
            res.albums = resp.data;
        }
    } catch( err) {
        res.error = err;
    }
    return res;
}

