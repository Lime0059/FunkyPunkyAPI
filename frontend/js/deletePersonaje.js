async function cargarPersonajesEliminar() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/personajes");

        const personajes = await respuesta.json();

        const contenedor = document.getElementById("contenedorPersonajes");

        contenedor.innerHTML = "";

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
                    class="btnEliminar"
                    data-id="${personaje.id}"
                ></button>

            `;

            contenedor.appendChild(tarjeta);

        });

        document.querySelectorAll(".btnEliminar").forEach(boton => {

            boton.addEventListener("click", async () => {

                const id = boton.dataset.id;

                const confirmar = confirm("¿Deseas eliminar este personaje?");

                if (!confirmar) {

                    return;

                }

                try {

                    const respuesta = await fetch(

                        `http://localhost:3000/api/personajes/${id}`,

                        {

                            method: "DELETE"

                        }

                    );

                    const datos = await respuesta.json();

                    if (!respuesta.ok) {

                        alert(datos.mensaje);

                        return;

                    }

                    alert(datos.mensaje);

                    await cargarPersonajesEliminar();

                }

                catch (error) {

                    console.error(error);

                    alert("No fue posible eliminar el personaje.");

                }

            });

        });

    }

    catch (error) {

        console.error(error);

    }

}