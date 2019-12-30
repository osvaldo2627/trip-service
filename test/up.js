
require('dotenv').config()

const config = require('../src/config')
config.server = require('./../src/server')

const PORT = process.env.PORT || 3000

describe('boostrap API', function () {
  it('running HTTP server', function (done) {
    config.server.then(app => {
      app._httpServer = app.listen(PORT, () => {
        done()
      })
    })
  })
})
