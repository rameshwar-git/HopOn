import {Request, Response} from 'express';
import VehicleModel from '@/models/vehicles/VehicleModel';

// Create a new vehicle
export const createVehicle = async (req: Request, res: Response, driverId:any) => {
    try {
        const vehicle = VehicleModel.create({...req.body, driverId});
        return vehicle
    } catch (error:any) {
        res.status(500).json({message: 'Server error', error});
    }
};

// Update vehicle details
export const updateVehicle = async (req: Request, res: Response) => {
    try {
        const { driverId } = req.params;
        if (!driverId) {
            return res.status(400).json({ message: 'DriverId is required' });
        }
        const vehicle = await VehicleModel.findOneAndUpdate({ driverId }, { ...req.body, updatedAt: new Date() });
        res.status(200).json({ 'Status': 'SUCCESS'});
    } catch (error: any) {
        res.status(500).json({ 'Status': 'FAILED', error });
    }
};