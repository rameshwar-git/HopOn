import { Request, Response } from 'express';
import DriverModel from '@/models/users/UserDriverModel';
import { createLocation } from '@/controllers/location/LocationController';
import { createVehicle } from '@/controllers/vehicle/VehicleController';

//New Driver Regestration
export const createDriver = async (req: Request, res: Response) =>{
    try{
        const userDriver = await DriverModel.create({...req.body});
        //Create location entry for the new driver
        const userLocation = await createLocation(req, res, userDriver._id);
        //Create vehicle entry for the new driver
        const userVehicle = await createVehicle(req, res, userDriver._id);
        res.status(201).json({'User':'Sucessfully Created' });
    } catch(err:any){
        res.status(500).json({error: err.message});
    }
};
