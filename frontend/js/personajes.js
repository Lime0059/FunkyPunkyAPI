async function cargarPersonajes() {

    const contenedor = document.getElementById("contenedorPersonajes");

    try {

        const nombre = document.getElementById("buscarPersonaje")?.value.trim() || "";

        const tipo = document.getElementById("filtroTipo")?.value || "";

        const coleccion = document.getElementById("filtroColeccion")?.value || "";

        const parametros = new URLSearchParams();

        if (nombre !== "") {

            parametros.append("nombre", nombre);

        }

        if (tipo !== "") {

            parametros.append("tipo", tipo);

        }

        if (coleccion !== "") {

            parametros.append("coleccion", coleccion);

        }

        let url = "http://localhost:3000/api/personajes";

        if (parametros.toString() !== "") {

            url += "/filtro?" + parametros.toString();

        }

        contenedor.innerHTML = `

            <div class="sinResultados">

                Buscando personajes...

            </div>

        `;

        const respuesta = await fetch(url);

        const personajes = await respuesta.json();

        contenedor.innerHTML = "";

        if (personajes.length === 0) {

            contenedor.innerHTML = `

                <div class="sinResultados">

                    No se encontraron personajes.

                </div>

            `;

            return;

        }

        personajes.forEach(personaje => {

            const tarjeta = document.createElement("div");

            tarjeta.className = "tarjeta";

            const numeroTarjeta = String(personaje.sub_coleccion_id).padStart(2, "0");

            tarjeta.style.setProperty(

                "--fondoNormal",

                `url(../img/tarjetasFondos/Tarjeta${numeroTarjeta}_Normal.png)`

            );

            tarjeta.style.setProperty(

                "--fondoHover",

                `url(../img/tarjetasFondos/Tarjeta${numeroTarjeta}_Deztello.png)`

            );

            tarjeta.innerHTML = `

                <div class="tarjeta-personaje">

                    <img
                        src="data:image/png;base64,${personaje.img_personaje}"
                        alt="${personaje.nombre}"
                    >

                </div>

                <div class="tarjeta-info">

                    <p class="nombre">

                        NOMBRE: ${personaje.nombre}

                    </p>

                    <p class="tipo">

                        TIPO: ${personaje.tipo_llavero}

                    </p>

                    <p class="coleccion">

                        COLECCIÓN: ${personaje.sub_coleccion}

                    </p>

                </div>

                <button
                    class="btnDetalle"
                    data-id="${personaje.id}"
                ></button>

            `;

            contenedor.appendChild(tarjeta);

        });

        const botonesDetalle = document.querySelectorAll(".btnDetalle");

        botonesDetalle.forEach(boton => {

            boton.addEventListener("click", () => {

                const id = boton.dataset.id;

                console.log("Abrir personaje:", id);

                // Aquí cargaremos la vista de detalle.

            });

        });

    }

    catch (error) {

        console.error(error);

        contenedor.innerHTML = `

            <div class="sinResultados">

                Ocurrió un error al cargar los personajes.

            </div>

        `;

    }

}

function inicializarFiltros() {

    const botonBuscar = document.getElementById("btnBuscar");

    const inputBuscar = document.getElementById("buscarPersonaje");

    if (!botonBuscar) return;

    botonBuscar.addEventListener("click", async () => {

        botonBuscar.disabled = true;

        await cargarPersonajes();

        botonBuscar.disabled = false;

    });

    inputBuscar?.addEventListener("keydown", async (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            botonBuscar.disabled = true;

            await cargarPersonajes();

            botonBuscar.disabled = false;

        }

    });

}