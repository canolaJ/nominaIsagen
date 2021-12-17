import React,{useState, useEffect} from 'react'
import axios from 'axios';
import Swal from '../../node_modules/sweetalert2';
import ViewUpdateUser from './modals/ViewUpdateUser';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faFile ,faEye,  faCheckCircle, faTimesCircle, faSearch} from '../../node_modules/@fortawesome/free-solid-svg-icons';

export default function PayRoll() {
    useEffect(()=>{
        getPayRolls(); 
    },[])
    const [dataModal, setDataModal] = useState([]);
    const [user,setUser] = useState({
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
    const [payRoll,setPayRoll] = useState([]);
    const [list, setList] = useState(payRoll);

    const changeOcultar = (valor,dataUser) =>{
        let view = "";
        switch (valor) {
            case 1:
                const register = document.getElementById('registrarUser');
                register.classList.toggle('ocultar');
                register.classList.toggle('visible');
                setDataModal([valor,"Registrar Nuevo Usuario", "Registrar",true]);
                if (dataUser) {
                    setUser(dataUser);
                };
                break;

            case 2:
                view = document.getElementById('viewUser');
                view.classList.toggle('ocultar');
                view.classList.toggle('visible');
                setDataModal([valor,"Datos Del Usuario", null, true]);
                if (dataUser) {
                    setUser(dataUser);
                };
               
                break;

            case 3:
                view = document.getElementById('viewUser');
                view.classList.toggle('ocultar');
                view.classList.toggle('visible');
                setDataModal([valor,"Editar Usuario", "Actualizar",true]);
                if (dataUser) {
                    setUser(dataUser);
                };
                break;

            default:
                break;
        }
    }
    const searchUser = () =>{
        const search = document.getElementById('search').value.toLowerCase();
        const usersFilter = payRoll.filter(user => user.nombres.includes( search ) || user.apellidos.includes( search ) || user.cc.includes( search ));
        setList(usersFilter);
    }

    const getPayRolls = async ()=>{
        const url = 'http://localhost:4000/payRoll';
        const payRolls = await axios.get(url);
        const payRollData = payRolls.data.payRoll;
        console.log(payRolls.data.payRoll)
        setPayRoll(payRollData);
        setList(payRollData);
    }

    const activeUser = (user , number) =>{
        
        const valorTitle = number === 1 ? '¿Desea desactivarlo?' : '¿Desea activarlo?';
        const confirm = number === 1 ? 'Desactivado!' : 'Activado!';

        Swal.fire({
            title: valorTitle,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = 'http://localhost:4000/user/userUpdate';
                const estadoUser = user.estado === "activo" ? "inactivado" : "activo"
                axios.put(url, {
                    _id : user._id,
                    estado :  estadoUser
                })
                .then(response => {
                    // getAllUsers();
                })
                .catch(error => {
                    console.error(error);
                });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: confirm,
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        })
    }
    return (
        <>
        <div className="ocultar" id='viewUser'>
            <ViewUpdateUser
                changeOcultar={changeOcultar}
                // getAllUsers={getAllUsers}
                setUser={setUser}
                dataModal = {dataModal}
                user = {user}
            />
        </div>
        <div className="container container__home">
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <div className="row">
                        <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center justify-content-between">
                            <h3 className="ms-2"><FontAwesomeIcon icon={ faFile } /> Nóminas</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FontAwesomeIcon icon={ faSearch } /></span>
                        <input type="text" className="form-control" id="search" placeholder=" ¿Qué usuario deseas buscar? " onChange={searchUser} />
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr className="text-center bg__primary">
                                <th colSpan="4">
                                        <h3>Nóminas</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray text-center">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Fecha de creación</th>
                                <th scope="col">Tipo de usuario</th>
                                <th scope="col">Información</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            { list.map((payRoll)=>{
                                return(
                                    <tr key={ payRoll._id }>
                                        <th scope="row">{ payRoll.payRollAuthor["nombres"] + " " + payRoll.payRollAuthor["apellidos"] }</th>
                                        <td className="icon__sm">{ payRoll.dateGenerated }</td>
                                        <td>{ payRoll.payRollAuthor["post"] }</td>
                                        <td>
                                            <div className="d-flex flex-sm-row">
                                                <button className="btn btn-primaryP" onClick={()=>changeOcultar(2, payRoll)}>
                                                    <FontAwesomeIcon  icon={ faEye }/> <span className="icon__sm">Ver</span>
                                                </button>
                                                {payRoll.holiadysPaid > 0 ?
                                                    <div className="btn btn-successP" >
                                                        <FontAwesomeIcon  icon={ faCheckCircle }/> <span className="icon__sm">Vacaciones Pagas</span>
                                                    </div>
                                                    :
                                                    <div className="btn btn-dangerP" >
                                                    <FontAwesomeIcon icon={ faTimesCircle }/> <span className="icon__sm" >Vacaciones no Pagas</span>
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}
