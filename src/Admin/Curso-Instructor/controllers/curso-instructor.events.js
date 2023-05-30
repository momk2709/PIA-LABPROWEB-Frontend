import {
  getAllCursosInstructor,
  deleteCourseInstructor,
} from "./curso-instructor.api";

import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";
import format from "date-fns/format";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllCursosInstructor();
  const cursosInstructor = response.cursoInstructor.map((cursoInstructor) => {
    return [
      cursoInstructor.instructor_id,
      cursoInstructor.curso_id,
      cursoInstructor.instructor,
      cursoInstructor.curso,
    ];
  });
  const cursoInstructorTable = document.getElementById(
    "curso-instructor-table"
  );
  const dataTable = new DataTable(cursoInstructorTable, {
    data: cursosInstructor,
    columns: [
      { title: "Instructor ID" },
      { title: "Curso ID" },
      { title: "Instructor" },
      { title: "Curso" },
      {
        title: "Acciones",
        render: function (data, type, row) {
          return ` <button class="btn btn-danger btn-sm" data-curso-id="${row[1]}" data-instructor-id="${row[0]}">
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
  cursoInstructorTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const curso_id = Number(e.target.getAttribute("data-curso-id"));
      const instructor_id = Number(e.target.getAttribute("data-instructor-id"));

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
          await deleteCourseInstructor({ curso_id, instructor_id });

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
