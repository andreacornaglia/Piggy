import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

export const LandingPage = () => (
  <div className="intro">
    <img className="piggy" src="/images/piggy.png"/>
    <p className="hello">Hello Andrea! How Can I help you today?</p>
    <ul className="intro-ul">
      <Link to={'/expenses'}><li className="intro-btn intro-btn-1">Expenses</li></Link>
      <Link><li className="intro-btn intro-btn-2">Budget</li></Link>
      <Link><li className="intro-btn intro-btn-3">Trends</li></Link>
    </ul>
  </div>
)

export default LandingPage