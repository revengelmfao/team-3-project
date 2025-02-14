import { User } from '../models/user';

export const seedUsers = async () => {
  await User.bulkCreate([{ username: 'Team03', password: 'password' }], {
    individualHooks: true,
  });
};
