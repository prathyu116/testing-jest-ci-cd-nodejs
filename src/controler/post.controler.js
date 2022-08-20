const express = require("express");
const Post = require("../models/post.model");
const router = express.Router();

// POSTS CRUD
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()

      .lean()
      .exec();

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

      .lean()
      .exec();

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).json({ message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
