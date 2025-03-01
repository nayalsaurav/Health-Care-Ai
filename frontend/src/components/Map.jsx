import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar2 from "./SideBar2";

function Map() {
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);

  const findNearbyHospitals = async () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          try {
            const response = await axios.post(
              "http://localhost:3000/api/v1/map/findNearbyHospitals",
              { latitude, longitude },
              { headers: { "Content-Type": "application/json" } }
            );

            console.log("Hospitals:", response.data);
            setHospitals(response.data);
          } catch (error) {
            console.error(
              "Error fetching nearby hospitals:",
              error.response ? error.response.data : error.message
            );
            setError(
              "Failed to fetch nearby hospitals. Please try again later."
            );
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(
            "Unable to retrieve your location. Please check your settings."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-row w-full h-screen">

      {/* Main Content Area with overflow auto */}
      <div className="flex-1 flex flex-col p-6 bg-gray-800 text-white overflow-y-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Find Nearby Hospitals
        </h2>
        <button
          onClick={findNearbyHospitals}
          className="mb-4 p-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Find Nearby Hospitals
        </button>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {hospitals.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Nearby Hospitals:</h3>
            <ul className="space-y-4">
              {hospitals.map((hospital, index) => (
                <li
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg shadow-md"
                >
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${hospital.location.lat},${hospital.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:underline text-lg font-medium"
                  >
                    {hospital.name}
                  </a>
                  <p className="text-gray-400">Click to view on Google Maps</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Map;
