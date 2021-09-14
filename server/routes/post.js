const express = require("express");
const router = express.Router();
require("dotenv");
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route POST api/post
// @description create post
// @access privite
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, status, url } = req.body;
    // check title
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is require" });

    // check title in db
    const postExist = await Post.findOne({ title: title, user: req.userId });

    if (postExist)
      return res
        .status(401)
        .json({ success: false, message: "Title already exists" });

    const newPost = new Post({
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();

    res.json({ success: true, message: "Welcome to new post", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route GET api/post
// @description get post
// @access privite
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate(
      "user",
      "username"
    );
    res.json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/post
// @description update
// @access privite
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, description, status, url } = req.body;
    // check title
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Title is require" });

    let postUpdated = {
      title,
      description: description || "",
      url: (url && url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdatedCondition = { _id: req.params.id, user: req.userId };
    const updatedPost = await Post.findOneAndUpdate(
      postUpdatedCondition,
      postUpdated,
      { new: true }
    );

    // user not authorized to update the post
    if (!updatedPost)
      return res
        .status(401)
        .json({ success: false, message: "Post not found" });
    res.json({
      success: true,
      message: "Update successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/post
// @description update
// @access privite
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCoditional = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCoditional);
    // user not authorized to delete post or post not found
    if (!deletePost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorized to delete post",
      });
    res.json({ success: true, message: "Post delete sucessfully", deletePost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
