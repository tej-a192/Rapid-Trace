// 1. Load environment variables FIRST
import express from "express";
import cors from "cors";
import { getDirections, getWeather, getNearbyBunks } from "./services/api.js";

const app = express();
const PORT = 5012;
app.use(cors());

// --- API Endpoints ---

app.get("/api/directions", async (req, res) => {
  const { origin, destination } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required" });
  }
  try {
    const data = await getDirections(origin, destination);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Need params lat & lon
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }
  try {
    const data = await getWeather(lat, lon);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/nearby-bunks", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }
    try {
        const data = await getNearbyBunks(lat, lon);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`✅ Pavan's Backend Server is active on port ${PORT}`));