'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Transaction = db.define('transactions', {
  date: Sequelize.STRING,
  place: Sequelize.STRING,
  //we multiply the value by 100 and store it as int
  amount: {
    type: Sequelize.INTEGER,
    //when we retrieve it, we divide by 100
    //remember on the front-end to add the dollar sign and the 2 floating points
    get: function() {
      return this.getDataValue('amount') / 100;
    }
  },
  //we assume this is done automatically
  category: Sequelize.STRING
})

module.exports = Transaction