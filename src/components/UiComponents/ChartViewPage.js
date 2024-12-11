import React, { useState, useEffect } from 'react'
import BarChart from './BarChart'
const ChartViewPage = ({data}) => {

  const [userData, setUserData] = useState()
  useEffect(() => {
    if(data){
        const formatedChartData = data.map((data, i) => {
              return {
                id: i + 1,
                labels: data.title,
                count: data.value,
              }
        })
        const result = {
          labels: formatedChartData.map((data) => data.labels),
          datasets: [{
            label: "Chart View",
            data: formatedChartData.map((data) => data.count),
            backgroundColor: ['rgb(135, 81, 214)', 'rgb(207, 105, 50)', 'rgb(66, 212, 95)', 'rgb(214, 196, 81)', 'rgb(104, 91, 207)'],
          }]
        }
        setUserData(result)
      }
  }, [data])


  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: "800px", height: "200px", padding: "10px" }}>
       {userData &&  <BarChart chartData={userData} />}
      </div>
    </div>
  )
}

export default ChartViewPage