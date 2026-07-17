import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import personajeRoutes from "./routes/personajeRoutes.js";

import "./config/db.js";

import catalogoRoutes from "./routes/catalogoRoutes.js";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";

import coleccionRoutes from "./routes/coleccionRoutes.js";

const app = express();

app.use(express.json({

    limit: "20mb"

}));

app.use(express.urlencoded({

    extended: true,

    limit: "20mb"

}));

app.use(cors());

app.use("/api/personajes", personajeRoutes);

app.use("/api/auth", authRoutes);

app.use("/api", catalogoRoutes);

app.use("/api/colecciones", coleccionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor ejecutándose en el puerto ${PORT}`);

});