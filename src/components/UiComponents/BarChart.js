import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as chartjs} from 'chart.js/auto'

const BarChart = ({chartData,isPlugin}) => {
    const barPattern={
        id:'barPattern',
        beforeDatasetsDraw:(chart, args, pluginOptions) =>{
            const {ctx, chartArea:{ top, bottom, left, height},scales: { x, y }} = chart;
        ctx.save();
        const width = chart.getDatasetMeta(0).data[0].width; 

        chart.getDatasetMeta(0).data.forEach((data,index)=>{
        ctx.fillRect(x.getPixelForValue(index) - width/2, top,width, height -0.5)
          
        })
        }
    }
  return (
    <div>
    <Bar data={chartData} plugins={isPlugin ? [barPattern] :""}/> 
    </div>
  )
}

export default BarChart