import React, { useEffect, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import Alert from 'react-bootstrap/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';

const defaultTheme = createTheme();

export default function EditUser(props) {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/detailsuser/${props.userId}`, {
                    headers: {
                        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                    },
                });
                const userData = response.data;
                setNom(userData.nom);
                setPrenom(userData.prenom);
                setLogin(userData.login);
                setRole(userData.role);
            } catch (error) {
                console.error('Erreur lors du chargement des détails de l\'utilisateur : ', error);
            }
        };
        if (props.userId) {
            fetchData();
        }
    }, [props.userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/admin/updateuser/${props.userId}`, {
                nom,
                prenom,
                login,
                password,
                role,
            }, {
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
                },
            });
            if (response.status === 200) {
                setShowSuccessAlert(true);
                // Fermer le formulaire d'édition après une modification réussie
                props.onClose();
            }
        } catch (error) {
            setError(`Erreur: ${error.message}`);
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
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="login"
                                    label="Login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="role"
                                    label="Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
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
