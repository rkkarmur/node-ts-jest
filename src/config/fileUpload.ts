import multer from 'multer'
import {v4 as uuid} from 'uuid'
import fs from 'fs'
import { Request, Response, NextFunction } from "express";
let uploaded_fn = uuid() ;

const uploadsDir = "./uploads/user";

let storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await fs.exists(uploadsDir, async (exists) => {
      if (!exists) {
        await fs.mkdirSync(uploadsDir, { recursive: true });
      }
      cb(null, "./uploads/user");
    });
  },
  filename: function (req, file, cb) {
    let abc = file.mimetype.split("/");
    cb(null, uploaded_fn + "." + abc[1]);
  },
});

let fileFilter = (req:Request, file:any, cb:any) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});


//
export const FileUpload = (path:string) => {
  //    "./public/images/backend/store-product"
  // let uploaded_fn = uuid() ;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      let uploaded_fn = uuid();

      let abc = file.mimetype.split("/");
      cb(null, uploaded_fn + "." + abc[1]);
    },
  });
  let fileFilter = (req:Request, file:any, cb:any):void => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  let upload = multer({
    storage: storage,
    limits: {
      fileSize: 4000 * 1024 * 1024,
    },
    fileFilter: fileFilter,
  });
  return upload;
};

