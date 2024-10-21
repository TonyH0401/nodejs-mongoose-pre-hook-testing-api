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
// UsersModel.pre("save", async function (next) {
//   try {
//   } catch (error) {
//     return next(createError(500, error.message));
//   }
// });

// --------------------------
// Section: Exports
// --------------------------
module.exports = mongodb_conn.model("UsersModel", UsersSchema);
