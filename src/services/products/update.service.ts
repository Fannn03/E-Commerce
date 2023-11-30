import { JwtPayload } from "jsonwebtoken";
import slugify from "slugify";
import { detailProduct, updateProduct } from "../../repositories/product.dto";
import { UserJWT } from "../../middleware/auth.middleware";

export class UpdateProductError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (id: number, user: JwtPayload | UserJWT, body: any) => {
  const product = await detailProduct({
    id: Number(id)
  });
  if(!product) throw new UpdateProductError("product not found", 404, "not found");
  if(product.store.user_id !== user.id) throw new UpdateProductError("You dont have authorized to update other product", 403, "forbidden");

  if(body.stock) Number(body.stock);
  if(body.price) Number(body.price);
  if(body.name) body.slug = slugify(`${product.store.username} ${body.name} ${new Date().getTime()}`, { lower: true });

  try {
    const product = await updateProduct(Number(id), body);

    const response = {
      slug: product.slug,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }

    return response;
  } catch (err) {
    throw err;
  }
}