// --------------------------
// Section: Package Requirements
// --------------------------
const router = require("express").Router();
const createError = require("http-errors");

// --------------------------
// Section: Custom Utils Requirements
// --------------------------

// --------------------------
// Section: Custom Middlewares
// --------------------------

// --------------------------
// Section: Posts Routers
// --------------------------
router.route("/").get((req, res) => {
  return res.status(200).json({
    code: 1,
    success: true,
    message: "Default branch 🥚 of /posts! ",
  });
});

// --------------------------
// Section: Books Error Handlers
// --------------------------
router
  .use((req, res, next) => {
    next(createError(404, "This /posts directory does not exist!"));
  })
  .use((err, req, res, next) => {
    let errorStatus = err.status || 404;
    let errorMessage = err.message || "";
    return res.status(errorStatus).json({
      code: 0,
      success: false,
      message: errorMessage,
    });
  });

// --------------------------
// Section: Exports
// --------------------------
module.exports = router;
