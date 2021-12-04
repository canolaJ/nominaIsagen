import React from 'react'

export default function CopyModal({changeOcultar , dataModal , user }) {
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
                                    <span className="input-group-text">Fecha Requerida</span>
                                    <input type="date" className="form-control"  aria-label="Username"  />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Nombres</span>
                                            <input type="text" className="form-control" placeholder={ user.nombres } aria-label="Username"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Apellidos</span>
                                            <input type="text" className="form-control" placeholder={ user.apellidos } aria-label="Username"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Cédula</span>
                                            <input type="text" className="form-control" placeholder={ user.cc } aria-label="Username"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Teléfono</span>
                                            <input type="text" className="form-control" placeholder={ user.phone } aria-label="Username"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Cargo</span>
                                            <input type="text" className="form-control" placeholder={ user.post} aria-label="Username"  />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Salario Base</span>
                                            <input type="text" className="form-control" placeholder={ user.salary } aria-label="Username"  />
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr className="text-center bg__primary">
                                                <th colSpan="4">
                                                        <h3>Copia de Nómina</h3>
                                                </th>
                                            </tr>
                                            <tr className="table-dark text-center">
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Descripción</th>
                                                <th scope="col">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr >
                                                <th scope="row">Salario Devengado</th>
                                                <td>Salario Integral</td>
                                                <td>{"$ " + user.salary }</td>
                                            </tr>
                                            <tr >
                                                <th scope="row">Deducciones del Mes</th>
                                                <td>
                                                    <tr  className="border-1">
                                                        <td>Permiso no Remunerado</td>
                                                        <td> - $ 300000 </td>
                                                    </tr>
                                                    <tr  className="border-1">
                                                        <td>Permiso no Remunerado</td>
                                                        <td> - $ 300000 </td>
                                                    </tr>
                                                </td>
                                                <td> $ -600000 </td>
                                            </tr>
                                            <tr >
                                                <th scope="row">total a Cancelado</th>
                                                <td>Salario Devengado menos Deducciones del Mes</td>
                                                <td>$ 2900000</td>
                                            </tr>
                                        </tbody>
                                    </table>
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
