import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { FaBookOpen } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Utilisateurs" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FaBookOpen />
      </ListItemIcon>
      <ListItemText primary="Livres" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <FaUserPlus />
      </ListItemIcon>
      <ListItemText primary="Ajouter un utilisateur" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Ajouter un livre" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
   
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
