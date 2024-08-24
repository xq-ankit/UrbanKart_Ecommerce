import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import withUser from './withUser';

function UserRoute({ children, user }) {
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default withUser(UserRoute);
