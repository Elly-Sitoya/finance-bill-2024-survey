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
const filterAndStoreFormData = require("../filter/filterData");

// Route to handle form submission
// const submitForm = async (req, res) => {
//   const ipAddress =
//     req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//   const userAgent = req.get("User-Agent");

//   const combinedData = { ipAddress, userAgent, data: req.body };
//   const { safe } = filterAndStoreFormData(combinedData);
//   console.log(safe);

//   try {
//     // Extract the form data from the request body
//     // const { q1, q2, q2_reason, q3, q3_other, q4, q5, q6 } = req.body;
//     const { q1, q2, q2_reason, q3, q3_other, q4, q5, q6 } = safe;

//     // Create a new instance of the FinanceBillSurvey model
//     const survey = new Survey({
//       q1,
//       q2,
//       q2_reason,
//       q3,
//       q3_other,
//       q4,
//       q5,
//       q6,
//     });

//     // Save the survey data to the database
//     const savedSurvey = await survey.save();

//     res.status(201).json(savedSurvey); // Respond with the saved survey data
//   } catch (error) {
//     // console.log(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while saving the survey data." });
//   }
// };

const submitForm = async (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.get("User-Agent");

  const combinedData = { ipAddress, userAgent, data: req.body };
  const { safe, unsafe } = filterAndStoreFormData(combinedData);

  if (Object.keys(unsafe).length > 0) {
    // If unsafe data is found, you can handle it as needed
    console.log("Unsafe data detected:", unsafe);
    res.status(400).json({ error: "Unsafe data detected in the form." });
    return;
  }

  try {
    const { q1, q2, q2_reason, q3, q3_other, q4, q5, q6 } = safe;

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

    const savedSurvey = await survey.save();
    res.status(201).json(savedSurvey);
  } catch (error) {
    console.error("Error saving survey data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the survey data." });
  }
};

module.exports = submitForm;

module.exports = {
  submitForm,
};
