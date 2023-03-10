import { UserContext } from "../userContext/user-context"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import './homepage.css'
import { useRequest } from "../utils/hookUtils";
import { baseAPIUrl } from "../utils/commUtils";

export const HomePage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const postRequest = useRequest('POST', `${baseAPIUrl}/user/new`);
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
        const resp = await postRequest(credential)
        const { data: {message, errno}, status} = resp;
        if (status === 200 && errno === 0) {
            return navigate(`/${credential.username}`);
        }
        setError(new Error(message));
        
    }
// label={!!error ? 'Incorrect username or password' : 'Username'}
    return <div id="home-page">
        <Box sx={{margin: '8px 8px 100px 8px'}}>
            <h1>Hello vistor! </h1>
            <p>This is a simple blog (CMS) system I built for fun and for my personal use and not intended to be made public. But you are very welcome to sign up and play a round with it. Once sign up, your data will be deleted from the database within 24 hours</p>
        </Box>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                label={!!error ? error.message : "Username"}
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
        <Box sx={{margin: '8px'}}>
            <Button variant="outlined" onClick={handleSignUp}>Signup</Button>
        </Box>
        
    </div>
}
