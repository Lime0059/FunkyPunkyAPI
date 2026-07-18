async function cargarColecciones() {

    try {

        const respuesta = await fetch(

            "http://localhost:3000/api/colecciones"

        );

        const colecciones = await respuesta.json();

        const contenedor = document.getElementById(

            "contenedorColecciones"

        );

        contenedor.innerHTML = "";

        colecciones.forEach(coleccion => {

            const tarjeta = document.createElement("div");

            tarjeta.className = "tarjetaColeccion";

            tarjeta.innerHTML = `

                <div class="imagenColeccion">

                    <img
                        src="data:frontend/image/png;base64,${coleccion.img_fondo_empaque}"
                        alt="${coleccion.nombre}"
                    >

                </div>

                <div class="infoColeccion">

                    <span class="tituloColeccion">

                        FUNKI PUNKY

                    </span>

                    <h3>

                        ${coleccion.nombre.replace("Funki Punky: ", "")}

                    </h3>

                    <span class="anioColeccion">

                        ${coleccion.ano}

                    </span>

                </div>

            `;

            tarjeta.addEventListener("click", async () => {

                sessionStorage.setItem(

                    "coleccionSeleccionada",

                    coleccion.id

                );

                await cargarVista("detalle-coleccion");

            });

            contenedor.appendChild(tarjeta);

        });

    }

    catch (error) {

        console.error(error);

    }

}