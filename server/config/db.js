import mongoose from "mongoose";

// MONGOOSE DB CONNECTION
const DB_URL = "mongodb+srv://nk11:pizza123@nk-sei.utmze.mongodb.net/?retryWrites=true&w=majority";

// To Suppress StrictQuery Warning, May Need to Fix Later!
mongoose.set("strictQuery", true);

export const CONNECT_DB = async () =>
  mongoose
    .connect(DB_URL)
    .then(() => console.log(`MongoDB is now Connected!`))
    .catch((err) => console.log(`DB Error: ${err}`));
