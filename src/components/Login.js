import logo from '../assent/logo5.svg';
import '../css/login.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faUserTie , faKey , faExclamationTriangle} from '../../node_modules/@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Login() {
    
    const expresion = /^[A-Za-z0-9_]{5,16}$/; ///([a-zñáéíóú0-9_])+$/;
    const expresionPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{5,16}$/;
    const [message , setMessage] = useState(null);


    const validateUser = ()=>{
        setMessage()
        const username =  document.getElementById("floatingInput");
        const exUser = expresion.test(username.value.toLowerCase().trim());
        console.log(exUser);
        if(exUser === false || username.value.toLowerCase().length>12 || username.value.toLowerCase().length<6){
            username.classList.add("is-invalid");

        }else{
            username.classList.remove("is-invalid");
            username.classList.add("is-valid");
        }
    }

    const validatePassword = ()=>{
        const password =  document.getElementById("floatingPassword");
        const exPassword = expresion.test(password.value.toLowerCase());
        if(exPassword === false || password.value.toLowerCase().length>12 || password.value.toLowerCase().length<6){
            password.classList.add("is-invalid");
        }else{
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
        }
    }
    
    const dataUser = ()=>{
        return setMessage("Usuario o Contraseña incorrectos.");
    }
    return (
        <div className="container__form">
            <div className="container__login">
                <img src={logo} className='img__login' alt="logo__isagen" />
                <div className="form-floating mb-3 input__user">
                    <input type="text" name="username" className="form-control" id="floatingInput" required onChange = { validateUser } />
                    <label htmlFor="floatingInput"><FontAwesomeIcon icon={faUserTie} /> Usuario</label>
                </div>
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" id="floatingPassword" required onChange = { validatePassword } />
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
