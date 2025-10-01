import { Document } from "mongoose";

export interface users extends Document {
    name: string;
    dob: Date;
    gender: string;
    email: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}