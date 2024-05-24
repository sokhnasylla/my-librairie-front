import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

function ResultSearch({ livre }) {
    return (
        <Box sx={{ p: 2 }}>
            {livre.map((result, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                    <Card sx={{ display: 'flex', borderRadius: '15px', boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 140, objectFit: 'contain' }}
                            image={result.image && `data:image/png;base64,${result.image}`}
                            alt={result.titre}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                                        {result.titre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Auteur: {result.auteur}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Thème: {result.theme}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Genre: {result.genre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Date de Publication: {formatDate(result.datePublication)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to="/home"
                                        sx={{ mt: 2 }}
                                    >
                                        Retour à l'accueil
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>
    );
}

export default ResultSearch;
