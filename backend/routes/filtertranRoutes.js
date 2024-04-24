const express = require('express')
const filtertranRouter = express.Router()
const { getFilteredTransactions } = require('../controller/filtertranController');


filtertranRouter.route('/transactions').get(getFilteredTransactions);

module.exports = filtertranRouter
