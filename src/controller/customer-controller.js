const Customer = require('../model/customer-model')
const uuidv1 = require('uuid/v1')

module.exports = ({ router, CustomerService }) => {
  CustomerService = CustomerService || Customer

  router.get('/customers', async (req, res) => {
    const records = await CustomerService.find()
    res.send(records)
  })

  router.post('/customers', async (req, res) => {
    const document = req.body
    document.id = document.id || uuidv1()

    const record = new Customer(document)
    await record.save()

    res.send(record)
  })
}
