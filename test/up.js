const server = require('./../src/server')

const PORT = process.env.PORT || 3000

describe('boostrap API', function () {
  it('running HTTP server', function (done) {
    server.then(app => {
      app._httpServer = app.listen(PORT, () => {
        done()
      })
    })
  })
})
