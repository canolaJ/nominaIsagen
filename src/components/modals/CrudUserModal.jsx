import React, { useState } from 'react';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { faExclamationTriangle,} from '../../../node_modules/@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from '../../../node_modules/sweetalert2'

export default function EditProfilModal({changeOcultar , dataModal , user, setUser,  getAllUsers }) {

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
    const [error, setError] = useState('');
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
    const userUpdate = (nombres, apellidos, cc, phone, username, password, sexo)=>{
        const url = "http://localhost:4000/user/userUpdate";
        axios.put(url, {
            _id : user._id,
            nombres,
            apellidos,
            cc ,
            phone,
            username,
            password,
            sexo
          })
          .then(function (response) {
            const resp = response.data['isOk'];
            if(resp){
                document.getElementById('closed__modal').click();
                Swal.fire({
                    title: 'Actualizado!',
                    text: 'Tu perfil se actualizo con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })
                getUser();

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
        const form = document.forms['form-user'];
        let nombres = form['nombres'].value;
        let apellidos = form['apellidos'].value;
        let cc = form['cc'].value;
        let phone = form['phone'].value;
        let username = form['username'].value;
        let password = form['password'].value;
        let sexo = form['sexo'].value;

        nombres = nombres ? nombres : user.nombres;
        apellidos = apellidos ? apellidos : user.apellidos;
        cc = cc ? cc : user.cc;
        phone = phone ? phone : user.phone;
        username = username ? username : user.username;
        password = password ? password : user.password;
        sexo = sexo ? sexo : user.sexo;

        userUpdate(nombres,apellidos, cc, phone, username, password, sexo);


    }

    const getUser = async ()=>{
        const url = 'http://localhost:4000/user/searchUser';
        let findUser = "";
        axios.post(url, {
            _id:user._id
          })
          .then(function (response) {
            findUser = response.data.user;
            setUser(findUser);

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
                    <form id="form-user">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Nombres</span>
                                        <input type="text" id="nombres" className="form-control form__disabled" name="nombres"  placeholder={ user.nombres }  aria-label="Username" onChange={()=>validateField(1,'nombres')} />
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Apellidos</span>
                                        <input type="text" id="apellidos" className="form-control form__disabled"  placeholder={ user.apellidos } aria-label="Username" onChange={()=>validateField(1,'apellidos')}/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Cédula</span>
                                        <input type="text" id="cc" className="form-control form__disabled"  placeholder={ user.cc } aria-label="Username" onChange={()=>validateField(2,'cc')} />
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
                                        <input type="password" id="password" className="form-control form__disabled" placeholder="****************" aria-label="Username"  onChange={()=>validateField(4,'password')} />
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
                                <p><strong className='text-danger'>*</strong> La contraseña debe tener al entre 6 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.
                                    NO puede tener otros símbolos.</p>
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
