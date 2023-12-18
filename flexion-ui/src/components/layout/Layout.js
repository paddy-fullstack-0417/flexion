import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Navbar from './Navbar';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import * as Actions from '../../redux/actions';
import { USER_ROLE } from '../../config/enum';

const drawerWidth = 250;

function Layout(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Check for token
        if (localStorage.jwtToken) {
            // Set auth token header auth
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            // Set user and isAuthenticated
            dispatch(Actions.setCurrentUser(decoded));
            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // Logout user
                dispatch(Actions.logoutUser());
                // Clear current Profile
                // dispatch(clearCurrentProfile());
                // Redirect to login
                navigate('/login');
            } else {
                const { role } = decoded;
                if (role === USER_ROLE.TEACHER) {
                    navigate('/teacher-panel');
                } else {
                    navigate('/student-panel');
                }
            }
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;