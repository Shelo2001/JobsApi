const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
      maxLength: 30,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxLength: 60,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Jobs', JobsSchema)
