import { error } from 'console';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = 3008
const DB_URL = process.env.DB_URL;


const app = express();

const server = http.createServer(app);


mongoose.Promise = Promise;
mongoose.connect(DB_URL)
    .then(() => {

        console.log("Connexion à la base de données MongoDB établie avec succès.");
        server.listen(port, () => {
            console.log("Le serveur est en cours d'exécution");
        });
    })
    .catch((error: Error) => {

        console.error("Erreur lors de la connexion à la base données MongoDB : ", error);
        process.exit(1);
    });

mongoose.connection.once('error', (error : Error) => console.log(error.message));