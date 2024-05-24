import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import ResultSearch from '../Livres/ResultSearch';
import ListLivres from '../Livres/ListLivres';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [livre, setLivre] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const response = await axios.get(`http://localhost:8080/public/searchlivre?titre=${searchQuery}`);
        setLivre(response.data);
        setShowSearchResults(true);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching the search results!", error);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:"#8b4513"}}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
   
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' },fontFamily:"Gill Sans Extrabold" }}
            >BOOKSTORE
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push search to the right */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}      
            />
          </Search>
        </Toolbar>
      </AppBar>
      {showSearchResults ? <ResultSearch livre={livre}/> : <ListLivres/>}
    </Box>
  );
}

