import logo from '../assent/logo5.svg';
import '../css/login.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faUserTie , faKey } from '../../node_modules/@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import axios from 'axios';
import Swal from '../../node_modules/sweetalert2'
import  { useNavigate } from "react-router-dom";
import { types } from '../types/types';
import { AuthContext } from '../auth/authContext';
function Login() {
    const navigate = useNavigate();
    const { dispatch } = useContext( AuthContext )

    const userLogin = ()=>{
        const url = "http://localhost:4000/user/login";
        const username = document.getElementById('floatingInput').value;
        const password = document.getElementById('floatingPassword').value;
        axios.post(url, {
           username,
           password
        })
        .then(function (response) {
            const resp = response.data['isOk'];
            const user = response.data['user'];
            if(resp){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bienvenido de Nuevo',
                    showConfirmButton: false,
                    timer: 1500
                });
                const action = {
                    type : types.login,
                    payload : {
                        _id : user.id,
                        nombres : user.nombres,
                        apellidos : user.apellidos,
                        cc : user.cc,
                        phone : user.phone,
                        username : user.username,
                        sexo : user.sexo,
                    }
                }
                dispatch(action);
                navigate('/admin/home', {
                    replace: true
                });


            }else{
                return setMessage("Usuario o Contraseña incorrectos.");
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    const expresion = /^[A-Za-z0-9_]{1,15}$/; //^[a-z0-9_]{1,15}$/
    const [message , setMessage] = useState(null);
    let error = [false,false];

    const validateFields = (nameId,valor)=>{

        setMessage()

        const attribute =  document.getElementById(nameId);
        let attributeTest = "";
        nameId === 'floatingInput' ? attributeTest = attribute.value.toLowerCase() : attributeTest = attribute.value;
        const exUser = expresion.test(attributeTest);

        if(exUser === false){
            attribute.classList.add("is-invalid");
            error[valor]=true;
        }else{
            attribute.classList.remove("is-invalid");
            attribute.classList.add("is-valid");
            error[valor]=false;
        }
    }

    const dataUser = ()=>{
        console.log(error)
        if(error[0]===true || error[1]===true){
            return setMessage("Usuario o Contraseña incorrectos.");
        }else{
            setMessage(null);
            userLogin();
        }
    }
    return (
        <div className="container__form">
            <div className="container__login">
                <img src={logo} className='img__login' alt="logo__isagen" />
                <div className="form-floating mb-3 input__user">
                    <input type="text" name="username" className="form-control" id="floatingInput" required onChange = { ()=>validateFields("floatingInput",0) } />
                    <label htmlFor="floatingInput"><FontAwesomeIcon icon={faUserTie} /> Usuario</label>
                </div>
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" id="floatingPassword" required onChange = { ()=>validateFields("floatingPassword",1) } />
                    <label htmlFor="floatingPassword"><FontAwesomeIcon icon={faKey} /> Contraseña</label>
                </div>
                <div className="d-grid gap-2 container__ingresar">
                    <input type="button" className="btn text-light" value="Ingresar" onClick={ dataUser } />
                </div>
                { message &&
                    <div className="alert alert-danger d-flex align-items-center mt-2" role="alert">
                        { message }
                    </div>
                }
            </div>
        </div>
    );
}

export default Login;
