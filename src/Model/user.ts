import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

type Role = "PATIENT" | "ADMIN" | "MEDECIN" | "AGENTADMIN";
type Statut = "ACTIVE" | "BLOQUE" | "SUPPRIME";

export interface IUserDocument extends Document {
    firstname: string;
    lastname: string;
    username: string;
    adress: string;
    numberTel: string;
    email: string;
    birthDate: Date;
    birthPlace: string;
    profession: string;
    password: string;
    statut: Statut;
    profilepictureurl: string;
    role: Role;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {
    login(username: string, password: string): Promise<IUserDocument>;
}

const UserSchema = new Schema<IUserDocument, IUserModel>(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        adress: { type: String, required: true },
        numberTel: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        birthDate: { type: Date, required: true },
        birthPlace: { type: String, required: true },
        profession: { type: String, required: true },
        password: { type: String, required: true },
        profilepictureurl: { type: String, required: true },
        statut: { type: String, enum: ["ACTIVE", "BLOQUE", "SUPPRIME"], required: true },
        role: { type: String, enum: ["PATIENT", "ADMIN", "MEDECIN", "AGENTADMIN"], required: true },
    },
    { timestamps: true, discriminatorKey: "role" }
);

// Hachage du mot de passe avant de sauvegarder
UserSchema.pre<IUserDocument>("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Méthode statique pour la connexion
UserSchema.statics.login = async function (username: string, password: string): Promise<IUserDocument> {
    const user = await this.findOne({ username });
    if (!user) {
        throw new Error("Utilisateur non trouvé");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Mot de passe incorrect");
    }
    return user;
};

// Export du modèle
export const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);