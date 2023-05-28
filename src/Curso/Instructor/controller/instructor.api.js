import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

export async function getDetalleInstructor(id) {
    try {
        const response = await cursosApi.get(`/instructor/${id}`);

        return response.data;
    } catch (error) {
        throw getApiError(error);
    }
}