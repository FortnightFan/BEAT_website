// Footer.jsx
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 3, // Padding top & bottom
        px: 2, // Padding left & right
        mt: 'auto', // Margin top auto for pushing footer to the bottom
        backgroundColor: 'maroon', // Example background color
        color: 'white', // Text color
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          &copy; {new Date().getFullYear()} B.E.A.T. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
