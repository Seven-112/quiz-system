const mongoose = require('mongoose')
const modelName = 'History'

const HistorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  test: {
    type: Number,
    required: false,
  },
  id: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
  },
  examType: {
    type: String,
    required: true,
  },
  choices: [{
    choice: {
      type: String,
      required: true
    },
    isKiller: {
      type: Boolean,
      default: false,
    },
    isGuess: {
      type: Boolean,
      default: false,
    },
    isMemory: {
      type: Boolean,
      default: false,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    cheatNum: {
      type: Number,
      default: 0
    },
    isTrue: {
      type: Boolean,
      default: false,
    }
  }],
  cheatNum: {
    type: Number,
    default: 0
  },
  videoNum: {
    type: Number,
    default: 0
  },
  killerNum: {
    type: Number,
    default: 0,
  },
  guessNum: {
    type: Number,
    default: 0,
  },
  memoryNum: {
    type: Number,
    default: 0,
  },
  trueNum: {
    type: Number,
    default: 0
  },
  falseNum: {
    type: Number,
    default: 0
  },
  isPass: {
    type: Boolean,
    default: false,
  },
},
  { timestamps: true }
)

module.exports = mongoose.model(modelName, HistorySchema)