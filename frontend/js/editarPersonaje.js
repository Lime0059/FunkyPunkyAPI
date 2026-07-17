async function cargarTablaEditar() {

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/personajes"
        );

        const personajes = await respuesta.json();

        const tabla = document.getElementById("tablaEditarPersonajes");

        tabla.innerHTML = "";

        personajes.forEach(personaje => {

            tabla.innerHTML += `

                <tr>

                    <td>${personaje.id}</td>

                    <td>${personaje.nombre}</td>

                    <td>${personaje.sub_coleccion}</td>

                    <td>${personaje.tipo_llavero}</td>

                    <td>

                        <button
                            class="btnEditar"
                            data-id="${personaje.id}"
                        >

                            Editar

                        </button>

                    </td>

                </tr>

            `;

        });

        document.querySelectorAll(".btnEditar").forEach(boton => {

            boton.addEventListener("click", async () => {

                sessionStorage.setItem(

                    "personajeEditar",

                    boton.dataset.id

                );

                await cargarVista("formulario-editar-personaje");

            });

        });

    }

    catch (error) {

        console.error(error);

    }

}