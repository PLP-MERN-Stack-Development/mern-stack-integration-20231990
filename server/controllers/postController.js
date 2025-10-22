import Post from "../models/Post.js";

// GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("category");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /api/posts/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("category");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// POST /api/posts
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const post = new Post({ title, content, category });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
