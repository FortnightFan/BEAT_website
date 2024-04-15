// HoverListItem.jsx
import { ListItem, Paper } from '@mui/material';
import React from 'react';

const HoverListItem = ({ children, onClick, sx, ...otherProps }) => {
  // Define default styles for Paper component inside HoverListItem
  const defaultPaperStyles = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    maxWidth: 600, 
    flexGrow: 0, 
    width: '100%', // Adjust if you want the Paper to have a specific width
    margin: '1rem auto', // Center Paper with automatic margins
    padding: 1, // Add padding inside the Paper
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)', // Change background color on hover
      cursor: 'pointer', // Change cursor to pointer on hover
    },
  };

  return (
    <ListItem
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
        ...sx, // Apply any additional styles passed via the sx prop
      }}
      {...otherProps}
    >
      <Paper sx={{ ...defaultPaperStyles, ...sx }} elevation={2}>
        {children}
      </Paper>
    </ListItem>
  );
};

export default HoverListItem;
