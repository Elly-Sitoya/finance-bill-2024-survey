// const Survey = require("../models/surveySchema");
// const submitForm = async (req, res) => {
//   try {
//     const {
//       awareness,
//       perception,
//       perceptionReason,
//       concerns,
//       otherConcerns,
//       positiveViews,
//       reviseBill,
//       changes,
//     } = req.body;

//     const survey = new Survey({
//       awareness,
//       perception,
//       perceptionReason,
//       concerns,
//       otherConcerns,
//       positiveViews,
//       reviseBill,
//       changes,
//     });

//     await survey.save();

//     res.status(200).json({ message: "Survey submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting survey:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while submitting the survey" });
//   }
// };

// module.exports = {
//   submitForm,
// };

const express = require("express");
const router = express.Router();
const Survey = require("../models/surveySchema");

// Route to handle form submission
const submitForm = async (req, res) => {
  console.log(req.body);
  try {
    // Extract the form data from the request body
    const { q1, q2, q2_reason, q3, q3_other, q4, q5, q6 } = req.body;

    // Create a new instance of the FinanceBillSurvey model
    const survey = new Survey({
      q1,
      q2,
      q2_reason,
      q3,
      q3_other,
      q4,
      q5,
      q6,
    });

    // Save the survey data to the database
    const savedSurvey = await survey.save();

    res.status(201).json(savedSurvey); // Respond with the saved survey data
  } catch (error) {
    // console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the survey data." });
  }
};

module.exports = {
  submitForm,
};
