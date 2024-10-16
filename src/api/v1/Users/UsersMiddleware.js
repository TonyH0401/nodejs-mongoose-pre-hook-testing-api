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
const UsersModel = require("./UsersModel");

// --------------------------
// Section: Users Middlewares
// --------------------------
module.exports.createUser = async (req, res, next) => {
  const { userFullName, userEmail, userAge, userGender, militarySchoolName } =
    req.body;
  try {
    let newUser = new UsersModel({
      userFullName: userFullName,
      userEmail: userEmail,
      userAge: userAge,
      userGender: userGender,
      militarySchoolName: militarySchoolName,
    });
    const newUserCreated = await newUser.save();
    return res.status(200).json({
      code: 1,
      success: true,
      message: "New user was created!",
      data: newUserCreated,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
