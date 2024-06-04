import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaUserPlus } from 'react-icons/fa';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
import { MdLibraryAdd } from 'react-icons/md';

function AjoutLivre() {
  const [titre, setTitre] = React.useState('');
  const [auteur, setAuteur] = React.useState('');
  const [theme, setTheme] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [datePublication, setDatePublication] = React.useState('');
  const [image, setImage] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState(''); // Ajouter un état pour l'aperçu de l'image
  const [details, setDetails] = React.useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      titre: titre,
      auteur: auteur,
      theme: theme,
      genre: genre,
      datePublication: datePublication,
      image: image,
      details: details,
    };

    const token = getTokenFromLocalStorage();

    fetch('http://localhost:8080/admin/addlivre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        // Optionally reset form fields
        setTitre('');
        setAuteur('');
        setTheme('');
        setGenre('');
        setDatePublication('');
        setImage('');
        setDetails('');
        setImagePreview(''); // Réinitialiser l'aperçu de l'image
        // Show success alert
        setShowSuccessAlert(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // Vérifiez et supprimez les répétitions du préfixe si nécessaire
        const correctedBase64String = base64String.replace(/^data:image\/(png|jpeg);base64,/, '');
        setImage(`data:image/${file.type.split('/')[1]};base64,${correctedBase64String}`);
        setImagePreview(`data:image/${file.type.split('/')[1]};base64,${correctedBase64String}`); // Mettre à jour l'aperçu de l'image
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultTheme = createTheme();

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
          <MdLibraryAdd/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Ajout
          </Typography>
          {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              Livre a été ajouté avec succès!
            </Alert>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="titre"
                  required
                  fullWidth
                  id="titre"
                  label="Titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="auteur"
                  label="Auteur"
                  name="auteur"
                  value={auteur}
                  autoComplete="family-name"
                  onChange={(e) => setAuteur(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="theme"
                  label="Theme"
                  name="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="genre"
                  label="Genre"
                  id="genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="datePublication"
                  label="Date Publication"
                  id="datePublication"
                  type="date"
                  value={datePublication}
                  onChange={(e) => setDatePublication(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="details"
                  label="Details"
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  required
                  fullWidth
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Aperçu de l'image" style={{ marginTop: '10px', maxWidth: '100%' }} />
                )}
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

export default AjoutLivre;
