import express from "express";
import { createPassenger } from "@/controllers/user/PassengerController";

const router = express.Router();

//use passenger route to create new passenger
router.post("/passengers", createPassenger);

export default router;
