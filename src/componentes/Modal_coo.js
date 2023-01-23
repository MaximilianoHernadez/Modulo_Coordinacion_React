import { useState, useEffect } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const Coo = ({modal, cambiarModal, coo, porcent}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    
       const data={
        labels:[
            'Obras totales',
            'Participacion'
        ],
        datasets:[{
            label: ['Obras'],
            data: [porcent[1],porcent[0]],
            backgroundColor: [
                'rgb(54, 162, 235)',
                'rgb(255, 99, 132)'
                
              ],
              hoverOffset: 2
        }]
       }
    
        return(
        <>
            {modal &&
                <div className="newmodal">
                    <div className="bodymodal">
                        <div className="contenedorModal">
                            <div className="d-flex justify-content-center">
                                {coo}
                            </div>
                            <Doughnut data={data} />
                            <div className="d-flex justify-content-center p-1">
                                <button className="btn btn-outline-success" type="button" onClick={()=>{cambiarModal(false)}}>CERRAR</button>
                            </div>
                        
                        </div>
                        <div>
                        
                        </div>
                    </div>       
                </div>
            }
        </>
        )
    }

   

 
export default Coo;