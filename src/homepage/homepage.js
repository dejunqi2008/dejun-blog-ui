import React, { useState } from "react";
import { Box, Tab} from "@mui/material";
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { UserIntro } from "./about";
import { BlogList } from "../bloglist/bloglist";


export const Homepage = () => {

    const [value, setValue] = useState('1');
    const [blogPosts, setBlogPosts] = useState([]);

    const handleChange = (event, val) => {
        setValue(val);
    }

    return (
        <div>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="About" value="1" />
                        <Tab label="Blog Posts" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <UserIntro />
                </TabPanel>
                <TabPanel value="2">
                    <BlogList
                        blogPosts={blogPosts}
                        setBlogPosts={setBlogPosts}
                    />
                </TabPanel>
            </TabContext>
        </div>

    );
}
