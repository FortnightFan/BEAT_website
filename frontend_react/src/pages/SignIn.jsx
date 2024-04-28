import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import SubNav from './components/Subnav';

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();

    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }
      setOpenSnackbar(false);
  };

    const sendData = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        });

        const responseData = await response.json();

        if (response.ok) {
            setResponseMessage("Login successful! Redirecting to your profile...");
            console.log(responseMessage);
            login(responseData.token);
            navigate('/profile');

        } else {
            throw new Error(responseData.message || 'Login failed due to unexpected error.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage(error.message);
        setError(true);
        setSnackbarMessage(error.message);
        setOpenSnackbar(true);
    }
  };

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setError(false);
      sendData(event);
    };

    const crumbs = [
      { label: 'Home', path: '/' },
      { label: 'Login', path: '/signin' },
    ];

    return (
      <>
      <SubNav title={'Login'} crumbs={crumbs}/>
      <Container component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center',
            animation: error ? 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both' : 'none'
          }}
          style={{ '@keyframes shake': {
                      '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                      '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                      '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                      '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
                  }}}
        >
          <Avatar sx={{ m: 1, bgcolor: 'maroon' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              sx={{ '& .MuiInputBase-root': { borderColor: error ? 'red' : '' } }}
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
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              helperText={error ? errorMessage : ''}
              sx={{ '& .MuiInputBase-root': { borderColor: error ? 'red' : '' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3,
                    mb: 2,
                    "&:hover": {backgroundColor: "maroon",}
                  ,}}
            >
              Sign In
            </Button>

            <p>{responseMessage}</p>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                  <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                      {snackbarMessage}
                  </Alert>
              </Snackbar>
      </Container>
      </>
    );
    
}

export default SignIn;
