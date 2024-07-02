import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography, Alert } from '@mui/material';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

function ResultSearch({ livre }) {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <Box sx={{ p: 2 }}>
            {livre.length === 0 ? (
                <>
                    <Alert variant="filled" severity="warning">
                        Aucun livre trouvé , veuillez ressayer.
                    </Alert>
                    <Button variant="contained" color="primary" onClick={handleReload} sx={{ mt: 2 }}>
                        Accueil
                    </Button>
                </>
            ) : (
                livre.map((result, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', borderRadius: '15px', boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                sx={{ width: '100%', height: 200, objectFit: 'contain' }}
                                image={result.image && `data:image/png;base64,${result.image}`}
                                alt={result.titre}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
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
                                </Grid>
                            </CardContent>
                            <Box sx={{ textAlign: 'center', p: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleReload}
                                    sx={{ mt: 2 }}
                                >
                                    Accueil
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                ))
            )}
        </Box>
    );
}

export default ResultSearch;
