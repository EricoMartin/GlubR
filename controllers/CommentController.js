import Comment from "../models/comment";
import Glub from "../models/glub";
import User from "../models/user";

import mongoose from "mongoose";

class CommentController {
  static async createComment(req, res) {
    const { body, glub } = req.body;
    const { email } = req.user;

    try {
      const isAuthor = await User.aggregate([
        {
          $match: { email: String(email) },
        },
      ]);

      if (!isAuthor) {
        return res.status(404).send("Author not found");
      }

      if (!body) {
        return res.status(400).send("Comment body cannot be empty");
      }

      const glubExist = await Glub.findOne({ _id: glub });
      if (!glubExist) {
        return res.status(400).send("Post not found");
      }
      const newComment = await Comment.create({
        glub,
        author: req.user._id,
        body,
      });
      return res.status(201).send({ comment: newComment, success: true });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CommentController;
