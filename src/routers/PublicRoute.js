import { useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ( { children } )=>{

    const { userData } = useContext(AuthContext);

    return !userData.logged ? children : <Navigate to="/admin/home" />;



}