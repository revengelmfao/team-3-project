//these are the routes for CRUD for USERS
import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/user';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  //get all users
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
  //get user by id
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
router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put('/:id', async (req: Request, res: Response) => {
  //update user (by id)
  const { username, password } = req.body;
  const { id } = req.params;
  try {
    const updateUser = await User.findByPk(id);
    if (updateUser) {
      if (username) {
        updateUser.username = username;
      }
      if (password) {
        updateUser.password = password;
      }
      await updateUser.save();
      res.json(updateUser);
    } else {
      res.status(404).json('User not found.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete('/:id', async (req: Request, res: Response) => {
  //delete user (by id)
  const { id } = req.params;
  try {
    const deleteUser = await User.findByPk(id);
    if (deleteUser) {
      await deleteUser.destroy();
      res.json({ message: 'User successfully deleted.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as userRouter };
