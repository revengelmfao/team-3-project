import express, { Request, Response } from "express";
import cors from "cors";
import { getCoordinates } from "./googleMaps";

const app: any = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/get-location", async (req: Request, res: Response) => {
  const address = req.query.address as string;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  const result = await getCoordinates(address);
  const coordinates = result ? { lat: result.latitude, lng: result.longitude } : null;

  if (!coordinates) {
    return res.status(500).json({ error: "Failed to fetch coordinates" });
  }

  res.json(coordinates);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); 
});