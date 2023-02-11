import jsonwebtoken from "jsonwebtoken";
import { User } from "../models/User.js";

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Pull token splitting after Bearer
    const token = authHeader.split(" ")[1];

    // Verify token
    jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (err, payload) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized Access! 🥺 ⛔️ 🥺" });
        }

        try {
          // Find user
          const userFound = await User.findOne({ _id: payload._id }).select(
            "-password"
          );

          req.user = userFound;
          next();
        } catch (err) {
          console.log(`Error: ${err}`);
        }
      }
    );
  } else {
    return res.status(403).json({ error: "You are Forbidden! 🙅🏽‍♂️ 🚫 🙅🏼‍♀️" });
  }
};
