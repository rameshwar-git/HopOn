import express from "express";
import { createDriver } from "@/controllers/user/DriverController";

const router = express.Router();

//use passenger route to create new passenger
router.post("/drivers", createDriver);

export default router;
