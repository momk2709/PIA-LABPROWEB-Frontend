import { getAllCursosUsuario, deleteCourseUsuario } from "./curso-usuario.api";
import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";
import format from "date-fns/format";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllCursosUsuario();
  const cursoUsuario = response.cursoUser.map((cursoUser) => {
    return [
      cursoUser.usuario_id,
      cursoUser.curso_id,
      cursoUser.usuario,
      cursoUser.curso,
    ];
  });
  const cursoUsuarioTable = document.getElementById("curso-usuario-table");
  const dataTable = new DataTable(cursoUsuarioTable, {
    data: cursoUsuario,
    columns: [
      { title: "Usuario ID" },
      { title: "Curso ID" },
      { title: "Usuario" },
      { title: "Curso" },
      {
        title: "Acciones",
        render: function (data, type, row) {
          return ` <button class="btn btn-danger btn-sm" data-curso-id="${row[1]}" data-usuario-id="${row[0]}">
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
  cursoUsuarioTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const curso_id = Number(e.target.getAttribute("data-curso-id"));
      const usuario_id = Number(e.target.getAttribute("data-usuario-id"));
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
          await deleteCourseUsuario({ curso_id, usuario_id });

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
