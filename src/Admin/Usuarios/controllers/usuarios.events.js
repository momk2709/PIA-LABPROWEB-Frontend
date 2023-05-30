import {
  getALLUsers,
  createUsers,
  deleteUser,
  updateUsers,
  asignarUsuario,
} from "./usuarios.api";

import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";

const editarUsuarioModal = document.getElementById("editar-usuario-modal");
const asignarUsuarioModal = document.getElementById("asignar-usuario-modal");
const passwordSwitch = document.getElementById("password-switch");
const editarPassword = document.getElementById("editar-usuario-password");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getALLUsers();
  const users = response.users.map((user) => {
    return [user.id, user.nombre, user.email, user.rol];
  });
  const usersTable = document.getElementById("user-table");
  const dataTable = new DataTable(usersTable, {
    data: users,
    columns: [
      { title: "ID" },
      { title: "Nombre" },
      { title: "Email" },
      { title: "Rol" },
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
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
    },
  });
  usersTable.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-warning")) {
      const id = e.target.getAttribute("data-id");

      const user = response.users.find((user) => user.id === Number(id));

      const nombre = document.getElementById("editar-usuario-nombre");
      const email = document.getElementById("editar-usuario-email");
      const rol = document.getElementById("editar-usuario-rol");

      nombre.value = user.nombre;
      email.value = user.email;
      rol.value = user.rol;

      editarUsuarioModal.dataset.id = id;
      editarUsuarioModal.dataset.nombre = user.nombre;
      editarUsuarioModal.dataset.email = user.email;
      editarUsuarioModal.dataset.rol = user.rol;

      $("#editar-usuario-modal").modal("show");
    }

    if (e.target.classList.contains("btn-danger")) {
      const id = e.target.getAttribute("data-id");

      Swal.fire({
        title: "¿Estas seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, bórralo",
        cancelButtonText: "No, cancelar",
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            await deleteUser(id);

            Swal.fire({
              title: "Usuario eliminado",
              text: `El usuario ${id} ha sido eliminado`,
              icon: "success",
              confirmButtonText: "Aceptar",
            }).then(() => {
              window.location.reload();
            });
          }
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
    }

    if (e.target.classList.contains("btn-primary")) {
      const id = e.target.getAttribute("data-id");

      const asignarUsuarioId = document.getElementById("asignar-usuario-id");

      asignarUsuarioId.value = id;

      $("#asignar-usuario-modal").modal("show");
    }
  });
});

const crearUsuarioForm = document.getElementById("crear-usuario-form");
const editarUsuarioForm = document.getElementById("editar-usuario-form");
const asignarUsuarioForm = document.getElementById("asignar-usuario-form");

crearUsuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("crear-usuario-nombre").value;
  const email = document.getElementById("crear-usuario-email").value;
  const password = document.getElementById("crear-usuario-password").value;
  const rol = document.getElementById("crear-usuario-rol").value;

  try {
    const response = await createUsers({ nombre, email, password, rol });

    $("#crear-usuario-modal").modal("hide");

    Swal.fire({
      title: "Usuario creado",
      text: `El usuario ${response.user.id} ha sido creado`,
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
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

editarUsuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let usuario;

  const id = editarUsuarioModal.dataset.id;
  const nombre = document.getElementById("editar-usuario-nombre").value;
  const email = document.getElementById("editar-usuario-email").value;
  const password = document.getElementById("editar-usuario-password").value;
  const rol = document.getElementById("editar-usuario-rol").value;

  if (passwordSwitch.checked) {
    usuario = { id, nombre, email, password, rol };
  } else {
    usuario = { id, nombre, email, rol };
  }

  try {
    const response = await updateUsers(usuario);
    $("#editar-usuario-modal").modal("hide");
    Swal.fire({
      title: "Usuario actualizado",
      text: `El usuario ${response.user.id} ha sido actualizado`,
      icon: "success",
    }).then(() => {
      editarPassword.value = "";
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

passwordSwitch.addEventListener("change", (e) => {
  if (passwordSwitch.checked) {
    editarPassword.disabled = false;
  } else {
    editarPassword.disabled = true;
  }
});

asignarUsuarioForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuarioId = Number(document.getElementById("asignar-usuario-id").value);
  const cursoId = Number(document.getElementById("asignar-curso-id").value);

  try {
    const response = await asignarUsuario({
      usuario_id: usuarioId,
      curso_id: cursoId,
    });

    $("#asignar-usuario-modal").modal("hide");

    Swal.fire({
      title: "Usuario asignado",
      text: `El usuario ${response.cursoUser.usuario_id} ha sido asignado al curso ${response.cursoUser.curso_id}`,
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      document.getElementById("asignar-curso-id").value = "";
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
