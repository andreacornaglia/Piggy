import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryChart, VictoryBar } from 'victory'
import {connect} from 'react-redux'
import {fetchData} from '../reducers/data'
import moment from 'moment'

export const BarChart = ({data}) => {
  console.log('this is the data in the component', data)
  if(data){
    data.forEach(element =>
      moment(element.date.split(" ")[0]).format('dddd')
    )
  }
  return (
    <div className="row">
      <h1>Here's our great chart!</h1>
      <VictoryChart>
        <VictoryBar data={data}
          // data accessor for x values
          x="date"
          // data accessor for y values
          y="amount"/>
      </VictoryChart>
      <h1>Txns details</h1>
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
            <th scope="row">1</th>
            <td>{el.date}</td>
            <td>{el.amount}</td>
            <td>{el.place}</td>
          </tr>)
          )}
        </tbody>
      </table>
    </div>
  )
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
