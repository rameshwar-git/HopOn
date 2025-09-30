import PassengerModel from '@models/user.passenger/user.passenger';
import {Request, Response} from 'express';

export const createPassenger = async (req: Request, res: Response) =>{
    try{
        const userPassenger = await PassengerModel.create({...req.body});
        //New User Status
        await createStatus(req, res, userPassenger._id);
        res.status(201).json(userPassenger);
    } catch(err:any){
        res.status(500).json({error: err.message});
    }
}
//status
const createStatus = async (req : Request, res: Response, _id:any )=>{
    try{
        const passenger = PassengerModel.create({...req.body, id:_id});
        res.status(200).json(passenger)
    } catch(err: any){
        res.status(500).json({error: err.message});
    }
};