const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

module.exports =mongoose.model("Post",postSchema);