import {
  getAllCursosCategoria,
  deleteCourseCategoria,
} from "./curso-categoria.api";
import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";
import format from "date-fns/format";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllCursosCategoria();
  const cursoCategoria = response.cursoCategory.map((cursoCategory) => {
    return [
      cursoCategory.categoria_id,
      cursoCategory.curso_id,
      cursoCategory.categoria,
      cursoCategory.curso,
    ];
  });
  const cursoCategoriaTable = document.getElementById("curso-categoria-table");
  const dataTable = new DataTable(cursoCategoriaTable, {
    data: cursoCategoria,
    columns: [
      { title: "Categoria ID" },
      { title: "Curso ID" },
      { title: "Categoria" },
      { title: "Curso" },
      {
        title: "Acciones",
        render: function (data, type, row) {
          return ` <button class="btn btn-danger btn-sm" data-curso-id="${row[1]}" data-categoria-id="${row[0]}">
        ELIMINAR
    </button>
  `;
        },
      },
    ],
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
    },
  });
  cursoCategoriaTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const categoria_id = Number(e.target.getAttribute("data-categoria-id"));
      const curso_id = Number(e.target.getAttribute("data-curso-id"));
      const result = await Swal.fire({
        title: "¿Estas seguro?",
        text: "¡No podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Si, eliminar!",
        cancelButtonText: "¡No, cancelar!",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        try {
          await deleteCourseCategoria({ categoria_id, curso_id });

          Swal.fire(
            "¡Eliminado!",
            "El curso se elimino correctamente.",
            "success"
          );

          dataTable.row(e.target.parentElement.parentElement).remove().draw();
        } catch (error) {
          if (error.name === "ValidationError") {
            const errorMessages = error.data.map((error) => {
              return `<li>${error.msg}</li>`;
            });
            Swal.fire({
              title: "Validation Error",
              html: `<ul>${errorMessages.join("")}</ul>`,
              icon: "error",
            });
          } else {
            Swal.fire("Error", error.message, "error");
          }
        }
      }
    }
  });
});
