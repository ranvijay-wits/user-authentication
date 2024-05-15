import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from './routes/user';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors<Request>());

app.use(bodyParser.json())
app.use(userRouter);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
