import { cursosApi } from "../../api/cursosApi";
import { getApiError } from "../../utils/getApiError";

export async function getDetalleCurso(id) {
  try {
    const response = await cursosApi.get(`/course/${id}`);

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
