document.addEventListener("DOMContentLoaded", async () => {

    const contenedor = document.getElementById("contenedorBienvenida");
    const sitio = document.getElementById("sitio");

    sitio.style.display = "none";

    if (localStorage.getItem("bienvenidaVista") === "true") {

        contenedor.style.display = "none";

        sitio.style.display = "block";

        await iniciarAplicacion();

        return;

    }

    try {

        const respuesta = await fetch("frontend/welcome.html");

        if (!respuesta.ok) {

            throw new Error("No se pudo cargar welcome.");

        }

        contenedor.innerHTML = await respuesta.text();

        const botones = contenedor.querySelectorAll(".bienvenida__enlace");

        botones.forEach(boton => {

            boton.onclick = async () => {

                const destino = boton.dataset.destino;

                if (destino === "entrar") {

                    localStorage.setItem("bienvenidaVista", "true");

                    contenedor.style.display = "none";

                    sitio.style.display = "block";

                    await iniciarAplicacion();

                }

                else if (destino === "login") {

                    localStorage.setItem("bienvenidaVista", "true");

                    window.location.href = "frontend/views/login.html";

                }

            };

        });

    }

    catch (error) {

        console.error(error);

        sitio.style.display = "block";

        await iniciarAplicacion();

    }

});