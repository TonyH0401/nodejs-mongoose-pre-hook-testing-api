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

// module.exports.getAllUsers = async (req, res, next) => {
//   const pageNumber = Number(req.query.page) || 0;
//   const docPerPage = 3;
//   const skipDocs = pageNumber * docPerPage;
//   try {
//     const allUsers = await UsersModel.find({})
//       .sort({ userFullName: 1 })
//       .skip(skipDocs)
//       .limit(docPerPage)
//       .exec();
//     return res.status(200).json({
//       code: 1,
//       success: true,
//       message: `Total of ${allUsers.length} for page ${pageNumber + 1} found!`,
//       data: allUsers,
//     });
//   } catch (error) {
//     return next(createError(500, error.message));
//   }
// };

// module.exports.getUserById = async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     // const userExist = await UsersModel.findOne({ _id: userId }).exec();
//     // const userExist = await UsersModel.findOne({ userFullName: userId }).exec();
//     const userExist = await UsersModel.findById(userId)
//       .select({
//         _id: 1,
//         userFullName: 1,
//         createdAt: 1,
//       })
//       .exec();
//     if (!userExist) return next(createError(404, "User doesn't exist!"));
//     return res.status(200).json({
//       code: 1,
//       success: true,
//       message: "User found!",
//       data: userExist,
//     });
//   } catch (error) {
//     return next(createError(500, error.message));
//   }
// };

// module.exports.patchUserById = async (req, res, next) => {
//   const { userId } = req.params;
//   const { userFullName, userEmail, userAge, userGender, militarySchoolName } =
//     req.body;
//   try {
//     const userExist = await UsersModel.findById(userId).exec();
//     if (!userExist)
//       return next(createError(404, "User doesn't exist for modification!"));
//     userExist.userFullName = userFullName || userExist.userFullName;
//     userExist.userEmail = userEmail || userExist.userEmail;
//     userExist.userGender = userGender || userExist.userGender;
//     /* Implementing '.pre()' hook for 'userAge' and 'militarySchoolName'.
//     If 'userAge' with a 'militarySchoolName' is updated to below 20 years old, the 'militarySchoolName' must be updated to 'null' value. */
//     userExist.userAge = userAge || userExist.userAge;
//     userExist.militarySchoolName =
//       militarySchoolName || userExist.militarySchoolName;
//     await userExist.save();
//     /* Basically, the whole update process above (where we have to make sure the model's properties are there) shouldn't happen
//     because properties's value are sure to be there in the 'req.body' before being sent to handle. */
//     return res.status(200).json({
//       code: 1,
//       success: true,
//       message: "User updated!",
//       data: userExist,
//     });
//   } catch (error) {
//     return next(createError(500, error.message));
//   }
// };

// module.exports.deleteUserById = async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const userDeleted = await UsersModel.findByIdAndDelete(userId).exec();
//     if (!userDeleted)
//       return next(createError(404, "User not found for deletion!"));
//     return res.status(200).json({
//       code: 1,
//       success: true,
//       message: "User deleted!",
//       data: userDeleted,
//     });
//   } catch (error) {
//     return next(createError(500, error.message));
//   }
// };
