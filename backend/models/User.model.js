import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
let jwtSecret = process.env.JWT_SECRET;



let UserSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true,
        default:"https://cdn-icons-png.flaticon.com/512/1154/1154987.png"
    },

    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CareerGuide",}],
        default:[]
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });


export default mongoose.model("User", UserSchema);