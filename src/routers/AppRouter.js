import Login  from "../components/Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import { AdminRouter } from "./AdminRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


  export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                    }
                />
                <Route path="*" element={
                    <PrivateRoute>
                        <AdminRouter/>
                    </PrivateRoute>
                    }
                />
            </Routes>
        </Router>

    );
  }
