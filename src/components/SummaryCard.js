'use client'
import {Chart} from "chart.js/auto";
import {useEffect, useRef} from 'react';

export default function SummaryCard({title,content,tData})
{
    
    const canvasRef = useRef(null);
        
        useEffect(()=>{
            const ctx = canvasRef.current.getContext('2d');

            const myChart = new Chart(ctx,{
                type: 'pie',
                data:{
                    labels:tData.map(row =>row.category),
                    datasets: [{
                        
                        data: tData.map(row => row.total_sum),

                        borderWidth: 1
                    }]
                },
                options:{
                    responsive:true,
                    layout:{
                        padding:{
                            left:70
                        }
                    }
                }
            });

            return () =>
            {
                myChart.destroy();
            }
        },[tData]);



    

    return(
        <div className="p-4 ">
        <div className='bg-white rounded-lg pb-20 max-w-sm w-80 h-80'>
            <h2 className ='text-center mb-4 font-bold'>{title}</h2>
            <p className="text-center">{content}$</p>
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
            
        </div>
        </div>
    );
}