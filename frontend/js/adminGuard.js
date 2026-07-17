const token = localStorage.getItem("token");
const usuario = JSON.parse(localStorage.getItem("usuario"));

if (!Auth.estaAutenticado()) {

    window.location.href = "login.html";

}

if (!Auth.esAdministrador()) {

    window.location.href = "../index.html";

}