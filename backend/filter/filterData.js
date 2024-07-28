// // const connectToMongoDB = require("./connect");
// // connectToMongoDB();
// const MaliciousData = require("../models/filter"); // Import the Mongoose model for storing malicious data

// // Function to filter form data and store malicious data in the database
// function filterAndStoreFormData({ ipAddress, userAgent, data }) {
//   let safe = {};
//   let unsafe = {};

//   for (const [key, value] of Object.entries(data)) {
//     // Perform basic sanitization to remove HTML tags and script tags
//     const sanitizedValue = String(value)
//       .replace(/<\/?[^>]+(>|$)/g, "")
//       .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

//     // Check if the sanitized value is different from the original value
//     if (sanitizedValue === value) {
//       safe[key] = value;
//     } else {
//       unsafe[key] = value;
//     }
//   }

//   // Store malicious data in the database
//   if (Object.keys(unsafe).length > 0) {
//     const maliciousData = { unsafe };

//     const newMaliciousData = new MaliciousData({
//       ipAddress,
//       userAgent,
//       data: maliciousData,
//     });

//     newMaliciousData
//       .save()
//       .then(() => {
//         console.log("Malicious data stored successfully");
//       })
//       .catch((error) => {
//         console.error("Error storing malicious data:", error);
//       });
//   }

//   return { safe, unsafe };
// }

// module.exports = filterAndStoreFormData;

const MaliciousData = require("../models/filter"); // Import the Mongoose model for storing malicious data

// Function to filter form data and store malicious data in the database
function filterAndStoreFormData({ ipAddress, userAgent, data }) {
  let safe = {};
  let unsafe = {};
  let isDataSafe = true;

  for (const [key, value] of Object.entries(data)) {
    // Perform basic sanitization to remove HTML tags and script tags
    const sanitizedValue = String(value)
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    // Check if the sanitized value is different from the original value
    if (sanitizedValue === value) {
      safe[key] = value;
    } else {
      isDataSafe = false;
      unsafe[key] = value;
    }
  }

  // Store entire data as malicious in the database if any malicious value is found
  if (!isDataSafe) {
    const maliciousData = { ...data }; // Store the entire data object as unsafe

    const newMaliciousData = new MaliciousData({
      ipAddress,
      userAgent,
      data: maliciousData,
    });

    newMaliciousData
      .save()
      .then(() => {
        console.log("Malicious data stored successfully");
      })
      .catch((error) => {
        console.error("Error storing malicious data:", error);
      });
  }

  return isDataSafe ? { safe, unsafe: {} } : { safe: {}, unsafe };
}

module.exports = filterAndStoreFormData;
