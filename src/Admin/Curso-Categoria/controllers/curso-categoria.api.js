import { id } from "date-fns/locale";
import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

export async function getAllCursosCategoria() {
  try {
    const response = await cursosApi.get("/admin/asignacion/curso-category");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ELIMINAR
export async function deleteCourseCategoria({ categoria_id, curso_id }) {
  try {
    const response = await cursosApi.delete(
      `/admin/asignacion/curso-category`,
      {
        data: {
          categoria_id,
          curso_id,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
