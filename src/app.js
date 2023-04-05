import './app.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/routers'
import { UserContext } from './userContext/user-context';
import {  useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from 'axios';
import { baseAPIUrl } from './utils/commUtils';


function App() {

    const [user, setUser] = useState({
        username: '',
        realname: '',
        isAdmin: false,
        isLoggedInUser: false
    });
    const [cookies, setCookie, _] = useCookies(['accessToken']);
    
    useEffect(() => {
        const accessToken = cookies.accessToken;
        if (!!accessToken) {
            axios.post(baseAPIUrl + '/user/loggedIn', {accessToken}).then(resp => {
                const { data: {data, errno }, status} = resp;
                if (status === 200 && errno !== -1) {
                    const { username, realname, isLoggedInUser } = data;
                    setUser({
                        ...user,
                        username,
                        realname,
                        isLoggedInUser: isLoggedInUser
                    })
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id='app-container'>
            <CookiesProvider >
                <UserContext.Provider value={{
                    user,
                    setUser,
                    cookies,
                    setCookie,
                }}>
                    <RouterProvider router={router} />
                </UserContext.Provider>
            </CookiesProvider>
        </div>
    );
}

export default App;
