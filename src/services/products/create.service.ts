import slugify from "slugify";
import fs from 'fs';
import { ProductImage } from "@prisma/client";
import { createProduct } from "../../repositories/product.dto"
import { findStore } from "../../repositories/store.dto";

interface productPhotosInterface {
  filename: string,
  newname: string
}

export class CreateProductError {
  constructor (public message: string, public code: number, public result: string) {
    this.message = message;
    this.code = code;
    this.result = result;
  }
}

export default async (body: any) => {
  const { store_id, name, description, stock, price, photo } = body;

  const store = await findStore({
    id: Number(store_id)
  })
  if(!store) throw new CreateProductError("Store doesn't exist", 404, 'not found');

  const slug = slugify(`${store.username} ${name} ${new Date().getTime()}`, { lower: true });
  const localPhotos: productPhotosInterface[] = []
  const dbPhotos: any[] = []

  photo.map((data: Express.Multer.File, index: number) => {
    const extension = data.mimetype.split('/')[1]
    const filename = slugify(`${store.username} ${name} ${new Date().getTime()}`, {
      lower: true
    })
    
    localPhotos.push({
      filename: data.filename,
      newname: `${filename}-${index + 1}.${extension}`,
    })
    dbPhotos.push({
      name: `${filename}-${index + 1}.${extension}`,
    })
  })

  try {
    const product = await createProduct({
      store_id: Number(store_id),
      name: name,
      slug: slug,
      description: description,
      stock: Number(stock),
      price: Number(price)
    }, dbPhotos)

    localPhotos.map((data: productPhotosInterface) => {
      fs.renameSync(`public/images/temp/${data.filename}`, `public/images/products/${data.newname}`)
    })

    const response = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      images: product.images.map((data: ProductImage) => ({
        id: data.id,
        name: `producs/${data.name}`
      }))
    }

    return response;
  } catch (err) {
    // remove all file photos
    photo.map((data: Express.Multer.File) => {
      fs.rmSync(data.path)
    })

    throw err
  }
}