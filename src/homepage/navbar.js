import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Box, Button, ButtonGroup, CssBaseline, IconButton, Toolbar } from "@mui/material";
import { LoginPage } from "../loginpage/loginpage";
import { UserContext } from "../userContext/user-context";
import './navbar.css'

export default function NavBar() {

    const { user, setUser, removeCookie, cookies } = useContext(UserContext);
    const [modalOpen, setModalOpen] = useState(false);
    const { username } = useParams();

    const handleLoginBtnClick = () => {
        setModalOpen(true);
    }

    const handleLogOutClick = () => {
        removeCookie('accessToken');
        document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        setUser({
            ...user,
            username: '',
            realname: '',
            isLoggedInUser: false
        })
        
    }

    const renderToRightBtn = () => {
        if (!user.isLoggedInUser) {
            return <Button className="top-right-btn" onClick={handleLoginBtnClick}>Login</Button>
        } else {
            return (
                <ButtonGroup
                    className="top-right-btn"
                    disableElevation
                    variant="text"
                    aria-label="Disabled elevation buttons">
                    <Button>
                        <Link to={`/${user.username}/blog/create`} className="router-link">
                            Write
                        </Link>
                    </Button>
                    <Button onClick={handleLogOutClick}>Log out</Button>
                </ButtonGroup>
            );
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
