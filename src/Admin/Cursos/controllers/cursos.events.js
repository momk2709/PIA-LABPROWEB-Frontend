// Aqui se manejan los eventos de los cursos

// Estas son las funciones que se comunican con el backend
// Las definimos en otro archivo para que este archivo no se haga tan largo
import {
  getAllCursos,
  createCourse,
  updateCourse,
  deleteCourse,
} from "./cursos.api";

// Necesitamos los modales
const editarCursoModal = document.getElementById("editar-curso-modal");
const crearCursoModal = document.getElementById("crear-modal");

//Estas son librerias que nos facilitan el hacer las tablas y alertas

import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";
import format from "date-fns/format";

// Este es el evento que se ejecuta cuando se carga la pagina, Cada vez que se carga la pagina se ejecuta
document.addEventListener("DOMContentLoaded", async () => {
  //Aqui llamamos a nuestra funcion que se comunica con el backend para traer los datos de los cursos
  const response = await getAllCursos();

  const cursos = response.courses.map((curso) => {
    //Aqui se crea un arreglo con los datos que se van a mostrar en la tabla
    // SI TIENEN DUDA: Son las propiedades que te regrese el objeto de POSTMAN
    return [
      curso.id,
      curso.nombre,
      curso.descripcion,
      curso.precio,
      format(new Date(curso.fecha_inicio), "dd/MM/yyyy"),
      format(new Date(curso.fecha_fin), "dd/MM/yyyy"),
    ];
  });

  // AHORA SI tenemos que crear la tabla con los datos que ya traemos
  // Primero obtenemos el elemento de la tabla del html con el id
  const cursosTable = document.getElementById("cursos-table");

  //Aqui creamos la tabla con la libreria de DataTable

  const dataTable = new DataTable(cursosTable, {
    data: cursos,
    columns: [
      { title: "ID" },
      { title: "Nombre" },
      { title: "Descripcion" },
      { title: "Precio" },
      { title: "Fecha de Inicio" },
      { title: "Fecha de Fin" },

      // Aqui se crea la columna de acciones, pueden agregar mas si quieren
      // Son 2 botones, uno para editar y otro para eliminar
      {
        title: "Acciones",
        render: function (data, type, row) {
          return `
        <button class="btn btn-primary btn-sm" data-id="${row[0]}">
            EDITAR
        </button>
        <button class="btn btn-danger btn-sm" data-id="${row[0]}">
            ELIMINAR
        </button>
      `;
        },
      },
    ],

    // Aqui se le da estilo a la tabla
    // Este scrollX es para que se pueda hacer scroll horizontal y la pagina no se haga tan larga
    scrollX: true,

    // Aqui se cambia el lenguaje de la tabla a español
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
    },
  });

  // AHORA agregamos los eventos a la tabla (tiene 2) uno para editar y otro para eliminar

  cursosTable.addEventListener("click", async (e) => {
    // Aqui se verifica que el boton que se dio click tenga la clase de btn-primary (que es el de EDITAR)
    if (e.target.classList.contains("btn-primary")) {
      // Aqui se obtiene el id del curso que se va a editar
      const id = e.target.getAttribute("data-id");

      // Aqui encontramos los datos del curso que se va a editar

      const curso = response.courses.find((curso) => curso.id == id);

      // Aqui se abre el modal de editar y se llenan los campos con los datos del curso

      //Para hacer esto necesitamos todos los campos del modal
      const nombre = document.getElementById("editar-nombre");
      const descripcion = document.getElementById("editar-descripcion");
      const precio = document.getElementById("editar-precio");
      const fechaInicio = document.getElementById("editar-fecha-inicio");
      const fechaFin = document.getElementById("editar-fecha-fin");

      //Aqui se llenan los campos con los datos del curso
      editarCursoModal.dataset.id = id;
      nombre.value = curso.nombre;
      descripcion.value = curso.descripcion;
      precio.value = curso.precio;

      // En este caso las fechas se tienen que formatear para que se puedan mostrar en el input
      fechaInicio.value = format(new Date(curso.fecha_inicio), "yyyy-MM-dd");
      fechaFin.value = format(new Date(curso.fecha_fin), "yyyy-MM-dd");

      //Aqui se abre el modal
      $("#editar-curso-modal").modal("show");

      // MAS ABAJO AGREGAREMOS LOS EVENTOS PARA ACTUALIZAR EL CURSO
    }

    // Ahora pasamos a editar el boton de ELIMINAR
    if (e.target.classList.contains("btn-danger")) {
      // Aqui se obtiene el id del curso que se va a eliminar
      const id = e.target.getAttribute("data-id");

      // Aqui se muestra una alerta de confirmacion para eliminar el curso
      const result = await Swal.fire({
        title: "¿Estas seguro?",
        text: "¡No podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Si, eliminar!",
        cancelButtonText: "¡No, cancelar!",
        reverseButtons: true,
      });

      // Si el usuario da click en el boton de SI, se ejecuta el codigo de abajo
      if (result.isConfirmed) {
        // Aqui se manda el id del curso que se va a eliminar al backend
        // Aqui se puede usar la funcion que ya creamos para eliminar el curso
        // O pueden crear una nueva, como gusten

        // Aqui se muestra una alerta de que el curso se elimino correctamente
        try {
          await deleteCourse(id);

          Swal.fire(
            "¡Eliminado!",
            "El curso se elimino correctamente.",
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

// Ahora pasamos a agregar los eventos para actualizar Y crear un curso

// Primero obtenemos los formularios de editar y crear curso

// EDITAR
const editarCursoForm = document.getElementById("editar-curso-form");

// CREAR
const crearCursoForm = document.getElementById("crear-curso-form");

// Ahora agregamos los eventos para cuando se envie el formulario
editarCursoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // obtenemos los datos del formulario

  const id = editarCursoModal.dataset.id;
  const nombre = editarCursoForm["editar-nombre"].value;
  const descripcion = editarCursoForm["editar-descripcion"].value;
  const precio = Number(editarCursoForm["editar-precio"].value);
  const fechaInicio = new Date(editarCursoForm["editar-fecha-inicio"].value);
  const fechaFin = new Date(editarCursoForm["editar-fecha-fin"].value);

  // Aqui se verifica que la fecha de inicio sea menor a la fecha de fin
  if (fechaInicio > fechaFin) {
    // Aqui se muestra una alerta de error
    Swal.fire(
      "¡Error!",
      "La fecha de inicio no puede ser mayor a la fecha de fin",
      "error"
    );
    return;
  }

  // AHORA SI hacemos la peticion al backend para actualizar el curso

  try {
    const response = await updateCourse({
      id,
      nombre,
      descripcion,
      precio,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    });

    // Aqui se muestra una alerta de que el curso se actualizo correctamente
    Swal.fire(
      "¡Actualizado!",
      `El curso ${response.course.id} se actualizo correctamente`,
      "success"
    ).then(() => {
      // Aqui se cierra el modal
      $("#editar-curso-modal").modal("hide");

      // reiniciamos la pagina para que se actualice la tabla

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

crearCursoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = crearCursoForm["crear-nombre"].value;
  const descripcion = crearCursoForm["crear-descripcion"].value;
  const precio = Number(crearCursoForm["crear-precio"].value);
  const fechaInicio = new Date(crearCursoForm["crear-fecha-inicio"].value);
  const fechaFin = new Date(crearCursoForm["crear-fecha-fin"].value);

  // Aqui se verifica que la fecha de inicio sea menor a la fecha de fin
  if (fechaInicio > fechaFin) {
    // Aqui se muestra una alerta de error
    Swal.fire(
      "¡Error!",
      "La fecha de inicio no puede ser mayor a la fecha de fin",
      "error"
    );
    return;
  }

  // Aqui se hace la peticion al backend para crear el curso

  try {
    const response = await createCourse({
      nombre,
      descripcion,
      precio,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
    });

    // Aqui se muestra una alerta de que el curso se creo correctamente

    Swal.fire(
      "¡Creado!",
      `El curso ${response.course.id} se creo correctamente`,
      "success"
    ).then(() => {
      // Aqui se cierra el modal
      $("#crear-curso-modal").modal("hide");
      $("#crear-curso-form").trigger("reset");

      // reiniciamos la pagina para que se actualice la tabla

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
