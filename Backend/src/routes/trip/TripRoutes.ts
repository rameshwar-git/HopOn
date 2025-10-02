import express from 'express';
import { createTrip, putTripDriver, putTripPassenger } from '../../controllers/trip/TripController';

const tripRoutes = express.Router();

tripRoutes.post('/trips/newTrip', createTrip);
tripRoutes.put('/trips/putpassenger/:passengerId', putTripPassenger);
tripRoutes.put('/trips/putdriver/:driverId', putTripDriver);

export default tripRoutes;