import { ListItem, Paper } from '@mui/material';
import React from 'react';

const HoverListItem = ({ children, onClick, sx, ...otherProps }) => {

  const defaultPaperStyles = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    maxWidth: 600, 
    flexGrow: 0, 
    width: '100%',
    margin: '1rem auto',
    padding: 1,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      cursor: 'pointer',
    },
  };

  return (
    <ListItem
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: 0,
        ...sx, 
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
