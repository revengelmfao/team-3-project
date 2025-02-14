import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { getCoordinates } from './googleMaps';

const app: any = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get(
  '/get-location',
  async (req: Request, res: Response, next: NextFunction) => {
    const address = req.query.address as string;
    try {
      if (!address) {
        return res.status(400).json({ error: 'Address is required' });
      }

      const coordinates = (await getCoordinates(address)) as {
        lat: number;
        lng: number;
      } | null;

      if (!coordinates) {
        return res.status(500).json({ error: 'Failed to fetch coordinates' });
      }

      res.json(coordinates);
    } catch (err: any) {
      //return res.json({ message: `An error has happened: ${err}` });
      return next(err);
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
