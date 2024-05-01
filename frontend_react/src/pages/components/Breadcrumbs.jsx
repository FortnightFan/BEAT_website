import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const BreadcrumbNav = ({ crumbs = [] }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {crumbs.map((crumb, index) => {
        const last = index === crumbs.length - 1;
        return last ? (
          <Typography color="text.primary" key={index}>{crumb.label}</Typography>
        ) : (
          <Link component={RouterLink} to={crumb.path} key={index}>
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
