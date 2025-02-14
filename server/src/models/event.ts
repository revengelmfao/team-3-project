import { DataTypes, type Sequelize, Model, Optional } from 'sequelize';
import { User } from '../models/user';

interface EventAttributes {
  id: number;
  title: string;
  location: string;
  date: Date;
  time: string; // Add time attribute
  userId: number;
}

interface EventCreation extends Optional<EventAttributes, 'id'> {}

export class Event
  extends Model<EventAttributes, EventCreation>
  implements EventAttributes
{
  id!: number;
  title!: string;
  location!: string;
  date!: Date;
  time!: string; // Add time attribute
  userId!: number;
}

export function EventFactory(sequelize: Sequelize) {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
}
