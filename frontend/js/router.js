async function cargarVista(vista) {

    try {

        const respuesta = await fetch(`views/${vista}.html`);

        if (!respuesta.ok) {

            throw new Error(`No se pudo cargar la vista ${vista}`);

        }

        const contenido = await respuesta.text();

        document.getElementById("contenido").innerHTML = contenido;

        activarMenu();

        if (vista === "personajes") {

            inicializarFiltros();

            await cargarPersonajes();

        }

        if (vista === "colecciones") {

            await cargarColecciones();

        }

        if(vista==="detalle-coleccion"){

            await cargarDetalleColeccion();

        }

        if (vista === "agregar-personaje") {

            await inicializarFormulario();

        }

        if (vista === "delete-personaje") {

            await cargarPersonajesEliminar();

        }

    }

    catch (error) {

        console.error(error);

    }

}

function activarMenu() {

    const menuItems = document.querySelectorAll(".menu-item[data-view]");

    menuItems.forEach(item => {

        item.onclick = async (e) => {

            const vista = item.dataset.view;

            // Los enlaces normales (Login, etc.) no usan el router
            if (!vista) {

                return;

            }

            e.preventDefault();

            if (
                (vista === "perfil" || vista === "mi-coleccion")
                && !Auth.estaAutenticado()
            ) {

                window.location.href = "views/login.html";

                return;

            }

            if (
                (
                    vista === "admin" ||
                    vista === "agregar-personaje" ||
                    vista === "delete-personaje"
                )
                && !Auth.esAdministrador()
            ) {

                await cargarVista("inicio");

                document
                    .querySelector('[data-view="inicio"]')
                    ?.classList.add("activo");

                return;

            }

            menuItems.forEach(opcion =>
                opcion.classList.remove("activo")
            );

            item.classList.add("activo");

            await cargarVista(vista);

        };

    });

}

function inicializarRouter() {

    activarMenu();

    cargarVista("inicio");

}