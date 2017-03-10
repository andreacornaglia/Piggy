import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

export const LandingPage = () => (
  <div className="intro">
    <img className="piggy" src="/images/piggy.png"/>
    <p>Hello Andrea! How Can I help you today?</p>
    <ul>
      <Link to={'/expenses'}><li className="intro-btn">Expenses</li></Link>
      <li className="intro-btn">Budget</li>
      <li className="intro-btn">Trends</li>
    </ul>
  </div>
)

export default LandingPage