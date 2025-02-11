import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { EventFactory } from './event.js';

const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);

User.hasMany(Event, {
  onDelete: 'CASCADE',
});

Event.belongsTo(User);

export default { User, Event };
