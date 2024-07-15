import { Request, Response, NextFunction } from 'express';

// custom error handler
export class customError extends Error {
  errorMessage: string;
  statusCode: number;
  errorCode?: number;
  constructor(statusCode: number, errorMessage: string, errorCode?: number) {
    super(errorMessage);
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // custom error handler
  if (err instanceof customError) {
    return res.status(err.statusCode).send({ error: err.errorMessage });
  }

  // default
  return res.status(500).send('Internal Server Error');
};
