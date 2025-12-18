import express from "express";
import { createPassenger, validatePassenger, getPassenger } from "@/controllers/user/PassengerController";

const router = express.Router();

//use passenger route to create new passenger
router.post("/passengers", createPassenger);
router.get("/login", validatePassenger);
router.get("/passenger/:userId",getPassenger);

export default router;
