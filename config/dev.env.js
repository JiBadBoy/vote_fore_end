'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API : '"https://easy-mock.com/mock/5c962596a2a865620c156c34/vue-study"',
})
