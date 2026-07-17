async function cargarDetalleColeccion(){

    try{

        const id = sessionStorage.getItem("coleccionSeleccionada");

        const respuesta = await fetch(

            `http://localhost:3000/api/colecciones/${id}`

        );

        const coleccion = await respuesta.json();

        document.getElementById("tituloColeccion").textContent =

            coleccion.nombre.replace("Funki Punky: ","");

        document.getElementById("anioColeccion").textContent =

            coleccion.ano;

        document.getElementById("textoDescripcion").textContent =

            coleccion.descripcion;

        document.getElementById("videoColeccion").src =

            coleccion.trailer;

        document.getElementById("heroDetalle").style.backgroundImage =

            `url(data:image/png;base64,${coleccion.img_fondo_empaque})`;

        /* ========================= */
        /* LOGO DE LA COLECCIÓN */
        /* ========================= */

        const numeroLogo = String(coleccion.id).padStart(2, "0");

        document.getElementById("logoColeccion").src =

            `img/logos/${numeroLogo}FunkyLogo.png`;

        document.getElementById("logoColeccion").alt =

            coleccion.nombre;

    }

    catch(error){

        console.error(error);

    }

}