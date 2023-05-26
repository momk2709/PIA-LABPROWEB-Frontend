import {
  ComponenteCursoInformacion,
  ComponenteCursoLink,
} from "./detalle.components";
import { getCursosByGenre } from "./detalle.api";

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

    cursos.forEach((curso) => {
      let cursoLink = new ComponenteCursoLink(
        curso.nombre,
        curso.fechaInicio,
        curso.fechaFin,
        `../CategoriaEspecifica/Cursos.html?genero=${categoria.id}`
      );

      cursoLink.insertarEnContenedor("lstCursos");
    });
  } catch (error) {
    console.error(error);
  }
});
