// --------------------------
// Section: Package Requirements
// --------------------------
const Schema = require("mongoose").Schema;

// --------------------------
// Section: Import Database Connection
// --------------------------
const { mongodb_conn } = require("../../../database/mongoose");

// --------------------------
// Section: Define CommentsSchema and PostsSchema
// --------------------------
const CommentsSchema = new Schema(
  {
    commentContent: { type: String },
    commentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PostsSchema = new Schema(
  {
    postContent: { type: String },
    comments: CommentsSchema,
    // comments: [CommentsSchema],
  },
  { timestamps: true }
);

// --------------------------
// Section: Exports
// --------------------------
module.exports = mongodb_conn.model("PostsModel", PostsSchema);
