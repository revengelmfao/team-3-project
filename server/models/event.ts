import { DataTypes, type Sequelize, Model } from 'sequelize';

interface EventAttributes {
  title: string;
  location: string;
  date: string;
  time: number;
  catererId?: number;
}

interface EventCreation extends EventAttributes {}

export class Event
  extends Model<EventAttributes, EventCreation>
  implements EventAttributes
{
  title!: string;
  location!: string;
  date!: string;
  time!: number;
  catererId?: number;
}

export function EventFactory(sequelize: Sequelize) {
  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      catererId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
}
