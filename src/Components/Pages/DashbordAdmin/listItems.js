// src/Components/Pages/DashbordAdmin/Dashboard/listItems.js

import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import NoteIcon from '@mui/icons-material/Note';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from '@mui/material';
import { FaBookOpen, FaChartLine, FaUserPlus } from "react-icons/fa";
import { Book } from '@mui/icons-material';

export const mainListItems = (handleShowUserList, handleShowLivreList, handleShowForm,handleShowFormEdit) => (
  <React.Fragment>
    <ListItemButton onClick={handleShowUserList}>
      <ListItemIcon>
        <PeopleIcon size={25} />
      </ListItemIcon>
      <ListItemText primary="Utilisateurs" />
    </ListItemButton>
    <ListItemButton onClick={handleShowLivreList}>
      <ListItemIcon>
        <Book />
      </ListItemIcon>
      <ListItemText primary="Livres" />
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
    <ListItemButton>
      <ListItemIcon>
        <FilterNoneOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Gestion des emprunts" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NoteIcon />
      </ListItemIcon>
      <ListItemText primary="Carnet D'adresse" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Supervision Metier" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Supervision Technique" />
    </ListItemButton>
    <Link href="/admin/role" color="initial" underline='none'>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItemButton>
    </Link>
    <Link href="/admin/user" color="initial" underline='none'>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Utilisateurs" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* Add secondary list items here if any */}
  </React.Fragment>
);
