import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import methodOverride from "method-override";
import router from "./routes/routes.js";
import authRouter from "./routes/auth.js";
import { setupDB } from "./controller/init.js";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/script")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", router);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

try {
  setupDB();
  console.log("Database Connected Successfully!!");
} catch (e) {
  console.error(e);
}

app.listen(port, () => {
  console.log("listening on port", port);
});
