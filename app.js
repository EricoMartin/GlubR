import express from "express";
const CONFIG = require("./config/config");
const dbConnection = require("./db/connection");
const authRoute = require("./routes/auth");

const port = parseInt(CONFIG.PORT, 10) || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Glubr Blog API");
});

dbConnection();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
