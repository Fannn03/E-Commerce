import { Request, Response } from "express";
import userRegisterService, { UserRegisterError } from '../services/users/register.service';

export const userRegister = async (req: Request, res: Response) => {
  try {
    const user = await userRegisterService(req.body);

    return res.json({
      code: 200,
      result: 'ok',
      message: 'record created',
      data: user
    })
  } catch (err: any) {
    if(err instanceof UserRegisterError) {
      return res.status(err.code).json({
        code: err.code,
        result: err.result,
        message: err.message
      })
    }

    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}