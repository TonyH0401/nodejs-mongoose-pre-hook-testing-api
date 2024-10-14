// --------------------------
// Section: Package Requirements
// --------------------------
const morgan = require("morgan");

// --------------------------
// Section: Request Logger Modes
// --------------------------
const reqLoggerTiny = morgan("tiny");
const reqLoggerDev = morgan("dev");
const reqLoggerDevErr = morgan("dev", {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});
const reqLoggerCustom1 = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

// --------------------------
// Section: Exports
// --------------------------
module.exports = {
  reqLoggerTiny,
  reqLoggerDev,
  reqLoggerDevErr,
  reqLoggerCustom1,
};
