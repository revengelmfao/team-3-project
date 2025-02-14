const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from './config/connection';
import router from './routes/index.ts';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('../client/dist'));

app.use(express.json());
app.use(router);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
