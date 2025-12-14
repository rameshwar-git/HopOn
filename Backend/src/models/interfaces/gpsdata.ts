import { Schema,Document } from 'mongoose';

export interface GPSData extends Document {
    userId: Schema.Types.ObjectId; // Reference to the user (driver or passenger)
    vehicleId?: Schema.Types.ObjectId; // Reference to the vehicle
    status?: string; // e.g., 'active', 'inactive'
    currentLocation?: {
        latitude: number;
        longitude: number;
    };
    destination?: {
        latitude: number;
        longitude: number;
    };    
    timestamp?: Date;
};
