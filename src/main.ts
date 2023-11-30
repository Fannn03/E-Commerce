import express, { Application } from 'express';
import 'dotenv/config';
import router from './routers/index';
import staticFile from './helpers/server/static.file';

const app: Application = express();

app.use(express.static('./public/images'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(process.env.SERVER_PORT, async () => {
  try {
    await staticFile();
    console.log(`server started on port ${process.env.SERVER_PORT}`);
  } catch (err) {
    console.log(err)
  }
})