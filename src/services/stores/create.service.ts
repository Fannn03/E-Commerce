import { JwtPayload } from "jsonwebtoken"
import fs from 'fs';
import slugify from "slugify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserJWT } from "../../middleware/auth.middleware"
import { createStore } from "../../repositories/store.dto"

export class CreateStoreError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (user: JwtPayload | UserJWT, body: any) => {
  const { username, name, description, photo } = body;

  const slug = slugify(username, {
    lower: true,
    
  })
  const fileName = (photo) ? `${username}.${photo.mimetype.split("/")[1]}` : null;

  try {
    const store = await createStore({
      user_id: user.id,
      username: username,
      name: name,
      slug: slug,
      description: description || null,
      photo: fileName
    })

    if(photo) fs.renameSync(photo.path, `public/images/stores/${store.photo}`);

    const response = {
      id: store.id,
      username: store.username,
      name: store.name,
      slug: store.slug,
      createdAt: store.createdAt
    }
    return response;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if(err.code == "P2002" && err.meta?.target == "stores_user_id_key") {
        throw new CreateStoreError("User store already exist", 403, "forbidden");
      } else if (err.code == "P2002" && err.meta?.target == "stores_username_key") {
        throw new CreateStoreError("Username store already taken", 400, "bad request");
      } else {
        throw err;
      }
    }
    throw err;
  }
}