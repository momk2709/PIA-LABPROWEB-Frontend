import { getDetalleCurso } from "./curso.api";
import {
  DatosInstructor,
  DatosCurso,
  DescripcionComponente,
} from "./curso.components";

window.addEventListener("DOMContentLoaded", async () => {
  const queryParameters = new URLSearchParams(window.location.search);
  let cursoId = queryParameters.get("cursoId");

  if (!cursoId || cursoId === "" || cursoId === "null") {
    window.location.href = "../CategoriasCursos/categoriasCursos.html";
  }

  try {
    const response = await getDetalleCurso(cursoId);

    const { curso, instructores } = response.data;

    const datosCurso = new DatosCurso(
      curso.nombre,
      curso.fecha_inicio,
      curso.fecha_fin,
      curso.precio,
      curso.imagenUrl
    );

    datosCurso.insertarEnContenedor("datosContenedor");

    const descripcion = new DescripcionComponente(curso.descripcion);

    descripcion.insertarEnContenedor("descripcionContenedor");

    instructores.forEach((instructor) => {
      const datosInstructor = new DatosInstructor(
        instructor.nombre,
        instructor.imagenUrl,
        instructor.descripcion,
        "../Curso/instructor/instructor.html?instructorId=" + instructor.id,
        instructor.email
      );

      datosInstructor.insertarEnContenedor("instructorContenedor");
    });
  } catch (error) {
    console.error(error);
  }
});
