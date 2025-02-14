import type { Request, Response, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}
import jwt from 'jsonwebtoken';

// Define the JWT payload interface
interface JwtPayload {
  username: string;
}

// Middleware function to authenticate JWT token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if the authorization handler is present
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    // Get the secret key from the environment variable
    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next(); // Call the next middleware function
    });
  } else {
    res.sendStatus(401); // Sending unauthorized status if no authorization header is present
  }
};
