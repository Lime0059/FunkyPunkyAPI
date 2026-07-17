import express from "express";
import { prueba, login } from "../controllers/authController.js";

const router = express.Router();

router.get("/prueba", prueba);

router.post("/login", login);

export default router;