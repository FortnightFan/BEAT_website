import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/BEAT_Logo_Black.png';
import { useAuth } from '../../context/AuthContext';
import ThemeSwitcher from './ThemeSwitcher.jsx';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography, useMediaQuery, useTheme
} from '@mui/material';

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(newOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key="Home" component={NavLink} to="/">
          <ListItemText primary="Home Page" />
        </ListItem>
        <ListItem button key="Profile" component={NavLink} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button key="Previous Workouts" component={NavLink} to="/profile/prevworkouts">
          <ListItemText primary="Previous Workouts" />
        </ListItem>
        <ListItem button key="Body" component={NavLink} to="/profile/bodydata">
          <ListItemText primary="Body" />
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2, py: 1 }}>
        <ThemeSwitcher />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: 'maroon' }}>
        <Toolbar>
        {isAuthenticated  && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', marginLeft: '120px' }}>
              <Box component="img" src={Logo} alt="B.E.A.T Logo" sx={{ height: 50 }} />
              <Typography variant="h6" sx={{ marginLeft: '5px' }}>
                B.E.A.T
              </Typography>
            </NavLink>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                {!isSmallScreen && (
                  <>
                    <Button color="inherit" component={NavLink} to="/signup">Register</Button>
                    <Button color="inherit" component={NavLink} to="/signin">Login</Button>
                  </>
                )}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
      )}
    </>
  );
};

export default NavigationBar;
