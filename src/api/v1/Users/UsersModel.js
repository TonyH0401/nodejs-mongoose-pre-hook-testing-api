// --------------------------
// Section: Package Requirements
// --------------------------
const Schema = require("mongoose").Schema;

// --------------------------
// Section: Import Database Connection
// --------------------------
const { mongodb_conn } = require("../../../database/mongoose");

// --------------------------
// Section: Define UsersModel
// --------------------------
const UsersModel = mongodb_conn.model(
  "UsersModel",
  new Schema(
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
  )
);

// --------------------------
// Section: Exports
// --------------------------
module.exports = UsersModel;
