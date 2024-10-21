// --------------------------
// Section: Package Requirements
// --------------------------
const createError = require("http-errors");
const path = require("path");

// --------------------------
// Section: Custom Utils Requirements
// --------------------------
const { isValidEmail } = require("../../../utils/dataValidator");

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
module.exports.validateUser = async (req, res, next) => {
  const { userAge, userEmail } = req.body;
  try {
    if (userAge) {
      if (userAge < 0)
        return next(createError(500, "User age has invalid value!"));
      if (userAge < 16)
        return next(
          createError(500, "User must be at least 16 to participate!")
        );
    }
    if (userEmail) {
      if (!isValidEmail(userEmail))
        return next(createError(500, "Invalid email address or email host!"));
    }
    return next();
  } catch (error) {
    return next(createError(500, error.message));
  }
};

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

module.exports.getAllUsers = async (req, res, next) => {
  const pageNumber = Number(req.query.page) || 0;
  const docPerPage = 3;
  const skipDocs = pageNumber * docPerPage;
  try {
    const allUsers = await UsersModel.find({})
      .sort({ userFullName: 1 })
      .skip(skipDocs)
      .limit(docPerPage)
      .exec();
    return res.status(200).json({
      code: 1,
      success: true,
      message: `Total of ${allUsers.length} for page ${pageNumber + 1} found!`,
      data: allUsers,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    // const userExist = await UsersModel.findOne({ _id: userId }).exec();
    // const userExist = await UsersModel.findOne({ userFullName: userId }).exec();
    const userExist = await UsersModel.findById(userId)
      .select({
        _id: 1,
        userFullName: 1,
        createdAt: 1,
      })
      .exec();
    if (!userExist) return next(createError(404, "User doesn't exist!"));
    return res.status(200).json({
      code: 1,
      success: true,
      message: "User found!",
      data: userExist,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

module.exports.patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { userFullName, userEmail, userAge, userGender, militarySchoolName } =
    req.body;
  try {
    const userExist = await UsersModel.findById(userId).exec();
    if (!userExist)
      return next(createError(404, "User doesn't exist for modification!"));
    userExist.userFullName = userFullName || userExist.userFullName;
    userExist.userEmail = userEmail || userExist.userEmail;
    userExist.userGender = userGender || userExist.userGender;
    /* Implementing '.pre()' hook for 'userAge' and 'militarySchoolName'. 
    If 'userAge' with a 'militarySchoolName' is updated to below 20 years old, the 'militarySchoolName' must be updated to 'null' value. */
    userExist.userAge = userAge || userExist.userAge;
    userExist.militarySchoolName =
      militarySchoolName || userExist.militarySchoolName;
    await userExist.save();
    /* Basically, the whole update process above (where we have to make sure the model's properties are there) shouldn't happen
    because properties's value are sure to be there in the 'req.body' before being sent to handle. */
    return res.status(200).json({
      code: 1,
      success: true,
      message: "User updated!",
      data: userExist,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
