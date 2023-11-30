import { Request } from 'express';
import multer from 'multer';

export const multerStorage = () => {
  return multer.diskStorage({
    destination: `public/images/temp`,
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const extension = file.mimetype.split("/")[1]
      
      cb(null, file.originalname + '-' + Date.now() + '.' + extension)
    }
  })
} 