import { UserContext } from "../userContext/user-context"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, ButtonGroup } from "@mui/material";
import { baseAPIUrl } from "../utils/commUtils";
import axios from "axios";
import './homepage.css'
import { useCookies } from "react-cookie";

export const HomePage = () => {
    const { user, setUser } = useContext(UserContext);
    const [, setCookie, ,] = useCookies(['accessToken'])
    const navigate = useNavigate();

    const [credential, setCredential] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null);
    useEffect(() => {
        if (user.isLoggedInUser) {
            return navigate(`/${user.username}`);
        }
    }, [user.isLoggedInUser]);

    const handleSignUp = async () => {
        if (!credential.username || !credential.password) {
            return setError(new Error('Both username and password are required'));
        }
        try {
            let resp = await axios.post(`${baseAPIUrl}/user/new`, credential);
            const { data: {message, errno}, status} = resp;
            if (status === 200 && errno === 0) {
                return await handleLogin();
            }
            setError(new Error(message));
        } catch (err) {
            setError(err);
        }
    }



    const handleLogin = async () => {
        if (!credential.username || !credential.password) {
            return setError(new Error('Both username and password are required'));
        }
        try {
            const resp = await axios.post(`${baseAPIUrl}/user/login`, credential);
            const {data: { data, errno }, status} = resp;
            if (status === 200 && errno === 0) {
                const { username, realname, accessToken, isadmin} = data;
                setCookie('accessToken', accessToken, {path: '/'})
                setUser({
                    ...user,
                    username,
                    realname,
                    isAdmin: !!isadmin,
                    isLoggedInUser: true
                })
                return navigate(`/${credential.username}`);
            }
            
        } catch (err) {
            setError(err);
        }
        
    }

    return <div id="home-page">
        <Box sx={{margin: '8px 8px 100px 8px'}}>
            <h1>Login:  </h1>
        </Box>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex'
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-username"
                margin="normal"
                label={!!error ? error.message : "Username"}
                error={!!error}
                required={true}
                onChange={(event) => setCredential({
                    ...credential,
                    username: event.target.value
                })}
            />
            <TextField
                id="outlined-password-input"
                label={!!error ? error.message : "password"}
                error={!!error}
                type="password"
                margin="normal"
                required={true}
                onChange={(event) => setCredential({
                    ...credential,
                    password: event.target.value
                })}
            />
        </Box>

        <Box sx={{margin: '16px 8px', 'textAlign': 'right'}}>
            <ButtonGroup
                disableElevation
                variant="outlined"
                aria-label="Disabled elevation buttons">
                {/* <Button onClick={handleSignUp}>SIGNUP</Button> */}
                <Button onClick={handleLogin}>LOGIN</Button>
            </ButtonGroup>
        </Box>
        

    </div>
}
