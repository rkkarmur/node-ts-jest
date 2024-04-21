import express from "express";
// import { connectDB } from "./config/connection";
import { API_PATH } from "./constant/config";
import { authRouters } from "./modules/auth/route";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from 'cors'
import swaggerUi from "swagger-ui-express";
import swaggerFile from '../swagger-output.json'
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
const app = express();
app.use(cors())
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.get("/", (req, res) => {
  return res.send("Hello World");
});

(async () => {
  // app.use(API_PATH.BASE_PATH+API_PATH.USER_PATH, await userRouters());
  app.use("/v1/auth", await authRouters());
})();

export {app}

