const post = require("../models/post");

class postController {

    async getPostDetails (req, res){
        try {
          const postDetails = await post.findById(req.params.id);
          if (!postDetails) {
            return res.status(200).json({ message: "post not found" });
          }
           res
            .status(200)
            .json({ message: "post details fetchd succesfully", data: postDetails });
        } catch (err) {
          console.log(err.message);
           res
            .status(500)
            .json({ message: "error fetching post details", error: err.message });
        }
      };

      async getAllpost(req, res) {
        try {
          const postData = await post.find();
          res
            .status(200)
            .json({ message: "get the post successfully", data: postData });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Error fetching post", error: err.message });
        }
      }

       async create(req, res) {
        try {
          console.log(req.body);
          const creatpost = await post.create(req.body);
          res
            .status(201)
            .json({ message: "create the post successfully", data: creatpost });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Error creating post", error: err.message });
        }
      }

      async update (req, res) {
        try {
          const postId = req.params.id;
          const updatedpost = await post.findByIdAndUpdate(postId, req.body, {
            new: true, // return the updated document
            runValidators: true, // enforce schema validation on update
          });
      
          if (!updatedpost) {
            return res.status(404).json({ message: "post not found" });
          }
      
          res.status(200).json({
            message: "post updated successfully",
            data: updatedpost,
          });
        } catch (err) {
          console.error("Update error:", err);
          res.status(500).json({
            message: "Error updating post",
            error: err.message,
          });
        }
      }

      async delete (req, res){
        try {
          const postId = req.params.id;
          const deletedpost = await post.findByIdAndDelete(postId);
      
          if (!deletedpost) {
            return res.status(404).json({ message: "post not found" });
          }
      
          res.status(200).json({
            message: "post deleted successfully",
            data: deletedpost,
          });
        } catch (err) {
          console.error("Delete error:", err);
          res.status(500).json({
            message: "Error deleting post",
            error: err.message,
          });
        }
      }

}

module.exports = new postController();