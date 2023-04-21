import { useEffect, useState } from "react"
import axios from "axios";
import { baseAPIUrl } from "../utils/commUtils";
import { useParams } from "react-router-dom";
// import {ImageList, ImageListItem } from '@mui/material'
import IMageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'
import './gallery.css';
import { Loading } from "../sharedComponent/loading-pinner/loading";


export const Album = () => {
    const {albumid, username} = useParams();
    const [albumPhotos, setAlbumPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const onImageLoad = (_) => {
        const loadingIcon = document.querySelector('.loader-wrapper');
        loadingIcon.style.display = "none";
        const gallery = document.querySelector('.image-gellery');
        gallery.style.display = "block";

    }

    const fetchUserPhotos = async (album_id) => {
        const resp = await axios.get(`${baseAPIUrl}/images/userphotos?username=${username}&albumid=${album_id}`);
        return resp.status === 200 ? resp.data.data : [];
    }

    useEffect(() => {
        setIsLoading(true);
        fetchUserPhotos(albumid)
            .then(resp => {
                setAlbumPhotos(resp);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    if (isLoading) {
        return <Loading />
    }

    if (albumPhotos.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="loader-wrapper">
                <Loading />
            </div>
            <IMageGallery
                items={albumPhotos.map(url => ({
                    original: `${baseAPIUrl}${url}`,
                    loading: "lazy"
                }))}
                showThumbnails={false}
                additionalClass="image-gellery"
                onImageLoad={onImageLoad}
            />
        </div>
    );
}
