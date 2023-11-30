import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { findUser } from "../../repositories/user.dto"

export class UserLoginError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (body: any) => {
  try {
     const user = await findUser(body.username);
     if(!user) return null

    const validatePassword = await bcrypt.compare(body.password, user.password);
    if(!validatePassword) throw new UserLoginError("Password doesn't match", 400, 'bad request');

    const payload = {
      id: user.id,
      username: user.username
    }
    const token: string = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '3h' });

    const response = {
      id: user.id,
      username: user.username,
      token: token
    }
    return response;
  } catch (err) {
    throw err
  }
}