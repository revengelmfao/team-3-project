//this is the route for JWT AUTHENTICATION
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Unauthorized' });
    }
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  }
};

const router = Router();

router.post('/login', login);

export default router;
