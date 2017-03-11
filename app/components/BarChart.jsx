import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryChart, VictoryBar, VictoryLabel} from 'victory'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchCoffeeData} from '../reducers/coffee'

export const BarChart = ({data, changeCat}) => {
  //formating days to be nicer on the chart
  var days = ['SU','MO','TU','WE','TH','FR','SAT'];
  var categories = ['Coffee', 'Lunch', 'Dinner', 'Groceries'];
  if(data){
    data.forEach(element => {
      element.formatDate = days[new Date(element.date.split(" ")[0]).getDay()]
      }
    )
  }
  var sum = data ? Math.round(totalAm(data) * 100) / 100 : 0
  var dollarsum = '$' + sum
  var onChangeCat = function(evt){
      console.log('I am calling this')
      evt.preventDefault()
      const cat = evt.target.value
      changeCat(cat)
  }
  return (
    <div className="container">
      <div id="header">
        <Link to="/landing"><img src="/images/piggy.png" className="piggy-sm"/></Link>
        <div className="cont">
          <p>This week</p>
          <select className="form-control custom-select" onChange={onChangeCat}>
            <option>{data && data[0].category}</option>
            {data && categories.map(element => element !== data[0].category ? <option>{element}</option> : null)}
              
          </select>
          <p>expenses:</p>
        </div>
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

const MapDispatchToProps = dispatch => ({
  changeCat: (category) => {
    dispatch(fetchCoffeeData(category))
  }
})

export default connect(MapSetToProps, MapDispatchToProps)(BarChart)
