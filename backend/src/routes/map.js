import express from "express";
import { findNearbyHospitals } from "../controllers/MapCopntroller.js";

const mapRouter = express.Router();

// Define the route for finding nearby hospitals
mapRouter.post("/findNearbyHospitals", findNearbyHospitals);

export default mapRouter;
