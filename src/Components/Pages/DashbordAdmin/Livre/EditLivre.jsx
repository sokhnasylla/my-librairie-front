import React, { useEffect, useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import Alert from 'react-bootstrap/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';

const defaultTheme = createTheme();

function EditLivre({ livre, onClose }) {
  const [formData, setFormData] = useState({ ...livre });
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const token = getTokenFromLocalStorage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`http://localhost:8080/admin/updatelivre/${formData.id}`, formData, config);
      setShowSuccessAlert(true);
      onClose();

    } catch (error) {
      setError(`Une erreur s'est produite lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
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
            <MdLibraryAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Modification de livre
          </Typography>
          {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              Livre modifié avec succès!
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="titre"
                  name="titre"
                  required
                  fullWidth
                  id="titre"
                  label="Titre"
                  value={formData.titre}
                  onChange={handleChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="auteur"
                  label="Auteur"
                  name="auteur"
                  value={formData.auteur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="theme"
                  label="Thème"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="genre"
                  label="Genre"
                  id="genre"
                  value={formData.genre}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="datePublication"
                  label="Date de Publication"
                  id="datePublication"
                  type="date"
                  value={formData.datePublication}
                  onChange={handleChange}
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

export default EditLivre;
