import bcrypt from 'bcrypt';
import { createUser } from "../../repositories/user.dto"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';

export class UserRegisterError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (body: any) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const user: User = await createUser({
      username: body.username,
      password: hashedPassword
    });

    const response = {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    };

    return response;
  } catch (err: any) {
    if(err instanceof PrismaClientKnownRequestError) {
      if(err.code == "P2002" && err.meta?.target == "users_username_key") {
        throw new UserRegisterError("Username already taken", 400, 'bad request')
      } else {
        throw err
      }
    }

    throw err
  }
}