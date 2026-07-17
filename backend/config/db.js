import mysql from "mysql2";

const conexion = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "",

    database: "mi_basefunkipunky",

    port: 3306

});

conexion.connect((error) => {

    if (error) {

        console.error("Error al conectar con MySQL");
        console.error(error);

        return;

    }

    console.log("Base de datos conectada correctamente.");

});

export default conexion;