import express from "express";

import {

    obtenerPersonajes,
    obtenerPersonajePorId,
    filtrarPersonajes,
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje

} from "../controllers/personajeController.js";

const router = express.Router();

router.get("/", obtenerPersonajes);

router.get("/filtro", filtrarPersonajes);

router.get("/:id", obtenerPersonajePorId);

router.post("/", crearPersonaje);

router.put("/:id", actualizarPersonaje);

router.delete("/:id", eliminarPersonaje);

export default router;