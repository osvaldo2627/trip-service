const express = require('express')
const swagger = require('swagger-express-middleware')
const swaggerUi = require('swagger-ui-express')

const app = express()
const router = express.Router()

const path = require('path')

const swaggerSpec = path.join(__dirname, '../swagger.yaml')

const basePATCH = '/v1/trip/'

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
      middleware.validateRequest(),
      middleware.mock()
    )
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
      swaggerOptions: { url: '/swagger' }
    }))

    app.use(basePATCH, router)

    resolve(app)
  })
})
