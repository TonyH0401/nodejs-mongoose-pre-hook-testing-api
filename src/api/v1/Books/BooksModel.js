// --------------------------
// Section: Package Requirements
// --------------------------
const Schema = require("mongoose").Schema;

// --------------------------
// Section: Import Database Connection
// --------------------------
const { mongodb_conn } = require("../../../database/mongoose");

// --------------------------
// Section: Define BooksModel - BooksSchema
// --------------------------
const BooksSchema = new Schema(
  {
    bookName: { type: String, required: [true, "{PATH} is required!"] },
    bookAuthor: { type: String, required: [true, "{PATH} is required!"] },
    bookCode: {
      isbn: { type: String, unique: true, default: null },
      publisherCode: { type: String, default: null },
      publishDate: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

// --------------------------
// Section: Exports
// --------------------------
module.exports = mongodb_conn.model("BooksModel", BooksSchema);
