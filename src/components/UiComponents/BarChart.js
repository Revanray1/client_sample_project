import React from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as chartjs} from 'chart.js/auto'

const BarChart = ({chartData,isPlugin}) => {
    const barPattern={
        id:'barPattern'
    }
  return (
    <div>
    <Bar data={chartData} plugins={isPlugin ? [barPattern] :""}/> 
    </div>
  )
}

export default BarChart