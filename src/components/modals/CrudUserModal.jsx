import React, { useState } from 'react';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { faExclamationTriangle,} from '../../../node_modules/@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function EditProfilModal({changeOcultar , dataModal , user }) {

    const btnSend = dataModal[2];
    const formData = document.querySelectorAll('.form__disabled');

    if(btnSend === null){
        formData.forEach(function(element)  {
            element.setAttribute("disabled", "");
        });
    }else{
        formData.forEach(function(element)  {
            element.removeAttribute("disabled");
        });
    }
    const [error, setError] = useState(false);
    const form = document.forms['form-user'];

    const addClass = (result,nombre) =>{
        if(result === true ){
            form[nombre].classList.add("is-valid");
            form[nombre].classList.remove("is-invalid");
        }else{
            form[nombre].classList.remove("is-valid");
            form[nombre].classList.add("is-invalid");
        }
    }

    const validateField = (number, nombre)=>{
        let result = '';
        let dato = '';
        const exNA = /^[a-záéíóúñ ]{1,15}$/;
        const exCT = /^[0-9]{1,15}$/;
        const exU = /^[a-z0-9_]{1,15}$/;
        const exP = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/

        switch (number) {
            case 1:
                dato = form[nombre].value;
                result = exNA.test(dato);
                addClass(result,nombre);
                break;

            case 2:
                dato = form[nombre].value;
                result = exCT.test(dato);
                addClass(result,nombre);
                break;

            case 3:
                dato = form[nombre].value;
                result = exU.test(dato);
                addClass(result,nombre);
                break;

            default:
                dato = form[nombre].value;
                result = exP.test(dato);
                addClass(result,nombre);
                break;
        }
    }

    const userCreate = (nombres, cc, phone, username, password, sexo , post, dateEntry, salary, estado)=>{
        const url = "http://localhost:4000/user/create";
        axios.post(url, {
            nombres
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const validateFields = ()=>{
        setError(false);
        const form = document.forms['form-user'];
        const nombres = form['nombres'].value;
        const cc = form['cc'].value;
        const phone = form['phone'].value;
        const username = form['username'].value;
        const password = form['password'].value;
        const sexo = form['sexo'].value;
        const post = form['post'].value;
        const dateEntry = form['dateEntry'].value;
        const salary = form['salary'].value;
        const estado = form['estado'].value;
        // if(nombres && cc && phone && username && password && sexo !== "Seleccione el sexo" && post !== 'Seleccione Tipo de Usuario' && dateEntry && salary && estado !== 'Seleccione el estado del Usuario'){
        if(nombres){
            console.log('registrado');
            userCreate(nombres, cc, phone, username, password, sexo , post, dateEntry, salary, estado );
        }else{
            setError(!error);
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
                    <form id="form-user">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nombres</span>
                                        <input type="text" id="nombres" className="form-control form__disabled" placeholder={ user.nombres } aria-label="Username" onChange={()=>validateField(1,'nombres')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Apellidos</span>
                                        <input type="text" id="apellidos" className="form-control form__disabled" placeholder={ user.apellidos } aria-label="Username" onChange={()=>validateField(1,'apellidos')}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Cédula</span>
                                        <input type="text" id="cc" className="form-control form__disabled" placeholder={ user.cc } aria-label="Username" onChange={()=>validateField(2,'cc')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Teléfono</span>
                                        <input type="text" id="phone" className="form-control form__disabled" placeholder={ user.phone } aria-label="Username" onChange={()=>validateField(2,'phone')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Usuario</span>
                                        <input type="text" id="username" className="form-control form__disabled" placeholder={ user.username } aria-label="Username" onChange={()=>validateField(3,'username')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Contraseña</span>
                                        <input type="text" id="password" className="form-control form__disabled" placeholder={ user.password } aria-label="Username"  onChange={()=>validateField(4,'password')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Sexo</span>
                                        <select className="form-select form-select-sm form__disabled" id="sexo" aria-label=".form-select-sm example">
                                            <option defaultValue>{ user.sexo ? user.sexo : "Seleccione el sexo" }</option>
                                            <option value="masculino">Masculino</option>
                                            <option value="femenino">femenino</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                </div>
                                {dataModal[3] &&
                                <>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Tipo Usuario</span>
                                        <select className="form-select form-select-sm form__disabled" id="post" aria-label=".form-select-sm example">
                                            <option defaultValue>{ user.post ? user.post : "Seleccione Tipo de Usuario" }</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Usuario-Nomina">Usuario-Nómina</option>
                                            <option value="Usuario-Empleado">Usuario-Empleado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Fecha de Ingreso</span>
                                        <input type="date" id="dateEntry" className="form-control form__disabled" placeholder={ user.dateEntry } aria-label="Username"  />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Salario</span>
                                        <input type="text" id="salary" className="form-control form__disabled" placeholder={ user.salary } aria-label="Username"  onChange={()=>validateField(2,'salary')}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Estado</span>
                                        <select className="form-select form-select-sm form__disabled" id='estado' aria-label=".form-select-sm example">
                                            <option defaultValue>{ user.estado ? user.estado : "Seleccione el estado del Usuario" }</option>
                                            <option value="activo">Activo</option>
                                            <option value="inactivo">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p><strong className='text-danger'>*</strong> La contraseña debe tener al entre 6 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                                        NO puede tener otros símbolos.</p>
                                </div>
                                </>
                                }
                                {error &&
                                <div className="col-sm-12">
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong><FontAwesomeIcon icon={ faExclamationTriangle }/> Cuidado!</strong> faltan campos por llenar.
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-dangerP" onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                    { btnSend && <button type="button" className="btn btn-successP" onClick={ validateFields }>{ dataModal[2] }</button>}
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
