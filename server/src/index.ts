<<<<<<< HEAD
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { getCoordinates } from "./googleMaps";
import sequelize from '../config/connection.js';
import { UserFactory } from '../models/user.js';
import { EventFactory } from '../models/event.js';
=======
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { getCoordinates } from './googleMaps';
>>>>>>> 5f3037cd77103fa556cb93d8e75584567b8e7814

const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);

User.hasMany(Event, {
  onDelete: 'CASCADE',
});
const app: any = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get(
  '/get-location',
  async (req: Request, res: Response, next: NextFunction) => {
    const address = req.query.address as string;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const coordinates = (await getCoordinates(address)) as unknown as {
      lat: number;
      lng: number;
    } | null;

    if (!coordinates) {
      return res.status(500).json({ error: 'Failed to fetch coordinates' });
    }

    res.json(coordinates);
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
