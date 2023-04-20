import { Button } from "@mui/material";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useAuth } from "../utils/hookUtils";
import Image from '@mui/icons-material/Image'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

export const Gallery = () => {
    const {username} = useParams();
    const isAuth = useAuth()(username);
    const loaderData = useLoaderData();
    const { albums } = loaderData;

    const renderAlbumLink = () => {
        return albums.map(album => (
            <ListItem disablePadding key={album.id}>
                <ListItemButton>
                    <ListItemIcon>
                        <Image />
                    </ListItemIcon>
                    <Link to={`/${username}/gallery/${album.id}`}>{album.name}</Link>
                </ListItemButton>
            </ListItem>
        ))
    }

    const renderBtnGroup = () => {
        return (
            <Box>
                <Button><Link to={`/${username}/addphotos`}>Add Photos</Link></Button>
                {/* <Button>Create album</Button> */}
            </Box>
        );
    }

    return (
        <div>
            {isAuth && renderBtnGroup()}
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {renderAlbumLink()}
                    </List>
                </nav>
            </Box>

        </div>
   ); 
}


