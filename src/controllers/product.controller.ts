import { Request, Response } from "express";
import createProductService, { CreateProductError } from '../services/products/create.service';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await createProductService(req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record created',
      data: product
    })
  } catch (err: any) {
    if (err instanceof CreateProductError) {
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