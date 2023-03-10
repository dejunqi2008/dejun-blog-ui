import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Box, Button, CssBaseline, IconButton, Toolbar } from "@mui/material";
import { LoginPage } from "../loginpage/loginpage";
import { UserContext } from "../userContext/user-context";
import './navbar.css'
import { useAuth } from "../utils/hookUtils";


export default function NavBar() {

    const { user } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const { username } = useParams();
    const isAuth = useAuth()(username);

    const handleLoginBtnClick = () => {
        setModalOpen(true);
    }
    const renderToRightBtn = () => {
        if (!user.isLoggedInUser) {
            return <Button className="top-right-btn" onClick={handleLoginBtnClick}>Login</Button>
        } else {
            return <Button className="top-right-btn">
                <Link to={`/${user.username}/blog/create`} className="router-link">Write</Link>
            </Button>
        }

    }

    const vistorBtn = () => {
        if (!user.isLoggedInUser) {
            return (
                <Button>
                    <Link to="/" className="router-link">vistor</Link>
                </Button>
            );
        }
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <LoginPage
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
            <AppBar component="nav" color="default">
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {}}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Button>
                        <Link to={`/${username}`} className="router-link">ABOUT</Link>
                    </Button> 
                    <Button>
                        <Link to={`/${username}/blogs`} className="router-link">BLOGPOSTS</Link>
                    </Button>
                    {vistorBtn()}
                    {renderToRightBtn()}
                </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
