import { ProductImage } from "@prisma/client";
import { detailProduct } from "../../repositories/product.dto"

export default async (slug: string) => {
  try {
    const product = await detailProduct(slug);
    console.log(product);
    console.log(slug);
    if(!product) return null;

    const response = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      stock: product.stock,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      store: {
        id: product.store.id,
        username: product.store.username,
        name: product.store.name,
      },
      images: product.images.map((data: ProductImage) => ({
        name: `products/${data.name}`
      }))
    }

    return response;
  } catch (err) {
    throw err
  }
}