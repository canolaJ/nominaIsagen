import React,{useState} from 'react'
import Navigation from "./Navigation";
import SolicitudesModal from './modals/SolicitudesModal';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faSync , faCheckCircle, faTimesCircle, faSearch ,faUserClock } from '../../node_modules/@fortawesome/free-solid-svg-icons';

export default function Permisos() {
    const [ocultar,setOcultar] = useState("ocultar");
    const [dataModal, setDataModal] = useState([]);
    const [user,setUser] = useState({});
    const [vacaciones,setVacaciones] = useState([
        {id:1, nombres : "jonathan" , apellidos : "cañola", cc : "456789233", dateExit : "01-28-2021", dateEntry : "01-30-2021" , post : "Super Administrador", estado : "activo" , userPost : "" , result : "proceso"},
        {id:2, nombres : "jorge" , apellidos : "cañola", cc : "986978423",dateExit : "07-14-2021" , dateEntry : "07-15-2021" , post : "Usuario-Nomina", estado : "activo" , userPost : "" , result : "negado"},
        {id:3, nombres : "jabian" , apellidos : "monitor", cc : "986978423", dateExit : "11-29-2021",  dateEntry : "11-30-2021" , post : "Usuario-Empleado",  estado : "inactivo" , userPost : "" , result : "proceso"},
    ]);
    const [list, setList] = useState(vacaciones);

    const changeBtn = () => ocultar === "ocultar" ? setOcultar("visible"): setOcultar("ocultar");

    const changeOcultar = (valor,dataUser) =>{
        switch (valor) {
            case 1:
                changeBtn();
                setDataModal([valor,"Procesar solicitud de Permiso", "procesar",true, null]);
                if (dataUser) {
                    setUser(dataUser);
                };
                break;

            default:
                break;
        }
    }
    const searchUser = () =>{

        const search = document.getElementById('search').value.toLowerCase();
        const vacacionesFilter = vacaciones.filter(user => user.nombres.includes( search ) || user.apellidos.includes( search ) || user.cc.includes( search ));
        setList(vacacionesFilter);
    }
    return (
        <>
        <div className={ocultar}>
            <SolicitudesModal changeOcultar={changeOcultar} dataModal = {dataModal} user = {user}/>
        </div>
        <Navigation />
        <div className="container container__home">
            <div className="row mb-2">
                <div className="col-sm-12 col-md-12">
                    <div className="row">
                        <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center justify-content-between">
                            <h3 className="ms-2"><FontAwesomeIcon icon={ faUserClock } /> Permisos</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FontAwesomeIcon icon={ faSearch } /></span>
                        <input type="text" className="form-control" id="search" placeholder=" ¿Qué usuario deseas buscar? " onChange={searchUser} />
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr className="text-center bg__primary">
                                <th colSpan="4">
                                        <h3>Solicitud de Permisos Empleados</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Fecha de Inicio</th>
                                <th scope="col">Fecha de Fin</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { list.map((user)=>{
                                return(
                                    <tr key={ user.id }>
                                        <th scope="row">{ user.nombres + " " + user.apellidos }</th>
                                        <td className="icon__sm">{ user.dateExit }</td>
                                        <td>{ user.dateEntry }</td>
                                        <td>
                                            {user.result === 'aprobado' ?
                                                <div className="bg__success text-center">
                                                    <FontAwesomeIcon icon={faCheckCircle}/> <span className="icon__sm">{ user.result }</span>
                                                </div>
                                            : user.result === 'negado' ?
                                                <div className="bg__danger text-center">
                                                    <FontAwesomeIcon icon={faTimesCircle}/> <span className="icon__sm">{ user.result }</span>
                                                </div> 
                                            :
                                                <button className="btn btn-primaryP text-center w-100" onClick = { ()=> changeOcultar(1, user) }>
                                                    <FontAwesomeIcon icon={faSync}/> <span className="icon__sm">{ user.result }</span>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}


