import bcrypt from "bcryptjs/dist/bcrypt";
import User from "../models/user";

class AuthController {
  static async createUser(req, res, next) {
    try {
      const { username, email, password, firstname, lastname } = req.body;
      const invalidData = (prop, data) =>
        prop.find((idx) => data[idx] === "undefined" || data[idx] == "");
      const details = [username, email, password, firstname, lastname];

      if (invalidData(details, req.body)) {
        return res.status(400).json({
          status: 400,
          message:
            "Fill all required fields: [username, email, password, firstname, lastname]",
        });
      }
      if (
        req.body.password.length < 8 ||
        req.body.email.length >= 30 ||
        req.body.firstname.length >= 30 ||
        req.body.lastname.length >= 30
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
