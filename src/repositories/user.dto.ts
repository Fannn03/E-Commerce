import { PrismaClient, User } from "@prisma/client"

interface createUserInterface {
  username: string,
  password: string
}

const prisma = new PrismaClient();

export const createUser = async (request: createUserInterface): Promise<User> => {
  try {
    return await prisma.user.create({
      data: {
        username: request.username,
        password: request.password
      }
    })
  } catch (err) {
    throw err
  }
}