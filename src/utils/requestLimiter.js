// --------------------------
// Section: Package Requirements
// --------------------------
const { rateLimit } = require("express-rate-limit");

// --------------------------
// Section: Rate Limit Modes
// --------------------------
const limit100Req15Min = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: 0,
    success: false,
    reqLimit: true,
    message:
      "You have reached the request limit of 100, try again after 15 minutes!",
  },
});
const limit10Req5Min = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: 0,
    success: false,
    reqLimit: true,
    message:
      "You have reached the request limit of 10, try again after 5 minutes!",
  },
});

// --------------------------
// Section: Exports
// --------------------------
module.exports = { limit100Req15Min, limit10Req5Min };
