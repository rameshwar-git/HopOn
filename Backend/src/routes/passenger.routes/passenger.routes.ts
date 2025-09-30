import express from "express";
import { createPassenger } from "@/controllers/user.passenger.controller";

const router = express.Router();

router.post("/passenger", createPassenger);

export default router;
