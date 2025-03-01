import axios from "axios";

export const findNearbyHospitals = async (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Came here");
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required." });
  }

  try {
    // Use the search endpoint to find nearby hospitals
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: "hospital", // Search for hospitals
          format: "json",
          lat: latitude, // Latitude for the search
          lon: longitude, // Longitude for the search
          limit: 10, // Limit the number of results
          bounded: 1, // Restrict search within viewbox
          viewbox: `${longitude - 0.05},${latitude + 0.05},${
            longitude + 0.05
          },${latitude - 0.05}`,
          addressdetails: 1, // Optional: include address details
          polygon_geojson: 1, // Optional: include geojson polygon
        },
        headers: { "User-Agent": "YourAppName" }, // Replace with your app name
      }
    );

    // Check if the response contains results
    if (!response.data || response.data.length === 0) {
      return res
        .status(404)
        .json({ error: "No hospitals found in the vicinity." });
    }

    // Map the results to a more usable format
    const hospitals = response.data.map((place) => ({
      name: place.display_name, // Use display_name for the hospital name
      address: place.address, // Full address details
      location: {
        lat: place.lat, // Latitude of the hospital
        lng: place.lon, // Longitude of the hospital
      },
    }));

    console.log(hospitals);
    res.json(hospitals);
  } catch (error) {
    console.error("Error fetching nearby hospitals:", error.message);
    // Log the full error response for debugging
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    res
      .status(500)
      .json({ error: "An error occurred while fetching nearby hospitals" });
  }
};
