import React, { useEffect, useState } from 'react';
import { getTokenFromLocalStorage } from '../Pages/Auth/authUtils';
import axios from 'axios';
import { AiFillInteraction } from 'react-icons/ai';
import { jwtDecode } from 'jwt-decode';
import { Grid, Typography, Card, CardMedia, CardContent, Box, IconButton, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

function ListLivres() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [userLogin, setUserLogin] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const token = getTokenFromLocalStorage();

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      setUserLogin(decode.sub);
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get("http://localhost:8080/public/livre", config);
        setData(response.data);
      } catch (error) {
        setError(`Erreur: ${error.message}`);
      }
    };

    fetchData();
  }, [token]);

  const handleBorrow = async (livreId) => {
    const quantite = quantities[livreId] || 1;

    try {
      const response = await axios.post("http://localhost:8080/emprunts", null, {
        params: {
          userLogin: userLogin,
          livreId,
          quantiteLivre: quantite
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSnackbarOpen(true); // Ouvre la Snackbar après un emprunt réussi
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'emprunt", error);
    }
  };

  const handleQuantiteChange = (livreId, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [livreId]: Math.max(1, (prevQuantities[livreId] || 1) + value)
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {data?.map((livre) => (
          <Grid item xs={12} key={livre.id}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 140, objectFit: 'contain' }}
                image={livre.image && `data:image/png;base64,${livre.image}`}
                alt={livre.titre}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {livre.titre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Auteur: {livre.auteur}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Genre: {livre.genre}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton onClick={() => handleQuantiteChange(livre.id, -1)} disabled={(quantities[livre.id] || 1) <= 1}>
                    -
                  </IconButton>
                  <Typography variant="body2" sx={{ mx: 1 }}>{quantities[livre.id] || 1}</Typography>
                  <IconButton onClick={() => handleQuantiteChange(livre.id, 1)}>
                    +
                  </IconButton>
                </Box>

                <IconButton onClick={() => handleBorrow(livre.id)}>
                  <AiFillInteraction />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {error && (
          <Grid item xs={12}>
            <Typography variant="h6" color="error" align="center" sx={{ mt: 3 }}>
              {error}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Emprunt enregistré avec succès
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ListLivres;
