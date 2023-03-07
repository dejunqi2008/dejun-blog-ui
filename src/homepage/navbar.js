import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Box, Button, CssBaseline, IconButton, Toolbar } from "@mui/material";
import { LoginModal } from "../loginpage/loginmodal";
import { UserContext } from "../userContext/user-context";
import './navbar.css'


export default function NavBar() {

    const context = useContext(UserContext);
    const { user }  = context
    const [modalOpen, setModalOpen] = useState(false);

    const handleLoginBtnClick = (event) => {
        setModalOpen(true);
    }

    const renderLoginBtn = () => {
        if (!user.isLoggedInUser) {
            return <Button className="login-btn" onClick={handleLoginBtnClick}>Admin Login</Button>
        }
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <LoginModal
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
                        <Link to='/' className="router-link">HOME</Link>
                    </Button> 
                    <Button>
                        <Link to="/blog/list" className="router-link">BLOGPOSTS</Link>
                    </Button>
                    {renderLoginBtn()}
                </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
