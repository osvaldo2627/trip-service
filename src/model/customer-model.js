const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: false
  },
  weight: {
    type: Number,
    required: false,
    min: 1,
    max: 700
  }
}, { versionKey: false })

CustomerSchema.set('toJSON', {
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret._id
  }
})

CustomerSchema.index({ id: 1 })
CustomerSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model('Customer', CustomerSchema)
