import React,{useState, useEffect} from 'react'
import SolicitudesModal from './modals/SolicitudesModal';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faUserClock, faFilePdf } from '../../node_modules/@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Reporte() {

    const [ocultar,setOcultar] = useState("ocultar");
    const [dataModal, setDataModal] = useState([]);
    const [user,setUser] = useState([]);
    const [listSalaryElder, setListSalaryElder] = useState([]);
    const [listSalaryMinor, setListSalaryMinor] = useState([]);

    useEffect(()=>{
        getAllUsers()
    },[]);

   

    const userSalaryElder = (users)=>{

        const prueba = users.filter( item => parseInt(item.salary)>1000000 );
        setListSalaryElder(prueba);

    }

    const userSalaryMinor = (users)=>{

        const prueba = users.filter( item => parseInt(item.salary)<1000000 );
        setListSalaryMinor(prueba);

    }


    const getAllUsers = ()=>{

        const url = 'http://localhost:4000/user/';

        axios.get(url)
        .then(function (response) {
            setUser(response.data.users)
            userSalaryElder(response.data.users);
            userSalaryMinor(response.data.users);
            // console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

   

    const changeBtn = () => ocultar === "ocultar" ? setOcultar("visible"): setOcultar("ocultar");

    const changeOcultar = (valor,dataUser) =>{
        switch (valor) {
            case 1:
                changeBtn();
                setDataModal([valor,"Procesar solicitud de Permiso", "procesar",true, null]);
                if (dataUser) {
                    setUser(dataUser);
                };
                break;

            default:
                break;
        }
    }
    return (
        <>
        <div className={ocultar}>
            <SolicitudesModal changeOcultar={changeOcultar} dataModal = {dataModal} user = {user}/>
        </div>
        <div className="container container__home">
            <div className="row mb-2">
                <div className="col-sm-12 col-md-12">
                    <div className="row">
                        <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center justify-content-between">
                            <h3 className="ms-2"><FontAwesomeIcon icon={ faUserClock } /> Reportes</h3>
                            <button 
                                type="button" 
                                className="btn btn-successP me-sm-1 me-lg-0" 
                                onClick={()=>changeOcultar(1)}><FontAwesomeIcon icon={ faFilePdf } /> Generar Reporte
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="row mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr className="text-center bg__primary">
                                <th colSpan="4">
                                        <h3>Empleados con más de 1 Salario Mínimo</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Cargo</th>
                                <th scope="col">Salario</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            { listSalaryElder.map((user)=>{
                                return(
                                    <tr key={ user._id }>
                                        <th scope="row">{ user.nombres + " " + user.apellidos }</th>
                                        <td className="icon__sm">{ user.post }</td>
                                        <td>{ user.salary }</td>
                                    </tr>
                                )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
            <hr/>
            <div className="row mt-4">
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="text-center">
                            <tr className="text-center bg__primary">
                                <th colSpan="4">
                                        <h3>Empleados con menos de 1 Salario Mínimo</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Cargo</th>
                                <th scope="col">Salario</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            { listSalaryMinor.map((user)=>{
                                return(
                                    <tr key={ user._id }>
                                        <th scope="row">{ user.nombres + " " + user.apellidos }</th>
                                        <td className="icon__sm">{ user.post }</td>
                                        <td>{ user.salary }</td>
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


