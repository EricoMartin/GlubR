import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    glub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Glub",
      required: true,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
