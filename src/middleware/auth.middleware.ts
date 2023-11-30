import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

export interface UserJWT {
  id      : string,
  name    : string,
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | UserJWT
    }
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]

  if(!token) res.status(401).json({
    code: 401,
    result: 'unauthorized',
    message: 'token does not provided'
  })

  jwt.verify(token as string, process.env.SECRET_KEY as jwt.Secret, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        code: 403,
        result: 'forbidden',
        message: 'invalid token or token already expired'
      })
    }

    req.user = decoded as JwtPayload
    return next()
  })
}