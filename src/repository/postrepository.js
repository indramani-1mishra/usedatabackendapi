const POSTMODEL = require("../schema/postschema");


const createpost = async(postdata)=>{
    try{
        const post = await POSTMODEL.create(postdata);
    
        return post;
    }catch(err){
        console.error("Error creating post:", err);
        throw {message: "Failed to create post", statusCode: 500};
    }
}

const getposts = async()=>{
    try{
        const posts = await POSTMODEL.find();
        return posts;
    }
    catch(err){
        console.error("Error getting posts:", err);
        throw {message: "Failed to get posts", statusCode: 500};
    }
}

const updatepost = async(id, updatedPostDetails)=>
    {
        try{
            const post = await POSTMODEL.findByIdAndUpdate(id, updatedPostDetails, {new: true});
            if(!post){
                throw {message: "Post not found", statusCode: 404};
            }
            return post;
        }
        catch(err){
            console.error("Error updating post:", err);
            throw {message: "Failed to update post", statusCode: 500};
        }
    }
    
const deletepost = async(id)=>
    {
        try{
            const post = await POSTMODEL.findByIdAndDelete(id);
            if(!post){
                throw {message: "Post not found", statusCode: 404};
            }
            return post;
        }
        catch(err){
            console.error("Error deleting post:", err);
            throw {message: "Failed to delete post", statusCode: 500};
        }
    }
const getpostbyid = async(id)=>
    {
        try{
            const post = await POSTMODEL.findById(id);
            if(!post){
                throw {message: "Post not found", statusCode: 404};
            }
            return post;
        }
        catch(err){
            console.error("Error getting post by id:", err);
            throw {message: "Failed to get post by id", statusCode: 500};
        }
    }





module.exports = {
    createpost
    ,
    getposts,
    updatepost,
    deletepost,
    getpostbyid,
}