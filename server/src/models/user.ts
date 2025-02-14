import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}
interface UserCreation extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreation>
  implements UserAttributes
{
  id!: number;
  username!: string;
  password!: string;

  createdAt?: Date;
  updatedAt?: Date;

  async setPassword(password: string) {
    const saltRounds = 20;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [8, 15],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],
        },
      },
    },
    {
      modelName: 'user',
      timestamps: true,
      sequelize,
      hooks: {
        beforeCreate: async (newUser: User) => {
          await newUser.setPassword(newUser.password);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      },
    }
  );

  return User;
}
