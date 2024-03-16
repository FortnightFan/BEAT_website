import * as React from "react";
import './Styles.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Logo from './BEAT_Logo_Black.png';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <NavLink to='/'>
          <ListItemButton>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </NavLink>

      </List>

      <Divider />

      <List>
        <NavLink to='/profile'>
          <ListItemButton>
            <ListItemText primary='Profile' />
          </ListItemButton>
        </NavLink>


        <ListItemButton>
          <ListItemText primary='Second' />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary='Third' />
        </ListItemButton>

      </List>
    </Box>
  );


  return (
    <div>
      <Box bgcolor={'maroon'}>
        <IconButton onClick={toggleDrawer(true)} aria-label="delete" size="small">
          <img src={Logo} alt="B.E.A.T Logo" className="site-logo" />
        </IconButton>

        <Drawer sx={{color: "red",}} open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>

        <NavLink to='/'>
          <Button variant="contained" sx={{ ml: 3, backgroundColor: 'orange' }}>About</Button>
        </NavLink>

        <NavLink to='/signup'>
          <Button variant="contained" sx={{ ml: 3 }}>Register</Button>
        </NavLink>

        <NavLink to='/signin'>
          <Button variant="contained" sx={{ ml: 3 }}>Login</Button>
        </NavLink>
      </Box>
    </div>

  );
};

export default NavigationBar;