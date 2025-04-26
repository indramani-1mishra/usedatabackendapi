const { createposts, updateposts, deletepostss, getpostsbyid, getpostss, addorremovelike, addcomment } = require("../servise/postservice");

const createPostc = async (req, res) => {
  try {
    const user = req.user.id;
    
    
    const response = await createposts({
      text: req.body.text,              // Post text
      user: user,                       // Authenticated user's ID
      image: req.file ? req.file.path : "",  // Image path, if any, otherwise empty string
      comments: [],                      // Default comment count is 0
      likes: [],                         // Default like count is 0
    });

    return res.status(201).json({
      message: "Post created successfully",
      data: response,
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    console.error("Error creating post:", error);

    res.status(500).json({
      message: "Failed to create post. Please try again.",
      data: {},
      errors: error.errors ? error.errors : {},
      statusCode: 500,
      success: false,
    });
  }
};

// Update post endpoint

const updatePostc = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const response = await updateposts(postId, {
        text: req.body.text,
        image: req.file ? req.file.path : null,
        comments: req.body.comments,
        likes: req.body.likes,
      });
  
      return res.status(200).json({
        message: "Post updated successfully",
        data: response,
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({
        message: "Failed to update post. Please try again.",
        data: {},
        errors: error.errors ? error.errors : {},
        statusCode: 500,
        success: false,
      });
    }
  };
  // Delete post endpoint
  const deletePostc = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const response = await deletepostss(postId);
  
      return res.status(200).json({
        message: "Post deleted successfully",
        data: response,
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({
        message: "Failed to delete post. Please try again.",
        data: {},
        errors: error.errors? error.errors : {},
        statusCode: 500,
        success: false,
      });
    }
  };
  
  const getpostbyidc = async (req, res) => {
    try {
      const postId = req.params.id;
      const response = await getpostsbyid(postId);
      return res.status(200).json({
        message: "Post retrieved successfully",
        data: response,
        statusCode: 200,
        success: true,
      });
      } catch (error) {
        console.error("Error getting post by id:", error);
        res.status(500).json({
          message: "Failed to get post by id. Please try again.",
          data: {},
          errors: error.errors? error.errors : {},
          statusCode: 500,
          success: false,
        });
      }
  }
  
  const getAllPostsc = async (req, res) => {
    try {
      const response = await getpostss();
      return res.status(200).json({
        message: "All posts retrieved successfully",
        data: response,
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error getting all posts:", error);
      res.status(500).json({
        message: "Failed to get all posts. Please try again.",
        data: {},
        errors: error.errors? error.errors : {},
        statusCode: 500,
        success: false,
      });
    }
  }
  // Export the controller functions
  const addorremovelikec = async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
      const response = await addorremovelike(postId, userId);
      return res.status(200).json({
        message: "Like/Unlike status updated successfully",
        data: response,
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error adding or removing like:", error);
      res.status(500).json({
        message: "Failed to update like status. Please try again.",
        data: {},
        errors: error.errors? error.errors : {},
        statusCode: 500,
        success: false,
      });
    }
  }
  const addcommentc = async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
  
      const response = await addcomment(postId, { text: req.body.text }, userId);
  
      return res.status(200).json({
        message: "Comment added successfully",
        data: response,
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({
        message: "Failed to add comment. Please try again.",
        data: {},
        errors: error.errors ? error.errors : {},
        statusCode: 500,
        success: false,
      });
    }
  }
  

module.exports = {
  createPostc,
  updatePostc,
  deletePostc,
  getpostbyidc,
  getAllPostsc,
  addorremovelikec,
  addcommentc,
};
