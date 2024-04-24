const express = require('express')
const filterRouter = express.Router()
// const { getFilteredTransactions } = require('../controller/filterController');

const { getFilterData } = require('../controller/filterController')

filterRouter.route('/').get(getFilterData);
// filterRouter.route('/transactions').get(getFilteredTransactions);

module.exports = filterRouter
