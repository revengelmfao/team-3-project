import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { EventFactory } from './event.js';
import { CatererFactory } from './cater.js';

const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);
const Caterer = CatererFactory(sequelize);

User.hasMany(Event, {
  onDelete: 'CASCADE',
});

Event.belongsTo(User);

Event.hasOne(Caterer, {
  onDelete: 'CASCADE',
});

export default { User, Event, Caterer };
