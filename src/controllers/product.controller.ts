import { Request, Response } from "express";
import createProductService, { CreateProductError } from '../services/products/create.service';
import findAllProductService from "../services/products/findall.service";
import detailProductService from "../services/products/detail.service";
import updateProductService, { UpdateProductError } from "../services/products/update.service";
import deleteProductService from "../services/products/delete.service";

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
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
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

export const detailProduct = async (req: Request, res: Response) => {
  try {
    const product = await detailProductService(req.params.slug);

    if(!product) return res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'record not found',
      data: product
    })

    return res.json({
      code: 200,
      result: 'success',
      message: 'success get record data',
      data: product
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await updateProductService(Number(req.params.id), req.user, req.body);

    return res.json({
      code: 200,
      result: 'success',
      message: 'record success updated',
      data: product
    })
  } catch (err: any) {
    if (err instanceof UpdateProductError) {
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await deleteProductService(Number(req.params.id), req.user);

    if(!product) return res.status(404).json({
      code: 404,
      result: 'not found',
      message: 'record not found',
      data: null
    })

    return res.json({
      code: 200,
      result: 'success',
      message: 'record deleted'
    })
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      result: 'internal server error',
      message: err.message
    })
  }
}