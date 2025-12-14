import { Request, Response } from 'express';
import { TripModel } from '@models/trip/TripModel';

// Create a new trip
export const createTrip = async (req: Request, res: Response) => {
	try {
		const trip = await TripModel.create(req.body);
		res.status(201).json(trip);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// Update trip by passengerId
export const putTripPassenger = async (req: Request, res: Response) => {
	try {
		const { passengerId } = req.params;
		if (!passengerId) {
			return res.status(400).json({ error: 'TripId is required' });
		}
		const trip = await TripModel.findOneAndUpdate({ passengerId }, { ...req.body });
		res.status(200).json({ Status: 'SUCCESS' });
	} catch (err: any) {
		res.status(500).json({ Status: 'FAILED' });
	}
};

// Update trip by driverId
export const putTripDriver = async (req: Request, res: Response) => {
	try {
		const { driverId } = req.params;
		if (!driverId) {
			return res.status(400).json({ error: 'TripId is required' });
		}
		const trip = await TripModel.findOneAndUpdate({ driverId }, { ...req.body });
		res.status(200).json({ Status: 'SUCCESS' });
	} catch (err: any) {
		res.status(500).json({ Status: 'FAILED' });
	}
};
