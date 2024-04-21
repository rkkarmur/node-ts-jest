import { Request, Response, NextFunction } from "express";
import { compare } from "../../config/bcrypt";
import { MESSAGES } from "../../constant/message";
import { USER } from "../../service/user.service";
import { AuthenticatedRequest, encryptData } from "../../helper/jwt";
import { ROLE } from "../../service/role.service";
import { fileDeleteLocally } from "../../helper/fileDelete";

//login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await USER.findOne({ email, status: 1 });
    if (data) {
      const conformation = await compare(password, data.password);
      if (conformation) {
        let newData = JSON.parse(JSON.stringify(data));
        delete newData.password;
        const response = { ...newData, token: encryptData(newData) };
        req.session.user = response;
        return res.status(200).send({
          status: conformation,
          message: MESSAGES.USER_LOGIN_SUCCESS,
          data: response,
        });
      }
      return res.status(401).send({
        status: conformation,
        message: MESSAGES.USER_WRONG_EMAIL_OR_PASSWORD,
      });
    }
    return res.status(404).send({
      status: false,
      message: MESSAGES.USER_NOT_EXIST,
    });
  } catch (error) {
    console.log("error ", error);
    return res
      .status(500)
      .send({ status: false, message: MESSAGES.DEFAULT_ERROR_MESSAGE });
  }
};
//register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const isExist = await USER.findOne({ email, status: 1 });
    if (isExist) {
      return res.status(409).send({
        status: false,
        error: MESSAGES.VALIDATION_ERROR,
        message: [
          {
            message: MESSAGES.EMAIL_ALREADY_EXIST,
            path: "email",
          },
        ],
      });
    }
    // const hashPassword = await encrypt(password);
    let userData: any = {
      name,
      email,
      password,
      role_id: await ROLE.findOne({ slug: "super_admin" }).then(
        (data) => data._id
      ),
    };

    if (req.file) {
      userData.image = {
        path: req.file.path,
        size: req.file.size,
        name: req.file.filename,
      };
    }
    const results = await USER.create(userData);
    if (results) {
      let result = JSON.parse(JSON.stringify(results));
      delete result.password;
      let response = {
        ...result,
        ...{ token: await encryptData(result, "20h") },
      };

      req.session.user = response;
      return res.status(200).send({
        status: true,
        message: MESSAGES.USER_REGISTER_SUCCESS,
        data: response,
      });
    }
  } catch (error) {
    console.log("error ", error);
    if (req.file) {
      await fileDeleteLocally(req.file.path);
    }
    return res.status(500).send({
      status: false,
      message: MESSAGES.DEFAULT_ERROR_MESSAGE,
      error: error,
    });
  }
};
//auth me
export const me = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // code according to user exist ..
    return res.status(200).send({
      status: true,
      message: MESSAGES.SUCCESS,
      data: req.authorization,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: MESSAGES.DEFAULT_ERROR_MESSAGE,
      error: error,
    });
  }
};
//logout
export const logout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.session && req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        return res.json({ status: "true", message: "Logout successfully" });
      });
    } else {
      return res.json({ status: "true", message: "Logout successfully" });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: MESSAGES.DEFAULT_ERROR_MESSAGE,
      error: error,
    });
  }
};
