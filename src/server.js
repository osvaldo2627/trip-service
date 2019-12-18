const express = require('express')
const swagger = require('swagger-express-middleware')
const swaggerUi = require('swagger-ui-express')

const app = express()
const router = express.Router()

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
      middleware.validateRequest(),
      (req, res, next) => {
        if (req.url === '/v1/trip/customers/NonidNum1' && req.method === 'PATCH') {
          return res.sendStatus(404)
        }
        next()
      },
      middleware.mock()
    )

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
      swaggerOptions: { url: '/swagger' }
    }))

    app.use(basePATCH, router)

    resolve(app)
  })
})
