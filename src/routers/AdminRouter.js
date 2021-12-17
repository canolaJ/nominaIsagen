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


  export function AdminRouter() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route exact path="/admin/home" element={<Home/>}/>
                <Route exact path="/admin/permisos" element={<Permisos/>}/>
                <Route exact path="/admin/vacaciones" element={<Vacaciones/>}/>
                <Route exact path="/admin/user" element={<User/>}/>
                <Route exact path="/admin/reporte" element={<Reporte/>}/>
                <Route exact path="/admin/nomina" element={<Nomina/>}/>
                <Route exact path="/admin/payRoll" element={<PayRoll/>}/>

                {/* <Route path="*" element={<NoFount/>}/> */}
            </Routes>
        </>
    );
  }
