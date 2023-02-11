import express from "express";
import morgan from "morgan";

// Mongoose DB Connection
import { CONNECT_DB } from "./config/db.js";

// Initialize express app
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// routes
app.get("/", (req, res) => {
  res.send("MY CONTACTS APP");
});


// User Auth Route
import router from "./routes/auth.js";
app.use("/api", router)

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
