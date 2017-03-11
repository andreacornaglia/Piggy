import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryChart, VictoryBar, VictoryLabel} from 'victory'
import {connect} from 'react-redux'
import {Link} from 'react-router'
//import theme from './Theme'

export const Trends = ({data}) => {
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
      <div id="header">
        <Link to="/landing"><img src="/images/piggy.png" className="piggy-sm"/></Link>
        <h3>This week {data && data[0].category} expenses:</h3>
      </div>
      <p className="sum">{dollarsum}</p>
      {data &&
        <VictoryChart>
          <VictoryBar
            data={data}
            style={{
              data: {fill: '#3CA957'}
            }}
            // data accessor for x values
            x="formatDate"
            // data accessor for y values
            y="amount"/>
        </VictoryChart>
      }
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
    data: state.coffee
  }
}

export default connect(MapSetToProps)(Trends)