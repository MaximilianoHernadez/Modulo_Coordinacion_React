import { useState, useEffect } from "react";
import Coo from "./Modal_coo";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Table } from "react-bootstrap";
const Tabla = () => {

    const [datos, setDatos] = useState([]);
    const [datosf, setDatosf] = useState([]);
    const [coor, setCoo] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [totalp, Settotalp] = useState();
    const [estadoModal, setestadoModal] = useState(false);
    const [coo, setcoo] = useState(null);
    const [porcent, setPorcent] = useState([]);
    const [p45, setDatosp45] = useState([]);


    useEffect( () => {
    fetch('')
    .then(response => response.json())
    .then(data => {setDatos(data)
         setDatosf(data)
         Settotalp(data.length)})
    },[]);

    useEffect( () => {
        fetch('')
        .then(response => response.json())
        .then(data => setCoo(data))
    },[]);
    useEffect( () => {
        fetch('')
        .then(response => response.json())
        .then(data => setClientes(data))
    },[]);

    useEffect( () => {
        fetch('')
        .then(response => response.json())
        .then(data => {setDatosp45(data)})
        },[]);

    const mostrarmodal = (Coo) => {
        setestadoModal(true);
        setcoo(Coo)
        var newf = datos.filter(datos => datos['Coo']===Coo)
        const obrastotales = newf.length;
        const obrascoo = datos.length;
        const porcent = ((obrastotales/obrascoo)*100).toFixed(2) + "%";
        const obj = [obrastotales, obrascoo, porcent];
        setPorcent(obj)
    } 


    const otas = (campo, valor) => {

        var newf = datos.filter(datos => datos[campo]===valor)
        if (valor===''){
            setDatosf(datos)
            Settotalp(datos.length)

            // let newf = datos;
        }else{
        //console.log(newf)
            const total = newf.length;
            Settotalp(total)
            setDatosf(newf)
        }
    }

    async function ordenar (field, type) {
        if (type==="int") {
            const nuevo = await [...datosf].sort((x, y) => x[field] - y[field]);
            setDatosf(nuevo);
        }else if (type==="string") {
            const nuevo = await [...datosf].sort((x, y) => x[field]?.localeCompare(y[field]))   
            setDatosf(nuevo)
        
        } else if (type==="fecha"){
            const nuevo = await [...datosf].sort((x, y) => new Date(x[field]).getTime() - (new Date(y[field]).getTime()));
            setDatosf(nuevo);
        } 
    }


    const tbody = datosf.map((value,index) => {
        return (
        <>
        <tr style={{alignContent: "center", alignItems:"center", textAlign:"center"}} key={value['Id'].toString()}>
        <td style={{alignContent: "center", alignItems:"center", textAlign:"center"}}>{value['Id']}</td>
        <td style={{alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{mostrarmodal(value['Coo'])}}>{value['Coo']}</td>
        <td style={{alignContent: "center", alignItems:"center", textAlign:"center"}}>{value['Fecha']}</td>
        <td style={{alignContent: "center", alignItems:"center", textAlign:"center"}}>{value['OT']}</td>
        <td style={{alignContent: "center", alignItems:"center", textAlign:"center"}}>{clientes[value['Cliente']]['Razon']}</td>
        <td style={{alignContent: "center", alignItems:"center", textAlign:"center"}}>{value['DPI']}</td>
        <td style={{alignContent: "center", alignItems:"center", textAlign:"center"}}>{p45['cyc']?.[value['Id']] ? p45['cyc']?.[value['Id']] : 'cargando...'}</td>
        </tr>
        </> )
        
        });

    const selectBody = coor.map((value, index)=>{
        return(
            <>
            <option key={index} value={value['USER']}>{value['USER']}</option>
            </>
        )
    });

    const selectClientes = Object.keys(clientes).map((value, index)=>{
       
        return(
            <>
            <option key={(clientes[value]['IdCliente']).toString()} value={clientes[value]['IdCliente']}>{clientes[value]['Razon']}</option>
            </>
        )
    });




    return (
    
    <>
    <Coo modal={estadoModal} cambiarModal={setestadoModal} coo={coo} porcent={porcent} setPorcent={setPorcent}  />
    
    <div className="d-flex align-items-center" style={{display: "flex", padding: "1em"}}>
        <select className="form-select form-select-sm m-1" onChange={(e)=>{otas("Coo",e.target.value)}} style={{width:'10vw', height: "3vh"}}>
            <option value=''>ELIGE UN COORDINADOR</option>
            {selectBody}
        </select>
      
        <select className="form-select form-select-sm m-1" onChange={(e)=>{otas("Cliente",e.target.value)}} style={{width:'10vw', height: "3vh"}}>
            <option value=''>ELIGE UN CLIENTE</option>
            {selectClientes}
        </select>
    
    <div style={{padding: "1em", fontFamily:'bold', color:'white'}}>
        TOTAL OBRAS
    </div>
    <div id="totalp" style={{padding: "1em", fontFamily:'bold', color:'white'}}>
        {totalp}
    </div>
    </div>
    <Row className="table table-responsive border p-3" style={{height: "90vh"}}>
    <Table className="table text-light table-hover text-center" responsive="sm" size="sm" style={{height: "100vh"}}>
        <thead className="table-dark">
            <tr className="thead-dark">
                <th  style={{padding: "0 2em 0 2em",alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{ordenar("Id", "int")}}>Ota</th>
                <th  style={{padding: "0 2em 0 2em",alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{ordenar("Coo", "string")}}>Coo</th>
                <th  style={{padding: "0 2em 0 2em",alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{ordenar('Fecha', "fecha")}}>Fecha</th>
                <th  style={{padding: "0 2em 0 2em",alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{ordenar('OT',"string")}}>OT</th>
                <th  style={{padding: "0 2em 0 2em",alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{ordenar('Cliente', "int")}}>Cliente</th>
                <th  style={{padding: "0 2em 0 2em",alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{ordenar('DPI', "string")}}>DPI</th>
                <th  style={{padding: "0 2em 0 2em",alignContent: "center", alignItems:"center", textAlign:"center"}} onClick={()=>{ordenar('DPI', "string")}}>TOTALPEDIDO</th>
                
            </tr>
        </thead>
    <tbody>
    {tbody}
    </tbody>
    </Table>
    </Row>
    </>
    );
}
 
export default Tabla;