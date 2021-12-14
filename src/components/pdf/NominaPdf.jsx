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



const nomina = ({ userSelected , value_vacaciones, value_permission, value_total }) => (
  <Document>
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.container}>
            <View style={styles.sectionEmpleadoText}>
                <View>
                  <Text style={styles.textEmpleado}>Fecha : { fecha }</Text>
                  <Text style={styles.textEmpleado}>Código Empleado : { userSelected.id }</Text>
                  <Text style={styles.textEmpleado}>Nombre : { userSelected.nombres }</Text>
                  <Text style={styles.textEmpleado}>Apellidos : { userSelected.apellidos }</Text>
                  <Text style={styles.textEmpleado}>Número de documento : { userSelected.cc }</Text>
                  <Text style={styles.textEmpleado}>Cargo : { userSelected.post }</Text>
                  <Text style={styles.textEmpleado}>Salario Base : { userSelected.salary }</Text>
                </View>
            </View>
            <View style={[styles.sectionEmpleadologo]}>
                  <Image style={[styles.logo]} src={logo} alt="logo__isagen"  />
            </View>
          </View>
          <View style={styles.sectionEmpleado}>
            <View style={[styles.h1]}>
              <Text style={[styles.col10]}>Pagos y Deduciones</Text>
            </View>
            <View style={[ styles.col10]}>
              <Text style={[styles.col5]}>Descripción</Text>
              <Text style={[styles.col3]}>Deducción</Text>
              <Text style={[styles.col2]}>Total</Text>
            </View>
            <View style={[ styles.col10]}>
              <Text style={[styles.col5]}>Vacaciones Remuneradas</Text>
              <Text style={[styles.col3]}>$0</Text>
              <Text style={[styles.col2]}>{ "$ " + value_vacaciones }</Text>
            </View>
            <View style={[ styles.col10]}>
              <Text style={[styles.col5]}>Vacaciones No Remuneradas</Text>
              <Text style={[styles.col3]}>$0</Text>
              <Text style={[styles.col2]}>$0</Text>
            </View>
            <View style={[ styles.col10]}>
              <Text style={[styles.col5]}>Permisos No Remuneradas</Text>
              <Text style={[styles.col3]}>{ "$ " + value_permission }</Text>
              <Text style={[styles.col2]}>{ "$ -" + value_permission }</Text>
            </View>
            <View style={[ styles.col10]}>
              <Text style={[styles.col8]}>Total Pagado (Total-Deducción)</Text>
              <Text style={[styles.col2]}>{ "$ " + value_total }</Text>
            </View>
          </View>
        </View>
    </Page>
  </Document>
);

export default nomina;