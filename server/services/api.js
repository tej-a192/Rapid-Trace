import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const OPENROUTESERVICE_API_KEY = process.env.OPENROUTESERVICE_API_KEY;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;



const getCoordinates = async (placeName) => {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${OPENROUTESERVICE_API_KEY}&text=${placeName}`;
  try {
    const response = await axios.get(url);
    if (response.data.features && response.data.features.length > 0) {
      const [longitude, latitude] = response.data.features[0].geometry.coordinates;
      return { longitude, latitude };
    }
    throw new Error("Location not found.");
  } catch (error) {
    console.error(`Geocoding error for ${placeName}:`, error.message);
    throw new Error(`Could not find coordinates for ${placeName}.`);
  }
};

export const getDirections = async (origin, destination) => {
  const originCoords = await getCoordinates(origin);
  const destCoords = await getCoordinates(destination);

  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;
  const headers = {
    'Authorization': OPENROUTESERVICE_API_KEY,
    'Content-Type': 'application/json'
  };
  const body = {
    "coordinates": [
      [originCoords.longitude, originCoords.latitude],
      [destCoords.longitude, destCoords.latitude]
    ]
  };

  try {
    const response = await axios.post(url, body, { headers });
    // The response structure is different from Google's, but has all the needed info.
    // The frontend team will need to adapt to this new structure.
    return response.data;
  } catch (error) {
    console.error("Error in ORS Directions service:", error.response?.data || error.message);
    throw new Error("Failed to fetch directions from OpenRouteService.");
  }
};


// --- 2. Nearby Bunks Service (Using OpenRouteService) ---
export const getNearbyBunks = async (lat, lon) => {
  const url = `https://api.openrouteservice.org/pois`;
  const headers = {
    'Authorization': OPENROUTESERVICE_API_KEY,
    'Content-Type': 'application/json'
  };

  const longitude = parseFloat(lon);
  const latitude = parseFloat(lat);

  const body = {
    "request": "pois",
    "geometry": {
      // Provide BOTH a bounding box AND a geojson point with a buffer.
      "bbox": [
        // A small box is still required, even if we are using a buffer.
        [longitude - 0.02, latitude - 0.02],
        [longitude + 0.02, latitude + 0.02]
      ],
      "geojson": {
        "type": "Point",
        "coordinates": [longitude, latitude]
      },
      // The buffer is the primary search radius (max 2000m).
      "buffer": 2000
    },
    "filters": {
      "category_ids": [421] // Specific 'Fuel' category
    }
  };

  try {
    const response = await axios.post(url, body, { headers });
    
    if (!response.data.features || response.data.features.length === 0) {
      console.log("No petrol bunks (category 421) found. The API call was successful but returned no data for this location.");
      return { 
        message: "No nearby petrol bunks found.", 
        features: [] 
      };
    }
    
    return response.data;

  } catch (error) {
    // This now properly distinguishes between our server errors and their server errors.
    if (error.response) {
      console.error("Error from OpenRouteService Server:", error.response.data);
      throw new Error(`OpenRouteService API returned an error: ${error.response.statusText}`);
    } else {
      console.error("Error sending request to OpenRouteService:", error.message);
      throw new Error("Failed to connect to the OpenRouteService API.");
    }
  }
};



export const getWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error in getWeather service:", error.response?.data || error.message);
    throw new Error("Failed to fetch weather data from OpenWeatherMap API.");
  }
};