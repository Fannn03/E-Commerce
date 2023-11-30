import { PrismaClient } from "@prisma/client"

interface createStoreInterface {
  user_id: string,
  username: string,
  name: string,
  slug: string,
  description?: string | undefined,
  photo?: string | undefined
}

const prisma = new PrismaClient();

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