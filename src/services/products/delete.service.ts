import { JwtPayload } from "jsonwebtoken";
import { UserJWT } from "../../middleware/auth.middleware";
import { deleteProduct, detailProduct } from "../../repositories/product.dto";

export class DeleteProductError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (productId: number, user: JwtPayload | UserJWT) => {
  const product = await detailProduct({
    id: Number(productId)
  })

  if(!product) return null;
  if(product.store.user_id !== user.id) throw new DeleteProductError("You don't have permission to delete other product", 403, "forbidden");
  try {
    const product = await deleteProduct(Number(productId));
    if(!product) return null;

    return product;
  } catch (err) {
    throw err;
  }
}