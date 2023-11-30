import express, { Application } from 'express';
import 'dotenv/config';
import router from './routers/index';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server started on port ${process.env.SERVER_PORT}`);
})