'use strict'
var chakram = require('chakram')
var request = chakram.request
var expect = chakram.expect

describe('tests for populate test /customers', function () {
  describe('tests for post', function () {
    it('should populate user with id: idNum1 for get customer test', function () {
      var response = request('post', 'http://localhost:3000/v1/trip/customers', {
        body: { firstName: 'Osvaldo', lastName: 'Aguilar', email: 'valdobox@mail.com', birthday: '2019-12-16T14:31:44.523Z', weight: 87, id: 'idNum1' },
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        time: true
      })

      expect(response).to.have.status(200)
      expect(response).to.have.schema({ type: 'object', properties: { id: { type: 'string', readOnly: true }, firstName: { type: 'string' }, lastName: { type: 'string' }, email: { type: 'string' }, birthday: { type: 'string', format: 'date-time' }, weight: { type: 'integer', minimum: 1, maximum: 700 } }, required: ['firstName', 'email'] })
      return chakram.wait()
    })
  })
})
