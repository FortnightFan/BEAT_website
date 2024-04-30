import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Link, Snackbar, TextField, Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import SubNav from './components/Subnav';

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errors, setErrors] = useState({});  // Renamed for clarity

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, first_name, last_name } = userInfo;
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, first_name, last_name }),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        setOpenSnackbar(true);
        setSnackbarMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate('/signin', { state: { fromSignUp: true } });  // Redirect to login after showing message
        }, 2000);  // Wait for 3 seconds before redirecting
      }
        //login(responseData.token);
        //navigate('/signin');
      else {
        const fieldErrors = {};
        let detailedErrorMessage = "Registration failed: ";
        if (responseData.errors) {
          let parsedErrors;
          try {
            parsedErrors = JSON.parse(responseData.errors);
          } catch (jsonError) {
            console.error("Parsing error:", jsonError);
            setSnackbarMessage("Error parsing server response. Please try again.");
            setOpenSnackbar(true);
            return;  // Stop further execution
          }
          Object.entries(parsedErrors).forEach(([key, value]) => {
            const message = value.map(err => err.message).join(", ");
            fieldErrors[key] = message;
            detailedErrorMessage += `${message}. `; // Removed field name from the message
          });
        }
        setErrors(fieldErrors);
        console.error(detailedErrorMessage); // Log detailed error message to console
        setSnackbarMessage(detailedErrorMessage); // Display detailed error message in Snackbar
        setOpenSnackbar(true);
        throw new Error(detailedErrorMessage); // Optional: might remove if throwing is unnecessary
      }
    } catch (error) {
      console.error(error.toString());
      setSnackbarMessage(error.message || "An unexpected error occurred.");
      setOpenSnackbar(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
    // Clear errors for the specific field when it is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Register', path: '/signup' },
  ];

  return (
    <>
      <SubNav title={'Register'} crumbs={crumbs}/>
      <Container component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
            justifyContent: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'maroon' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleInputChange}
                  value={userInfo.first_name}
                  error={!!errors.first_name}
                  helperText={errors.first_name || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={handleInputChange}
                  value={userInfo.last_name}
                  error={!!errors.last_name}
                  helperText={errors.last_name || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleInputChange}
                  value={userInfo.email}
                  error={!!errors.email}
                  helperText={errors.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  value={userInfo.password}
                  error={!!errors.password}
                  helperText={errors.password || ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link component={RouterLink} to="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
              {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}

export default SignUp;
