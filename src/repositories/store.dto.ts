import { PrismaClient } from "@prisma/client"

interface createStoreInterface {
  user_id: string,
  username: string,
  name: string,
  slug: string,
  description?: string | null,
  photo?: string | null
}

interface findStoreInterface {
  id?: number,
  slug?: string
}

const prisma = new PrismaClient();

export const findStore = async (request: findStoreInterface) => {
  try {
    return await prisma.store.findFirst({
      where: {
        OR: [
          { id: request.id },
          { slug: request.slug }
        ],
        AND: [
          { deletedAt: null }
        ]
      }
    })
  } catch (err) {
    throw err
  }
}

export const createStore = async (request: createStoreInterface) => {
  try {
    return await prisma.store.create({
      data: {
        user_id: request.user_id,
        username: request.username,
        name: request.name,
        slug: request.slug,
        description: request.description,
        photo: request.photo
      }
    })
  } catch (err) {
    throw err
  }
}