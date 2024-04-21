import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from "react";
import { NavLink } from 'react-router-dom';
import Logo from './BEAT_Logo_Black.png';
import ThemeSwitcher from './ThemeSwitcher.jsx';

const NavigationBar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(newOpen);
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
          <ListItemText primary="Home" />
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
        {/* Add more ListItem components for other navigation paths */}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2, py: 1 }}>
        <ThemeSwitcher />
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'maroon' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Spacer to balance the items */}
          <Box sx={{ flex: 1 }} />

          {/* Centered logo and title */}
          <Box sx={{ display: 'flex', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Box component="img" src={Logo} alt="B.E.A.T Logo" sx={{ height: 50 }} />
            <Typography variant="h6" sx={{ alignSelf: 'center', ml: 1 }}>
              B.E.A.T
            </Typography>
          </Box>

          {/* Spacer to balance the items */}
          <Box sx={{ flex: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <Button color="inherit" component={NavLink} to="/" sx={{ color: 'white' }}>
              About
            </Button>
            <Button color="inherit" component={NavLink} to="/signup" sx={{ color: 'white' }}>
              Register
            </Button>
            <Button color="inherit" component={NavLink} to="/signin" sx={{ color: 'white' }}>
              Login
            </Button>
        </Box>  
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </>
  );
};

export default NavigationBar;
