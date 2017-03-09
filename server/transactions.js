'use strict'

const db = require('APP/db')
const Transaction = db.model('transactions')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Transaction.findAll()
		.then(txs => res.json(txs))
		.catch(err => console.error('fetching data unsuccessful', err))
    )