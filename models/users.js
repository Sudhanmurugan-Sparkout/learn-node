const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  email: String,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual populate
userSchema.virtual("posts", {
  ref: "Post",            
  localField: "_id",       
  foreignField: "user",  
});

// Include virtuals when converting to JSON
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
