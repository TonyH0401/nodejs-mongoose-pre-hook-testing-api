// --------------------------
// Section: Package Requirements
// --------------------------
const validator = require("validator");

// --------------------------
// Section: Custom Utils Requirements
// --------------------------

// --------------------------
// Section: Constant Declarations
// --------------------------

// --------------------------
// Section: Data Validators
// --------------------------
function isValidEmail(userEmail) {
  const options = {
    host_whitelist: ["gmail.com", "outlook.com"],
    allow_utf8_local_part: false,
  };
  return validator.isEmail(userEmail, options);
}

// --------------------------
// Section: Exports
// --------------------------
module.exports = { isValidEmail };
