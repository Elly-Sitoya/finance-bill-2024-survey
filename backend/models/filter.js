const mongoose = require("mongoose");

// Define a Mongoose schema for storing malicious data
const maliciousDataSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

// Create a Mongoose model based on the schema
const MaliciousData = mongoose.model("MaliciousData", maliciousDataSchema);

module.exports = MaliciousData;
