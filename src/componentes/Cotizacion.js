import { useState, useEffect } from "react";

const Cotizacion = () => {

    useEffect( () => {
        fetch('')
        .then(response => response.json())
        .then(data => {setDatos(data)
             setDatosf(data)
             Settotalp(data.length)})
        },[]);
    
    
        return(
        <>
            {modal &&
                <div className="newmodal">
                    <div className="bodymodal">
                        <div className="contenedorModal">
                            Hello
                            {coo}
                            {porcent}
                        <button type="button" onClick={()=>{cambiarModal(false)}}>QUITAR</button>
                        </div>
                        <div>
                        
                        </div>
                    </div>       
                </div>
            }
        </>
        )
    }

   

 
export default Cotizacion;