import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs';

interface errorMessageInterface {
  store_id?: string,
  name?: string,
  description?: string,
  stock?: string,
  price?: string,
  photo?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.files) req.body.photo = req.files;

  const formBody = Joi.object({
    store_id: Joi.number()
      .required()
      .empty()
      ,
    name: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      ,
    description: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      ,
    stock: Joi.number()
      .required()
      .empty()
      .min(1)
      ,
    price: Joi.number()
      .required()
      .empty()
      .min(1000)
      ,
    photo: Joi.array()
      .required()
      .empty()
      .min(1)
      .custom((value: Express.Multer.File[], helpers: Joi.CustomHelpers) => {
        const extensions = ['image/jpg', 'image/jpeg', 'image/png'];

        for (let data in value) {
          if(!extensions.includes(value[data].mimetype)) {
            return helpers.error('any.custom');
          }
        }
      })
      .messages({
        'any.custom': "Image must be JPG, JPEG or PNG"
      })
  })

  try {
    await formBody.validateAsync(req.body, {
      abortEarly: false
    })

    return next();
  } catch (err: unknown) {
    if(req.files) {
      req.body.photo?.map((data: Express.Multer.File) => {
        fs.rmSync(data.path);
      })
    }
    const errMessages: errorMessageInterface = {};

    if(err instanceof Joi.ValidationError) {
      err.details.map((data: Joi.ValidationErrorItem) => {
        errMessages[data.context?.key as keyof errorMessageInterface] = data.message 
      })

      return res.status(400).json({
        code: 400,
        result: 'bad request',
        message: errMessages
      })
    }
  }
}