import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Box, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import ScienceIcon from '@mui/icons-material/Science';
import * as Actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { isAuthenticated, user } = useSelector(({ auth }) => auth);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogoutClick = () => {
        // dispatch(clearCurrentProfile);
        dispatch(Actions.logoutUser());
        navigate('/login');
    };

    return (
        <AppBar position="fixed" className='navbar'>
            <Toolbar>
                <ScienceIcon sx={{ display: { xs: 'none', md: 'block' }, mr: 1 }} fontSize='large' />
                <ScienceIcon sx={{ display: { xs: 'block', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h4"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mt: 0.5,
                        mr: 2,
                        flexGrow: 1,
                        fontFamily: 'Algerian',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        display: {
                            xs: 'none',
                            md: 'block'
                        }
                    }}
                >
                    Unit Conversion
                </Typography>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        flexGrow: 1,
                        fontFamily: 'Algerian',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        display: {
                            xs: 'block',
                            md: 'none'
                        }
                    }}
                >
                    Unit Conversion
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                    {isAuthenticated ? (
                        <>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.firstName} src="..." />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key={'Profile'} onClick={() => {
                                    handleCloseUserMenu();
                                }}>
                                    <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                </MenuItem>
                                <MenuItem key={'Logout'} onClick={() => {
                                    handleCloseUserMenu();
                                    onLogoutClick();
                                }}>
                                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <IconButton aria-label="login" onClick={() => navigate('/login')}>
                                <LoginIcon />
                            </IconButton>
                            <IconButton aria-label="register" onClick={() => navigate('/register')}>
                                <PersonAddIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;