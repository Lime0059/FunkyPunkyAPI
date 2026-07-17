let imagenBase64 = null;

async function cargarDatosPersonaje() {

    try {

        const id = sessionStorage.getItem("personajeEditar");

        if (!id) {

            alert("No se seleccionó ningún personaje.");

            return;

        }

        const respuesta = await fetch(

            `http://localhost:3000/api/personajes/${id}`

        );

        if (!respuesta.ok) {

            throw new Error("No se pudo obtener el personaje.");

        }

        const personaje = await respuesta.json();

        document.getElementById("nombre").value =
            personaje.nombre;

        document.getElementById("sub_coleccion_id").value =
            personaje.sub_coleccion_id;

        document.getElementById("tipo_llavero_id").value =
            personaje.tipo_llavero_id;

        imagenBase64 = personaje.img_personaje;

        if (imagenBase64) {

            document.getElementById("previewImagen").src =

                `data:image/png;base64,${imagenBase64}`;

        }

    }

    catch (error) {

        console.error(error);

        alert("No fue posible cargar el personaje.");

    }

}

async function inicializarFormularioEditar() {

    await cargarDatosPersonaje();

    document
    .getElementById("img_personaje")
    .addEventListener("change", (e) => {

        const archivo = e.target.files[0];

        if (!archivo) return;

        const lector = new FileReader();

        lector.onload = () => {

            imagenBase64 = lector.result.split(",")[1];

            document.getElementById("previewImagen").src =
                lector.result;

        };

        lector.readAsDataURL(archivo);

    });

    document
    .getElementById("formEditarPersonaje")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        try {

            const id = sessionStorage.getItem("personajeEditar");

            const datos = {

                nombre:
                    document.getElementById("nombre").value,

                sub_coleccion_id:
                    document.getElementById("sub_coleccion_id").value,

                tipo_llavero_id:
                    document.getElementById("tipo_llavero_id").value,

                img_personaje: imagenBase64

            };

            const respuesta = await fetch(

                `http://localhost:3000/api/personajes/${id}`,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify(datos)

                }

            );

            const resultado = await respuesta.json();

            if (!respuesta.ok) {

                alert(resultado.mensaje);

                return;

            }

            alert(resultado.mensaje);

            sessionStorage.removeItem("personajeEditar");

            await cargarVista("editar-personaje");

        }

        catch (error) {

            console.error(error);

            alert("No fue posible actualizar el personaje.");

        }

    });

}