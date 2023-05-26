import { CategoriaCard } from "./categorias.components";
import { getGeneros } from "./categorias.api";

const cursosContainer = document.getElementById("lstCategorias");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await getGeneros();

    const { categorias } = response.data;

    categorias.forEach((categoria) => {
      const categoriaCard = new CategoriaCard(
        `../CategoriaEspecifica/Cursos.html?genero=${categoria.id}`,
        categoria.nombre,
        categoria.descripcion
      );

      categoriaCard.insertarEnContenedor("lstCategorias");
    });
  } catch (error) {
    console.error(error);
  }
});
