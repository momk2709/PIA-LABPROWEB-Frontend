// Estas son las funciones que se comunican con el backend
import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

// Esto es como lo que hacen en postman para probar las rutas
// Solo que aqui se hace con codigo
export async function getAllCategorias() {
  try {
    const response = await cursosApi.get("/admin/categories");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ESTE ES EL ENDPOINT PARA CREAR UNA CATEGORIA, como pueden ver le pasamos los datos que necesitamos
// los datos los pueden encontrar en el POSTMAN
export async function createCategories({ nombre, descripcion, imagenUrl }) {
  try {
    const response = await cursosApi.post("/admin/categories", {
      nombre,
      descripcion,
      imagenUrl,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ESTE ES EL ENDPOINT PARA ACTUALIZAR UNA CATEGORIA, como pueden ver le pasamos los datos que necesitamos
// los datos los pueden encontrar en el POSTMAN

// Aqui le pasamos el id del curso que se va a actualizar y los datos que se van a actualizar

// En este caso no se actualiza el id, pero si se actualiza el nombre, descripcion, precio, fecha_inicio y fecha_fin
// ACTUALIZAR
export async function updateCategories({ id, nombre, descripcion, imagenUrl }) {
  try {
    const response = await cursosApi.put(`/admin/categories/${id}`, {
      nombre,
      descripcion,
      imagenUrl,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ELIMINAR
export async function deleteCategories(id) {
  try {
    const response = await cursosApi.delete(`/admin/categories/${id}`);

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function asignarCategoria({ categoria_id, curso_id }) {
  try {
    const response = await cursosApi.post(`/admin/asignacion/curso-category`, {
      categoria_id,
      curso_id,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
