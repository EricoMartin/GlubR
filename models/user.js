import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String, required: false },
    gender: { type: String, required: false },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
