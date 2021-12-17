import React, { useState } from 'react';
import NominaPdfCopy from '../pdf/NominaPdfCopy';
import { PDFDownloadLink } from '../../../node_modules/@react-pdf/renderer';
import axios from 'axios';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import {  faExclamationTriangle , faCheckCircle, faFilePdf } from '../../../node_modules/@fortawesome/free-solid-svg-icons';

export default function CopyModal({changeOcultar , dataModal , user }) {

    let searchDate = "";
    let dateSearch = "";
    const [payRoll, setPayRoll] = useState([]);
    const [msj, setMsj] = useState("");
    const [isOk, setIsOk] = useState("");
    
    let dataSearchPay = ()=>{

        setIsOk("");
        setMsj(" ");
        searchDate = document.getElementById('dataSearchPay').value;
        const month =  new Date(searchDate).getMonth();
        const year = new Date(searchDate).getUTCFullYear();
        dateSearch = year + "-" + (month>0 ? month+1 : month<12 ? month+1 : month);

        if(searchDate){
            searchPayRoll();
        }else{
            setIsOk(false);
            setMsj(" Debes elegir una fecha válida !");
        }
    }



    const searchPayRoll = ()=>{
        setMsj("");
        setIsOk("");
        const url = 'http://localhost:4000/payRoll/searchPayRoll';
        axios.post(url, {
            dateGenerated : dateSearch,
            payRollAuthor : user._id,
          })
          .then(function (response) {
              console.log(response)
              if(response.data.payRoll){
                setPayRoll(response.data.payRoll);
                setMsj(" La Nómina se cargo con éxito!");
                setIsOk(true);
              }else{
                setMsj(" La Nómina No se Encontro!");
                setIsOk(false);
              }

          })
          .catch(function (error) {
            console.log(error);
          });
    }
    


    return (
        <>
        <div className="modal__sigen">
            <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                <div className="modal-header bg__success">
                    <h4 className="modal-title">{dataModal[1]}</h4>
                    <button type="button" className="btn-close" onClick={()=>changeOcultar(dataModal[0])}></button>
                </div>
                <div className="modal-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-9">
                                <div className="input-group mb-3">
                                    <span className="input-group-text " >Fecha de Nómina a buscar</span>
                                    <input type="date" className="form-control" id="dataSearchPay"  aria-describedby="basic-addon3"/>
                                    <input type="button" className="form-control btn btn-primaryInput" value="Buscar"  onClick={ dataSearchPay } aria-describedby="basic-addon3"/>
                                </div>
                            </div>
                            <div className="col-sm-12 mb-md-12 mt-md-2">
                                { isOk === true &&
                                    <div className="alert alert-success d-flex align-items-center" role="alert">
                                        <div>
                                            <FontAwesomeIcon icon={ faCheckCircle }/>{ msj }
                                        </div>
                                    </div>
                                }
                                { isOk === false &&
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <div>
                                        <FontAwesomeIcon icon={ faExclamationTriangle }/> { msj }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        { isOk === true && 
                        <>
                            <div className="row">
                                <div className="col-sm-12 text-center mb-md-4 mt-md-2">
                                    <h2 className="form-label ">Copia de Nómina</h2>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text  bg-secondary text-light" id="basic-addon3">Código Empleado:</span>
                                        <input type="text" className="form-control" placeholder={ user._id } disabled aria-describedby="basic-addon3"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-secondary text-light" id="basic-addon3">Fecha :</span>
                                        <input type="text" className="form-control" disabled placeholder={ payRoll['dateGenerated'] } aria-describedby="basic-addon3"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-secondary text-light" id="basic-addon3">Nombre :</span>
                                        <input type="text" className="form-control" placeholder={ user.nombres } disabled aria-describedby="basic-addon3"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-secondary text-light" id="basic-addon3">Apellidos :</span>
                                        <input type="text" className="form-control" placeholder={ user.apellidos } disabled aria-describedby="basic-addon3"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-secondary text-light" id="basic-addon3">Número de documento :</span>
                                        <input type="text" className="form-control" placeholder={ user.cc } disabled aria-describedby="basic-addon3"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-secondary text-light" id="basic-addon3">Cargo :</span>
                                        <input type="text" className="form-control" placeholder={ user.post } disabled aria-describedby="basic-addon3"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-secondary text-light" id="basic-addon3">Salario Base :</span>
                                        <input type="text" className="form-control" placeholder={ payRoll['salary'] } disabled aria-describedby="basic-addon3"/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text bg-secondary text-light" id="basic-addon3">Teléfono :</span>
                                        <input type="text" className="form-control" placeholder={ user.phone } disabled aria-describedby="basic-addon3"/>
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
                                                    <h6>${ payRoll['holidaysPaid'] ? payRoll['holidaysPaid'] : "0" }</h6>
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
                                                    <h6>{ "$" + payRoll['permissionNotPaid'] }</h6>
                                                </td>
                                                <td className="text-end">
                                                    <h6>{ "$ -" + payRoll['permissionNotPaid'] }</h6>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td  colSpan="2">
                                                    <h5>Total Pagado (Total-Deducción)</h5>
                                                </td>
                                                <td className="text-end">
                                                    <h6>{ "$" + payRoll['totalPayRoll'] }</h6>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </>
                        }
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" id="btn-closed" className="btn btn-dangerP" onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                    { isOk === true && 
                    <>
                        <PDFDownloadLink
                            document={ <NominaPdfCopy payRoll = { payRoll }  user = {user }/> } 
                            fileName="nomina.pdf">
                            <button
                                type="button"
                                className="btn btn-successP me-sm-1 me-lg-0">
                                <FontAwesomeIcon icon={ faFilePdf } /> Generar Nómina
                            </button>
                        </PDFDownloadLink>
                    </>
                    }
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
