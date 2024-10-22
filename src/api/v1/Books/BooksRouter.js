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
const { createBook, getBookByISBN } = require("./BooksMiddleware");

// --------------------------
// Section: Books Routers
// --------------------------
router.route("/").get((req, res) => {
  return res.status(200).json({
    code: 1,
    success: true,
    message: "Default branch 🥚 of /books! ",
  });
});
router.route("/create").post(createBook);
router.route("/book/:isbn").get(getBookByISBN);

// --------------------------
// Section: Books Error Handlers
// --------------------------
router
  .use((req, res, next) => {
    next(createError(404, "This /books directory does not exist!"));
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
