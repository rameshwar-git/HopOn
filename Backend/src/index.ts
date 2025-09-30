import express from 'express';
import {connectDB} from '@config/db';
import passengerRoutes from '@routes/passenger.routes/passenger.routes';
import dotnet from 'dotenv';
dotnet.config();

const app =express();
app.use(express.json());
app.use('/api',passengerRoutes);
connectDB();

const PORT = process.env.PORT;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));
