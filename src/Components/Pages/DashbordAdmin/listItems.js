// src/Components/Pages/DashbordAdmin/Dashboard/listItems.js

import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import { FaBookOpen, FaUserPlus } from "react-icons/fa";
import { Book } from '@mui/icons-material';
import { TfiExchangeVertical } from 'react-icons/tfi';

export const mainListItems = (handleShowUserList, handleShowLivreList, handleShowForm,handleShowFormEdit,handleShowEmprunt) => (
  <React.Fragment>
    <ListItemButton onClick={handleShowUserList}>
      <ListItemIcon>
        <PeopleIcon size={25} />
      </ListItemIcon>
      <ListItemText primary="Gestion des utilisateurs" />
    </ListItemButton>
    <ListItemButton onClick={handleShowLivreList}>
      <ListItemIcon>
        <Book />
      </ListItemIcon>
      <ListItemText primary="Gestion des livres" />
    </ListItemButton>
    <ListItemButton onClick={handleShowForm}>
      <ListItemIcon>
        <FaUserPlus />
      </ListItemIcon>
      <ListItemText primary="Ajouter un utilisateur" />
    </ListItemButton>

    <ListItemButton onClick={handleShowFormEdit}>
      <ListItemIcon>
        <FaBookOpen />
      </ListItemIcon>
      <ListItemText primary="Ajouter un livre" />
    </ListItemButton>
    <ListItemButton onClick={handleShowEmprunt}>
      <ListItemIcon>
      <TfiExchangeVertical />
      </ListItemIcon>
      <ListItemText primary="Gestion des emprunts" />
    </ListItemButton>
  
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* Add secondary list items here if any */}
  </React.Fragment>
);
