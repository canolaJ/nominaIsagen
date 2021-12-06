import React from 'react'
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { faEye, faPlusCircle, faUserEdit , faCheckCircle, faTimesCircle, faHeartBroken} from '../../../node_modules/@fortawesome/free-solid-svg-icons';


export default function NominaModal({changeOcultar, dataUser , dataModal , list }) {
    const btnSend = dataModal[2];
    const listCount = list;
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
                            <div className="container-fluid">
                                <div className="row mt-4">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover">
                                            <thead>
                                                <tr className="bg__gray">
                                                    <th scope="col">Nombre Completo</th>
                                                    <th scope="col" className="icon__sm">Documento</th>
                                                    <th scope="col" className="icon__sm">Tipo de usuario</th>
                                                    <th scope="col">Proceso</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { listCount.length < 1 && 
                                                    <tr>
                                                        <th colSpan="4">
                                                            <div className="alert alert-danger d-flex align-items-center justify-content-center" role="alert">
                                                                <h5><FontAwesomeIcon className="me-3" icon={ faHeartBroken } /> No existen Usuarios para la Búsqueda!</h5>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                }
                                                { list.map((user)=>{
                                                    return(
                                                        <tr key={ user.id }>
                                                            <th scope="row">{ user.nombres + " " + user.apellidos }</th>
                                                            <td className="icon__sm">{ user.cc }</td>
                                                            <td className="icon__sm">{ user.post }</td>
                                                            <td>
                                                                <button className="btn btn-primaryP w-100" onClick={()=>changeOcultar(2, user)}>
                                                                    <FontAwesomeIcon className="icon__sm"  icon={ faCheckCircle }/> <span>Seleccionar</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-dangerP" onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                        { btnSend && <button type="button" className="btn btn-successP">{ dataModal[2] }</button>}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
