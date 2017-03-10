'use strict'

const db = require('APP/db')
const Transaction = db.model('transactions')

module.exports = require('express').Router()
    .get('/coffee', (req, res, next) => {
      console.log('I am getting to the server!')
		Transaction.findAll({where: {category: 'Coffee'}})
		.then(txs => {
              res.send(txs)}
             )
		.catch(err => console.error('fetching data unsuccessful', err))
    })
	.get('/total', (req, res, next) => 
		Transaction.findAll()
		.then(txs => {
              res.send(txs)}
             )
		.catch(err => console.error('fetching data unsuccessful', err))
    )