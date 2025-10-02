import express from 'express';
import { updateLocation } from '@/controllers/location/LocationController';

const locationRoutes = express.Router();

// Use this route to update GPS location
locationRoutes.put('/location/updateLocation/:userId', updateLocation);

export default locationRoutes;