import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); 

const apiKey: string = process.env.GOOGLE_MAPS_API_KEY || "";
interface GeocodeResponse {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: string;
}

export async function getCoordinates(address: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json() as GeocodeResponse; 

    console.log(data);
    
    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error(`Error fetching coordinates: ${data.status}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
