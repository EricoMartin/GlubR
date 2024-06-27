import bcrypt from "bcryptjs/dist/bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

class AuthController {
  static async createUser(req, res, next) {
    try {
      const { username, email, password, profession, firstname, lastname } =
        req.body;

      const details = [
        username,
        email,
        password,
        profession,
        firstname,
        lastname,
      ];

      const invalidData =
        !username ||
        !email ||
        !password ||
        !profession ||
        !firstname ||
        !lastname;

      if (invalidData) {
        return res.status(400).json({
          status: 400,
          message:
            "Fill all required fields: [username, email, password, profession, firstname, lastname]",
        });
      }
      if (
        password.length < 8 ||
        email.length >= 30 ||
        firstname.length >= 30 ||
        lastname.length >= 30
      ) {
        return res.status(400).json({
          status: 400,
          message:
            "Ensure password is atleast 8 characters, name and email not more than 30 characters",
        });
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        console.log(oldUser);
        return res.status(400).json({
          status: 400,
          message: "User already exists",
        });
      }
      const hash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username: username,
        email: email,
        password: hash,
        profession: req.body.profession,
        gender: req.body.gender,
        firstname: firstname,
        lastname: lastname,
      });

      let newUserObj = newUser.toObject();
      const { id, ...rest } = newUserObj;
      //Return response
      return res.status(201).json({
        status: "success",
        user: rest,
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: "Missing email" });
      return;
    }
    if (!password) {
      res.status(400).json({ error: "Missing password" });
      return;
    }
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      res.status(404).json({ error: "Unknown user. Please signup" });
      return;
    }
    const checkPassword = await bcrypt.compare(password, oldUser.password);
    if (!checkPassword) {
      res.status(404).json({ error: "Incorrect details" });
      return;
    }
    const token = jwt.sign(
      { user_id: oldUser._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const { ...all } = oldUser.toObject();
    const data = {
      token,
      all,
    };

    return res.status(200).header("authorization", token).json({
      status: 200,
      data,
    });
  }
}

module.exports = AuthController;
