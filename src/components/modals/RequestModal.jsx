import React from 'react'

export default function RequestModal({changeOcultar , dataModal , user }) {

    const btnSend = dataModal[2];
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
                                        <input type="date" className="form-control"  aria-label="Username"  />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Fecha Fin</span>
                                        <input type="date" className="form-control"  aria-label="Username"  />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Tipo de Solicitud</span>
                                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                            <option defaultValue>Seleccione Tipo de Solicitud</option>
                                            <option value="vacaciones">Vacaciones</option>
                                            <option value="permiso">Permiso</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dangerP" onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                        { btnSend && <button type="button" className="btn btn-successP">{ dataModal[2] }</button>}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
