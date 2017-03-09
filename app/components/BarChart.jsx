import React from 'react'
import ReactDOM from 'react-dom'
import { VictoryBar } from 'victory'
import {connect} from 'react-redux'
import {fetchData} from '../reducers/data'

export const BarChart = ({data}) => {
  console.log('this is the data', data)
  return (
    <div className="row">
      <h1>Here's our great chart!</h1>
      {/*
      <VictoryBar data={data}
        // data accessor for x values
        x="quarter"
        // data accessor for y values
        y="earnings"/>
       */}
      <VictoryBar />
      <li>Here will be our table</li>
    </div>
  )}


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
