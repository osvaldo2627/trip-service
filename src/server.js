const express = require('express')
const swagger = require('swagger-express-middleware')
const swaggerUi = require('swagger-ui-express')

const app = express()
const router = express.Router()

require('express-async-errors')
const errorMiddleware = require('../src/middleware/error-middleware')

const path = require('path')
const swaggerSpec = path.join(__dirname, '../swagger.yaml')
const { basePATCH } = require('./config')

module.exports = new Promise((resolve, reject) => {
  swagger(swaggerSpec, app, (err, middleware) => {
    if (err) {
      reject(err)
    }
    app.use(
      middleware.metadata(),
      middleware.CORS(),
      middleware.files({
        apiPath: '/swagger'
      }),
      middleware.parseRequest(),
      middleware.validateRequest()
    )

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
      swaggerOptions: { url: '/swagger' }
    }))

    // loading controllers
    require('../src/controller/customer-controller')({ router })

    app.use(basePATCH, router)
    app.use(errorMiddleware)

    resolve(app)
  })
})
