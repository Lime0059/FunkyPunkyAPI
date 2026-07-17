import conexion from "../config/db.js";

export const obtenerPersonajes = (req, res) => {

    const sql = `

        SELECT

            p.id,
            p.nombre,
            p.sub_coleccion_id,
            p.tipo_llavero_id,
            p.img_personaje,

            sc.nombre AS sub_coleccion,

            tl.nombre AS tipo_llavero

        FROM personajes p

        INNER JOIN sub_colecciones sc
            ON p.sub_coleccion_id = sc.id

        INNER JOIN tipo_llaveros tl
            ON p.tipo_llavero_id = tl.id

        ORDER BY p.nombre;

    `;

    conexion.query(sql, (error, resultados) => {

        if (error) {

            return res.status(500).json({
                mensaje: "Error al obtener los personajes"
            });

        }

        const personajes = resultados.map(personaje => {

            return {

                id: personaje.id,

                nombre: personaje.nombre,

                sub_coleccion_id: personaje.sub_coleccion_id,

                tipo_llavero_id: personaje.tipo_llavero_id,

                sub_coleccion: personaje.sub_coleccion,

                tipo_llavero: personaje.tipo_llavero,

                img_personaje: personaje.img_personaje
                    ? personaje.img_personaje.toString("base64")
                    : null

            };

        });

        res.json(personajes);

    });

};

export const obtenerPersonajePorId = (req, res) => {

    const { id } = req.params;

    const sql = `

        SELECT

            p.id,
            p.nombre,
            p.sub_coleccion_id,
            p.tipo_llavero_id,
            p.img_personaje,

            sc.nombre AS sub_coleccion,

            tl.nombre AS tipo_llavero

        FROM personajes p

        INNER JOIN sub_colecciones sc
            ON p.sub_coleccion_id = sc.id

        INNER JOIN tipo_llaveros tl
            ON p.tipo_llavero_id = tl.id

        WHERE p.id = ?

    `;

    conexion.query(sql, [id], (error, resultados) => {

        if (error) {

            console.error(error);

            return res.status(500).json({

                mensaje: "Error al obtener el personaje"

            });

        }

        if (resultados.length === 0) {

            return res.status(404).json({

                mensaje: "Personaje no encontrado"

            });

        }

        const personaje = resultados[0];

        res.json({

            id: personaje.id,

            nombre: personaje.nombre,

            sub_coleccion_id: personaje.sub_coleccion_id,

            tipo_llavero_id: personaje.tipo_llavero_id,

            sub_coleccion: personaje.sub_coleccion,

            tipo_llavero: personaje.tipo_llavero,

            img_personaje: personaje.img_personaje
                ? personaje.img_personaje.toString("base64")
                : null

        });

    });

};

export const actualizarPersonaje = (req, res) => {

    const { id } = req.params;

    const {

        nombre,
        sub_coleccion_id,
        tipo_llavero_id,
        img_personaje

    } = req.body;

    const imagenBuffer = Buffer.from(

        img_personaje,

        "base64"

    );

    const sql = `

        UPDATE personajes

        SET

            nombre = ?,
            sub_coleccion_id = ?,
            tipo_llavero_id = ?,
            img_personaje = ?

        WHERE id = ?

    `;

    conexion.query(

        sql,

        [

            nombre,
            sub_coleccion_id,
            tipo_llavero_id,
            imagenBuffer,
            id

        ],

        (error, resultado) => {

            if (error) {

                console.error(error);

                return res.status(500).json({

                    mensaje: "Error al actualizar el personaje"

                });

            }

            if (resultado.affectedRows === 0) {

                return res.status(404).json({

                    mensaje: "Personaje no encontrado"

                });

            }

            res.json({

                mensaje: "Personaje actualizado correctamente"

            });

        }

    );

};

export const crearPersonaje = (req, res) => {

    const {

        nombre,
        sub_coleccion_id,
        tipo_llavero_id,
        img_personaje

    } = req.body;

    const imagenBuffer = Buffer.from(
        img_personaje,
        "base64"
    );

    const sql = `

        INSERT INTO personajes
        (
            nombre,
            sub_coleccion_id,
            tipo_llavero_id,
            img_personaje
        )

        VALUES (?, ?, ?, ?)

    `;

    conexion.query(

        sql,

        [

            nombre,
            sub_coleccion_id,
            tipo_llavero_id,
            imagenBuffer

        ],

        (error, resultado) => {

            if (error) {

                console.error(error);

                return res.status(500).json({

                    mensaje: "Error al crear el personaje"

                });

            }

            res.status(201).json({

                mensaje: "Personaje creado correctamente",

                id: resultado.insertId

            });

        }

    );

};

export const eliminarPersonaje = (req, res) => {

    const { id } = req.params;

    const sql = `

        DELETE FROM personajes

        WHERE id = ?

    `;

    conexion.query(

        sql,

        [id],

        (error, resultado) => {

            if (error) {

                console.error(error);

                return res.status(500).json({

                    mensaje: "Error al eliminar el personaje"

                });

            }

            if (resultado.affectedRows === 0) {

                return res.status(404).json({

                    mensaje: "Personaje no encontrado"

                });

            }

            res.json({

                mensaje: "Personaje eliminado correctamente"

            });

        }

    );

};

///FILTROS////
///FILTROS////
///FILTROS////

export const filtrarPersonajes = (req, res) => {

    const {

        nombre,
        tipo,
        coleccion

    } = req.query;

    let sql = `

        SELECT

            p.id,
            p.nombre,
            p.sub_coleccion_id,
            p.tipo_llavero_id,
            p.img_personaje,

            sc.nombre AS sub_coleccion,

            tl.nombre AS tipo_llavero

        FROM personajes p

        INNER JOIN sub_colecciones sc
            ON p.sub_coleccion_id = sc.id

        INNER JOIN tipo_llaveros tl
            ON p.tipo_llavero_id = tl.id

        WHERE 1 = 1

    `;

    const parametros = [];

    if (nombre) {

        sql += ` AND p.nombre LIKE ?`;

        parametros.push(`%${nombre}%`);

    }

    if (tipo) {

        sql += ` AND tl.nombre = ?`;

        parametros.push(tipo);

    }

    if (coleccion) {

        sql += ` AND p.sub_coleccion_id = ?`;

        parametros.push(coleccion);

    }

    sql += ` ORDER BY p.nombre`;

    conexion.query(sql, parametros, (error, resultados) => {

        if (error) {

            console.error(error);

            return res.status(500).json({

                mensaje: "Error al filtrar personajes"

            });

        }

        const personajes = resultados.map(personaje => ({

            id: personaje.id,

            nombre: personaje.nombre,

            sub_coleccion_id: personaje.sub_coleccion_id,

            tipo_llavero_id: personaje.tipo_llavero_id,

            sub_coleccion: personaje.sub_coleccion,

            tipo_llavero: personaje.tipo_llavero,

            img_personaje: personaje.img_personaje
                ? personaje.img_personaje.toString("base64")
                : null

        }));

        res.json(personajes);

    });

};