import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
    <Route>
      {() => (props.isLoggin ? <Component {...props} /> : <Redirect to='/' />)}
    </Route>
);

export default ProtectedRoute;
