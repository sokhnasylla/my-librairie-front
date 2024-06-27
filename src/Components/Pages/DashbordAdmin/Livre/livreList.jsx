import { IconButton, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getTokenFromLocalStorage} from '../../Auth/authUtils';
import Title from '../Title';

function Livres({onEditLivre}) {
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

  const handleDeleteClick = async(id) =>{
    console.log();
    console.log(id);
   try{
    const response = await fetch(`http://localhost:8080/admin/deletelivre/${id}`,{
      method: 'DELETE',
      headers: {
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
          const response = await axios.get("http://localhost:8080/public/livre", config);
          setData(response.data);
        } catch (error) {
          setError(`Erreur: ${error.message}`);
        }
      };
      fetchData(); 
    }
   }catch(error){
    console.error('une erreur s\'est produite lors de la suppression du livre : ',error);
   }
  };

    const handleEditClick = async(id) =>{
      console.log(id);
      try{
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`
              },
          };
          const response = await axios.get(`http://localhost:8080/admin/livreDetails/${id}`,config);
          onEditLivre(response.data);
          //console.log(response.data);
      }catch(error){
        console.error('Une erreur s\'est produite lors de la recuperation des infos du livre : ',error);
      }
    };

  
  return (
    <React.Fragment>
      <Title>Livres</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Image</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Titre</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Auteur</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Theme</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Genre</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Date Publication</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((livre) => (
              <TableRow key={livre.id}>
                <TableCell sx={{ color: 'black' }}>
                  {livre.image && <img src={`data:image/png;base64,${livre.image}`} style={{ maxWidth: '100px', maxHeight: '100px' }} alt={livre.titre} />}
                </TableCell>
                <TableCell sx={{ color: 'black' }}>{livre?.titre}</TableCell>
                <TableCell sx={{ color: 'black' }}>{livre?.auteur}</TableCell>
                <TableCell sx={{ color: 'black' }}>{livre?.theme}</TableCell>
                <TableCell sx={{ color: 'black' }}>{livre?.genre}</TableCell>
                <TableCell sx={{ color: 'black' }}>{formatDate(livre?.datePublication)}</TableCell>
                <TableCell sx={{ color: 'black' }}>
                  <IconButton aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" sx={{ color: '#1976D2' }}  onClick={() => handleEditClick(livre.id)} />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={() => handleDeleteClick(livre.id)}>
                    <DeleteIcon fontSize="inherit" sx={{ color: 'red' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <Link to="#" style={{ color: "#FF6600" }}>{error}</Link>}
    </React.Fragment>
  );
}

export default Livres;
