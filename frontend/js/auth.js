const Auth = {

    obtenerToken() {

        return localStorage.getItem("token");

    },

    guardarToken(token) {

        localStorage.setItem("token", token);

    },

    eliminarToken() {

        localStorage.removeItem("token");

    },

    guardarUsuario(usuario) {

        localStorage.setItem("usuario", JSON.stringify(usuario));

    },

    obtenerUsuario() {

        const usuario = localStorage.getItem("usuario");

        return usuario ? JSON.parse(usuario) : null;

    },

    eliminarUsuario() {

        localStorage.removeItem("usuario");

    },

    estaAutenticado() {

        return this.obtenerToken() !== null;

    },

    verificarSesion() {

        return this.estaAutenticado();

    },

    cerrarSesion() {

        this.eliminarToken();

        this.eliminarUsuario();

        window.location.href = "index.html";

    },

    esAdministrador() {

        const usuario = this.obtenerUsuario();

        return usuario && usuario.esAdmin;

    }

};