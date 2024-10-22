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
const PostsModel = require("./PostsModel");

// --------------------------
// Section: Books Middlewares
// --------------------------

module.exports.createPost = async (req, res, next) => {
  const { commentContent, postContent } = req.body;
  try {
    let newPost = new PostsModel({
      postContent: postContent,
      comments: { commentContent: commentContent },
    });
    const newPostCreated = await newPost.save();
    return res.status(200).json({
      code: 1,
      success: true,
      message: "New post (with comment) was created!",
      data: newPostCreated,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

module.exports.getComment = async (req, res, next) => {
  const { commentParam } = req.params;
  try {
    const foundComment = await PostsModel.findOne({
      "comments.commentContent": commentParam,
    }).exec();
    if (!foundComment) return next(createError(404, "No comment found!"));
    return res.status(200).json({
      code: 1,
      success: true,
      message: "Found comment!",
      data: foundComment,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
