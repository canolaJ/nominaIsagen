import React,{useContext, useState} from 'react'
// import NominaModal from './modals/NominaModal';
import '../css/home.css'; 
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import {  faSearch , faFilePdf, faAddressCard } from '../../node_modules/@fortawesome/free-solid-svg-icons';
import NominaPdf from './pdf/NominaPdf';
import { PDFDownloadLink } from '../../node_modules/@react-pdf/renderer';
import axios from 'axios';
import { AuthContext } from '../auth/authContext';
import Swal from 'sweetalert2';

export default function Nomina() {
    const { userData } = useContext( AuthContext );
    const fecha = new Date().toLocaleDateString();
    const month = new Date().getMonth();
    const year = new Date().getUTCFullYear();
    const dateSearch = year + "-" + (month>0 ? month+1 : month<12 ? month+1 : month) + "-30";

    const [userSelected, setUserSelected] = useState([]);
    const [value_permission, setValue_permission] = useState(0);
    const [value_vacaciones, setValue_vacaciones] = useState(0);
    const [value_total, setValue_total] = useState(0);



    const permissionUser = (dataRequest, salary) => {
        let number_days = 0;
        let vacaciones = 0;
        setValue_permission(0);
        dataRequest.forEach(request => {
            if(request.payRequest === 'No' && request.typeRequest === "Permiso"){

                number_days = ((new Date(request.dateExit) - new Date(request.dateEntry))/-172800)/1000;
                number_days += number_days;
            }
            else if(request.payRequest === 'Si' && request.typeRequest === "Vacaciones"){
                vacaciones = ((new Date(request.dateExit) - new Date(request.dateEntry))/-172800)/1000;
                vacaciones += vacaciones;

            }
        });
        let days_permission = ((parseInt(salary)/30)*number_days).toFixed(0);
        let days_vacaciones = ((parseInt(salary)/30)*vacaciones).toFixed(0);
        let totalToPay = parseInt(salary) - (parseInt(days_permission)) + (parseInt(days_vacaciones));

        setValue_permission(days_permission);
        setValue_vacaciones(days_vacaciones);
        setValue_total(totalToPay);
    }

    const searchUser = () =>{

        const search = document.getElementById('search').value.toLowerCase();
        if(search){
            const url = 'http://localhost:4000/user/searchUserCc';
            axios.post(url, {
                cc:search,
                dateExit : dateSearch,
            })
            .then(function (response) {
                if(response.data.isOk){
                    setUserSelected(response.data.user);
                    const salary = response.data.user.salary;
                    const dataRequest = response.data.request;
                    permissionUser(dataRequest, salary);
                }else{
                    Swal.fire({
                        title: 'No encontrado!',
                        text: 'La cédula no tiene ningun usuario asociado !',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            Swal.fire({
                title: 'Vacío!',
                text: 'El campo de cédula no tiene ningun valor !',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    }

    const createPayRoll = () =>{

        const url = 'http://localhost:4000/payRoll/createPayRoll';
        axios.post(url, {
            dateGenerated : dateSearch,
            holiadysPaid : value_vacaciones,
            permissionPaid : 0,
            permissionNotPaid : value_permission,
            payRollAuthor : userSelected.id,
            userResponseRoll : userData._id,
            totalPayRoll : value_total,
            salary : userSelected.salary
          })
          .then(function (response) {
              if(response.data.isOk){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Nómina Creada con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });
              }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Nómina No Creada!',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
              }

          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <>
            {/* <div className={ocultar}>
                <NominaModal changeOcultar={changeOcultar} dataUser={ dataUser } dataModal = {dataModal} list = { list }/>
            </div> */}
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
                                        type="button" onClick={ createPayRoll }
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
                            <input type="text" className="form-control" id="search" placeholder=" ¿Qué usuario deseas buscar por Cédula? "/>
                            <button className="btn btn-primaryInput" onClick={()=>searchUser()}>Buscar</button>
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
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Fecha :</span>
                            <input type="text" className="form-control" disabled placeholder={ fecha } aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Nombre :</span>
                            <input type="text" className="form-control" placeholder={ userSelected.nombres } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Apellidos :</span>
                            <input type="text" className="form-control" placeholder={ userSelected.apellidos } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Número de documento :</span>
                            <input type="text" className="form-control" placeholder={ userSelected.cc } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Cargo :</span>
                            <input type="text" className="form-control" placeholder={ userSelected.post } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Salario Base :</span>
                            <input type="text" className="form-control" placeholder={ userSelected.salary } disabled aria-describedby="basic-addon3"/>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Teléfono :</span>
                            <input type="text" className="form-control" placeholder={ userSelected.phone } disabled aria-describedby="basic-addon3"/>
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
