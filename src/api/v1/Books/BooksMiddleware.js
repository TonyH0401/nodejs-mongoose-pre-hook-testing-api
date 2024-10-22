// --------------------------
// Section: Package Requirements
// --------------------------
const createError = require("http-errors");
const path = require("path");

// --------------------------
// Section: Custom Utils Requirements
// --------------------------

// --------------------------
// Section: Custom Middlewares
// --------------------------

// --------------------------
// Section: Constant Declarations
// --------------------------

// --------------------------
// Section: Import Models
// --------------------------
const BooksModel = require("./BooksModel");

// --------------------------
// Section: Books Middlewares
// --------------------------

module.exports.createBook = async (req, res, next) => {
  const { bookName, bookAuthor, bookCode } = req.body;
  try {
    let newBook = new BooksModel({
      bookName: bookName,
      bookAuthor: bookAuthor,
      bookCode: bookCode, // will automatically attach the appropriate properties and values
    });
    const newBookCreated = await newBook.save();
    return res.status(200).json({
      code: 1,
      success: true,
      message: "New book was created!",
      data: newBookCreated,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

module.exports.getBookByISBN = async (req, res, next) => {
  const { isbn } = req.params;
  try {
    const bookExist = await BooksModel.findOne({ "bookCode.isbn": isbn });
    if (!bookExist) return next(createError(404, "Book not found!"));
    return res.status(200).json({
      code: 1,
      success: true,
      data: bookExist,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
