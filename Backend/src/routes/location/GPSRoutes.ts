import express from 'express';
import { updateLocation } from '@/controllers/location/LocationController';

const locationRoutes = express.Router();
// Use this route to update GPS location
locationRoutes.put('/location/update/:userId', updateLocation);

export default locationRoutes;