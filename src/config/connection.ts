import mongoose from "mongoose";
require("dotenv").config();

const url = process.env.DB_URL as string; //DB_URL=mongodb://localhost:27017/node_ts_demo
// mongoose.set("strictQuery", false);
// mongoose.connect(
//   url
//   // {
//   //   useNewUrlParser: true,

//   //   useUnifiedTopology: true }
// );
// const connection = mongoose.connection;

// connection.on("error", (error) => {
//   console.log(error);
// });

// connection.once("connected", () => {
//   console.log("<--Database Connected-->");
// });

// export { connection };

export const connectDB = async () => {
  try {
    await mongoose.connect(url, { retryWrites: true, w: "majority" });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Unable to connect to MongoDB. Error:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};
