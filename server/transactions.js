'use strict'

const db = require('APP/db')
const Transaction = db.model('transactions')
const router = require('express').Router()

router.get('/total', (req, res, next) => {
        console.log('I am getting all the txns')
		Transaction.findAll()
		.then(txs => {
              res.send(txs)}
             )
		.catch(err => console.error('fetching data unsuccessful', err))
    })

router.get('/:category', (req, res, next) => {
      console.log('I am getting to the server!', req.params.category)
		Transaction.findAll({where: {category: req.params.category}})
		.then(txs => {
              res.send(txs)}
             )
		.catch(err => console.error('fetching data unsuccessful', err))
    })




module.exports = router;