import mongoose from "mongoose";
import process from "node:process";
import CONFIG from "./../config/config";

const dbConnection = async () => {
  try {
    await mongoose.connect(CONFIG.URI);
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.error(`Failed to connect to DB: ${err}`);
    process.exitCode = 1;
  }
};

module.exports = dbConnection;
