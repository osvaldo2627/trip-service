
const ENV = process.env

module.exports = {
  server: null,
  basePATCH: ENV.basePATCH || '/v1/trip/',
  db: {
    connectionString: ENV.MONGODB_CONNECTION_STRING,
    options: {
      useNewUrlParser: true, useFindAndModify: false
    }
  }
}
