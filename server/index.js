import express from "express";
import { db } from "./config/db.js";
import router from "./router/routes.js";
import { configDotenv } from "dotenv";
import cors from "cors";
import path from "path";

configDotenv({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//headers

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/myhealthaverage", router);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, () => {
  db();
  console.log(`server is conenected to db and is listening on ${PORT}`);
});
