// --------------------------
// Section: Package Requirements
// --------------------------
const router = require("express").Router();

// --------------------------
// Section: Custom Utils Requirements
// --------------------------
const {
  limit100Req15Min,
  limit10Req5Min,
} = require("../../utils/requestLimiter");

// --------------------------
// Section: Custom Middlewares
// --------------------------

// --------------------------
// Section: Connect to Databases
// --------------------------
const { mongodb_conn } = require("../../database/mongoose");

// --------------------------
// Section: Routers
// --------------------------
// User Routers: /api/v1/users/...
const UsersRouter = require("./Users/UsersRouter");
router.use("/users", UsersRouter);

// --------------------------
// Section: Exports
// --------------------------
module.exports = router;
