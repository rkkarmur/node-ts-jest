import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../constant/message";

import * as jwt from "jsonwebtoken";
import { role_model } from "../model/role";

// const objectId = new mongoose.Types.ObjectId(inputString);

//jwt encrypt data
export const encryptData = (data: any, expiresIn?: string) => {
  expiresIn = expiresIn || "24h";
  const token = jwt.sign(data, process.env.SECRET_KEY as string, { expiresIn });
  return token;
};

export interface AuthenticatedRequest extends Request {
  authorization?: string; // Add this line to extend the type
}

//auth middleware
export const auth = (roles?: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: () => void) => {
    try {
      const user=req.session.user
      // const authorization = req.headers.authorization;
      if (!user?.token) {
        console.warn("authorization not provided");
        return res
          .status(401)
          .send({ status: false, message: MESSAGES.AUTH_MISSING });
      }
      return await jwt.verify(
        user?.token,
        process.env.SECRET_KEY as string,
        async (error: any, decoded: any) => {
          if (error) {
            console.log(" error jwt  :", error);
            // return error
            return res
              .status(401)
              .send({ status: false, message: MESSAGES.NOT_AUTHORIZED });
          }
          req.authorization = decoded;
          if (roles?.length) {
            let roleData = await role_model
              .find({ slug: { $in: roles } })
              .then((data) => {
                let newData = data.map((v) =>String(v._id) );
                return newData;
              });
            if (!roleData.includes(decoded.role_id)) {
              return res.status(401).send({
                status: false,
                message: MESSAGES.NOT_AUTHORIZED,
              });
            }
            return next();
          }
          return next();
        }
      );
    } catch (error) {
      return res
        .status(401)
        .send({ status: false, message: MESSAGES.AUTH_SERVER_ERROR });
    }
  };
};
