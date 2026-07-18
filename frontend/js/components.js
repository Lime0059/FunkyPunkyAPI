async function cargarComponente(idContenedor, rutaArchivo) {

    try {

        const respuesta = await fetch(rutaArchivo);

        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar ${rutaArchivo}`);
        }

        const contenido = await respuesta.text();

        document.getElementById(idContenedor).innerHTML = contenido;

    } catch (error) {

        console.error(error);

    }

}

document.addEventListener("DOMContentLoaded", async () => {

    await cargarComponente("sidebar", "frontend/components/sidebar.html");

    await cargarComponente("header", "frontend/components/header.html");

    await cargarComponente("footer", "frontend/components/footer.html");

    inicializarSidebar();
    inicializarHeader();
    inicializarRouter();

});