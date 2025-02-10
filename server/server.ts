const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from '../server/config/connection';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

app.use(express.json());

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
