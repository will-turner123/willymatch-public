import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

const PrivateRoute = ({ children }) => {
    return(
            firebase.auth().currentUser ? children : <Navigate to="/login" />
    )
}

export default PrivateRoute;