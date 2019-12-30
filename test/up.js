
require('dotenv').config()
const log = require('../src/bootstrap/logger')
const db = require('../src/bootstrap/db')

const config = require('../src/config')
config.server = require('./../src/server')
const fixtures = require('./fixtures/customers')
const Customer = require('../src/model/customer-model')

const PORT = process.env.PORT || 3000

describe('boostrap API', function () {
  before(done => {
    const { MongoMemoryServer } = require('mongodb-memory-server')
    const mongoServer = new MongoMemoryServer()
    mongoServer.getUri().then(mongoUrl => {
      db(mongoUrl, { ...config.options, useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if (!err) {
          log.info('Using mock mongodb server for tests...')
          done()
        }
      })
    })
  })

  it('running HTTP server', function (done) {
    config.server.then(app => {
      app._httpServer = app.listen(PORT, () => {
        done()
      })
    })
  })

  it('populate db', async () => {
    const testDocuments = [
      new Customer(fixtures[0]),
      new Customer(fixtures[1])
    ]
    await Promise.all(testDocuments.map(record => record.save()))
  })
})
