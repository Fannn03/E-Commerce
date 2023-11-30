import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs';

interface errorMessageInterface {
  username?: string,
  password?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if(req.file) req.body.photo = req.file;

  const formBody = Joi.object({
    username: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      .pattern(/^\S*$/)
      .messages({
        'string.pattern.base': "Username cannot contains whitespace"
      })
      ,
    name: Joi.string()
      .required()
      .empty()
      .trim()
      .min(4)
      ,
    description: Joi.string()
      .optional()
      .empty()
      .min(4)
      ,
    photo: Joi.any()
      .optional()
      .empty()
      .custom((value: Express.Multer.File, helpers: Joi.CustomHelpers) => {
        const extensions = ['image/jpg', 'image/jpeg', 'image/png'];

        if(!extensions.includes(value.mimetype)) {
          return helpers.error('any.custom')
        }
      })
      .messages({
        'any.custom': "Image must be JPG, JPEG, or PNG"
      })
  })

  try {
    await formBody.validateAsync(req.body, {
      abortEarly: false
    })

    return next();
  } catch (err: unknown) {
    if(req.file) fs.rmSync(req.file.path);
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