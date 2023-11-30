import { NextFunction, Request, Response } from "express";
import Joi from "joi";

interface errorMessageInterface {
  username?: string,
  password?: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const formBody = Joi.object({
    username: Joi.string()
      .required()
      .empty()
      .pattern(/^\S*$/)
      .messages({
        'string.pattern.base': "Username cannot contains whitespace"
      })
      ,
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^\S*$/)
      .messages({
        'string.pattern.base': "Password cannot contains whitespace"
      })
  })

  try {
    await formBody.validateAsync(req.body, {
      abortEarly: false
    })

    return next();
  } catch (err: unknown) {
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