import { Modal, Box, TextField, Button } from "@mui/material"
import axios from "axios";
import { useState, useContext } from "react";
import { baseAPIUrl } from "../utils/commUtils";
import { UserContext } from "../userContext/user-context";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const LoginPage= ({modalOpen, setModalOpen}) => {

    const [credential, setCredential] = useState({
        username: '',
        password: ''
    });

    const { setUser, setCookie } = useContext(UserContext);

    const handleLogin = async () => {
        if (!credential.username || !credential.password) return;
        const resp = await axios.post(baseAPIUrl + '/user/login', credential);
        const {data: { data, errno }, status} = resp;
        console.log('handleLogin', data);
        if (status === 200 && errno === 0) {
            const { username, realname, accessToken} = data;
            setCookie('accessToken', accessToken, {path: '/'})
            setUser({
                username,
                realname,
                accessToken,
                isLoggedInUser: true
            })
            setCredential({
                username: '',
                password: ''
            })

            setModalOpen(false);
        }
    }

    return (
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}

            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                Login panel
                <div>
                    <TextField
                        id="outlined-username"
                        label="Username"
                        margin="normal"
                        required={true}
                        onChange={(event) => setCredential({
                            ...credential,
                            username: event.target.value
                        })}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        margin="normal"
                        required={true}
                        onChange={(event) => setCredential({
                            ...credential,
                            password: event.target.value
                        })}
                    />
                </div>
                <Button onClick={handleLogin}>Submit</Button>
            </Box>
        </Modal>
    )
}