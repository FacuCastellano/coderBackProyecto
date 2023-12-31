const { Schema, model } = require('mongoose')

const schema = new Schema({
  sex: String,
  firstname: String,
  lastname: { type: String, index: true },
  email: { type: String, unique: true, index: true },
  address: { type: String },
  password: String,
  age: Number,
  role: { type: String, default: 'user' },
  documents: {
    type: [
      {
        name: String,
        reference: String,
      },
    ],
    default: [],
  },
  last_connection: {
    type: Date,
    default: Date.now 
  },
})

module.exports = model('users', schema)
