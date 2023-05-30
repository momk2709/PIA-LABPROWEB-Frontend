// Aqui se manejan los eventos de las categorias

// Estas son las funciones que se comunican con el backend
// Las definimos en otro archivo para que este archivo no se haga tan largo
import {
    getAllCategorias,
    createCategories,
    updateCategories,
    deleteCategories,
} from "./categorias.api";

// Necesitamos los modales, RECUERDEN SUS IDS
const editarCategoriaModal = document.getElementById("editar-categoria-modal");
const crearCategoriaModal = document.getElementById("modal-crear");

//Estas son librerias que nos facilitan el hacer las tablas y alertas

import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";
import format from "date-fns/format";

// Este es el evento que se ejecuta cuando se carga la pagina, Cada vez que se carga la pagina se ejecuta
document.addEventListener("DOMContentLoaded", async () => {
    //Aqui llamamos a nuestra funcion que se comunica con el backend para traer los datos de los cursos
    const response = await getAllCategorias();

    const categorias = response.categories.map((categoria) => {
        //Aqui se crea un arreglo con los datos que se van a mostrar en la tabla
        // SI TIENEN DUDA: Son las propiedades que te regrese el objeto de POSTMAN
        return [
            categoria.id,
            categoria.nombre,
            categoria.descripcion,
            categoria.imagenUrl,
        ];
    });

    // AHORA SI tenemos que crear la tabla con los datos que ya traemos
    // Primero obtenemos el elemento de la tabla del html con el id
    const categoriasTable = document.getElementById("categorias-table");

    //Aqui creamos la tabla con la libreria de DataTable

    const dataTable = new DataTable(categoriasTable, {
        data: categorias,
        columns: [
            { title: "ID" },
            { title: "Nombre" },
            { title: "Descripcion" },
            { title: "ImagenUrl" },
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

    categoriasTable.addEventListener("click", async (e) => {
        // Aqui se verifica que el boton que se dio click tenga la clase de btn-primary (que es el de EDITAR)
        if (e.target.classList.contains("btn-primary")) {
            // Aqui se obtiene el id del curso que se va a editar
            const id = e.target.getAttribute("data-id");

            // Aqui encontramos los datos del curso que se va a editar

            const categoria = response.categories.find((categoria) => categoria.id == id);

            // Aqui se abre el modal de editar y se llenan los campos con los datos del curso

            //Para hacer esto necesitamos todos los campos del modal
            const nombre = document.getElementById("editar-nombre");
            const descripcion = document.getElementById("editar-descripcion");
            const imagenUrl = document.getElementById("editar-imagen");

            //Aqui se llenan los campos con los datos del curso
            editarCategoriaModal.dataset.id = id;
            nombre.value = categoria.nombre;
            descripcion.value = categoria.descripcion;
            imagenUrl.value = categoria.imagenUrl;

            //Aqui se abre el modal
            $("#editar-categoria-modal").modal("show");

            // MAS ABAJO AGREGAREMOS LOS EVENTOS PARA ACTUALIZAR LAS CATEGORIAS
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
                    await deleteCategories(id);

                    Swal.fire(
                        "¡Eliminado!",
                        "El curso se elimino correctamente.",
                        "success"
                    );

                    // Aqui se actualiza la tabla para que ya no aparezca la categoria eliminada

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

//Ahora pasamos a agregar los eventos para actualizar Y crear un curso

// Primero obtenemos los formularios de editar y crear una categoria

// EDITAR
const editarCategoriaForm = document.getElementById("editar-categoria-form");

// CREAR
const crearCategoriaForm = document.getElementById("crear-categoria-form");

// Ahora agregamos los eventos para cuando se envie el formulario
editarCategoriaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // obtenemos los datos del formulario

    const id = editarCategoriaModal.dataset.id;
    const nombre = editarCategoriaForm["editar-nombre"].value;
    const descripcion = editarCategoriaForm["editar-descripcion"].value;
    const imagenUrl = editarCategoriaForm["editar-imagen"].value;

    // AHORA SI hacemos la peticion al backend para actualizar el curso

    try {
        const response = await updateCategories({
            id,
            nombre,
            descripcion,
            imagenUrl,
        });

        // Aqui se muestra una alerta de que el curso se actualizo correctamente
        Swal.fire(
            "¡Actualizado!",
            `El curso ${response.categories.id} se actualizo correctamente`,
            "success"
        ).then(() => {
            // Aqui se cierra el modal
            $("#editar-categoria-modal").modal("hide");

            // reiniciamos la pagina para que se actualice la tabla

            window.location.reload();
        });
    } catch (error) {
        // ESTE PEDAZO SE COPIA Y PEGA EN TODAS
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

        //
    }
});

crearCategoriaForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = crearCategoriaForm["crear-nombre"].value;
    const descripcion = crearCategoriaForm["crear-descripcion"].value;
    const imagenUrl = crearCategoriaForm["crear-imagen"].value;

    // Aqui se hace la peticion al backend para crear el curso

    try {
        const response = await createCategories({
            nombre,
            descripcion,
            imagenUrl,
        });

        // Aqui se muestra una alerta de que el curso se creo correctamente

        Swal.fire(
            "¡Creado!",
            `El curso ${response.categories.id} se creo correctamente`,
            "success"
        ).then(() => {
            // Aqui se cierra el modal
            $("#crear-categoria-modal").modal("hide");
            $("#crear-categoria-form").trigger("reset");

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