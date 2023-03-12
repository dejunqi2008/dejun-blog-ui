import {  Box, Button} from "@mui/material";
import { Avatar, Grid } from "../../node_modules/@mui/material/index";
import { SocialIcon } from "react-social-icons";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';
import { useAuth } from "../utils/hookUtils";
import { Link } from "react-router-dom";
import './about.css';

export const UserIntro = () => {

    const { data: {data } } = useLoaderData();
    const { username } = useParams();
    const {
        realname,
        introduction,
        emailaddr,
        githubaddr,
        linkedinaddr
    } = data;

    const isAuth = useAuth()(username);
    const navigate = useNavigate();

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

    const handleBtnClick = () => {
        return navigate(`/user/edit/${username}`)
    }

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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div className="square">
                <div className="profile">
                    <Avatar alt={realname} src="https://s3.bukalapak.com/img/3033332333/large/Komik_Digital_Crayon_Shinchan_34_ebook.png.webp" sx={{ width: 150, height: 150 }} />
                    {renderContactInfoSection()}
                </div>
                {!!introduction ? parse(introduction) : 'Update your profile'}
            </div>
            {renderButtonGroup()}
        </Box>
    );
}