const mongoose = require("mongoose");

const connectSurveysDB = (url) => {
  const surveyDB = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Set a higher timeout value
    socketTimeoutMS: 45000, //
  });

  return surveyDB;
};

module.exports = connectSurveysDB;
