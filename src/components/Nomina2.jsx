import React from 'react';


export default function Nomina() {
    const users=[
        {id:1, nombres : "jonathan" , apellidos : "Cañola", cc : 456789233, phone : 3209874563 , username : "Totan" , 
         password : "***************" , dateEntry : "01-23-1990" , post : "Super Administrador", sexo: "m", salary : "3500000", estado : "activo"},
        {id:2, nombres : "jorge" , apellidos : "Cañola", cc : 986978423, phone : 3119874562 , username : "George" , 
         password : "***************" , dateEntry : "11-10-2002" , post : "Usuario-Nomina", sexo: "m", salary : "2500000" , estado : "activo"},
        {id:3, nombres : "jabian" , apellidos : "Monitor", cc : 986978423, phone : 3119874562 , username : "George" , 
         password : "***************" , dateEntry : "04-23-2019" , post : "Usuario-Empleado", sexo: "m", salary : "1500000", estado : "inactivo"}
    ];
    
    return (
        
        <div className="container-fluid p-5 ">
            <div className="row bg__isagen ">
                <div className="col-md-6 mt-3 mb-3">
                    <input className="form-control" id="input1"></input>
                </div>
                <div className="col-md-6 mt-3 mb-3">
                    <button className="" id="btb__buscar">Buscar</button>
                </div>
            </div>
            <div className="row  key={ user.id }">
            <div className="col-md-12  ">
               <div className="row ">
                   <div className="col-sm-12 text-center">
                        <h4 className="form-label ">Datos del empleado</h4>
                   </div>
                   <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text  bg-secondary text-light" id="basic-addon3">Código Empleado:</span>
                            <input type="text" className="form-control" disabled aria-describedby="basic-addon3"/>
                        </div>
                   </div>
                   <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Fecha:</span>
                            <input type="text" className="form-control" disabled aria-describedby="basic-addon3"/>
                        </div>
                   </div>
                   <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Nombre:</span>
                            <input type="text" className="form-control" disabled aria-describedby="basic-addon3"/>
                        </div>
                   </div>
                   <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Apellidos:</span>
                            <input type="text" className="form-control" disabled aria-describedby="basic-addon3"/>
                        </div>
                   </div>
                   <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Número de documento:</span>
                            <input type="text" className="form-control" disabled aria-describedby="basic-addon3"/>
                        </div>
                   </div>
                   <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Cargo:</span>
                            <input type="text" className="form-control" disabled aria-describedby="basic-addon3"/>
                        </div>
                   </div>
                   
                   <div className="col-sm-12 col-md-6">
                        <div className="input-group mb-3">
                            <span className="input-group-text bg-secondary text-light" id="basic-addon3">Salario Base:</span>
                            <input type="text" className="form-control" disabled aria-describedby="basic-addon3"/>
                        </div>
                   </div>

               </div>

            </div>
                <div className="col-md-12">
                    <table className="table table-bordered border-dark">
                            <thead className="text-center">
                                <tr>
                                    <th colSpan="3"><h4>Pagos y Deduciones</h4></th>
                                </tr>
                                <tr>
                                    <th><h5>Descripción</h5></th>
                                    <th>Deducción</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><h6>Vacaciones Remuneradas</h6></td>
                                    <td><h6>0</h6></td>
                                    <td><h6>$500.000</h6></td>
                                </tr>
                                <tr>
                                    <td><h6>Vacaciones No Remuneradas</h6></td>
                                    <td><h6>$0</h6></td>
                                    <td><h6>$0</h6></td>
                                </tr>
                                <tr>
                                    <td><h6>Permisos Remunerados</h6></td>
                                    <td><h6>$0</h6></td>
                                    <td><h6>$0</h6></td>
                                </tr>
                                <tr>
                                    <td><h6>Permisos No Remunerados</h6></td>
                                    <td><h6>$75.000</h6></td>
                                    <td><h6>-$75.000</h6></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td  colSpan="2">
                                        <h5>Total Pagado (Total-Deducción)</h5>
                                    </td>
                                    <td>
                                    <h6>$425.000</h6> 
                                    </td>
                                </tr>
                            </tfoot>
                    </table>          
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-12 text-end">
                    <button className="btn btn-danger me-md-1">Cancelar</button>
                    <button className="btn btn-success">Generar</button>
                </div>
            </div>
        </div>
    )
}

