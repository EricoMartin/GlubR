import express from "express";
import CONFIG from "./config/config";
import dbConnection from "./db/connection";
import router from "./routes";

const port = parseInt(CONFIG.PORT, 10) || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to GlubR Blog API");
});

dbConnection();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
