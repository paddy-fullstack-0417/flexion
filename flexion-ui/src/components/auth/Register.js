import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Actions from '../../redux/actions';
import { USER_ROLE } from '../../config/enum';
import { FormControl, Radio, RadioGroup } from '@mui/material';

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Patrick Clifford{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const defaultTheme = createTheme();

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const error = useSelector(({ error }) => error);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(Actions.registerUser({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            password2: data.get('password2'),
            role: data.get('role')
        }, navigate));
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?science)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={error.email ? true : false}
                                helperText={error.email}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="firstName"
                                error={error.firstName ? true : false}
                                helperText={error.firstName}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                error={error.lastName ? true : false}
                                helperText={error.lastName}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={error.password ? true : false}
                                helperText={error.password}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password2"
                                label="Confirm Password"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                                error={error.password2 ? true : false}
                                helperText={error.password2}
                            />
                            <FormControl sx={{ padding: '0 4px' }}>
                                <RadioGroup
                                    defaultValue={USER_ROLE.TEACHER}
                                    name="role"
                                    row
                                >
                                    <FormControlLabel value={USER_ROLE.TEACHER} control={<Radio />} label="Teacher" />
                                    <FormControlLabel value={USER_ROLE.STUDENT} control={<Radio />} label="Student" />
                                </RadioGroup>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Link href="/login" variant="body2">
                                {"You already have an account? Sign In"}
                            </Link>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Register;