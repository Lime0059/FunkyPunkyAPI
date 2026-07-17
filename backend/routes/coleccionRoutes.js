import express from "express";

import {

    obtenerColecciones,
    obtenerColeccionPorId

} from "../controllers/coleccionController.js";

const router = express.Router();

router.get("/", obtenerColecciones);

router.get("/:id", obtenerColeccionPorId);

export default router;