import React,{useState, useContext} from 'react'
import CertificadeModal from './modals/CertificadeModal';
import RequestModal from './modals/RequestModal';
import CopyModal from './modals/CopyModal';
import EditProfilModal from './modals/CrudUserModal';
import logo from '../assent/logo.svg';
import '../css/home.css';
import { FontAwesomeIcon } from '../../node_modules/@fortawesome/react-fontawesome';
import { faCertificate, faPlusCircle, faFileImport, faUserEdit , faCheckCircle, faTimesCircle, faSync} from '../../node_modules/@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../auth/authContext';

export default function Home() {
    const { userData } = useContext( AuthContext );
    const [user, setUser] = useState(userData);
    const [ocultar,setOcultar] = useState(["ocultar","ocultar","ocultar","ocultar"]);
    const [dataModal, setDataModal] = useState([]);

    const [solicitudes,setSolicitudes] = useState([
        {id : 1,fecha : '10-01-2021' , tipoSolicitud : 'Permiso', estado : 'Aprobado'},
        {id : 2,fecha : '12-02-2021' , tipoSolicitud : 'Vacaciones', estado : 'Negado'},
        {id : 3,fecha : '24-03-2021' , tipoSolicitud : 'Permiso',  estado : 'Procesando'},
        {id : 4,fecha : '24-04-2021' , tipoSolicitud : 'Vacaciones',  estado : 'Aprobado'},
        {id : 5,fecha : '04-06-2021' , tipoSolicitud : 'Permiso',  estado : 'Procesando'},
        {id : 6,fecha : '24-11-2021' , tipoSolicitud : 'Permiso',  estado : 'Negado'},
    ]);

    const changeBtn = (valor) => valor === "ocultar" ? "visible":"ocultar";

    const changeOcultar = (valor) =>{
        switch (valor) {
            case 1:
                ocultar[0] = changeBtn(ocultar[0]);
                setOcultar(ocultar);
                setDataModal([valor,"Crear Solicitud","Solicitar"]);
                break;
            case 2:
                ocultar[1] = changeBtn(ocultar[1]);
                setOcultar(ocultar);
                setDataModal([valor,"Descargar Certificado","Descargar"]);
                break;

            case 3:
                ocultar[2] = changeBtn(ocultar[2]);
                setOcultar(ocultar);
                setDataModal([valor,"Obtener Copia de Nómina","Descargar"]);
                break;

            case 4:
                ocultar[3] = changeBtn(ocultar[3]);
                setOcultar(ocultar);
                setDataModal([valor,"Editar Perfil", "Actualizar",false]);
                break;

            default:
                break;
        }
    }
    return (
        <>
            <div className={ocultar[0]}>
                <RequestModal changeOcultar={changeOcultar} dataModal = {dataModal} user = { user }/>
            </div>
            <div className={ocultar[1]}>
                <CertificadeModal changeOcultar={changeOcultar} dataModal = {dataModal} user = { user }/>
            </div>
            <div className={ocultar[2]}>
                <CopyModal changeOcultar={changeOcultar} dataModal = {dataModal} user = { user }/>
            </div>
            <div className={ocultar[3]}>
                <EditProfilModal changeOcultar={changeOcultar} setUser={setUser} dataModal = {dataModal} user = { user }/>
            </div>
            <div className="container container__home">
                <div className="row">
                    <div className="col-sm-12 col-md-12 ">
                        <div className="row">
                            <div className="col-sm-12 col-sm-4 d-flex flex-row align-items-center">
                                <img src={logo} className='img__home' alt="logo__isagen" />
                                <h3 className="ms-2">Bienvenid@ <span>{ user.nombres + " "+ user.apellidos }</span></h3>
                            </div>
                            <div className="col-sm-12 col-sm-8 d-md-flex justify-content-lg-between align-items-md-center mt-md-2 menu__home">
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-successP me-sm-1 me-lg-0"
                                        onClick={()=>changeOcultar(1)}>
                                        <FontAwesomeIcon icon={faPlusCircle} />  Crear Nueva Solicitud
                                    </button>
                                </div>
                                <div>
                                    <button 
                                        type="button" 
                                        className="btn btn-successP me-sm-1 me-lg-0" 
                                        onClick={()=>changeOcultar(2)}><FontAwesomeIcon icon={faCertificate} /> Descargar Certificado Laboral
                                    </button>
                                </div>
                                <div>
                                    <button 
                                        type="button" 
                                        className="btn btn-successP me-sm-1 me-lg-0" 
                                        onClick={()=>changeOcultar(3)}><FontAwesomeIcon icon={faFileImport} /> Obtener Copia de Nómina
                                    </button>
                                </div>
                                <div>
                                    <button 
                                        type="button" 
                                        className="btn btn-successP me-sm-1 me-lg-0" 
                                        onClick={()=>changeOcultar(4)}><FontAwesomeIcon icon={faUserEdit} /> Editar Perfil
                                    </button>
                                </div>
                                
                            </div>
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
                                        <h3>Últimas Solicitudes</h3>
                                    </th>
                                </tr>
                                <tr className="bg__gray text-center">
                                    <th scope="col" className="icon__sm">#</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Tipo de Solicitud</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                { solicitudes.map((solicitud)=>{
                                    return(
                                        <tr key={ solicitud.id }>
                                            <th scope="row" className="icon__sm">{ solicitud.id }</th>
                                            <td>{ solicitud.fecha }</td>
                                            <td>{ solicitud.tipoSolicitud }</td>
                                            {solicitud.estado === 'Aprobado' ?
                                                <td>
                                                    <div className="bg__success text-center">
                                                        <FontAwesomeIcon icon={faCheckCircle}/> <span className="icon__sm">{ solicitud.estado }</span>
                                                    </div>
                                                </td> :
                                            solicitud.estado === 'Negado' ?
                                                <td>
                                                    <div className="bg__danger text-center">
                                                        <FontAwesomeIcon icon={faTimesCircle}/> <span className="icon__sm">{ solicitud.estado }</span>
                                                    </div>
                                                </td> :
                                                <td>
                                                    <div className="bg__info text-center">
                                                        <FontAwesomeIcon icon={faSync}/> <span className="icon__sm">{ solicitud.estado }</span>
                                                    </div>
                                                </td>}
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
