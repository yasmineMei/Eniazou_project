import mongoose, { Schema } from "mongoose";
import { IUserDocument, UserModel } from "./user";

export interface IStaffDocument extends IUserDocument {
    fonction: string;
    specialite: string;
    contratType: string;
    serviceAffecte: string;
    salaire: number;
    dateRecrutement: Date; 
}

const StaffSchema = new Schema<IStaffDocument>({
    fonction: { type: String, required: true },
    specialite: { type: String, required: false },
    contratType: { type: String, required: true },
    serviceAffecte: { type: String, required: true },
    salaire: { type: Number, required: true },
    dateRecrutement: { type: Date, required: true } 
});

export const StaffModel = UserModel.discriminator<IStaffDocument>("Staff", StaffSchema);
