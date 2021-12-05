import React,{useState} from 'react'
import Navigation from "./Navigation";
import NominaModal from './modals/NominaModal';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import {  faSearch , faFilePdf, faAddressCard } from '../../node_modules/@fortawesome/free-solid-svg-icons';

export default function Nomina() {
    const fecha = new Date().toLocaleDateString();
    const users =[
        {id:1, nombres : "jonathan" , apellidos : "Cañola", cc : "456789233", phone : 3209874563 , post : "Super Administrador",salary : "3500000", estado : "activo"},
        {id:2, nombres : "jorge" , apellidos : "Cañola", cc : "986978423", phone : 3119874562 , post : "Usuario-Nomina",salary : "2500000" , estado : "activo"},
        {id:3, nombres : "fabian" , apellidos : "Monitor", cc : "986978423", phone : 3119874562 , post : "Usuario-Empleado", salary : "1500000", estado : "inactivo"},
    ];
    const [list,setList] = useState([]);
    const [ocultar,setOcultar] = useState("ocultar");
    const [dataModal, setDataModal] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const changeBtn = () => ocultar === "ocultar" ? setOcultar("visible"): setOcultar("ocultar");

    const dataUser = (data) =>{
        setUserSelected(data);
        console.log(data);
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
            <div className="container container__nomina">
                <div className="row mb-2">
                    <div className="col-sm-12 col-md-12">
                        <div className="row">
                            <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center justify-content-between">
                                <h3 className="ms-2"><FontAwesomeIcon icon={ faAddressCard } /> Nómina</h3>
                                <button 
                                    type="button" 
                                    className="btn btn-successP me-sm-1 me-lg-0" 
                                    onClick={()=>changeOcultar(1)}> <FontAwesomeIcon icon={ faFilePdf } /> Generar Nómina
                                </button>
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
                                        <h6>0</h6>
                                    </td>
                                    <td className="text-end">
                                        <h6>$500.000</h6>
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
                                        <h6>Permisos Remunerados</h6>
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
                                        <h6>$75.000</h6>
                                    </td>
                                    <td className="text-end">
                                        <h6>-$75.000</h6>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td  colSpan="2">
                                        <h5>Total Pagado (Total-Deducción)</h5>
                                    </td>
                                    <td className="text-end">
                                        <h6>$425.000</h6> 
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
