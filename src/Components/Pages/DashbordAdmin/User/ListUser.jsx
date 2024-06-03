import React, { useEffect, useState } from 'react';
import { IconButton, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function ListUser() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const token = getTokenFromLocalStorage();
    const navigate = useNavigate();

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
        console.log(id);
        try {
          const response = await fetch(`http://localhost:8080/admin/deleteuser/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
          if (response == 200) {
            setData(data.filter(user => user.id !== id)); // Update the state to reflect the deletion
            // Optionally, you can refresh the user list or redirect to another page
            // window.location.href = "/admin/user"; 
          }
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur : ', error);
        }
      };
      
    return (
        <React.Fragment>
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
                            <TableCell sx={{ color: 'black' }}>{user?.nom}</TableCell>
                            <TableCell sx={{ color: 'black' }}>{user?.prenom}</TableCell>
                            <TableCell sx={{ color: 'black' }}>{user?.login}</TableCell>
                            <TableCell sx={{ color: 'black' }}>{user?.role}</TableCell>
                            <TableCell sx={{ color: 'black' }}>
                                <IconButton aria-label="edit" size="small">
                                    <EditIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(user.id)}>
                                    <DeleteIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {error && (
                <Link color="#FF6600" href="#" sx={{ mt: 3 }}>
                    {error}
                </Link>
            )}
        </React.Fragment>
    );
}

export default ListUser;