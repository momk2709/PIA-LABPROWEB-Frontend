import { getApiError } from "../../utils/getApiError";
import { cursosApi } from "../../api/cursosApi";

export async function getGeneros() {
  try {
    const response = await cursosApi.get("/course/genres");

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
