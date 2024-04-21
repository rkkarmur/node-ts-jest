import { Request, Response, NextFunction } from "express";

export function requireLogin(req:Request, res:Response, next:NextFunction) {
  if (!req.session.user) {
    console.log('req.',req.session);
    return res.status(401).json({ status:false,message: 'Authentication required' });
  } else {
    next();
  }
}