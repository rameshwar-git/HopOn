import PassengerModel from '@/models/users/UserPassengerModel';
import {Request, Response} from 'express';
import { createLocation } from '@controllers/location/LocationController';

//Register New Passenger
export const createPassenger = async (req: Request, res: Response) =>{
    try{
        const userPassenger = await PassengerModel.create({...req.body});
        // Create location entry for the new passenger
        const userLocation =await createLocation(req, res, userPassenger._id);
        res.status(201).json({ 'Status':'SUCCESS' });
    } catch(err:any){
        res.status(500).json({error: err.message});
    }
};