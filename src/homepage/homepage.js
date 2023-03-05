import React, { useContext, useState } from "react";
import { Box, Button, Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { UserIntro } from "./about";
import { BlogList } from "../bloglist/bloglist";
import { LoginModal } from "../loginpage/loginmodal";
import { UserContext } from "../userContext/user-context";


export const Homepage = () => {

    const context = useContext(UserContext);
    const { user }  = context
    const [modalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState('1');
    const [blogPosts, setBlogPosts] = useState([]);

    const handleTabChange = (_, val) => {
        setValue(val);
    }

    const handleLoginBtnClick = (event) => {
        setModalOpen(true);
    }

    const renderLoginBtn = () => {
        if (!user.isLoggedInUser) {
            return <Button className="login-btn" onClick={handleLoginBtnClick}>Login</Button>
        }
    }

    return (
        <>
            {renderLoginBtn()}
            <LoginModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="About" value="1" />
                        <Tab label="Blog Posts" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <UserIntro />
                </TabPanel>
                <TabPanel value="2" className="blogposts-pannel">
                    <BlogList
                        blogPosts={blogPosts}
                        setBlogPosts={setBlogPosts}
                    />
                </TabPanel>
                
            </TabContext>
        </>
    );
}
