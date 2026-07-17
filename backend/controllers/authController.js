import conexion from "../config/db.js";
import jwt from "jsonwebtoken";

export const prueba = (req, res) => {

    res.json({
        mensaje: "Backend funcionando correctamente"
    });

};

export const login = (req, res) => {

    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ?";

    conexion.query(sql, [correo], (error, resultados) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al consultar la base de datos"
            });

        }

        if (resultados.length === 0) {

            return res.status(401).json({
                mensaje: "El usuario no existe"
            });

        }

        const usuario = resultados[0];

        if (usuario.password !== password) {

            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });

        }

        const token = jwt.sign(

            {
                id: usuario.id,
                nombre: usuario.nombre,
                esAdmin: usuario.esAdmin
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );

        res.json({

            mensaje: "Inicio de sesión correcto",

            token,

            usuario: {

                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                esAdmin: usuario.esAdmin

            }

        });

    });

};