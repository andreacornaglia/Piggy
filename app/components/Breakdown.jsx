import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryChart, VictoryPie } from 'victory'
import {connect} from 'react-redux'

export const Breakdown = ({data}) => {
  const totals = [
    {category:"Coffee", total:0},
    {category:"Lunch", total:0},
    {category:"Dinner", total:0},
    {category:"Groceries", total:0},
    {category:"Entertainment", total:0}
  ]
  if(data){
    for(var j = 0 ; j < totals.length; j++){
      for(var i = 0; i < data.length; i++){
        if(data[i].category === totals[j].category){
          totals[j].total += data[i].amount
        }
      }
    }
    console.log(totals);
  }
  var sum = data ? Math.round(totalAm(data) * 100) / 100 : 0
  var dollarsum = '$' + sum
  return (
    <div className="container">
      <div id="header">
        <img src="/images/piggy.png" className="piggy-sm"/>
        <h3>This week total expenses:</h3>
      </div>
      <p className="sum">{dollarsum}</p>
      {data &&
          //line chart
          <VictoryChart>
             {
              data.length > 1 ? <VictoryLine
                 data={data}
                 x="time"
                 style={{
                    data: {stroke: colors[color], strokeWidth:4},
                 }}
                 y={(datum) => datum.value}
              /> : null
             }
             <VictoryAxis
                // x
                tickValues={xRange.length > 1 ? xRange : ["8:00 PM"]}
                tickFormat={(tick) => {
                   if (data.length < 1){
                      return tick;
                   }
                   const time = data[tick-1].time.split(":");
                   return formatTime(time);
                }}
                style={{
                   axis: {stroke: colors.mediumGray},
                   ticks: {stroke: colors.mediumGray},
                   tickLabels: {fontSize: 12, padding: 30, stroke:"#EAEDEF"}
                }}
             />
             <VictoryAxis
                // y
                dependentAxis
                tickValues={yRange.length > 1 ? yRange : [0, 3, 6]}
                style={{
                   axis: {stroke: "none"},
                   grid: {stroke:colors.mediumGray},
                   tickLabels: {fontSize: 12, padding: 30,   stroke:colors.lightGray}
                }}
             />
            </VictoryChart>
      }
    </div>
  )
}

function totalAm(data){
  var sum = 0
  for(var i = 0; i < data.length; i++){
    sum += data[i].amount
  }
  return sum
}


function MapSetToProps (state) {
  return {
    data: state.total
  }
}

export default connect(MapSetToProps)(Breakdown)
