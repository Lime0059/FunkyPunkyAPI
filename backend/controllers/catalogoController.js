import conexion from "../config/db.js";

export const obtenerSubColecciones = (req, res) => {

    const sql = `
        SELECT
            id,
            nombre
        FROM sub_colecciones
        ORDER BY nombre;
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al obtener las subcolecciones"
            });

        }

        res.json(resultados);

    });

};

export const obtenerTiposLlavero = (req, res) => {

    const sql = `
        SELECT
            id,
            nombre
        FROM tipo_llaveros
        ORDER BY nombre;
    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al obtener los tipos de llavero"
            });

        }

        res.json(resultados);

    });

};