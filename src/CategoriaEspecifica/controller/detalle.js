import {
  ComponenteCursoInformacion,
  ComponenteCursoLink,
} from "./detalle.components";
import { getCursosByGenre } from "./detalle.api";
import { format } from "date-fns";

const cursosContainer = document.getElementById("lstCursos");
const cursoInformation = document.getElementById("information-container");

window.addEventListener("DOMContentLoaded", async () => {
  const queryParameters = new URLSearchParams(window.location.search);
  let genero = queryParameters.get("genero");

  if (!genero || genero === "" || genero === "null") {
    window.location.href = "../CategoriasCursos/categoriasCursos.html";
  }

  try {
    const response = await getCursosByGenre(genero);

    const { categoria, cursos } = response.data;

    const cursoInfo = new ComponenteCursoInformacion(
      categoria.nombre,
      categoria.descripcion,
      categoria.imagenUrl
    );

    cursoInfo.insertarEnContenedor("information-container");

    cursos.forEach((curso) => {
      let cursoLink = new ComponenteCursoLink(
        curso.nombre,
        format(new Date(curso.fechaInicio), "MMMM d, yyyy"),
        format(new Date(curso.fechaFin), "MMMM d, yyyy"),
        `../Curso/curso.html?cursoId=${curso.id}`
      );

      cursoLink.insertarEnContenedor("lstCursos");
    });
  } catch (error) {
    console.error(error);
  }
});
