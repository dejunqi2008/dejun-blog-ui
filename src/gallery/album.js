import { useEffect, useState } from "react"
import axios from "axios";
import { baseAPIUrl } from "../utils/commUtils";
import { useParams } from "react-router-dom";
// import {ImageList, ImageListItem } from '@mui/material'
import IMageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css'


export const Album = () => {
    const {albumid, username} = useParams();
    const [albumPhotos, setAlbumPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        return <div>Loading images ... </div>
    }

    if (albumPhotos.length === 0) {
        return null;
    }

    console.log(albumPhotos);

    return (
        <div>
            {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {albumPhotos.map((src) => (
                    <ImageListItem key={src}>
                    <img
                        src={`${baseAPIUrl}${src}`}
                        srcSet={`${baseAPIUrl}${src}`}
                        alt="user photo"
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList> */}

            <IMageGallery
                items={albumPhotos.map(url => ({
                    original: `${baseAPIUrl}${url}`,
                    loading: "lazy"
                }))}
                showThumbnails={false}
            />
        </div>
    );
}
