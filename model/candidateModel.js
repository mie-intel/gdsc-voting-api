const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  candidateName: {
    required: true,
    type: String,
  },
  voteCount: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Candidate", dataSchema);
