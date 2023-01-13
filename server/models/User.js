const mongoose = require('mongoose')
const modelName = 'User'

const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: ''
  },
  password: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(modelName, QuestionSchema)