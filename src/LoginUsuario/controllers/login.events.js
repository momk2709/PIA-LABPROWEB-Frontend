import { login } from "./login.api";

const loginForm = document.getElementById("login-form");
const errorContainer = document.getElementById("error-container");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await login({ email, password });

    const { token } = response.data;

    window.localStorage.setItem("token", token);

    alert("Usuario logueado correctamente");

    window.location.href = "../../UsuarioHome/Usuario.html";
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
