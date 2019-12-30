
const ENV = process.env

module.exports = {
  server: null,
  basePATCH: ENV.basePATCH || '/v1/trip/'
}
