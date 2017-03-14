import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryChart, VictoryBar, VictoryLabel, VictoryAxis} from 'victory'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {fetchCoffeeData} from '../reducers/coffee'
import getPeriodData from '../../utils/parseDates'

export const BarChart = ({data, changeCat}) => {
  //parsing dates for chart
  let week = data ? getPeriodData(data, 'week') : null
  console.log('this is the week', week)
  //categories to use on dropdown
  const categories = ['Coffee', 'Lunch', 'Dinner', 'Groceries'];
  //formatting for table
  var sum = week ? Math.round(totalAm(week) * 100) / 100 : 0
  var dollarsum = '$' + sum
  //dropdown to change the category to be viewed
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
            data={week}
            style={{
              data: {fill: '#3CA957',  width: 30 }
            }}
            // data accessor for x values
            x="dateF"
            // data accessor for y values
            y="amount"/>
          <VictoryAxis/>
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
          {data && week.map(el => {
            if(el.amount !== 0){
              return (
              <tr>
                <td>{el.date}</td>
                <td>{el.amount}</td>
                <td>{el.place}</td>
              </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

function totalAm(period){
  var sum = 0
  for(var i = 0; i < period.length; i++){
    sum += period[i].amount
  }
  return sum
}
/*
function getWeekData(data){
  //we use this data as today because the db is fixed
  const today = new Date('2017-03-09T12:00:00-0500')
  const daysOfWeek = ['SU','MO','TU','WE','TH','FR','SAT']
  const todayIsDay = today.getDay()
  //define week
  const week = []
  const MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000;  // milliseconds in a day
  for(var i = 0; i < 7; i++){
      var thisDay = new Date(today);
      thisDay.setDate(thisDay.getDate() + (i - todayIsDay));
      //week.push(thisDay.toISOString().substr(0, 10));
      //let thisDay = new Date(today + (i - todayIsDay) * MILLIS_IN_A_DAY)
      thisDay = thisDay.toISOString().substr(0, 10)
      let obj = {date: thisDay, amount: 0, dateF: daysOfWeek[i], label: '$0'}
      week.push(obj)
  }
  //if more than 1 ocurrence per day, combine instances
  if(data){
    for(var i = 0; i < week.length; i++){
      for(var j=0; j < data.length; j++){
        if(week[i].date === data[j].date.substr(0, 10)) {
          week[i].amount += data[j].amount
          week[i].label = '$' + week[i].amount
          week[i].place = data[j].place
        }
      }
    }
  }
  return week;
}
*/
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
