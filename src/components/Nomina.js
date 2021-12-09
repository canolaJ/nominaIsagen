import React,{useState} from 'react'
import Navigation from "./Navigation";
import NominaModal from './modals/NominaModal';
import NominaPdf from './pdf/NominaPdf';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import {  faSearch , faFilePdf, faAddressCard } from '../../node_modules/@fortawesome/free-solid-svg-icons';
import { PDFDownloadLink } from '../../node_modules/@react-pdf/renderer';

export default function Nomina() {
    const fecha = new Date().toLocaleDateString();
    const users =[
        {id:1, nombres : "jonathan" , apellidos : "cañola", cc : "456789233", phone : 3209874563 , post : "Super Administrador",salary : "3500000", estado : "activo"},
        {id:2, nombres : "jorge" , apellidos : "cañola", cc : "986978423", phone : 3119874562 , post : "Usuario-Nomina",salary : "2500000" , estado : "activo"},
        {id:3, nombres : "fabian" , apellidos : "monitor", cc : "986978423", phone : 3119874562 , post : "Usuario-Empleado", salary : "1500000", estado : "inactivo"},
    ];

    const permisos =[
        {id:1, id_user: 1 , type_solicitud : "vacaciones" ,remunerado :"si",  nombres : "jonathan" , apellidos : "cañola", cc : "456789233", dateExit : "01-28-2021", dateEntry : "01-30-2021" , post : "Super Administrador", estado : "activo" , userPost : "jonathan" , result : "aprobado"},
        {id:2, id_user: 2, type_solicitud : "permiso"  ,remunerado :"no", nombres : "jorge" , apellidos : "cañola", cc : "986978423",dateExit : "07-14-2021" , dateEntry : "08-02-2021" , post : "Usuario-Nomina", estado : "activo" , userPost : "jonathan" , result : "negado"},
        {id:3, id_user: 3, type_solicitud : "permiso"  ,remunerado :"si", nombres : "fabian" , apellidos : "monitor", cc : "986978423", dateExit : "11-29-2021",  dateEntry : "11-30-2021" , post : "Usuario-Empleado",  estado : "inactivo" , userPost : "jonathan" , result : "proceso"},
        {id:4, id_user: 1 , type_solicitud : "permiso" ,remunerado :"no",  nombres : "jonathan" , apellidos : "cañola", cc : "456789233", dateExit : "01-28-2021", dateEntry : "01-30-2021" , post : "Super Administrador", estado : "activo" , userPost : "jonathan" , result : "aprobado"},
        {id:5, id_user: 2, type_solicitud : "permiso"  ,remunerado :"no", nombres : "jorge" , apellidos : "cañola", cc : "986978423",dateExit : "07-14-2021" , dateEntry : "07-15-2021" , post : "Usuario-Nomina", estado : "activo" , userPost : "jonathan" , result : "negado"},
        {id:6, id_user: 3, type_solicitud : "permiso"  ,remunerado :"si", nombres : "fabian" , apellidos : "monitor", cc : "986978423", dateExit : "11-29-2021",  dateEntry : "11-30-2021" , post : "Usuario-Empleado",  estado : "inactivo" , userPost : "jonathan" , result : "proceso"},
        {id:7, id_user: 2, type_solicitud : "permiso"  ,remunerado :"no", nombres : "jorge" , apellidos : "cañola", cc : "986978423",dateExit : "07-18-2021" , dateEntry : "07-20-2021" , post : "Usuario-Nomina", estado : "activo" , userPost : "jonathan" , result : "negado"},
    ];

    const [list,setList] = useState([]);
    const [ocultar,setOcultar] = useState("ocultar");
    const [dataModal, setDataModal] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const [value_permission, setValue_permission] = useState(0);
    const [value_vacaciones, setValue_vacaciones] = useState(0);
    const [value_total, setValue_total] = useState(0);
    const changeBtn = () => ocultar === "ocultar" ? setOcultar("visible"): setOcultar("ocultar");

    const dataUser = (data) =>{
        setUserSelected(data);
        console.log(data);
    }

    const permissionUser = (user_id) => {
        let number_days = 0;
        let vaciones = 0;
        setValue_permission(0);
        permisos.forEach(permiso => {
            if(permiso.remunerado === 'no' && permiso.id_user === user_id && permiso.type_solicitud === "permiso"){
                number_days = ((new Date(permiso.dateExit) - new Date(permiso.dateEntry))/-86400)/1000;
                number_days += number_days;
            }
            else if(permiso.remunerado === 'si' && permiso.id_user === user_id && permiso.type_solicitud === "vacaciones"){
                vaciones = ((new Date(permiso.dateExit) - new Date(permiso.dateEntry))/-86400)/1000;
                vaciones += vaciones;
            }
        });
        let user = users.find(user => user.id === user_id);
        let days_permission = ((parseInt(user.salary)/30)*number_days).toFixed(0);
        let days_vacaciones = ((parseInt(user.salary)/30)*vaciones).toFixed(0);
        let totalToPay = parseInt(user.salary) - (parseInt(days_permission)) + (parseInt(days_vacaciones));
        setValue_permission(days_permission);
        setValue_vacaciones(days_vacaciones)
        setValue_total(totalToPay);
    }
    const changeOcultar = (valor,data) =>{
        switch (valor) {
            case 1:
                searchUser();
                changeBtn();
                setDataModal([valor,"Elegir Usuario ", null,true, null]);
                break;

            case 2:
                dataUser(data);
                permissionUser(data.id);
                changeBtn();
                break;
            default:
                break;
        }
    }
    const searchUser = () =>{
        const search = document.getElementById('search').value.toLowerCase();
        const usersFilter = users.filter(user => user.nombres.includes( search ) || user.apellidos.includes( search ) || user.cc.includes( search ));
        setList(usersFilter);
    }
    return (
        <>
            <div className={ocultar}>
                <NominaModal changeOcultar={changeOcultar} dataUser={ dataUser } dataModal = {dataModal} list = { list }/>
            </div>
            <Navigation />
            <div className="container container__nomina p-md-4">
                <div className="row mb-2">
                    <div className="col-sm-12 col-md-12">
                        <div className="row">
                            <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center justify-content-between">
                                <h3 className="ms-2"><FontAwesomeIcon icon={ faAddressCard } /> Nómina</h3>
                                <PDFDownloadLink 
                                    document={ <NominaPdf userSelected = { userSelected } value_vacaciones = { value_vacaciones } value_permission = { value_permission } value_total = {value_total }/> } 
                                    fileName="nomina.pdf">
                                    <button
                                        type="button"
                                        className="btn btn-successP me-sm-1 me-lg-0">
                                        <FontAwesomeIcon icon={ faFilePdf } /> Generar Nómina
                                    </button>
                                </PDFDownloadLink>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row mb-md-2">
                    <div className="col-sm-12 col-md-5">
                        <div className="input-group mb-3">
                            <span className="input-group-text"><FontAwesomeIcon icon={ faSearch } /></span>
                            <input type="text" className="form-control" id="search" placeholder=" ¿Qué usuario deseas buscar? "/>
                            <button className="btn btn-primaryInput" onClick={()=>changeOcultar(1)}>Buscar</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 text-center mb-md-4 mt-md-2">
                        <h2 className="form-label ">Datos del empleado</h2>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text  bg-secondary text-light" id="basic-addon3">Código Empleado:</span>
                            <input type="text" className="form-control"placeholder={ userSelected.id } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Fecha:</span>
                            <input type="text" className="form-control" disabled placeholder={ fecha } aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Nombre:</span>
                            <input type="text" className="form-control" placeholder={ userSelected.nombres } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Apellidos:</span>
                            <input type="text" className="form-control" placeholder={ userSelected.apellidos } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Número de documento:</span>
                            <input type="text" className="form-control" placeholder={ userSelected.cc } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Cargo:</span>
                            <input type="text" className="form-control" placeholder={ userSelected.post } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Salario Base:</span>
                            <input type="text" className="form-control" placeholder={ userSelected.salary } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="text-center">
                                <tr className="text-center bg__primary">
                                    <th colSpan="3"><h4>Pagos y Deduciones</h4></th>
                                </tr>
                                <tr className="bg__gray text-center">
                                    <th>
                                        <h5>Descripción</h5>
                                    </th>
                                    <th>
                                        <h5>Deducción</h5>
                                    </th>
                                    <th className="text-end">
                                        <h5>Total</h5>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <h6>Vacaciones Remuneradas</h6>
                                    </td>
                                    <td className="text-center">
                                        <h6>$0</h6>
                                    </td>
                                    <td className="text-end">
                                        <h6>{ "$" + value_vacaciones }</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>Vacaciones No Remuneradas</h6>
                                    </td>
                                    <td className="text-center">
                                        <h6>$0</h6>
                                    </td>
                                    <td className="text-end">
                                        <h6>$0</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h6>Permisos No Remunerados</h6>
                                    </td>
                                    <td className="text-center">
                                        <h6>{ "$" + value_permission }</h6>
                                    </td>
                                    <td className="text-end">
                                    <h6>{ "$ -" + value_permission }</h6>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td  colSpan="2">
                                        <h5>Total Pagado (Total-Deducción)</h5>
                                    </td>
                                    <td className="text-end">
                                        <h6>{ "$" + value_total }</h6>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
