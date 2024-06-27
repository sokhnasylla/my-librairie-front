import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Paper } from '@mui/material';
import SignUp from '../User/AjoutUser';
import ListUser from '../User/ListUser';
import Livres from '../Livre/livreList';

import { mainListItems, secondaryListItems } from '../listItems';  
import AjoutLivre from '../Livre/AjoutLivre';
import EditUser from '../User/EditUser';
import EditLivre from '../Livre/EditLivre';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [showUserList, setShowUserList] = React.useState(false);
  const [showLivreList, setShowLivreList] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [showFormEdit,setShowFormEdit] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleShowUserList = () => {
    setShowUserList(true);
    setShowLivreList(false);
    setShowForm(false);
    setShowFormEdit(false);
  };

  const handleShowLivreList = () => {
    setShowLivreList(true);
    setShowUserList(false);
    setShowForm(false);
    setShowFormEdit(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowLivreList(false);
    setShowUserList(false);
    setShowFormEdit(false);
  };
  
  const handleShowFormEdit =  () => {
    setShowFormEdit(true);
    setShowForm(false);
    setShowLivreList(false);
    setShowUserList(false);
  }

  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedLivre, setSelectedLivre] = React.useState(null);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowUserList(false);
    };

    const handleEditLivre = (livre)  => {
     setSelectedLivre(livre);
     setShowLivreList(false);

    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit">
              BOOKSTORE
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems(handleShowUserList, handleShowLivreList, handleShowForm,handleShowFormEdit)}
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              {showUserList && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <ListUser onEditUser={handleEditUser} />
                  </Paper>
                </Grid>
              )}
              {showLivreList && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Livres onEditLivre={handleEditLivre}/>
                  </Paper>
                </Grid>
              )}
              {showForm && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <SignUp />
                  </Paper>
                </Grid>
              )}
              {showFormEdit && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <AjoutLivre />
                  </Paper>
                </Grid>
              )}
              {selectedUser &&(
                <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                <EditUser
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
                 </Paper>
                </Grid>
            )}
             {selectedLivre &&(
                <Grid item xs={12}> 
                <Paper sx={{ p: 2 }}>
                <EditLivre
                    livre={selectedLivre}
                    onClose={() => setSelectedLivre(null)}
                />
                 </Paper>
                </Grid>
            )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}