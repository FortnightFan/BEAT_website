// SubNav.jsx
import { AppBar, Typography } from '@mui/material';
import React from 'react';
import BreadcrumbNav from './Breadcrumbs.jsx';

const SubNav = ({ title, crumbs }) => {
  return (
    <>
      <AppBar position="static" sx={{ width: '100%', marginBottom: 2 }}>
        <Typography variant="h6" align="center" sx={{ padding: 1, color: 'white' }}>
          {title}
        </Typography>
      </AppBar>
      <BreadcrumbNav crumbs={crumbs} />
    </>
  );
};

export default SubNav;
