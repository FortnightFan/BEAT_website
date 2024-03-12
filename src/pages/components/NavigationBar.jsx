import React from 'react';
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


const NavigationBar = () => {

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 450 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItemButton>
          <ListItemText primary='hello' />
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton>
          <ListItemText primary='First' />
        </ListItemButton>

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
      
        <Button variant="contained" sx={{ ml: 3, backgroundColor: 'orange' }}>About</Button>
        <Button variant="contained" sx={{ ml: 3 }}>Register</Button>
        <Button variant="contained" sx={{ ml: 3 }}>Login</Button>
      </Box>
    </div>

  );
};

export default NavigationBar;