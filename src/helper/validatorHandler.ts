import fs from 'fs'
import { MESSAGES } from '../constant/message';
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from 'joi';
export const validatorHandler = (schema:ObjectSchema) => {
  return (req:Request, res:Response, next:NextFunction) => {
    const options = {
      abortEarly: false, // Collect all errors instead of stopping at the first one
    };

    const bodyResult = schema.validate(req.body, options);
    if (bodyResult.error) {

      if(req.file){
        console.log('req.file ', req.file);
        fs.exists(req.file?.path, function(exists) {
          if(exists) {
            //Show in green
            console.log('File exists. Deleting now ...',req.file?.path );
            fs.unlink(req?.file?.path  as string, (err) => {
              if (err) throw err;
              console.log('path/file.txt was deleted');
            });
          } else {
            //Show in red
            console.log('File not found, so not deleting.');
          }
        });
      }

      const responseError = bodyResult.error.details.map((v:any) => {
        return { message: v.message, path: v.path[0] };
      });
      return res.status(400).json({
        status: false,
        error: MESSAGES.VALIDATION_ERROR,
        message: responseError,
      });
    }

    next();
  };
};

