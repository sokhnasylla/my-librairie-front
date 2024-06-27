import { Grid, Typography, Card, CardMedia, CardContent, Box, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTokenFromLocalStorage } from '../Pages/Auth/authUtils';
import axios from 'axios';
import { AiFillInteraction } from 'react-icons/ai';
import { jwtDecode } from 'jwt-decode';
import SearchAppBar from '../Pages/HomePublic';

function ListLivres() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const token = getTokenFromLocalStorage();
  const [quantities, setQuantities] = useState({});

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 const [userlogin,setUserLogin]= useState("");
  useEffect(() =>{
    if(token){
      const decode = jwtDecode(token);
      setUserLogin(decode.sub)
    }
  },[token]);

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
    console.log(userlogin);
    const quantite = quantities[livreId] || 1;
  
    try {
      const response = await axios.post("http://localhost:8080/emprunts", null, {
        params: {
          userLogin: userlogin,
          livreId,
          quantiteLivre: quantite 
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Emprunt enregistré avec succès", response.data);
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
    </Box>
  );
}

export default ListLivres;
