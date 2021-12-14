import { useReducer, useEffect } from 'react';
import AppRouter from './routers/AppRouter';
import './css/colours.css';
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';

const init = ()=>{
   return JSON.parse(localStorage.getItem('userData'))  || { logged : false};
}


function App() {

  const [ userData, dispatch ] = useReducer( authReducer,{}, init )

  useEffect(()=>{
    if( !userData ) return;

    localStorage.setItem('userData',JSON.stringify(userData));
  },[userData])
  return (
    <>
      <AuthContext.Provider value={{
        userData,
        dispatch
      }}>
        <AppRouter />
      </AuthContext.Provider>
    </>
  );
}

export default App;
