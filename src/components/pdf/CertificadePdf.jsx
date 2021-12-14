import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '../../../node_modules/@react-pdf/renderer';
import logo from '../../assent/logo.jpg';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'rgba(242, 243, 248)',
    paddingTop : "60px",
    paddingLeft : "10px",
    paddingBottom :  "10px",
  },
  section: {
    flexDirection: 'col',
    width : "100%",
    padding: 10,
  },
  sectionEmpleadoText: {
    flexDirection: 'col',
    width : "60%",
    height : "auto",
    paddingRight : "10px",
    paddingLeft : "5px",
    paddingBottom : "10px",
    paddingTop : "10px",
    marginBottom : "10px",
  },
  sectionEmpleadologo: {
    display : "flex",
    justifyContent : "end",
    alignItems : "center",
    width : "30%",
    height : "auto",
    paddingRight : "10px",
    paddingLeft : "5px",
    paddingBottom : "10px",
    paddingTop : "10px",
    marginBottom : "10px",
  },
  sectionEmpleado: {
    flexDirection: 'col',
    width : "100%",
    height : "auto",
    paddingRight : "10px",
    paddingLeft : "10px",
    paddingBottom : "10px",
    paddingTop : "10px",
    marginBottom : "10px",
  },
  textEmpleado : {
    marginBottom : "5px"
  },
  col :{
    flexDirection: 'col',
    width : "50%",
    padding: 2,
  },
  col1 :{
    flexDirection: 'row',
    width : "10%",
    padding: 2,
    borderRight : "1px solid #000"
  },
  col2 :{
    flexDirection: 'col',
    width : "20%",
    padding: 2
  },
  col3 :{
    flexDirection: 'row',
    width : "30%",
    padding: 2,
    borderRight : "1px solid #000"
  },
  col4 :{
    flexDirection: 'row',
    width : "40%",
    padding: 2
  },
  col5 :{
    flexDirection: 'row',
    width : "50%",
    padding: 2,
    borderRight : "1px solid #000"
  },
  col6 :{
    flexDirection: 'row',
    width : "60%",
    padding: 2
  },
  col7 :{
    flexDirection: 'row',
    width : "70%",
    padding: 2
  },
  col8 :{
    flexDirection: 'row',
    width : "80%",
    padding: 2,
    borderRight : "1px solid #000"
  },
  col9 :{
    flexDirection: 'row',
    width : "90%",
    padding: 2
  },
  col10 :{
    flexDirection: 'row',
    width : "100%",
    padding: 2,
    border : "1px solid #000"
  },
  logo :{
    width : "100px",
    height : "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border : "4px solid #6D53FB"
  },
  h1 : {
    fontSize : "20px",
    display : "flex",
    justifyContent : "center",
    backgroundColor : "#6D53FB",
    color : "#FFF"

  },
  container :{
    display : "flex",
    flexDirection: "row"

  }
});

const fecha = new Date().toLocaleDateString();



const CerticatePdf = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.container}>
            <View style={styles.sectionEmpleadoText}>
                <View>
                  <Text style={styles.textEmpleado}>Fecha : { fecha }</Text>
                </View>
                <View>
                  <Text style={styles.h1}>Certificado Laboral</Text>
                </View>
            </View>
            <View style={[styles.sectionEmpleadologo]}>
                  <Image style={[styles.logo]} src={logo} alt="logo__isagen"  />
            </View>
          </View>
          <View style={styles.sectionEmpleado}>
            <Text>
                Se certifica que {user.sexo === "m" ? " el señor" : "la señora"} <strong>{user.nombres} {user.apellidos}</strong> identificado con la c.c <strong>{user.cc}</strong> trabaja en la Empresa
                <strong> Isagen</strong> desde { user.dateEntry }, y su cargo actual es <strong>{ user.post }</strong> en el cual devenga un salario integral de 
                {" $ " + user.salary }.
            </Text>
          </View>
        </View>
    </Page>
  </Document>
);

export default CerticatePdf;