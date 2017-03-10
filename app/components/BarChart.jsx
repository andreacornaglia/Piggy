import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryChart, VictoryBar } from 'victory'
import {connect} from 'react-redux'
import {fetchData} from '../reducers/data'
import {moment, format} from 'moment'

export const BarChart = ({data}) => {
  //formating days to be nicer on the chart
  var days = ['SU','MO','TU','WE','TH','FR','SAT'];
  if(data){
    data.forEach(element =>
      element.formatDate = days[new Date(element.date.split(" ")[0]).getDay()]
    )
  }
  var sum = data ? Math.round(totalAm(data) * 100) / 100 : 0
  var dollarsum = '$' + sum
  return (
    <div className="container">
      <h3>This week coffee expenses:</h3>
      <p className="sum">{dollarsum}</p>
      {data &&
        <VictoryChart>
          <VictoryBar data={data}
            // data accessor for x values
            x="formatDate"
            // data accessor for y values
            y="amount"/>
        </VictoryChart>
      }
      <h3>Details</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>$</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(el => (
          <tr>
            <td>{el.date.split(" ")[0]}</td>
            <td>{el.amount}</td>
            <td>{el.place}</td>
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
    data: state.data
  }
}

function MapDispatchToProps (dispatch) {
  return {
    fetchProducts: dispatch(fetchData())
  }
}


export default connect(MapSetToProps, MapDispatchToProps)(BarChart)
