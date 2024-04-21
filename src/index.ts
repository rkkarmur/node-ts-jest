import { connectDB } from "./config/connection";
import swaggerUi from "swagger-ui-express";
import swaggerFile from '../swagger-output.json'
import { app } from "./app";


 const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB connection
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log("Error starting server:", error);
  }
};



startServer();
