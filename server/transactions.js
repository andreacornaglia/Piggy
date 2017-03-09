'use strict'

const db = require('APP/db')
const Transaction = db.model('transactions')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Transaction.findAll()
		.then(txs => {
              console.log('in the route, I get:', txs[0].dataValues.amount)
              res.send(txs)}
             )
		.catch(err => console.error('fetching data unsuccessful', err))
    )