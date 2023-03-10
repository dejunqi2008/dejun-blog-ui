import {  Box, Button} from "@mui/material";
import { Avatar, Grid } from "../../node_modules/@mui/material/index";
import { SocialIcon } from "react-social-icons";
import './about.css';
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';

import { useAuth } from "../utils/hookUtils";
import { useContext, useEffect } from "react";
import { UserContext } from "../userContext/user-context";

export const UserIntro = () => {

    const { data: {data } } = useLoaderData();
    const { username } = useParams();
    const {
        realname,
        introduction,
        emailaddr,
        githubaddr,
        linkedinaddr,
        profilepic,
        isadmin
    } = data;

    const isAuth = useAuth()(username);
    const navigate = useNavigate();



    const renderContactInfoSection = () => {
        const contacts = [];
        if (emailaddr !== 'null') {
            contacts.push(<div key="0"><SocialIcon url={`mailto:${emailaddr}`} /></div>);
        }
        if (githubaddr !== 'null') {
            contacts.push(<div key="1"><SocialIcon url={githubaddr} /></div>);
        }
        if (linkedinaddr !== 'null') {
            contacts.push(<div key="2"><SocialIcon url={linkedinaddr} /></div>);
        }
        return <section className="contact-info-wrapper">
            {contacts}
        </section>
    };

    const handleBtnClick = () => {
        return navigate(`/user/edit/${username}`)
    }

    const renderButtonGroup = () => {
        if (isAuth) {
            return (
                <Button className="intro-btn" variant="outlined" onClick={handleBtnClick}>Edit Profile
                </Button>
            );
        }
        return null;
    }

    const getProfilePic = () => {
        let addr = profilepic || "https://uc7c8d076c46caabb5adfe624e24.previews.dropboxusercontent.com/p/thumb/AB1bdO2KGZBJ15VSp1gKJqX5Dmv4w3rDZKoxopo0LTgLLecgJc221Dm9IbuYiqf4fpym7SK0RTLBr8Wp13I-U2q-MR5Szkm_EAvHUkbkPt_bbi_dfQsipUyKAk0Y3ywNS1pG3kB-u9ZhJhzzzM1Dy_FCv-8keSWg8gKeLN9kdOHHy2K5jG3borIpiaa2sQX_NeoDavjCv0Y6WUtZKEalXEf3moCv2BlWGWHShqJWQLDO3aM4dsjUPfHrQQwRfBs9858wxv2j0lMJTM3-lrFKXEPPKTyQJqYcyXBRuN4FmbYB-yLkDXO6LjbVAC74-AHAsRYFaThlleMJfaebrnzhvGwzRcJYvr_wDYRohl3zXbP61_awRLFR_o2pmH0nE9hOqjq8n20fX0mEFV3xxFXkx_ZYHCfPUDMom0rlm34-MleSVg/p.png";
        if (isadmin) {
            addr = "https://uca91500848a944713fb81fcd5b8.previews.dropboxusercontent.com/p/thumb/AB000uHwxlp8rK3aqf636pEytGpDsbJUyWNVHHQm7iocFXsYr6eVcyLhyx1eUXDgPOq3OrP08N0xTllbtgCcwA5dOfwx-MU5BsgX8Bp5M0Y5VeOpGRRz953cmhctw8P6U6ogU0AVpH_CpFPFXWvvJRIW4xLRcfYm_jZ_WfNqLD3ae-u1GTj_dfAWXnMDIxeWwLtu82VD3uIdeE-NyYGZ2m-p82SqDKGI0-Dlcq3szqnl2hQGsAyiNxdM9b6168Q4AikrPGq6XeivD4oVJYjsIiljAyQdCl824lGi6wuS6Nccg3M6yezvDDAjJfIgljeCAUtN7RNBlfbGgYmX5BbyRTk4rOToNWFJAWV58WkNZKU0h9jY3A-AQr468HZQdSOYRm8/p.jpeg?size=512x512&size_mode=1";
        }
        return addr;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <section className="profile">
                        <Avatar alt={realname} src={getProfilePic()} sx={{ width: 150, height: 150 }} />
                    </section>
                    {renderContactInfoSection()}
                </Grid>
                <Grid item xs={8}>
                    {!!introduction ? parse(introduction) : 'Login and edit your profile'}
                </Grid>
            </Grid>
            {renderButtonGroup()}
        </Box>
    );
}