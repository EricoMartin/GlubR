import bcrypt from "bcryptjs/dist/bcrypt";
import User from "../models/user";

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
      return res.send({
        status: "success",
        user: rest,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = AuthController;
