import React, { useEffect, useState } from 'react'
import Title from '../Title'
import { Table } from 'react-bootstrap'
import { IconButton, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { getTokenFromLocalStorage } from '../../Auth/authUtils';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function ListEmprunts() {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const token = getTokenFromLocalStorage();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get("http://localhost:8080/admin/emprunts", config);
                setData(response.data);
            } catch (error) {
                setError(`Erreur: ${error.message}`);
            }
        };
        fetchData();
    }, [token]);
   
    const handleDeleteClick = async(id) => {
        try{
            const response = await fetch(`http://localhost:8080/admin/deleteEmprunt/${id}`,{
                method: 'DELETE',
                headers:{
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
            });
            if(response.status === 200){
                const fetchData = async () => {
                    try {
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        };
                        const response = await axios.get("http://localhost:8080/admin/emprunts", config);
                        setData(response.data);
                    } catch (error) {
                        setError(`Erreur: ${error.message}`);
                    }
                };
                fetchData();
            }
            
        }catch(error){
            console.error('une erreur s\'est produite lors de la suppression de l\'utilisateur : ',error);
           }
    }

  return (
    <React.Fragment>
    <Title>Emprunts</Title>
    <Table size="small">
        <TableHead>
            <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Id</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Quantité de Livre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>LivreId</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>UserId</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data?.map((emprunt) => (
                <TableRow key={emprunt.id}>
                    <TableCell sx={{ color: 'black' }}>{emprunt.id}</TableCell>
                    <TableCell sx={{ color: 'black' }}>{emprunt.quantiteLivre}</TableCell>
                    <TableCell sx={{ color: 'black' }}>{emprunt.livreId}</TableCell>
                    <TableCell sx={{ color: 'black' }}>{emprunt.userId}</TableCell>
                    <TableCell>
                        <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(emprunt.id)}>
                            <DeleteIcon fontSize="inherit" sx={{color:"red"}}  />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    {error && <Link to="#" style={{ color: "#FF6600" }}>{error}</Link>}
</React.Fragment>
  )
}

export default ListEmprunts