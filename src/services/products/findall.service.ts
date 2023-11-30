import { Product } from "@prisma/client"
import { findAllProducts } from "../../repositories/product.dto"

export default async (query: any) => {
  const take = Number(query.take) || 10
  const skip = (Number(query.page) * take) - take || 0

  try {
    const products = await findAllProducts(take, skip)
    if(!products[1].length) return null;

    const mapProducts = products[1].map((data: Product) => ({
      id: data.id,
      name: data.name,
      slug: data.slug,
      stock: data.stock,
      price: data.price
    }))

    const response = {
      products: mapProducts,
      pages: {
        size: mapProducts.length,
        total: products[0],
        totalPages: (Number(query.take) !== 1) ? Math.floor(products[0] / take) + 1 : Math.floor(products[0] / take)
      }
    }

    return response;
  } catch (err) {
    throw err
  }
}