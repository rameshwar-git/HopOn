import express from 'express';
import { connectDB } from '@config/db';
import passengerRoutes from '@/routes/user/passenger/PassengerRoutes';
import driverRoutes from '@/routes/user/driver/DriverRoutes';
import locationRoutes from '@/routes/location/LocationRoutes';
import tripRoutes from '@routes/trip/TripRoutes';

import dotenv from 'dotenv';

dotenv.config();
connectDB(); 

const app = express();
app.use(express.json());

//calling routes to for users
app.use('/api', passengerRoutes);
app.use('/api', driverRoutes);
app.use('/api', locationRoutes)
app.use('/api', tripRoutes);


const PORT = process.env.PORT;

app.listen(Number(PORT), "10.240.8.19", () => {
  console.log(`🚀 Server running at http://10.240.8.19:${PORT}`);
});