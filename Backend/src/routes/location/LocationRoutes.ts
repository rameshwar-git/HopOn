import express from 'express';
import { updateLocation, getLocation, getAllLocation } from '@/controllers/location/LocationController';

const locationRoutes = express.Router();

// Use this route to update GPS location
locationRoutes.put('/location/updateLocation/:userId', updateLocation);
locationRoutes.get('/location/getLocation/:userId', getLocation);
locationRoutes.get('/location/allLocation/', getAllLocation);

export default locationRoutes;