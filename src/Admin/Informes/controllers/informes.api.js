import { id } from "date-fns/locale";
import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

export async function getAllInformes() {
  try {
    const response = await cursosApi.get("/admin/informes");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
