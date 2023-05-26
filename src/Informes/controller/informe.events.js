import { registrarInforme } from "./informe.api";

const informeForm = document.getElementById("form-informe");
const errorContainer = document.getElementById("error-container");

informeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("name").value;
  const telefono = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("message").value;

  try {
    const response = await registrarInforme({
      nombre,
      telefono,
      email,
      mensaje,
    });

    alert("informe enviado con exito!");

    informeForm.reset();
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
