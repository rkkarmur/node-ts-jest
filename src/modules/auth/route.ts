import {Router} from "express"
import { API_PATH } from "../../constant/config";
import { login, logout, me, register } from "./controller";
import { FileUpload } from "../../config/fileUpload";
import { validatorHandler } from "../../helper/validatorHandler";
import { loginSchema, registerSchema } from "./schema";
import { auth } from "../../helper/jwt";
import { requireLogin } from "../../config/session";
export const authRouters = async () => {
  const route = Router();

  //auth
  route.post("/register", FileUpload('./uploads/user').single('theFiles'),validatorHandler(registerSchema),await register);
  route.post("/logout",logout);
  route.post("/login",validatorHandler(loginSchema),await login);
  route.get("/me",requireLogin,auth(["super_admin","user"]),await me);
  // route.post(API_PATH.USER_FORGOT_PASSWORD,validatorHandler(forgotPasswordSchema),forgotPassword);
  // route.patch(API_PATH.USER_RESET_PASSWORD,resetPassword)


  return route;
}
