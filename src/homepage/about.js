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

    console.log(data)
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
        let addr = profilepic || 'https://raw.githubusercontent.com/dejunqi2008/dejun-blog-ui/mainline/public/default-profile.jpeg';
        if (isadmin) {
            addr = 'https://raw.githubusercontent.com/dejunqi2008/dejun-blog-ui/mainline/public/profile.jpeg';
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