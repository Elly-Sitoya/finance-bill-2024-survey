// const mongoose = require('mongoose');

// const surveySchema = new mongoose.Schema({
//   awareness: {
//     type: String,
//     required: true,
//   },
//   perception: {
//     type: String,
//     required: function () {
//       return this.awareness === 'Yes';
//     },
//   },
//   perceptionReason: {
//     type: String,
//   },
//   concerns: [{
//     type: String,
//   }],
//   otherConcerns: {
//     type: String,
//   },
//   positiveViews: {
//     type: String,
//   },
//   reviseBill: {
//     type: String,
//     required: true,
//   },
//   changes: {
//     type: String,
//   },
// });

// const Survey = mongoose.model('Survey', surveySchema);

// module.exports = Survey;

const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  q1: {
    type: String,
    required: true,
  },
  q2: {
    type: String,
    required: true,
  },
  q2_reason: {
    type: String,
  },
  q3: {
    type: [String],
    required: true,
  },
  q3_other: {
    type: String,
  },
  q4: {
    type: String,
  },
  q5: {
    type: String,
    required: true,
  },
  q6: {
    type: String,
  },
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
