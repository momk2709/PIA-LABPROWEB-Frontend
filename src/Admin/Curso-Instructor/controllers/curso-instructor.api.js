// Estas son las funciones que se comunican con el backend
import { id } from "date-fns/locale";
import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

// Esto es como lo que hacen en postman para probar las rutas
// Solo que aqui se hace con codigo
export async function getAllCursosInstructor() {
  try {
    const response = await cursosApi.get("/admin/asignacion/curso-instructor");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ELIMINAR
export async function deleteCourseInstructor({ curso_id, instructor_id }) {
  try {
    const response = await cursosApi.delete(
      `/admin/asignacion/curso-instructor`,
      {
        data: {
          curso_id,
          instructor_id,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
