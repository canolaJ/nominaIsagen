import React,{useState, useEffect} from 'react'
import ProccessRequestModal from './modals/ProccessRequestModal';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faSync , faCheckCircle, faTimesCircle, faSearch ,faUserClock } from '../../node_modules/@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Permisos() {
    useEffect(()=>{
        requestPermissionsAll();
    },[])
    const [ocultar,setOcultar] = useState("ocultar");
    const [dataModal, setDataModal] = useState([]);
    const [vacaciones,setVacaciones] = useState([]);
    const [list, setList] = useState(vacaciones);
    const [vacacion, setVacion] = useState([]);

    const requestPermissionsAll = async ()=>{
        const url = 'http://localhost:4000/request/requestPermissionsAll';
        const allPermissions = await axios.get(url);
        setVacaciones(allPermissions.data.request);
        setList(allPermissions.data.request);
    }

    const changeBtn = () => ocultar === "ocultar" ? setOcultar("visible"): setOcultar("ocultar");

    const changeOcultar = (valor,vacacion) =>{
        switch (valor) {
            case 1:
                changeBtn();
                setDataModal([valor,"Procesar solicitud de Permisos", "procesar",true, null]);
                if (vacacion) {
                    setVacion(vacacion);
                };
                break;

            default:
                break;
        }
    }
    const searchList = () =>{

        const search = document.getElementById('search').value.toLowerCase();
        const vacacionesFilter = vacaciones.filter(vaciones => vaciones.requestAuthor.nombres.includes( search ) || vaciones.requestAuthor.apellidos.includes( search ));
        setList(vacacionesFilter);
    }
    return (
        <>
        <div className={ocultar}>
            <ProccessRequestModal requestPermissionsAll={requestPermissionsAll} changeOcultar={changeOcultar} dataModal = {dataModal} vacacion = {vacacion}/>
        </div>
        <div className="container container__home">
            <div className="row mb-2">
                <div className="col-sm-12 col-md-12">
                    <div className="row">
                        <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center justify-content-between">
                            <h3 className="ms-2"><FontAwesomeIcon icon={ faUserClock } /> Permisos</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-5">
                    <div className="input-group mb-3">
                        <span className="input-group-text"><FontAwesomeIcon icon={ faSearch } /></span>
                        <input type="text" className="form-control" id="search" placeholder=" ¿Qué usuario deseas buscar? " onChange={searchList} />
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
                                        <h3>Solicitud de Vacaciones para Empleados</h3>
                                </th>
                            </tr>
                            <tr className="bg__gray">
                                <th scope="col">Nombre Completo</th>
                                <th scope="col" className="icon__sm">Fecha de Inicio</th>
                                <th scope="col">Fecha de Fin</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            { list.map((vacacion)=>{
                                return(
                                    <tr key={ vacacion._id }>
                                        <th scope="row">{ vacacion.requestAuthor.nombres + " " + vacacion.requestAuthor.apellidos }</th>
                                        <td className="icon__sm">{ vacacion.dateExit }</td>
                                        <td>{ vacacion.dateEntry }</td>
                                        <td>
                                            {vacacion.response === 'Aprobado' ?
                                                <div className="bg__success text-center">
                                                    <FontAwesomeIcon icon={faCheckCircle}/> <span className="icon__sm">{ vacacion.response }</span>
                                                </div>
                                            : vacacion.response === 'Negado' ?
                                                <div className="bg__danger text-center">
                                                    <FontAwesomeIcon icon={faTimesCircle}/> <span className="icon__sm">{ vacacion.response }</span>
                                                </div> 
                                            :
                                                <button className="btn btn-primaryP text-center w-100" onClick = { ()=> changeOcultar(1, vacacion) }>
                                                    <FontAwesomeIcon icon={faSync}/><span className="icon__sm"> { vacacion.response }</span>
                                                </button>
                                            }
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



