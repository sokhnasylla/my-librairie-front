import { IconButton, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../../Auth/authUtils';

function Livres() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [deletedIds, setDeletedIds] = useState([]);
  const token = getTokenFromLocalStorage();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    console.log('ID du livre à supprimer:', id); // Journal de l'ID
    try {
      if (!id) {
        console.error('ID du livre est indéfini');
        return;
      }

      const token = getTokenFromLocalStorage(); 
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`http://localhost:8080/admin/deletelivre/${id}`, config);
      setDeletedIds([...deletedIds, id]);
    } catch (error) {
      console.error('Erreur lors de la suppression du livre:', error);
      setError(`Erreur: ${error.message}`);
    }
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

  return (
    <React.Fragment>
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
          {data
            .filter(livre => !deletedIds.includes(livre.id))
            .map((livre) => (
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
                    <EditIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={() => handleDelete(livre.id)}>
                    <DeleteIcon fontSize="inherit" sx={{ color: '#FF6600' }} />
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
