import express from "express";
import { createDriver, setDriverVehicle } from "@/controllers/user/DriverController";

const router = express.Router();

//use passenger route to create new passenger
router.post("/drivers", createDriver);
//use this route to set vehicle data for driver
router.put("/drivers/vehicles/:driverId", setDriverVehicle);

export default router;
