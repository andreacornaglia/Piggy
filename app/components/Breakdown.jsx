import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryChart, VictoryPie } from 'victory'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

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
        <VictoryPie
          data = {totals}
          innerRadius = {115}
          events = {[{
            target: "data",
            eventHandlers: {
              onClick: () => {
                return [{
                  target: "labels",
                  mutation: (props) => {
                    return browserHistory.push(`/barchart/${props.text}`)
                  }
                }]
              }
            }
          }]}
          animate = {{ onLoad: { duration: 2000 } }}
          colorScale = {[
            "#57F67E",
            "#78B888",
            "#A1F6B6",
            "#3CA957",
            "#2A763D"
          ]}
          // data accessor for x values
          x = "category"
          // data accessor for y values
          y = "total"/>
      }
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>$</th>
            <th>Place</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(el => (
          <tr>
            <td>{el.date.split(" ")[0]}</td>
            <td>{el.amount}</td>
            <td>{el.place}</td>
            <td>{el.category}</td>
          </tr>)
          )}
        </tbody>
      </table>
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
