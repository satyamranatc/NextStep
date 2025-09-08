import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
let jwtSecret = process.env.JWT_SECRET;

let UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true,
        default:"https://cdn-icons-png.flaticon.com/512/1154/1154987.png"
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });


export default mongoose.model("User", UserSchema);