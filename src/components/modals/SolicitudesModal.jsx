import React from 'react'

export default function SolicitudesModal({changeOcultar , dataModal , user }) {
    
    const btnSend = dataModal[2];
    const disabled = dataModal[4];
    const formData = document.querySelectorAll('.form__disabled');
    if(disabled === null){
        formData.forEach(function(element)  {
            element.setAttribute("disabled", "");
        });
    }else{
        formData.forEach(function(element)  {
            element.removeAttribute("disabled");
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
                            <div className="col-sm-12 col-md-6">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Nombres</span>
                                    <input type="text" className="form-control form__disabled" placeholder={ user.nombres } aria-label="Username"  />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Apellidos</span>
                                    <input type="text" className="form-control form__disabled" placeholder={ user.apellidos } aria-label="Username" />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Cédula</span>
                                    <input type="text" className="form-control form__disabled" placeholder={ user.cc } aria-label="Username"  />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Cargo</span>
                                    <input type="text" className="form-control form__disabled" placeholder={ user.post } aria-label="Username"  />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Fecha de Inicio</span>
                                    <input type="text" className="form-control form__disabled" placeholder={ user.dateExit } aria-label="Username"  />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Fecha de Fin</span>
                                    <input type="text" className="form-control form__disabled" placeholder={ user.dateEntry } aria-label="Username"  />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                            {dataModal[3] &&
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Calificar</span>
                                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option defaultValue>{ user.result }</option>
                                        <option value="aprobado">Aprobado</option>
                                        <option value="Negado">Negado</option>
                                    </select>
                                </div>
                            }
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
