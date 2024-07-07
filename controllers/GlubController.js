import Glub from "../models/glub";
import mongoose from "mongoose";
import User from "../models/user";

class GlubController {
  static async glubPost(req, res) {
    const { title, body, author } = req.body;
    try {
      if (!req.user) {
        throw new Error("User details not found");
      }
      const glubExist = await Glub.findOne({
        title: req.body.title,
      });
      if (glubExist) res.status(400).send("Article already exists");

      if (!title && !body && !author) {
        res.status(400).send({ message: "One or more fields are missing!" });
        return;
      }
      const glub = new Glub({
        title: title,
        body: body,
        author: author,
        likes: req.body.likes,
      });
      const data = await glub.save();
      res.status(201).send(data);
    } catch (err) {
      throw new Error(err);
    }
  }
  static async getGlubById(req, res) {
    try {
      const glub = await Glub.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(String(req.params.glubId)),
          },
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$author" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$authorId"] },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                },
              },
            ],
            as: "author",
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "glub",
            as: "comments",
          },
        },
        {
          $project: {
            title: 1,
            body: 1,
            author: 1,
            comments: {
              _id: 1,
              body: 1,
            },
            likes: [],
          },
        },
      ]);

      if (!glub) return res.status(404).send("Post not found!");
      return res.status(200).send({
        status: true,
        glub,
      });
    } catch (error) {
      throw new Error(error || "Post not found");
    }
  }
  static async updateGlub(req, res) {
    const { title, body, author } = req.body;
    try {
      const post = await Glub.findByIdAndUpdate(
        req.params.glubId,
        {
          $set: { title, body },
        },
        { new: true }
      );
      //check if post belongs to the user initiatin the request
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(401).json({
          status: "Fail",
          message: `You can only update a post you created!`,
        });
      }
      res.status(200).json({
        status: "success",
        post,
      });
    } catch (err) {
      throw err;
    }
  }
  static async getAllPublishedPosts(req, res) {
    try {
      const posts = await Glub.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "users",
            let: { authorId: "$author" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$authorId"] },
                },
              },
              {
                $project: {
                  _id: 1,
                  username: 1,
                },
              },
            ],
            as: "author",
          },
        },
        {
          $unwind: "$author",
        },
      ]);
      if (posts.length.length === 0) {
        return res.status(404).send({
          status: false,
          message: "No article found!",
        });
      }
      console.log(posts);
      return res.status(200).send({ status: true, posts });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  static async deleteGlub(req, res) {
    try {
      const post = await Glub.findByIdAndDelete(req.params.glubId, {
        author: req.user._id,
      });
      if (!post)
        return res.status(404).json({
          status: "Fail",
          message: "Post with given Id not found",
        });

      if (post.author.toString() !== req.user.id.toString()) {
        return res.status(401).json({
          status: "Fail",
          message: `You can only delete a post you created!`,
        });
      }

      //return deleted post
      res.status(200).json({
        status: "success",
        message: `Post with Id ${post._id} deleted successfully`,
      });
    } catch (err) {
      throw err;
    }
  }

  static async postLike(req, res) {
    try {
      const { glubId } = req.params;
      const userId = req.user._id;

      if (!mongoose.Types.ObjectId.isValid(glubId)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid post ID format",
        });
      }
      const post = await Glub.findByIdAndUpdate(
        glubId,
        {
          $set: { likes: userId },
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }
      res.status(200).json({
        status: "success",
        post,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  static async postDislike(req, res) {
    try {
      const { glubId } = req.params;
      const userId = req.user._id;

      if (!mongoose.Types.ObjectId.isValid(glubId)) {
        return res.status(400).json({
          status: "error",
          message: "Invalid post ID format",
        });
      }

      const post = await Glub.findByIdAndUpdate(
        glubId,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );

      if (!post) {
        return res.status(404).json({
          status: "error",
          message: "Post not found",
        });
      }
      res.status(200).json({
        status: "success",
        post,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

module.exports = GlubController;
