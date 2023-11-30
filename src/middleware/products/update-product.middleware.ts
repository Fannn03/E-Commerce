import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import fs from 'fs';

interface errorMessageInterface {
  name?: string,
  description?: string,
  stock?: string,
  price?: string,
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const formBody = Joi.object({
    name: Joi.string()
      .optional()
      .empty()
      .min(4)
      ,
    description: Joi.string()
      .optional()
      .empty()
      .trim()
      .min(4)
      ,
    stock: Joi.number()
      .optional()
      .empty()
      .min(1)
      ,
    price: Joi.number()
      .optional()
      .empty()
      .min(1000)
      ,
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