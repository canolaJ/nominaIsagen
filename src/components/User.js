import React,{useState} from 'react'
import Navigation from "./Navigation";
import EditProfilModal from './modals/CrudUserModal';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faEye, faPlusCircle, faUserEdit , faCheckCircle, faTimesCircle, faUserFriends, faSearch} from '../../node_modules/@fortawesome/free-solid-svg-icons';

export default function User() {
    const [ocultar,setOcultar] = useState("ocultar");
    const [dataModal, setDataModal] = useState([]);
    const [user,setUser] = useState({});
    const [users,setUsers] = useState([
        {id:1, nombres : "jonathan" , apellidos : "cañola", cc : "456789233", phone : 3209874563 , username : "Totan" , 
         password : "***************" , dateEntry : "01-23-1990" , post : "Super Administrador", sexo: "m", salary : "3500000", estado : "activo"},
        {id:2, nombres : "jorge" , apellidos : "cañola", cc : "986978423", phone : 3119874562 , username : "George" , 
         password : "***************" , dateEntry : "11-10-2002" , post : "Usuario-Nomina", sexo: "m", salary : "2500000" , estado : "activo"},
        {id:3, nombres : "jabian" , apellidos : "monitor", cc : "986978423", phone : 3119874562 , username : "George" , 
         password : "***************" , dateEntry : "04-23-2019" , post : "Usuario-Empleado", sexo: "m", salary : "1500000", estado : "inactivo"},
    ]);
    const [list, setList] = useState(users);
    
    const changeBtn = () => ocultar === "ocultar" ? setOcultar("visible"): setOcultar("ocultar");

    const changeOcultar = (valor,dataUser) =>{
        switch (valor) {
            case 1:
                changeBtn();
                setDataModal([valor,"Registrar Nuevo Usuario", "Registrar",true]);
                if (dataUser) {
                    setUser(dataUser);
                };
                break;

            case 2:
                changeBtn();
                setDataModal([valor,"Datos Del Usuario", null, true]);
                if (dataUser) {
                    setUser(dataUser);
                };
                break;

            case 3:
                changeBtn();
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
        const usersFilter = users.filter(user => user.nombres.includes( search ) || user.apellidos.includes( search ) || user.cc.includes( search ));
        setList(usersFilter);
    }
    return (
        <>
        <div className={ocultar}>
            <EditProfilModal changeOcultar={changeOcultar} dataModal = {dataModal} user = {user}/>
        </div>
        <Navigation />
        <div className="container container__home">
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <div className="row">
                        <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center justify-content-between">
                            <h3 className="ms-2"><FontAwesomeIcon icon={faUserFriends} /> Usuarios</h3>
                            <button 
                                type="button" 
                                className="btn btn-successP me-sm-1 me-lg-0" 
                                onClick={()=>changeOcultar(1)}><FontAwesomeIcon icon={faPlusCircle} /> Registrar Usuario
                            </button>
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
                                        <h3>Usuarios</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Teléfono</th>
                                <th scope="col">Tipo de usuario</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { list.map((user)=>{
                                return(
                                    <tr key={ user.id }>
                                        <th scope="row">{ user.nombres + " " + user.apellidos }</th>
                                        <td className="icon__sm">{ user.phone }</td>
                                        <td>{ user.post }</td>
                                        <td>
                                            <div className="d-flex flex-sm-row">
                                                <button className="btn btn-primaryP" onClick={()=>changeOcultar(2, user)}>
                                                    <FontAwesomeIcon  icon={ faEye }/> <span className="icon__sm">Ver</span>
                                                </button>
                                                <button className="btn btn-warningP" onClick={()=>changeOcultar(3, user)}>
                                                    <FontAwesomeIcon icon={ faUserEdit }/> <span className="icon__sm" >Editar</span>
                                                </button>
                                                {user.estado === 'activo' ?
                                                    <button className="btn btn-successP">
                                                        <FontAwesomeIcon  icon={ faCheckCircle }/> <span className="icon__sm">{ user.estado }</span>
                                                    </button>
                                                    :
                                                    <button className="btn btn-dangerP">
                                                    <FontAwesomeIcon icon={ faTimesCircle }/> <span className="icon__sm" >{ user.estado }</span>
                                                    </button>
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
