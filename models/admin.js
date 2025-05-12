const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
adminSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password,10);
    next();
});

module.exports = mongoose.model("Admin", adminSchema);