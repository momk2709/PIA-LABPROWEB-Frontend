import { register } from "./register.api";

const registerForm = document.getElementById("register-form");
const errorContainer = document.getElementById("error-container");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation = document.getElementById(
    "passwordConfirmation"
  ).value;

  try {
    const response = await register({
      nombre,
      email,
      password,
      passwordConfirmation,
    });

    alert("Usuario registrado correctamente");

    window.location.href = "../../LoginUsuario/Login.html"
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.data.map((error) => {
        return `<li>${error.msg}</li>`;
      });

      errorContainer.innerHTML = errorMessages.join("");
    } else {
      errorContainer.innerHTML = error.message;
    }
  }
});
