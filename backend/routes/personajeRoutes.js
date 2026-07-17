import express from "express";

import {

    obtenerPersonajes,
    filtrarPersonajes,
    crearPersonaje,
    eliminarPersonaje

} from "../controllers/personajeController.js";

const router = express.Router();

router.get("/", obtenerPersonajes);

router.get("/filtro", filtrarPersonajes);

router.post("/", crearPersonaje);

router.delete("/:id", eliminarPersonaje);

export default router;
