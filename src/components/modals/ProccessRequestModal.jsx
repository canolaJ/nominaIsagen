
import React, { useState,useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


export default function ProccessRequestModal({changeOcultar , dataModal , vacacion, requestHolidaysAll, requestPermissionsAll }) {
    const { userData } = useContext( AuthContext );
    const btnSend = dataModal[2];
    const type_request = document.getElementById('typeRequest');
    const pay_request = document.getElementById('payRequest');
    const [error, setError] = useState('');

    const createRequest = () => {

        setError("");

        if(type_request.value &&  type_request.value !== "Seleccione la acción"){
            const url = "http://localhost:4000/request/requestUpdate";
            axios.put(url, {

                _id : vacacion._id,
                userResponse: userData.nombres + " " + userData.apellidos,
                response : type_request.value,
                payRequest : pay_request.value,
                stateRequest: "Off"

            })
            .then(function (response) {
                    document.getElementById('closed__modal').click();
                    if(dataModal[1] === "Procesar solicitud de Vacaciones"){
                        requestHolidaysAll();
                        Swal.fire({
                            title: 'Procesada!',
                            text: 'Vaciones procesado con éxito!',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        })
                    }else{
                        requestPermissionsAll();
                        Swal.fire({
                            title: 'Procesado!',
                            text: 'Permiso procesado con éxito!',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        })

                    }
                   
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            setError(" Debes seleccionar la acción")
        }

        
        
    }


    return (
        <>
            <div className="modal__sigen">
                <div className="modal-dialog modal-dialog-scrollable ">
                    <div className="modal-content">
                    <div className="modal-header bg__success">
                        <h4 className="modal-title">{dataModal[1]}</h4>
                        <button type="button" className="btn-close" onClick={()=>changeOcultar(dataModal[0])}></button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Procesar Solicitud</span>
                                        <select className="form-select form-select-sm" id="typeRequest" aria-label=".form-select-sm example">
                                            <option defaultValue>Seleccione la acción</option>
                                            <option value="Aprobado">Aprobar</option>
                                            <option value="Negado">Negar</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Pago Solicitud</span>
                                        <select className="form-select form-select-sm" id="payRequest" aria-label=".form-select-sm example">
                                            <option defaultValue>Seleccione la acción</option>
                                            <option value="Si">Si</option>
                                            <option value="No">No</option>
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
                        <button type="button" className="btn btn-dangerP" id='closed__modal' onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                        { btnSend && <button type="button" className="btn btn-successP" onClick={ createRequest }>{ dataModal[2] }</button>}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
