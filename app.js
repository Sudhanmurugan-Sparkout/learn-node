const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./models/users");
const userController = require("./controller/userController");
const postController = require("./controller/postController");
const loginController = require("./controller/loginController");
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/learnExpress")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/",(req, res) => {
  res.json({
    message: "Hello from express",
  });
});

//login api
app.post("/login", loginController.login);
//user apis
app.get("/getuser", loginController.verifyToken, userController.getAllUsers);
app.get("/userdetails/:id",loginController.verifyToken, userController.getUserDetails);
app.post("/createuser",loginController.verifyToken, userController.create);
app.put("/updateuser/:id", loginController.verifyToken, userController.update);
app.delete("/deleteuser/:id",loginController.verifyToken, userController.delete);
app.get("/getUsersPost/:id",loginController.verifyToken, userController.getUsersPost);
//post apis
app.get("/getpost", loginController.verifyToken, postController.getAllpost);
app.get("/postdetails/:id", loginController.verifyToken, postController.getPostDetails);
app.post("/createpost",loginController.verifyToken, postController.create);
app.put("/updatepost/:id", loginController.verifyToken, postController.update);
app.delete("/deletepost/:id",loginController.verifyToken, postController.delete);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
