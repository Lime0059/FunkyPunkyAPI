async function convertirBase64(archivo) {

    return new Promise((resolve, reject) => {

        const lector = new FileReader();

        lector.readAsDataURL(archivo);

        lector.onload = () => {

            const base64 = lector.result.split(",")[1];

            resolve(base64);

        };

        lector.onerror = error => reject(error);

    });

}

async function cargarSubColecciones() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/subcolecciones");

        const subColecciones = await respuesta.json();

        const select = document.getElementById("sub_coleccion_id");

        select.innerHTML = '<option value="">Seleccione una subcolección</option>';

        subColecciones.forEach(subColeccion => {

            const option = document.createElement("option");

            option.value = subColeccion.id;

            option.textContent = subColeccion.nombre;

            select.appendChild(option);

        });

    }

    catch (error) {

        console.error(error);

    }

}

async function cargarTiposLlavero() {

    try {

        const respuesta = await fetch("http://localhost:3000/api/tipo-llaveros");

        const tipos = await respuesta.json();

        const select = document.getElementById("tipo_llavero_id");

        select.innerHTML = '<option value="">Seleccione un tipo de llavero</option>';

        tipos.forEach(tipo => {

            const option = document.createElement("option");

            option.value = tipo.id;

            option.textContent = tipo.nombre;

            select.appendChild(option);

        });

    }

    catch (error) {

        console.error(error);

    }

}

async function inicializarFormulario() {

    await cargarSubColecciones();

    await cargarTiposLlavero();

    const formulario = document.getElementById("formAgregarPersonaje");

    formulario.addEventListener("submit", enviarFormulario);

}

async function enviarFormulario(e) {

    e.preventDefault();

    const formulario = document.getElementById("formAgregarPersonaje");

    const nombre = document.getElementById("nombre").value;

    const sub_coleccion_id = document.getElementById("sub_coleccion_id").value;

    const tipo_llavero_id = document.getElementById("tipo_llavero_id").value;

    const archivo = document.getElementById("img_personaje").files[0];

    try {

        const img_personaje = await convertirBase64(archivo);

        const respuesta = await fetch(
            "http://localhost:3000/api/personajes",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    nombre,
                    sub_coleccion_id,
                    tipo_llavero_id,
                    img_personaje

                })

            }

        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            alert(datos.mensaje);

            return;

        }

        alert("Personaje agregado correctamente.");

        formulario.reset();

        await cargarSubColecciones();

        await cargarTiposLlavero();

    }

    catch (error) {

        console.error(error);

        alert("No fue posible conectar con el servidor.");

    }

}