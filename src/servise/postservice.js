const { createpost, getposts, getpostbyid, updatepost, deletepost } = require("../repository/postrepository");
const cloudinary = require("../config/clodneryconfig");
const fs = require("fs");
const path = require("path");

const createposts = async (postdata) => {
  try {
    const image = postdata.image;

    if (!image) {
      throw { message: "Image path is required", statusCode: 400 };
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image);
    const cloudImageUrl = uploadResponse.secure_url;

    // Create post with cloud image URL
    const response = await createpost({
      ...postdata,
      image: cloudImageUrl, // ✅ fix here
    });

    // Delete local image after upload
    const absolutePath = path.resolve(image);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log("Local image deleted:", absolutePath);
    } else {
      console.warn("Local file not found for deletion:", absolutePath);
    }

    return response;
  } catch (err) {
    console.error("Error creating post:", err);
    throw { message: "Failed to create post", statusCode: 500 };
  }
};

const getpostss = async () => {
    try {
        const posts = await getposts();
        return posts;
    } catch (error) {
        console.error("Error in getposts service:", error.message || error);
        throw {
            message: "Failed to get posts in service layer",
            statusCode: 500,
        };
    }
};

const getpostsbyid = async (id) => {
    try {
        const post = await getpostbyid(id);
        if (!post) {
            throw { message: "Post not found", statusCode: 404 };
        }
        return post;
    } catch (error) {
        console.error("Error in getpost service:", error.message || error);
        throw {
            message: "Failed to get post in service layer",
            statusCode: 500,
        };
    }
};
const updateposts = async (id, updatedPostData) => {
    try {
      const post = await getpostbyid(id);
      if (!post) {
        throw { message: "Post not found", statusCode: 404 };
      }
  
      // Image handling
      let updatedImageUrl = post.image;
      if (updatedPostData.image) {
        const uploadResponse = await cloudinary.uploader.upload(updatedPostData.image);
        updatedImageUrl = uploadResponse.secure_url;
      }
  
      // Comment handling
      let updatedComments = post.comments;
      if (updatedPostData.comments && Array.isArray(updatedPostData.comments)) {
        updatedComments = updatedPostData.comments.map(comment => ({
          text: comment.text,
          user: comment.user,
          time: comment.time || new Date(),
        }));
      }
  
      // Likes handling
      let updatedLikes = post.likes;
      if (updatedPostData.likes && Array.isArray(updatedPostData.likes)) {
        updatedLikes = updatedPostData.likes.map(userId => userId);
      }
  
      // Final update
      const updatedPost = await updatepost(id, {
        text: updatedPostData.text || post.text,
        image: updatedImageUrl,
        comments: updatedComments,
        likes: updatedLikes
      });
  
      // Delete local image (if any)
      if (updatedPostData.image && fs.existsSync(updatedPostData.image)) {
        const absolutePath = path.resolve(updatedPostData.image);
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
          console.log("Local image deleted:", absolutePath);
        }
      }
  
      return updatedPost;
    } catch (error) {
      console.error("Error in updatepost service:", error.message || error);
      throw {
        message: "Failed to update post in service layer",
        statusCode: 500,
      };
    }
  };
  
  

 const deletepostss = async (id) => {
    try {
        const post = await getpostbyid(id);
        if (!post) {
            throw { message: "Post not found", statusCode: 404 };
        }
        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(post.image);
        // Delete post from database
        const response = await deletepost(id);

        return response;
    } catch (error) {
        console.error("Error in deletepost service:", error.message || error);
        throw {
            message: "Failed to delete post in service layer",
            statusCode: 500,
        };
    }
 };

 const addorremovelike = async (postId, userId,) => {
  try {
    const post = await getpostbyid(postId);
    if (!post) {
      throw { message: "Post not found", statusCode: 404 };
    }
     const index = post.likes.indexOf(userId);
     if (index === -1) {
      post.likes.push(userId);
    } else {  
      post.likes.splice(index, 1);
    }
    await post.save();
    return post;
    } catch (error) {
      console.error("Error in addorremovelike service:", error.message || error);
      throw {
        message: "Failed to add or remove like in service layer",
        statusCode: 500,
      };
    }


 }

 const addcomment = async (postId, commentData, userId) => {
  try {
    // 1. Post ko find karo id se
    const post = await getpostbyid(postId);

    if (!post) {
      // 2. Agar post nahi mila to error throw
      throw { message: "Post not found", statusCode: 404 };
    }

    // 3. commentData me time aur userID bhar do
    commentData.time = new Date();  // abhi ka time
    commentData.user = userId;      // kaun user comment kar raha hai

    // 4. commentData ko post ke comments array me daalo
    post.comments.push(commentData);

    // 5. Post ko save karo database me
    await post.save();

    return post; // 6. Updated post wapas bhej do
  } catch (error) {
    console.error("Error in addcomment service:", error.message || error);

    throw {
      message: "Failed to add comment in service layer",
      statusCode: 500,
    };
  }
};

module.exports = {
  createposts,
  getpostss,
  getpostsbyid,
  updateposts,
  deletepostss,
  addorremovelike,
  addcomment,
};
