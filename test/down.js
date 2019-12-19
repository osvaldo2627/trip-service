/* global describe it */

const server = require('./../src/server')

describe('shutting down API', function () {
  it('stop HTTP server', function (done) {
    server.then(app => {
      app._httpServer.close()
      done()
    })
  })
})
