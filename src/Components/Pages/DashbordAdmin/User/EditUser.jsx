import React, { useState, useEffect } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import Alert from 'react-bootstrap/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';

const defaultTheme = createTheme();

export default function EditUser({ user, onClose }) {
    const [formData, setFormData] = useState({ ...user });
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
            await axios.put(`http://localhost:8080/admin/updateuser/${formData.id}`, formData, config);
            setShowSuccessAlert(true);
            onClose();
        } catch (error) {
            setError(`Une erreur s'est produite lors de la mise à jour de l'utilisateur : ${error.message}`);
        }
    };

    useEffect(() => {
        setFormData({ ...user });
    }, [user]);

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
                        <FaUserEdit />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Modifier Utilisateur
                    </Typography>
                    {showSuccessAlert && (
                        <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            L'utilisateur a été modifié avec succès!
                        </Alert>
                    )}
                    {error && (
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {error}
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
                                    value={formData.nom}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="prenom"
                                    required
                                    fullWidth
                                    id="prenom"
                                    label="Prenom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                   autoComplete="given-name"
                                   name="login"
                                   required
                                   fullWidth
                                   id="login"
                                   label="Login"
                                   value={formData.login}
                                   onChange={handleChange}
                                   autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Nouveau mot de passe"
                                    type="password"
                                    value={formData.password || ''}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="role"
                                    label="Role"
                                    value={formData.role}
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
