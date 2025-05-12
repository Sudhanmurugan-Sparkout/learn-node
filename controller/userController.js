const users = require("../models/users");

class userController{

    async getUserDetails (req, res){
        try {
          const userDetails = await users.findById(req.params.id);
          if (!userDetails) {
            return res.status(200).json({ message: "User not found" });
          }
           res
            .status(200)
            .json({ message: "User details fetchd succesfully", data: userDetails });
        } catch (err) {
          console.log(err.message);
           res
            .status(500)
            .json({ message: "error fetching user details", error: err.message });
        }
      };

      async getAllUsers(req, res) {
        try {
          console.log("here");
          const usersData = await users.find();
          res
            .status(200)
            .json({ message: "get the user successfully", data: usersData });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Error fetching users", error: err.message });
        }
      }

       async create(req, res) {
        try {
          console.log(req.body);
          const creatUsers = await users.create(req.body);
          res
            .status(201)
            .json({ message: "create the user successfully", data: creatUsers });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "Error creating user", error: err.message });
        }
      }

      async update (req, res) {
        try {
          const userId = req.params.id;
          const updatedUser = await users.findByIdAndUpdate(userId, req.body, {
            new: true, // return the updated document
            runValidators: true, // enforce schema validation on update
          });
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
          });
        } catch (err) {
          console.error("Update error:", err);
          res.status(500).json({
            message: "Error updating user",
            error: err.message,
          });
        }
      }

      async delete (req, res){
        try {
          const userId = req.params.id;
          const deletedUser = await users.findByIdAndDelete(userId);
      
          if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser,
          });
        } catch (err) {
          console.error("Delete error:", err);
          res.status(500).json({
            message: "Error deleting user",
            error: err.message,
          });
        }
      }

      async getUsersPost (req,res){
        try{
 
          const userId = req.params.id;
          const userPosts = await users.findById(userId).populate("posts");
          if (!userPosts) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json({ message: "User posts fetchd succesfully", data: userPosts });
        }catch(err){
          console.log(err.message);
          res.status(500).json({message:"error fetching user posts", error: err.message});
        }
      }

}

module.exports = new userController();