import React from 'react'
import { PDFDownloadLink } from '../../../node_modules/@react-pdf/renderer';
import CertificadePdf from '../pdf/CertificadePdf';
export default function CertificadeModal({changeOcultar , dataModal , user }) {
    const fecha = new Date().toLocaleDateString();
    const btnSend = dataModal[2];
   
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
                        <div className="row p-5 row__certificade">
                            <div className="col-sm-12 col-md-6 mb-3">
                                <p>
                                    Cartago, <strong>{ fecha }</strong>
                                </p>
                            </div>
                            <div className="col-sm-12 col-md-12">
                                <h3 className="text-center mb-5">Certificado Laboral</h3>
                                <p className="mb-4">
                                    Se certifica que {user.sexo === "m" ? " el señor" : "la señora"} <strong>{user.nombres} {user.apellidos}</strong> identificado con la c.c <strong>{user.cc}</strong> trabaja en la Empresa
                                    <strong> Isagen</strong> desde { user.dateEntry }, y su cargo actual es <strong>{ user.post }</strong> en el cual devenga un salario integral de 
                                    {" $ " + user.salary }.
                                </p>
                                <p>
                                    Este documento tienen una validez de 90 días calendario a partir de la fecha de expedición.
                                </p>
                                <p>
                                Cordialmente,
                                </p>
                                <strong><h5>la Gerencia</h5></strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-dangerP" onClick={()=>changeOcultar(dataModal[0])}>Cerrar</button>
                    {/* { btnSend && <button type="button" className="btn btn-successP">{ dataModal[2] }</button>} */}
                    <PDFDownloadLink
                        document={ <CertificadePdf user = { user } /> }
                        fileName="certificadoLaboral.pdf">
                         { btnSend && <button type="button" className="btn btn-successP">{ dataModal[2] }</button>}
                    </PDFDownloadLink>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
