import logo from '../assent/logo5.svg';
import '../css/login.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faUserTie , faKey} from '../../node_modules/@fortawesome/free-solid-svg-icons';
function Login() {
    
    const expresionUser = /([a-zñáéíóú])+$/;

    const changeInput = () => {
        const username =  document.getElementById("floatingInput");
        const password =  document.getElementById("floatingPassword");
        const exUser = expresionUser.test(username.value.toLowerCase());
        const exPassword = expresionUser.test(username.value.toLowerCase());
        console.log(exUser);
        if(exUser === false){
            username.classList.add("is-invalid");
        }else{
            username.classList.remove("is-invalid");
            username.classList.add("is-valid");
        }
        if(exPassword === false && exUser === false){
            password.classList.add("is-invalid");
        }else{
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
        }

       
    }
    const dataUser = ()=>{
        
    }
    return (
        <div className="container__form">
            <div className="container__login">
                <img src={logo} className='img__login' alt="logo__isagen" />
                <div className="form-floating mb-3 input__user">
                    <input type="text" name="username" className="form-control" id="floatingInput" onChange={ changeInput } />
                    <label htmlFor="floatingInput"><FontAwesomeIcon icon={faUserTie} /> Usuario</label>
                </div>
                <div className="form-floating">
                    <input type="password" name="password" className="form-control" id="floatingPassword" required onChange={ changeInput } />
                    <label htmlFor="floatingPassword"><FontAwesomeIcon icon={faKey} /> Contraseña</label>
                </div>
                <div className="d-grid gap-2 container__ingresar">
                    <input type="button" className="btn text-light" value="Ingresar" onClick={ dataUser } />
                </div>
            </div>
        </div>
    );
}

export default Login;
