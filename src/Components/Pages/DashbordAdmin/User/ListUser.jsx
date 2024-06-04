import React, { useEffect, useState } from 'react';
import { IconButton, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Title from '../Title';
import EditUser from './EditUser'


function ListUser(onEditUser) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const token = getTokenFromLocalStorage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get("http://localhost:8080/admin/users", config);
                setData(response.data);
            } catch (error) {
                setError(`Erreur: ${error.message}`);
            }
        };
        fetchData();
    }, [token]);

    const handleDeleteClick = async (id) => {
        console.log('ID de l\'utilisateur à supprimer:', id);
        try {
            const response = await axios.delete(`http://localhost:8080/admin/deleteuser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setData(data.filter(user => user.id !== id)); 
            }
        } catch (error) {
            console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur : ', error);
        }
    };

    const handleEditClick = async (id) => {
        console.log(id);
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`http://localhost:8080/admin/detailsuser/${id}`, config);
          onEditUser(response.data);
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la récupération des données de l\'utilisateur : ', error);
        }
      };
    
    return (
        <React.Fragment>
            <Title>Utilisateurs</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Nom</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Prénom</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Login</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Rôle</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell sx={{ color: 'black' }}>{user.nom}</TableCell>
                            <TableCell sx={{ color: 'black' }}>{user.prenom}</TableCell>
                            <TableCell sx={{ color: 'black' }}>{user.login}</TableCell>
                            <TableCell sx={{ color: 'black' }}>{user.role}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit" size="small" onClick={() => handleEditClick(user.id)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {error && (
                <Link href="#" color="secondary">
                    {error}
                </Link>
            )}
        </React.Fragment>
    );
}

export default ListUser;
