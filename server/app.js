import express from "express";
import morgan from "morgan";
import cors from "cors";

// AUTH IMPORTS
import router from "./routes/auth.js";
import auth from "./middleware/auth.js";

// Mongoose DB Connection
import { CONNECT_DB } from "./config/db.js";

// Initialize express app
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));
// CORS POLICY
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("MY CONTACTS APP");
});

// User Auth Routes
app.get("/private", auth, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});
app.use("/api", router);

// server config
const PORT = process.env.PORT || 8000;

// listener
app.listen(PORT, async () => {
  try {
    await CONNECT_DB();
    console.log(`My Contacts is Live on port : ${PORT}`);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
});
