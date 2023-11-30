import { Request, Response } from "express";
import createProductService, { CreateProductError } from '../services/products/create.service';
import findAllProductService from "../services/products/findall.service";

export const findAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await findAllProductService(req.query);

    if(!products && req.query) return res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'record not found',
      data: products
    })

    return res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: products
    })
  } catch (err) {

  }
}

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