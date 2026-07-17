document.addEventListener("DOMContentLoaded", () => {
    inicializarNavegacionBienvenida();
});

function inicializarNavegacionBienvenida() {
    const enlacesNavegacion = document.querySelectorAll(".bienvenida__enlace");
    const cuerpoPantalla = document.querySelector(".pantalla-bienvenida");

    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener("click", (evento) => {
            const rutaDestino = evento.target.getAttribute("data-destino");
            
            if (rutaDestino) {
                cuerpoPantalla.style.opacity = "0";
                setTimeout(() => {
                    ejecutarRedireccion(rutaDestino);
                }, 500);
            }
        });
    });
}

/**
 * Cambia la ubicación física de la ventana del navegador
 * @param {string} url - Ruta de destino
 */
function ejecutarRedireccion(url) {
    window.location.href = url;
}