import { getDetalleInstructor } from "./instructor.api";
import { DatosInstructor } from "./instructor.components";

window.addEventListener("DOMContentLoaded", async () => {
    const queryParameters = new URLSearchParams(window.location.search);
    let instructorId = queryParameters.get("instructorId");

    if (!instructorId || instructorId === "" || instructorId === "null") {
        window.location.href = "../Curso/curso.html";
    }

    try {
        const response = await getDetalleInstructor(instructorId);

        const { instructor } = response.data;

        const datosInstructor = new DatosInstructor(
            instructor.nombre,
            instructor.imagenUrl,
            instructor.descripcion,
            instructor.email
        );

        datosInstructor.insertarEnContenedor("instructorContenedor");

    } catch (error) {
        console.error(error);
    }

});