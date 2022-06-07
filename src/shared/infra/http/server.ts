import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { router } from './routes';
import { AppError } from '../../errors/AppError';

import '../../container';

import createConnection from '../typeorm';

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: error.message,
  });
});

app.listen(3333, () => console.log('Servidor rodando em http://localhost:3333'));
