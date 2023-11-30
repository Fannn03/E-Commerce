import { PrismaClient } from "@prisma/client"

interface createProductInterface {
  store_id: number,
  name: string,
  slug: string,
  description: string,
  stock: number,
  price: number
}

interface detailProductInterface {
  id?: number,
  slug?: string,
}

const prisma = new PrismaClient();

export const findAllProducts = async (take?: number, skip?: number) => {
  try {
    return await prisma.$transaction([
      prisma.product.count({
        where: {
          deletedAt: null
        }
      }),
      prisma.product.findMany({
        where: {
          deletedAt: null
        },
        skip: skip,
        take: take,
        include: {
          images: true
        }
      })
    ])
  } catch (err) {
    throw err
  }
}

export const createProduct = async (product: createProductInterface, productImage: any) => {
  try {
    return await prisma.product.create({
      data: {
        store_id: product.store_id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        stock: product.stock,
        price: product.price,
        images: {
          create: productImage
        }
      },
      include: {
        images: true
      }
    })
  } catch (err) {
    throw err
  }
}

export const detailProduct = async (query: detailProductInterface) => {
  try {
    return await prisma.product.findFirst({
      where: {
        deletedAt: null,
        OR: [
          { id: query.id },
          { slug: query.slug }
        ],
        AND: [
          { 
            store: { deletedAt: null }
          }
        ]
      },
      include: {
        store: true,
        images: true
      }
    })
  } catch (err) {
    throw err
  }
}

export const updateProduct = async (id: number, request: any) => {
  try {
    return await prisma.product.update({
      data: request,
      where: {
        id: id,
        deletedAt: null
      }
    })
  } catch (err) {
    throw err
  }
}