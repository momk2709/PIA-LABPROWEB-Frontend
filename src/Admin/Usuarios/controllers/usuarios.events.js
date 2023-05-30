import {
  getALLUsers,
  createUsers,
  deleteUser,
  updateUsers,
} from "./usuarios.api";
const editarCursoModal = document.getElementById("editar-user-modal");
const crearCursoModal = document.getElementById("crear-modal");
import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";
document.addEventListener("DOMContentLoaded", async () => {
  const response = await getALLUsers();
  const user = response.users.map((users) => {
    return [
      users.id,
      users.nombre,
      users.email,
      users.rol,
    ];
  });
  const usersTable = document.getElementById("user-table");
  const dataTable = new DataTable(usersTable, {
    data: user,
    columns: [
      { title: "ID" },
      { title: "Nombre" },
      { title: "Email" },
      { title: "Rol" },
      {
        title: "Acciones",
        render: function (data, type, row) {
          return `
        <button class="btn btn-success btn-sm" data-id="${row[0]}">
            CREAR
        </button>
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
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
    },
  });
  usersTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-primary")) {

      const id = e.target.getAttribute("data-id");
      const user = response.users.find((user) => user.id == id);
      const nombre = document.getElementById("editar-nombre");
      const email = document.getElementById("editar-email");
      const rol = document.getElementById("editar-rol");

      editarUserModal.dataset.id = id;
      nombre.value = user.nombre;
      email.value = user.email;
      rol.value = rol.nombre;
      $("#editar-user-modal").modal("show");

    }
    if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");

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
        // Aqui se manda el id del curso que se va a eliminar al backend
        // Aqui se puede usar la funcion que ya creamos para eliminar el curso
        // O pueden crear una nueva, como gusten

        // Aqui se muestra una alerta de que el curso se elimino correctamente
        try {
          await deleteUser(id);

          Swal.fire(
            "¡Eliminado!",
            "El usuario se elimino correctamente.",
            "success"
          );

          // Aqui se actualiza la tabla para que ya no aparezca el curso eliminado

          dataTable.row(e.target.parentElement.parentElement).remove().draw();
        } catch (error) {
          // ESTE MENSAJE SE UTILIZA EN TODOS LOS CATCH DE ESTE ARCHIVO
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


// EDITAR
const editarUserForm = document.getElementById("editar-user-form");

// CREAR
const crearUserForm = document.getElementById("crear-user-form");
editarUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = editarUserModal.dataset.id;
  const nombre = editarUserForm["editar-nombre"].value;
  const email = editarUserForm["editar-email"].value;
  const rol = editarUserForm["editar-rol"].value;

  try {
    const response = await updateUsers({
      id,
      nombre,
      email,
      rol,
    });
    Swal.fire(
      "¡Actualizado!",
      `El usuario ${response.users.id} se actualizó correctamente`,
      "success"
    ).then(() => {
      $("#editar-users-modal").modal("hide");
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

crearUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = crearUserForm["crear-nombre"].value;
  const email = crearUserForm["crear-email"].value;
  const rol = crearUserForm["crear-rol"].value;

  try {
    const response = await createUsers({
      nombre,
      email,
      rol,
    });

    Swal.fire(
      "¡Creado!",
      `El usuario ${response.users.id} se creó correctamente`,
      "success"
    ).then(() => {
      $("#crear-user-modal").modal("hide");
      $("#crear-user-modal").trigger("reset");
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


