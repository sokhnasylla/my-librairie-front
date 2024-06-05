import { Grid, Typography, Card, CardMedia, CardContent, Box, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTokenFromLocalStorage } from '../Pages/Auth/authUtils';
import axios from 'axios';
import { AiFillInteraction } from 'react-icons/ai';

function ListLivres() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const token = getTokenFromLocalStorage();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
    console.log(livreId);
    const userToken = getTokenFromLocalStorage();
    const decodedToken = JSON.parse(atob(userToken.split('.')[1])); // Décodez le token JWT pour obtenir les informations de l'utilisateur
    const userId = decodedToken.id; // Assurez-vous que l'ID de l'utilisateur est présent dans le token JWT

    try {
    
      const response = await axios.post("http://localhost:8080/emprunts", {
        userId,
        livreId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Emprunt enregistré avec succès", response.data);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'emprunt", error);
    }
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
                Theme: {livre.theme}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Genre: {livre.genre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date de Publication: {formatDate(livre.datePublication)}
              </Typography>
              <IconButton  onClick={() => handleBorrow(livre.id)}>
              <AiFillInteraction/> 
              </IconButton>
              {/*  //onclick il get les donnes du user(id,nom,prenom,login) 
               //et les stocke dans la table emprunt et get aussi l'id du livre */}
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
    </Box>
  );
}

export default ListLivres;
