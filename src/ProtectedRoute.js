import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth,element: Element, ...rest }) => {

  return (
    <Route {...rest} render={(props) => {
        if(auth) return <Element {...props} />;
        if(!auth) return <Navigate to={{path:'/',state: {from: props.location}}} {...props} />;
    }} />
  );
};

export default ProtectedRoute;