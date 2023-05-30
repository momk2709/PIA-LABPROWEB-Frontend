import { id } from "date-fns/locale";
import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

export async function getAllCursosUsuario() {
  try {
    const response = await cursosApi.get("/admin/asignacion/curso-user");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

// ELIMINAR
export async function deleteCourseUsuario({ usuario_id, curso_id }) {
  try {
    const response = await cursosApi.delete(`/admin/asignacion/curso-user`, {
      data: {
        usuario_id,
        curso_id,
      },
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
