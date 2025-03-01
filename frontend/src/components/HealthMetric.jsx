import React, { useState } from "react";
import axios from "axios";
import SideBar2 from "./SideBar2";

function HealthMetric() {
  const [formData, setFormData] = useState({
    SPO2: "",
    systolic: "",
    diastolic: "",
    oxygenLevel: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/health/postHealthMetric",
        {
          SPO2: parseFloat(formData.SPO2),
          bloodPressure: {
            systolic: parseFloat(formData.systolic),
            diastolic: parseFloat(formData.diastolic),
          },
          oxygenLevel: parseFloat(formData.oxygenLevel),
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error submitting health metrics:", error);
      setError("Failed to submit health metrics. Please try again.");
    }
  };

  return (
    <div className="flex flex-row min-h-screen w-full bg-gray-900 text-white">
      <main className="flex-1 p-6">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">
            Health Metric Tracker
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block font-medium">SPO2:</label>
              <input
                type="number"
                name="SPO2"
                value={formData.SPO2}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium">
                Systolic Blood Pressure:
              </label>
              <input
                type="number"
                name="systolic"
                value={formData.systolic}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium">
                Diastolic Blood Pressure:
              </label>
              <input
                type="number"
                name="diastolic"
                value={formData.diastolic}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="form-group">
              <label className="block font-medium">Oxygen Level:</label>
              <input
                type="number"
                name="oxygenLevel"
                value={formData.oxygenLevel}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
          {result && (
            <div className="mt-4 p-4 border border-blue-500 rounded bg-gray-800">
              <h3 className="font-bold">Results:</h3>
              <p>
                SPO2:{" "}
                <span
                  className={
                    result.SPO2 === "abnormal"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {result.SPO2}
                </span>
              </p>
              <p>
                Blood Pressure:{" "}
                <span
                  className={
                    result.bloodPressure === "abnormal"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {result.bloodPressure}
                </span>
              </p>
              <p>
                Oxygen Level:{" "}
                <span
                  className={
                    result.oxygenLevel === "abnormal"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {result.oxygenLevel}
                </span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default HealthMetric;
