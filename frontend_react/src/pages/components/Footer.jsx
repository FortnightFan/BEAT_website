// Footer.jsx
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'maroon',
        color: 'white',
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
