import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

export const Expenses = () => (
  <div className="intro">
    <img className="piggy" src="/images/piggy.png"/>
    <p>Cool, which expenses do you wanna look at?</p>
    <ul>
      <Link to={`/breakdown/`}><li className="intro-btn-1">All of them!</li></Link>
      <Link to={`/barchart/Coffee`}><li className="intro-btn-2">Coffee</li></Link>
      <Link to={`/barchart/Lunch`}><li className="intro-btn-3">Lunch</li></Link>
      <Link to={`/barchart/Dinner`}><li className="intro-btn-4">Dinner</li></Link>
      <Link to={`/barchart/Groceries`}><li className="intro-btn-5">Groceries</li></Link>
    </ul>
  </div>
)

export default Expenses