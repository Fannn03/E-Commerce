import path from 'path';
import fs from 'fs';

const imagesFolder = [
  'stores',
  'products',
  'temp'
]

export default async () => {
  if(!fs.existsSync('./public')) fs.mkdirSync('./public')
  if(!fs.existsSync('./public/images')) fs.mkdirSync('./public/images')

  const imagesPath = path.join('./public/images')
  const folders = fs.readdirSync(imagesPath)
  console.log(folders)

  if(folders.length != imagesFolder.length) {
    for (let folder of imagesFolder) {
      try {
        fs.mkdirSync(`${imagesPath}/${folder}`)
      } catch (err) {
        
      }
    }
  }
}