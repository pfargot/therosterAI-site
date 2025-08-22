import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Prisma errors
  if (err.code === 'P2002') {
    error = {
      message: 'Duplicate entry',
      status: 400
    };
  }

  if (err.code === 'P2025') {
    error = {
      message: 'Record not found',
      status: 404
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      status: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      status: 401
    };
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    error = {
      message: 'Validation failed',
      status: 400
    };
  }

  res.status(error.status).json({
    error: error.message,
    status: error.status,
    timestamp: new Date().toISOString()
  });
}; 