import {  Box, Button} from "@mui/material";
import { Avatar } from "../../node_modules/@mui/material/index";
import { SocialIcon } from "react-social-icons";
import { useLoaderData, useParams } from "react-router-dom";
import parse from 'html-react-parser';
import { useAuth } from "../utils/hookUtils";
import { Link } from "react-router-dom";
import { baseAPIUrl } from "../utils/commUtils";
import { TextRenderer } from "../sharedComponent/text-renderer/TextRenderer";

import './about.css';


export const UserIntro = () => {

    const { data: {data } } = useLoaderData();
    const { username } = useParams();
    const {
        realname,
        introduction,
        emailaddr,
        githubaddr,
        linkedinaddr,
        profilephoto
    } = data;

    const isAuth = useAuth()(username);

    const renderContactInfoSection = () => {
        const contacts = [];
        if (!!emailaddr && emailaddr !== 'null') {
            contacts.push(<div key="0"><SocialIcon className="social-info" url={`mailto:${emailaddr}`} /></div>);
        }
        if (!!githubaddr && githubaddr !== 'null') {
            contacts.push(<div key="1"><SocialIcon className="social-info" url={githubaddr} /></div>);
        }
        if (!!linkedinaddr && linkedinaddr !== 'null') {
            contacts.push(<div key="2"><SocialIcon className="social-info" url={linkedinaddr} /></div>);
        }
        return <section className="contact-info-wrapper">
            {contacts}
        </section>
    };

    const renderButtonGroup = () => {
        if (isAuth) {
            return (
                <Button className="intro-btn" variant="outlined">
                    <Link className="link" to={`/user/edit/${username}`} >edit profile</Link>
                </Button>
            );
        }
        return null;
    }

    let imgSrc = !!profilephoto ? `${baseAPIUrl}${profilephoto}` : "https://s3.bukalapak.com/img/3033332333/large/Komik_Digital_Crayon_Shinchan_34_ebook.png.webp"

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div className="square text-container">
                <div className="profile">
                    <Avatar alt={realname} src={imgSrc} sx={{ width: 150, height: 150 }} />
                    {renderContactInfoSection()}
                </div>
                {!!introduction ? <TextRenderer content={introduction} /> : 'Update your profile'}
            </div>
            {renderButtonGroup()}
        </Box>
    );
}