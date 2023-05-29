// Estas son las funciones que se comunican con el backend
import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

// Esto es como lo que hacen en postman para probar las rutas
// Solo que aqui se hace con codigo
export async function getAllCursos() {
  try {
    const response = await cursosApi.get("/admin/course");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ESTE ES EL ENDPOINT PARA CREAR UN CURSO, como pueden ver le pasamos los datos que necesitamos
// los datos los pueden encontrar en el POSTMAN
export async function createCourse({
  nombre,
  descripcion,
  precio,
  fecha_inicio,
  fecha_fin,
}) {
  try {
    const response = await cursosApi.post("/admin/course", {
      nombre,
      descripcion,
      precio,
      fecha_inicio,
      fecha_fin,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ESTE ES EL ENDPOINT PARA ACTUALIZAR UN CURSO, como pueden ver le pasamos los datos que necesitamos
// los datos los pueden encontrar en el POSTMAN

// Aqui le pasamos el id del curso que se va a actualizar y los datos que se van a actualizar

// En este caso no se actualiza el id, pero si se actualiza el nombre, descripcion, precio, fecha_inicio y fecha_fin

export async function updateCourse({
  id,
  nombre,
  descripcion,
  precio,
  fecha_inicio,
  fecha_fin,
}) {
  try {
    const response = await cursosApi.put(`/admin/course/${id}`, {
      nombre,
      descripcion,
      precio,
      fecha_inicio,
      fecha_fin,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function deleteCourse(id) {
  try {
    const response = await cursosApi.delete(`/admin/course/${id}`);

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
