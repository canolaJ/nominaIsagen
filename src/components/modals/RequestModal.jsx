
import React, { useState } from 'react';
import axios from 'axios';
import Swal from '../../../node_modules/sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '../../../node_modules/@fortawesome/free-solid-svg-icons';


export default function RequestModal({changeOcultar , dataModal , user, requestPermissionsAll }) {

    const btnSend = dataModal[2];
    const type_request = document.getElementById('typeRequest');
    const date_exit = document.getElementById('dateExit');
    const date_entry = document.getElementById('dateEntry');
    const [error, setError] = useState('');

    const createRequest = () => {

        setError("");

        if(type_request.value && date_exit.value && date_entry.value && type_request.value !== "Seleccione Tipo de Solicitud"){
            const url = "http://localhost:4000/request/createRequest";
            axios.post(url, {

                dateExit : date_exit.value,
                dateEntry : date_entry.value,
                typeRequest : type_request.value,
                payRequest : "Sin-confirmar",
                requestAuthor : user._id,
                userResponse: "Sin-confirmar",
                response : "Proceso",
                stateRequest: "On"

            })
            .then(function (response) {
                    document.getElementById('closed__modal').click();
                    Swal.fire({
                        title: 'Creada!',
                        text: 'Solicitud creada con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                    requestPermissionsAll();
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            setError(" faltan datos por llenar")
        }

        
        
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
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Fecha de Inicio</span>
                                        <input type="date" id="dateExit"  className="form-control"   />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Fecha Fin</span>
                                        <input type="date" id="dateEntry" className="form-control"  />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Tipo de Solicitud</span>
                                        <select className="form-select form-select-sm" id="typeRequest" aria-label=".form-select-sm example">
                                            <option defaultValue>Seleccione Tipo de Solicitud</option>
                                            <option value="Vacaciones">Vacaciones</option>
                                            <option value="Permiso">Permiso</option>
                                        </select>
                                    </div>
                                </div>
                                { error && 
                                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong><FontAwesomeIcon icon={ faExclamationTriangle }/> Cuidado! </strong> { error }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dangerP" onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                        { btnSend && <button type="button" className="btn btn-successP" onClick={ createRequest }>{ dataModal[2] }</button>}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
