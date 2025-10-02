import { Request, Response } from 'express';
import DriverModel from '@/models/users/UserDriverModel';
import VehicleModel from '@/models/vehicles/VehicleModel';
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
        res.status(201).json({'Status' : 'SUCCESS' });
    } catch(err:any){
        res.status(500).json({error: err.message});
    }
};

//Set Vehicle Date for Driver
export const setDriverVehicle = async (req: Request, res: Response) =>{
    try{
        const { driverId } = req.params;
        if(!driverId){
            return res.status(400).json({error: "DriverId is required"});
        }
        const driver = await VehicleModel.findOneAndUpdate({ driverId }, {...req.body, timestamp: new Date() });
        res.status(200).json({'Status': 'SUCCESS' });
    } catch(err:any){   
        res.status(500).json({'Status': 'FAILED' });
    }
};
