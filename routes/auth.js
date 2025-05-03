import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, getUserByEmail } from "../controller/user-controller.js";

dotenv.config();

const router = express.Router();
const jwt_secret = process.env.JWT_SECRET || "ShreyasDone";

router.get('/', (req,res)=>{
  res.redirect('/login');
})
router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

router.post("/auth/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    createUser(firstname, lastname, email, hashedPassword);
    console.log("Registration successful!!");
    // res.status(201).json({message: "Registration successful!!"});
    res.redirect("/login");
  } catch (e) {
    console.error("Error while Registering", e);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      console.error("User Not Registered!!");
      return res.redirect("/register");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.error("Invalid Password");
    }
    const token = jwt.sign({ user_Id: user._id }, jwt_secret, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true }).redirect("/tasks");
  } catch (e) {
    console.error("Error while Login:", e);
  }
});

export default router;
