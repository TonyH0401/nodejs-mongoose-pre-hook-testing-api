// --------------------------
// Section: Package Requirements
// --------------------------
const Schema = require("mongoose").Schema;
const createError = require("http-errors");

// --------------------------
// Section: Import Database Connection
// --------------------------
const { mongodb_conn } = require("../../../database/mongoose");

// --------------------------
// Section: Define UsersModel - UsersSchema
// --------------------------
const UsersSchema = new Schema(
  {
    userFullName: { type: String, required: [true, "{PATH} is required"] },
    userEmail: {
      type: String,
      required: [true, "{PATH} is required"],
      unique: true,
    },
    userAge: {
      type: Number,
      required: [true, "{PATH} is required"],
    },
    userGender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not supported",
      },
      default: "other",
    },
    militarySchoolName: {
      type: String,
      required: [
        function () {
          return this.userAge > 20;
        },
        "Citizen of Age by Laws must applied to a Military School!",
      ],
      default: null,
    },
  },
  { timestamps: true }
);

// --------------------------
// Section: Using '.pre()' Hooks
// --------------------------
UsersSchema.pre("save", async function (next) {
  const UsersModel = require("./UsersModel");
  try {
    if (!this.isNew) {
      if (this.isModified("userAge")) {
        const preModifyUser = await UsersModel.findById(this._id).exec();
        if (this.userAge < preModifyUser.userAge) {
          this.militarySchoolName = null;
        }
      }
    }
    console.log("First .pre() hook");
    return next(); // this is different from 'next()', this will end the '.pre()' hook
  } catch (error) {
    return next(createError(500, error.message));
  }
});
UsersSchema.pre("save", async function (next) {
  try {
    console.log("Second .pre() hook");
    return next();
  } catch (error) {
    return next(createError(500, error.message));
  }
});

// --------------------------
// Section: Exports
// --------------------------
module.exports = mongodb_conn.model("UsersModel", UsersSchema);
