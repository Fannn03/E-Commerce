import { Request, Response } from "express";
import createStoreService, { CreateStoreError } from '../services/stores/create.service';

export const createStore = async (req: Request, res: Response) => {
  try {
    const store = await createStoreService(req.user, req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record created',
      data: store
    })
  } catch (err: any) {
    if (err instanceof CreateStoreError) {
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