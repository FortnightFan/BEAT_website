// SubNav.jsx
import { AppBar, Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import BreadcrumbNav from './Breadcrumbs.jsx';

const SubNav = ({ title, crumbs }) => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ marginTop: theme.spacing(8) }}> {/* Adjust spacing as needed */}
        <AppBar position="static" sx={{ width: '100%', marginBottom: 2 }}>
          <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
            {title}
          </Typography>
        </AppBar>
        <BreadcrumbNav crumbs={crumbs} />
      </Box>
    </>
  );
};

export default SubNav;
