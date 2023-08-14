import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import React, { ReactNode } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
  }

  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token')
  
    if (!isAuthenticated) {
      return <Navigate to="/" />;
      
    }
  
    return <>{children}</>;
  };
  

  export default PrivateRoute