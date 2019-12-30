require('dotenv').config()

const server = require('./src/server')
const { db } = require('./src/config')
const PORT = process.env.PORT || 3000

require('./src/bootstrap/db')(db.connectionString, db.options)

server.then(app => {
  app.listen(PORT, () => {
    console.log('Service is now running at port: ' + PORT)
  })
})
