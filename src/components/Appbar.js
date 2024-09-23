import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {

  const {logout} = useAuth()

  const navigate = useNavigate();

  const logoutUser = () => {
    logout()
    navigate("/login")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Products List
          </Typography>
          <Button onClick={logoutUser} color="inherit">Logout</Button>
          <a href='/registration'>REGISTER</a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
