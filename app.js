import express from "express";
import CONFIG from "./config/config";
import dbConnection from "./db/connection";
import authRoute from "./routes/auth";

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
