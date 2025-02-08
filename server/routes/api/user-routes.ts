//these are the routes for CRUD
import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userById = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (userById) {
      res.json(userById);
    } else {
      res.status(404).json('User not found.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//need create, update, delete
router.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    if (newUser) {
      res.json(newUser);
    } else {
      res.status(401).json('Failed to create new user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/:id', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { id } = req.params;
  try {
    const updateUser = await User.findByPk(id);
    if (updateUser) {
      updateUser.username = username;
      updateUser.password = password;
      await updateUser.save();
    } else {
      res.status(404).json('User not found.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByPk(id);
    if (deleteUser) {
      await deleteUser.destroy();
      res.json({ message: 'User successfully deleted.' });
    } else {
      res.status(401).json({ message: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as userRouter };
