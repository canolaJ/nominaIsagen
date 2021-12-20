import { Routes,Route } from "react-router-dom";
import Home  from "../components/Home";
import Nomina  from "../components/Nomina";
import Permisos  from "../components/Permisos";
import Vacaciones  from "../components/Vacaciones";
import User  from "../components/User";
import Reporte  from "../components/Reporte";
// import NoFount  from "../components/NoFount";
import Navigation from "../components/Navigation";
import PayRoll from "../components/PayRoll";
import { useContext } from "react";
import { AuthContext } from '../auth/authContext';



  export function AdminRouter() {
    const { userData } = useContext(AuthContext);
    return (
        <>
            <Navigation />
            <Routes>
                { userData.post=== 'Usuario-Nomina' &&
                <>
                  <Route exact path="/admin/home" element={<Home/>}/>
                  <Route exact path="/admin/permisos" element={<Permisos/>}/>
                  <Route exact path="/admin/vacaciones" element={<Vacaciones/>}/>
                  <Route exact path="/admin/reporte" element={<Reporte/>}/>
                  <Route exact path="/admin/nomina" element={<Nomina/>}/>
                  <Route exact path="/admin/payRoll" element={<PayRoll/>}/>
                </>
                }
                { userData.post=== 'Administrador' &&
                <>
                  <Route exact path="/admin/home" element={<Home/>}/>
                  <Route exact path="/admin/permisos" element={<Permisos/>}/>
                  <Route exact path="/admin/vacaciones" element={<Vacaciones/>}/>
                  <Route exact path="/admin/user" element={<User/>}/>
                  <Route exact path="/admin/reporte" element={<Reporte/>}/>
                  <Route exact path="/admin/nomina" element={<Nomina/>}/>
                  <Route exact path="/admin/payRoll" element={<PayRoll/>}/>
                </>
                }

                { userData.post=== 'Usuario-Empleado' && 
                  <Route exact path="/admin/home" element={<Home/>}/>
                }


                {/* <Route path="*" element={<NoFount/>}/> */}
            </Routes>
        </>
    );
  }
