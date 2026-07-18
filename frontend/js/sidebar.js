function inicializarSidebar() {

    const btnLogin = document.getElementById("btnLogin");
    const btnPerfil = document.getElementById("btnPerfil");
    const btnMiColeccion = document.getElementById("btnMiColeccion");
    const btnAdmin = document.getElementById("btnAdmin");
    const btnLogout = document.getElementById("btnLogout");

    if (Auth.estaAutenticado()) {

        btnLogin.style.display = "none";

        btnPerfil.style.display = "none";

        btnMiColeccion.style.display = "none";

        btnLogout.style.display = "flex";

        if (Auth.esAdministrador()) {

            btnAdmin.style.display = "flex";

        }

        else {

            btnAdmin.style.display = "none";

        }

    }

    else {

        btnLogin.style.display = "flex";

        btnPerfil.style.display = "none";

        btnMiColeccion.style.display = "none";

        btnAdmin.style.display = "none";

        btnLogout.style.display = "none";

    }

    btnLogout.addEventListener("click", (e) => {

        e.preventDefault();

        Auth.cerrarSesion();

    });

}