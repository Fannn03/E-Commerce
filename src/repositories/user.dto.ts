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

export const findUser = async (username: string): Promise<User | null> => {
  try {
    return await prisma.user.findFirst({
      where: {
        username: username
      }
    })
  } catch (err) {
    throw err
  }
}