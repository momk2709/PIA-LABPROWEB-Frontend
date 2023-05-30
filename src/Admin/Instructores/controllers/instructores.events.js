import {
  getAllInstructores,
  createInstructor,
  deleteInstructor,
  updateInstructor,
  asignarInstructor,
} from "./instructores.api";

import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";

const editarInstructorModal = document.getElementById(
  "editar-instructor-modal"
);
const crearInstructorModal = document.getElementById("crear-instructor-modal");
const asignarInstructorModal = document.getElementById(
  "asignar-instructor-modal"
);

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllInstructores();

  const instructores = response.instructores.map((instructor) => {
    return [
      instructor.id,
      instructor.nombre,
      instructor.email,
      instructor.descripcion,
      instructor.telefono,
      instructor.imagenUrl,
    ];
  });

  const instructoresTable = document.getElementById("instructores-table");

  const dataTable = new DataTable(instructoresTable, {
    data: instructores,
    columns: [
      { title: "ID" },
      { title: "Nombre" },
      { title: "Email" },
      { title: "Descripcion", width: "30%" },
      { title: "Telefono" },
      { title: "Imagen" },
      {
        title: "Acciones",
        render: function (data, type, row) {
          return `
            <button class="btn btn-warning btn-sm" data-id="${row[0]}">
                EDITAR
            </button>
            <button class="btn btn-danger btn-sm" data-id="${row[0]}">
                ELIMINAR
            </button>
            <button class="btn btn-primary btn-sm" data-id="${row[0]}">
                ASIGNAR
            </button>
        `;
        },
      },
    ],

    scrollX: true,
    scrollY: "50vh",
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
    },
  });

  instructoresTable.addEventListener("click", async (e) => {
    // EDITAR INSTRUCTOR

    if (e.target.classList.contains("btn-warning")) {
      const id = e.target.getAttribute("data-id");

      const instructor = response.instructores.find(
        (instructor) => instructor.id === Number(id)
      );

      const nombre = document.getElementById("editar-instructor-nombre");
      const email = document.getElementById("editar-instructor-email");
      const descripcion = document.getElementById(
        "editar-instructor-descripcion"
      );
      const telefono = document.getElementById("editar-instructor-telefono");
      const imagenUrl = document.getElementById("editar-instructor-imagen");

      nombre.value = instructor.nombre;
      email.value = instructor.email;
      descripcion.value = instructor.descripcion;
      telefono.value = instructor.telefono;
      imagenUrl.value = instructor.imagenUrl;

      editarInstructorModal.dataset.id = id;
      editarInstructorModal.dataset.nombre = instructor.nombre;
      editarInstructorModal.dataset.email = instructor.email;
      editarInstructorModal.dataset.descripcion = instructor.descripcion;
      editarInstructorModal.dataset.telefono = instructor.telefono;
      editarInstructorModal.dataset.imagenUrl = instructor.imagenUrl;

      $("#editar-instructor-modal").modal("show");
    }

    // ELIMINAR INSTRUCTOR

    if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");

      const result = await Swal.fire({
        title: "¿Estas seguro?",
        text: "¡No podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        try {
          await deleteInstructor(id);

          Swal.fire("Eliminado", "El instructor ha sido eliminado", "success");

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

    // ASIGNAR INSTRUCTOR

    if (e.target.classList.contains("btn-primary")) {
      const id = e.target.getAttribute("data-id");

      const asignarInstructorId = document.getElementById(
        "asignar-instructor-id"
      );

      asignarInstructorId.value = id;

      $("#asignar-instructor-modal").modal("show");
    }
  });
});

const crearInstructorForm = document.getElementById("crear-instructor-form");
const editarInstructorForm = document.getElementById("editar-instructor-form");
const asignarInstructorForm = document.getElementById(
  "asignar-instructor-form"
);

// CREAR INSTRUCTOR
crearInstructorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("crear-instructor-nombre").value;
  const email = document.getElementById("crear-instructor-email").value;
  const descripcion = document.getElementById(
    "crear-instructor-descripcion"
  ).value;
  const telefono = document.getElementById("crear-instructor-telefono").value;
  const imagenUrl = document.getElementById("crear-instructor-imagen").value;

  const instructor = {
    nombre,
    email,
    descripcion,
    telefono,
    imagenUrl,
  };

  try {
    const response = await createInstructor(instructor);

    $("#crear-instructor-modal").modal("hide");
    Swal.fire({
      title: "Creado",
      text: `El instructor ${response.instructor.id} ha sido creado`,
      icon: "success",
    }).then(() => {
      crearInstructorForm.reset();
      window.location.reload();
    });
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
});

// EDITAR INSTRUCTOR
editarInstructorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = Number(editarInstructorModal.dataset.id);
  const nombre = document.getElementById("editar-instructor-nombre").value;
  const email = document.getElementById("editar-instructor-email").value;
  const descripcion = document.getElementById(
    "editar-instructor-descripcion"
  ).value;
  const telefono = document.getElementById("editar-instructor-telefono").value;
  const imagenUrl = document.getElementById("editar-instructor-imagen").value;

  const instructor = {
    id,
    nombre,
    email,
    descripcion,
    telefono,
    imagenUrl,
  };

  try {
    const response = await updateInstructor(instructor);

    $("#editar-instructor-modal").modal("hide");

    Swal.fire({
      title: "Actualizado",
      text: `El instructor ${response.instructor.id} ha sido actualizado`,
      icon: "success",
    }).then(() => {
      editarInstructorForm.reset();
      window.location.reload();
    });
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
});

// ASIGNAR INSTRUCTOR
asignarInstructorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const instructor_id = Number(
    document.getElementById("asignar-instructor-id").value
  );

  const curso_id = Number(document.getElementById("asignar-curso-id").value);

  try {
    const response = await asignarInstructor({ curso_id, instructor_id });

    $("#asignar-instructor-modal").modal("hide");

    Swal.fire({
      title: "Asignado",
      text: `El instructor ${response.cursoInstructor.instructor_id} ha sido asignado al curso ${response.cursoInstructor.curso_id}`,
      icon: "success",
    }).then(() => {
      asignarInstructorForm.reset();
      window.location.reload();
    });
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
});
