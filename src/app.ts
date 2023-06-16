import express from 'express';
import connection from './config/database';
import 'express-async-errors';


connection();

import { userRouter } from './apis/user/router';
import { RouteNotFound, errorHandler } from '@svcollege/helper-c';

const app = express();

app.use(express.json());

app.use(userRouter);

app.get("*",async () => {
    throw new RouteNotFound();
})

app.use(errorHandler)

export default app;

