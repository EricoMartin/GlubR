import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
import { TokenExpiredError } from "jsonwebtoken";

dotenv.config();

const tokenError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    res.status(401).json({
      message: "Error: Access Token Expired.",
    });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1].trim();
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: "Authentication failed! Please enter token header.",
      });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decodedData.email });
    if (!decodedData || !user) {
      return res.status(404).send({ message: "Invalid token!" });
    }
    if (user) {
      req.user = user;
    }
    next();
  } catch (err) {
    return tokenError(err, res);
  }
};

module.exports = refreshToken;
