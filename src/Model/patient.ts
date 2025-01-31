import mongoose, { Schema } from "mongoose";
import { IUserDocument, UserModel } from "./user";

export interface IPatientDocument extends IUserDocument {
    typePatient: "INTERNE" | "EXTERNE";  
    numeroDossierMedical: string;
    taille: number;  
    poids: number;   
}

const PatientSchema = new Schema<IPatientDocument>({
    typePatient: { type: String, enum: ["INTERNE", "EXTERNE"], required: true },
    numeroDossierMedical: { type: String, required: true, unique: true },
    taille: { type: Number, required: true },
    poids: { type: Number, required: true }
});

// Création du modèle en utilisant un discriminant
export const PatientModel = UserModel.discriminator<IPatientDocument>("Patient", PatientSchema);
