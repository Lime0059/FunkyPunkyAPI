function inicializarHeader() {

    const saludo = document.getElementById("saludo");

    if (!saludo) return;

    if (Auth.estaAutenticado()) {

        const usuario = Auth.obtenerUsuario();

        saludo.textContent = `¡Bienvenido, ${usuario.nombre}!`;

    }

    else {

        saludo.textContent = "¡Bienvenido!";

    }

    const botonSidebar = document.getElementById("btnSidebar");

    if (!botonSidebar) return;

    if (localStorage.getItem("sidebar") === "oculto") {

        document.body.classList.add("sidebarOculto");

    }

    botonSidebar.addEventListener("click", () => {

        document.body.classList.toggle("sidebarOculto");

        if (document.body.classList.contains("sidebarOculto")) {

            localStorage.setItem("sidebar", "oculto");

        }

        else {

            localStorage.setItem("sidebar", "visible");

        }

    });

}