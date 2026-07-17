import conexion from "../config/db.js";

export const obtenerColecciones = (req, res) => {

    const sql = `

        SELECT

            id,
            nombre,
            ano,
            img_fondo_empaque

        FROM colecciones

        ORDER BY ano;

    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            return res.status(500).json({

                mensaje: "Error al obtener las colecciones"

            });

        }

        const colecciones = resultados.map(coleccion => {

            return {

                id: coleccion.id,

                nombre: coleccion.nombre,

                ano: coleccion.ano,

                img_fondo_empaque: coleccion.img_fondo_empaque
                    ? coleccion.img_fondo_empaque.toString("base64")
                    : null

            };

        });

        res.json(colecciones);

    });

};

export const obtenerColeccionPorId = (req, res) => {

    const { id } = req.params;

    const sql = `

        SELECT

            id,
            nombre,
            ano,
            descripcion,
            img_fondo_empaque,
            trailer

        FROM colecciones

        WHERE id = ?

    `;

    conexion.query(sql, [id], (error, resultados) => {

        if (error) {

            return res.status(500).json({

                mensaje: "Error al obtener la colección"

            });

        }

        if (resultados.length === 0) {

            return res.status(404).json({

                mensaje: "Colección no encontrada"

            });

        }

        const coleccion = resultados[0];

        res.json({

            id: coleccion.id,

            nombre: coleccion.nombre,

            ano: coleccion.ano,

            descripcion: coleccion.descripcion,

            trailer: coleccion.trailer,

            img_fondo_empaque: coleccion.img_fondo_empaque
                ? coleccion.img_fondo_empaque.toString("base64")
                : null

        });

    });

};