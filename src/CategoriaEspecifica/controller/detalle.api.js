import { cursosApi } from "../../api/cursosApi";
import { getApiError } from "../../utils/getApiError";

export async function getCursosByGenre(id) {
  try {
    const response = await cursosApi.get(`/course/genres/${id}`);

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
