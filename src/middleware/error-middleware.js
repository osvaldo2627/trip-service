const HttpStatus = require('http-status-codes')

module.exports = (err, req, res, next) => {
  const status = err.isBoom ? err.output.statusCode
    : err.response ? err.response.status
      : err.code === 11000 ? HttpStatus.CONFLICT
        : err.status || 500
  res.status(status)
  res.send({
    error: HttpStatus.getStatusText(status),
    message: err.isBoom ? err.output.payload.message : err.message,
    statusCode: status
  })
}
