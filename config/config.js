require("dotenv").config();

module.exports = { URI: process.env.DATABASE_URL, PORT: process.env.PORT };
