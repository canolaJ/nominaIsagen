import React, { useState } from 'react';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { faExclamationTriangle,} from '../../../node_modules/@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from '../../../node_modules/sweetalert2'

export default function RegisterUser({changeOcultar , dataModal , setUser,  getAllUsers }) {

    const btnSend = dataModal[2];

    const [error, setError] = useState('');
    const form = document.forms['form-userR'];

    const addClass = (result,nombre) =>{
        if(result === true ){
            form[nombre].classList.add("is-valid");
            form[nombre].classList.remove("is-invalid");
        }else{
            form[nombre].classList.remove("is-valid");
            form[nombre].classList.add("is-invalid");
        }
    }

    const validateFieldR = (number, nombre)=>{
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

    const userCreate = (nombres, apellidos, cc, phone, username, password, sexo , post, dateEntry, salary, estado)=>{
        const url = "http://localhost:4000/user/create";
        axios.post(url, {
            nombres,
            apellidos,
            cc,
            phone,
            username,
            password,
            sexo,
            post,
            dateEntry,
            salary,
            estado
          })
          .then(function (response) {
            const resp = response.data['isOk'];
            if(resp){
                getAllUsers();
                document.getElementById('closed__modal').click();
                Swal.fire({
                    title: 'Registrado!',
                    text: 'Usuario Registrado con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
                setUser({
                    nombres : "",
                    apellidos : "",
                    cc : "",
                    phone : "",
                    username : "",
                    password : "",
                    sexo : "",
                    post : "",
                    dateEntry : "",
                    salary : "",
                    estado : "",
                });
            }else{
                setError('No registrado, El nombre de usuario ya esta en uso!');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    const validateFields = ()=>{
        setError(false);
        const form = document.forms['form-userR'];
        const nombres = form['nombresR'].value;
        const apellidos = form['apellidosR'].value;
        const cc = form['ccR'].value;
        const phone = form['phoneR'].value;
        const username = form['usernameR'].value;
        const password = form['passwordR'].value;
        const sexo = form['sexoR'].value;
        const post = form['postR'].value;
        const dateEntry = form['dateEntryR'].value;
        const salary = form['salaryR'].value;
        const estado = form['estadoR'].value;

        if(nombres && apellidos && cc && phone && username && password && sexo !== "Seleccione el sexo"
            && post !== 'Seleccione Tipo de Usuario' && dateEntry && salary && 
            estado !== 'Seleccione el estado del Usuario'
            ){

            userCreate(nombres,apellidos, cc, phone, username, password, sexo , post, dateEntry, salary, estado );

        }else{
            setError('faltan campos por llenar');
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
                    <form id="form-userR">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nombres</span>
                                        <input type="text" id="nombresR" className="form-control"  aria-label="Username" onChange={()=>validateFieldR(1,'nombresR')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Apellidos</span>
                                        <input type="text" id="apellidosR" className="form-control"  aria-label="Username" onChange={()=>validateFieldR(1,'apellidosR')}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Cédula</span>
                                        <input type="text" id="ccR" className="form-control" aria-label="Username" onChange={()=>validateFieldR(2,'ccR')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Teléfono</span>
                                        <input type="text" id="phoneR" className="form-control"  aria-label="Username" onChange={()=>validateFieldR(2,'phoneR')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Usuario</span>
                                        <input type="text" id="usernameR" className="form-control" aria-label="Username" onChange={()=>validateFieldR(3,'usernameR')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Contraseña</span>
                                        <input type="password" id="passwordR" className="form-control" aria-label="Username"  onChange={()=>validateFieldR(4,'passwordR')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Sexo</span>
                                        <select className="form-select form-select-sm" id="sexoR" aria-label=".form-select-sm example">
                                            <option defaultValue>"Seleccione el sexo" </option>
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
                                        <select className="form-select form-select-sm" id="postR" aria-label=".form-select-sm example">
                                            <option defaultValue>"Seleccione Tipo de Usuario"</option>
                                            <option value="Administrador">Administrador</option>
                                            <option value="Usuario-Nomina">Usuario-Nómina</option>
                                            <option value="Usuario-Empleado">Usuario-Empleado</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Fecha de Ingreso</span>
                                        <input type="date" id="dateEntryR" className="form-control"  aria-label="Username"  />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Salario</span>
                                        <input type="text" id="salaryR" className="form-control"  aria-label="Username"  onChange={()=>validateFieldR(2,'salaryR')}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Estado</span>
                                        <select className="form-select form-select-sm" id='estadoR' aria-label=".form-select-sm example">
                                            <option defaultValue>"Seleccione el estado del Usuario"</option>
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
                                        <strong><FontAwesomeIcon icon={ faExclamationTriangle }/> Cuidado!</strong> { error }.
                                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" id='closed__modal' className="btn btn-dangerP" onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                    { btnSend && <button type="button" className="btn btn-successP" onClick={ validateFields }>{ dataModal[2] }</button>}
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
