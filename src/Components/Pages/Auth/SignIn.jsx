import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../../../Components/images/background.png'
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { getTokenFromLocalStorage, storeTokenInLocalStorage } from './authUtils';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
     {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function SignInSide() {
const[login,setLogin]= React.useState("");
const[password,setPassword]=React.useState("");
const[loading,setLoading]=React.useState(false);
const[error,setError]=React.useState(false);
const[isLoggedSuccess,setLoggedSucess]=React.useState(false);
const[role,setRole]= React.useState("");

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const data = new FormData(event.currentTarget);
   
    try{
      const response = await axios.post("http://localhost:8080/auth/signIn",{
        login,
        password
      });
      console.log(response);
      if(response.data.statusCode=200){
        console.log(response.data.token);
        setLoggedSucess(true);
        storeTokenInLocalStorage(response.data.token);
      }
      else{
        setError(response.data.message);
      }
    }catch(error){
      console.error("Error lors de la connexion");
    }finally{
      setLoading(false);
    }
  
  
  };
  const fetchUserDetails = async () => {
    const token = getTokenFromLocalStorage();
    const mytoken = jwtDecode(token);
    const login = mytoken.sub;
    console.log(login);

    try {
      const response = await axios.get(`http://localhost:8080/public/searchByLogin?login=${login}`);
      // console.log(response.data[0].role);
      setRole(response.data[0].role)

    } catch (error) {
      console.error("Error lors de la connexion", error);
    } finally {
      setLoading(false);
    }
    
  };
   if(isLoggedSuccess){
   fetchUserDetails();
   console.log(role);
   if(role === 'ADMIN'){
    return <Navigate to="/admin/dashboard"/>
   }
   if(role === 'USER'){
    return <Navigate to="/home"/>
   }
   
    
 
   }

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
            backgroundImage:`url(${background})`,
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
            <Avatar sx={{ m: 1, bgcolor: '#4F3127' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Connexion
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login"
                label="login"
                name="login"
                autoComplete="login"
                autoFocus
                value={login}
                onChange={(e) => setLogin(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loading ? (
                <Button
                fullWidth
                disabled
                sx={{mt:4,mb:2}}
                >
               loading ...
                </Button>
              ):(
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,backgroundColor:"#4F3127",
                  "&:hover":{
                    backgroundColor:"#4F3127",
                  },
                }}
              >
               Se connecter
              </Button>
              )}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default SignInSide;
