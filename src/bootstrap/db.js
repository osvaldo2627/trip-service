const log = require('./logger')
const mongoose = require('mongoose')

const defaultCallback = (err) => {
  if (err) {
    log.error('Application was unable to connect to MongoDB service: ', err)
    process.exit(1)
  }
}

module.exports = (dbURL, options, cb = defaultCallback) => {
  mongoose.connect(dbURL, options)
    .then(() => {
      log.info('Successfully connected to DB...')
      cb()
    })
    .catch(err => {
      cb(err)
    })
}
