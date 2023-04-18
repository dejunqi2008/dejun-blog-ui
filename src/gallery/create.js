import {  useState } from "react";
import { baseAPIUrl } from "../utils/commUtils";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLoaderData, useParams, Link, useNavigate } from "react-router-dom";
import {
    Skeleton,
    FormControl,
    Select, 
    Alert, 
    Button, 
    Box,
    FormHelperText,
    MenuItem,
    InputLabel
} from "@mui/material";
import { CONSTANTS } from "../constants";
import './create.css';


export const AddPhotos = () => {

    const loaderData = useLoaderData();

    const { albums } = loaderData;
    const [photos, setPhotos] = useState([]);
    const [album, setAlbum] = useState(albums.find(alb => alb.name === "default"));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(loaderData.error);
    const [cookies] = useCookies(['accessToken']);
    const accessToken = cookies.accessToken || '';
    const { username } = useParams();
    const navigate = useNavigate();
    

    const uploadPhotos = async (photos, username) => {
        if (photos.length > 10) {
            return {errno: -1, data: new Error("Only upload 10 imgae at a time")};
        }
        
        const formData = new FormData();
        formData.append("username", username);

        for (let i = 0; i < photos.length; i++) {
            if (photos[i].size > 5000000){
                return {errno: -1, data: new Error("File exceed size limit (5MB)")};
            }
            formData.append(`photos`, photos[i]);
        }
        formData.append('accessToken', accessToken);
        formData.append('album_id', album.id);
        const result = await axios.post(
            `${baseAPIUrl}/images/userphotos/new`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return result.data
    }

    const submit = async (event) => {
        event.preventDefault()
        if (photos.length === 0) return;
        try {
            setIsLoading(true);
            const res = await uploadPhotos(photos, username);
            if (res.errno === 0) {
                return navigate(`/${username}/gallery`);
            } else {
                setError(res.data);
            }
            setIsLoading(false);
        } catch (err) {
            setError(err);
            setIsLoading(false);
        }
    }

    const addPhotos = (event) => {
        setPhotos(() => [...photos, ...event.target.files]);
    }

    const selectAlbum = (event) => {
        setAlbum(event.target.value);
    }

    const renderLoading = (
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
    );

    if (!!error) {
        return <Alert severity="error">{error.message || CONSTANTS.ERROR.GENERAL_ERROR_MSG}</Alert>
    }    

    return (
        isLoading ? renderLoading :
        <div>
            <Box >Add photos</Box>
            <Box sx={{ margin: '10px 0 10px 0'}}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-album-label">Album</InputLabel>
                    <Select
                        labelId="select-album-label"
                        id="select-album"
                        value={album}
                        label="Album"
                        onChange={selectAlbum}
                    >
                    {albums.map(alb => <MenuItem key={alb.id} value={alb}>{alb.name}</MenuItem>)}
                    </Select>
                    <FormHelperText>Choose an album</FormHelperText>
                </FormControl>
            </Box>
            <Box>
            <form onSubmit={submit}>
                <input id="profile-img-upload" multiple onChange={addPhotos} type="file" accept=".jpg, .jpeg, .png, image/*" />
                <Button
                    variant="outlined"
                    type="submit" 
                    disabled={photos.length === 0} 
                    sx={{
                        position: 'relative',
                        left: '2rem',
                        top: '1.2rem'
                    }}>
                    upload
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        position: 'relative',
                        left: '2.3rem',
                        top: '1.2rem'
                    }}
                >
                    <Link
                        to={`/${username}/gallery`}
                        style={{ textDecoration: "none", color: '#1976d2'}}>
                        Cancel
                    </Link>
                </Button>

            </form>
            </Box>
        </div>
   );     
}
