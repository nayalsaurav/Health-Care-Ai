// Define normal ranges for health metrics
const normalRanges = {
  SPO2: { min: 95, max: 100 },
  bloodPressure: {
    systolic: { min: 90, max: 120 },
    diastolic: { min: 60, max: 80 },
  },
  oxygenLevel: { min: 95, max: 100 },
  // Add more metrics as needed
};

// Controller function to handle postHealthMetric
export function postHealthMetric(req, res) {
  const { SPO2, bloodPressure, oxygenLevel } = req.body;

  const results = {};

  // Check SPO2
  if (SPO2 < normalRanges.SPO2.min || SPO2 > normalRanges.SPO2.max) {
    results.SPO2 = `abnormal: ${JSON.stringify(normalRanges.SPO2)}`;
  } else {
    results.SPO2 = "normal";
  }

  // Check Blood Pressure
  if (
    bloodPressure.systolic < normalRanges.bloodPressure.systolic.min ||
    bloodPressure.systolic > normalRanges.bloodPressure.systolic.max ||
    bloodPressure.diastolic < normalRanges.bloodPressure.diastolic.min ||
    bloodPressure.diastolic > normalRanges.bloodPressure.diastolic.max
  ) {
    results.bloodPressure = `abnormal: ${JSON.stringify(
      normalRanges.bloodPressure
    )}`;
  } else {
    results.bloodPressure = "normal";
  }

  // Check Oxygen Level
  if (
    oxygenLevel < normalRanges.oxygenLevel.min ||
    oxygenLevel > normalRanges.oxygenLevel.max
  ) {
    results.oxygenLevel = `abnormal:${JSON.stringify(
      normalRanges.oxygenLevel
    )}`;
  } else {
    results.oxygenLevel = "normal";
  }

  // Respond with the results
  res.json(results);
}
