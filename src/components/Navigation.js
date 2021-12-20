import React ,{ useContext } from 'react'
import logo from '../assent/logo.svg';
import { NavLink, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import {
    faBars , faTimesCircle,faUserFriends,
    faFileDownload, faAddressCard, faChevronCircleRight, faTasks,
    faPlane, faUserClock
} from '../../node_modules/@fortawesome/free-solid-svg-icons';
import { types } from '../types/types';
import { AuthContext } from '../auth/authContext';
import Swal from 'sweetalert2';

export default function Navigation() {
    const { dispatch,userData } = useContext( AuthContext);
    
    const navigate = useNavigate();

    const logout = () =>{
        
        const action = {
            type : types.logout
        }
        dispatch(action);
        navigate('/', {
            replace: true
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Vuelve Pronto...',
            showConfirmButton: false,
            timer: 1700
        });
        
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg__navigation">
                <div className="container-fluid">
                    <div className="container__logo">
                        <img src={logo} className='img__logo' alt="logo__isagen" />
                        <h3 className="ms-2">ISAGEN</h3>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className=""><FontAwesomeIcon icon={faBars} /></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            { userData.post=== 'Administrador' ?
                            <>
                                <li className="nav-item ms-md-2">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/home'><FontAwesomeIcon icon={faChevronCircleRight} /> Inicio</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className="btn ms-2 dropdown-toggle"  id="menuDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faTasks} />  Procesar
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="menuDropdown">
                                        <li><NavLink className="dropdown-item" to='/admin/permisos'><FontAwesomeIcon icon={faUserClock} /> Permisos</NavLink></li>
                                        <li><NavLink className="dropdown-item" to='/admin/vacaciones'><FontAwesomeIcon icon={faPlane} /> Vacaciones</NavLink></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/user'><FontAwesomeIcon icon={faUserFriends} /> Usuarios</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/reporte'><FontAwesomeIcon icon={faFileDownload} /> Reportes</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/nomina'><FontAwesomeIcon icon={faAddressCard} /> Crear Nómina</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/payRoll'><FontAwesomeIcon icon={faAddressCard} /> Nóminas</NavLink>
                                </li>
                            </>
                            :   userData.post=== 'Usuario-Nomina' ?
                            <>
                                <li className="nav-item ms-md-2">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/home'><FontAwesomeIcon icon={faChevronCircleRight} /> Inicio</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <button className="btn ms-2 dropdown-toggle"  id="menuDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon icon={faTasks} />  Procesar
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="menuDropdown">
                                        <li><NavLink className="dropdown-item" to='/admin/permisos'><FontAwesomeIcon icon={faUserClock} /> Permisos</NavLink></li>
                                        <li><NavLink className="dropdown-item" to='/admin/vacaciones'><FontAwesomeIcon icon={faPlane} /> Vacaciones</NavLink></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/reporte'><FontAwesomeIcon icon={faFileDownload} /> Reportes</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/nomina'><FontAwesomeIcon icon={faAddressCard} /> Crear Nómina</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/payRoll'><FontAwesomeIcon icon={faAddressCard} /> Nóminas</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item ms-md-2">
                                    <NavLink className="nav-link" aria-current="page" to='/admin/home'><FontAwesomeIcon icon={faChevronCircleRight} /> Inicio</NavLink>
                                </li>
                            </>
                            }
                        </ul>
                        <div>
                            <button className="btn btn-dangerP " onClick={ logout }><FontAwesomeIcon icon={faTimesCircle} /> Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
