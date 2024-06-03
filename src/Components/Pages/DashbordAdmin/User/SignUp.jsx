import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaUserPlus } from 'react-icons/fa';

const defaultTheme = createTheme();

export default function SignUp() {
  const [prenom, setPrenom] = React.useState('');
  const [nom, setNom] = React.useState('');
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      prenom: prenom,
      nom: nom,
      login: login,
      password: password,
      role: role,
    };

    fetch('http://localhost:8080/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Optionally reset form fields
        setPrenom('');
        setNom('');
        setLogin('');
        setPassword('');
        setRole('');
        // Show success alert
        setShowSuccessAlert(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#4CAF50' }}>
            <FaUserPlus />
          </Avatar>
          <Typography component="h1" variant="h5">
            ajout
          </Typography>
          {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              L'utilisateur a été ajouté avec succès!
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nom"
                  required
                  fullWidth
                  id="nom"
                  label="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="prenom"
                  label="Prenom"
                  name="prenom"
                  value={prenom}
                  autoComplete="family-name"
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  name="role"
                  label="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
