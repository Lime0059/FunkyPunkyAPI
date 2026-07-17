import express from "express";

import {
    obtenerSubColecciones,
    obtenerTiposLlavero
} from "../controllers/catalogoController.js";

const router = express.Router();

router.get(
    "/subcolecciones",
    obtenerSubColecciones
);

router.get(
    "/tipo-llaveros",
    obtenerTiposLlavero
);

export default router;