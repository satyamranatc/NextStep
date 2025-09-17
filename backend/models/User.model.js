import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
let jwtSecret = process.env.JWT_SECRET;

let GuideSchema = new mongoose.Schema({
    GuideId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Guide",
        required:true
    }
});

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
    chats:[GuideSchema]
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });


export default mongoose.model("User", UserSchema);