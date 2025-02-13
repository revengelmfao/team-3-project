import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'Team03', password: 'password' },
  ], { individualHooks: true });
};
