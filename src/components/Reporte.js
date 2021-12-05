import React,{useState} from 'react'
import Navigation from "./Navigation";
import SolicitudesModal from './modals/SolicitudesModal';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faSync , faCheckCircle, faTimesCircle, faSearch ,faUserClock, faFilePdf } from '../../node_modules/@fortawesome/free-solid-svg-icons';

export default function Reporte() {
    const [ocultar,setOcultar] = useState("ocultar");
    const [dataModal, setDataModal] = useState([]);
    const [user,setUser] = useState({});
    const [vacaciones,setVacaciones] = useState([
        {id:1, nombres : "jonathan" , apellidos : "cañola", cc : "456789233" , post : "Super Administrador", salary : "1500000", estado : "activo"},
        {id:2, nombres : "jorge" , apellidos : "cañola", cc : "986978423", post : "Usuario-Nomina", salary : "2900000", estado : "activo"},
        {id:3, nombres : "jabian" , apellidos : "monitor", cc : "986978423", post : "Usuario-Empleado", salary : "3500000", estado : "activo"},
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
                            <h3 className="ms-2"><FontAwesomeIcon icon={ faUserClock } /> Reportes</h3>
                            <button 
                                type="button" 
                                className="btn btn-successP me-sm-1 me-lg-0" 
                                onClick={()=>changeOcultar(1)}><FontAwesomeIcon icon={ faFilePdf } /> Generar Reporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr className="text-center bg__primary">
                                <th colSpan="4">
                                        <h3>Empleados con más de 1 Salario Mínimo</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Cargo</th>
                                <th scope="col">Salario</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            { list.map((user)=>{
                                return(
                                    <tr key={ user.id }>
                                        <th scope="row">{ user.nombres + " " + user.apellidos }</th>
                                        <td className="icon__sm">{ user.post }</td>
                                        <td>{ user.salary }</td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
            <hr/>
            <div className="row mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr className="text-center bg__primary">
                                <th colSpan="4">
                                        <h3>Empleados con menos de 1 Salario Mínimo</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Cargo</th>
                                <th scope="col">Salario</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            { list.map((user)=>{
                                return(
                                    <tr key={ user.id }>
                                        <th scope="row">{ user.nombres + " " + user.apellidos }</th>
                                        <td className="icon__sm">{ user.post }</td>
                                        <td>{ user.salary }</td>
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


