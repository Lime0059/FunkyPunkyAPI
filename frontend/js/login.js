const formulario = document.getElementById("formLogin");

const btnMostrarPassword = document.getElementById("btnMostrarPassword");

const inputPassword = document.getElementById("password");

const iconoPassword = document.getElementById("iconoPassword");

/* ========================= */
/* Ocultar Paswrd */
/* ========================= */

if (btnMostrarPassword && inputPassword) {

    btnMostrarPassword.addEventListener("click", () => {

        if (inputPassword.type === "password") {

            inputPassword.type = "text";

            iconoPassword.src = "../img/icons/hide.png";

        }

        else {

            inputPassword.type = "password";

            iconoPassword.src = "../img/icons/show.png";

        }

    });

}

/* ========================= */
/* Login */
/* ========================= */

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const correo = document.getElementById("correo").value;

    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch(

            "http://localhost:3000/api/auth/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    correo,
                    password

                })

            }

        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {

            alert(datos.mensaje);

            return;

        }

        Auth.guardarToken(datos.token);

        Auth.guardarUsuario(datos.usuario);

        console.log("Voy al index");

        window.location.href = "../../";

    }

    catch (error) {

        console.error(error);

        alert("No fue posible conectar con el servidor.");

    }

});