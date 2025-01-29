import mongoose, {Document, Model, Schema} from "mongoose";


type role = {
    status: "PATIENT" | "ADMIN" | "MEDECIN" | "AGENTADMIN"
}

 export interface IUserDocument extends Document {
    nom: string;
    prenom: string;
    adresse: string;
    numero: string;
    dateNaissance: string;
    lieuNaissance: string;
    profession: string;
    password: string;
    isactive: boolean;
    isdeleted: boolean;
    profilepictureurl: string;
    role: string;
}
/*
interface IUserModel extends Model<IUserDocument> {
    login(nom: string, numero: string): Promise<IUserDocument>; 
    signUp(numeroDossierMedical: String, password:)

}

const UserSchema = new Schema<IUserDocument, IUserModel>({
    nom:             { type: String, required: true, },
    prenom:          { type: String, required: true, },
    adresse:         { type: String, required: true, },
    numero :         { type: String, required: true, },
    dateNaissance:   { type: String, required: true, },
    lieuNaissance:   { type: String, required: true, },
    profession:      { type: String, required: true, },
    password:        { type: String, required: false, },
    isactive:        { type: Boolean, required: true,},
    isdeleted:       { type: Boolean, required: true,},
    profilepictureurl: { type: String, required: true,},
    role:              { type: String, required: true,},

})*/