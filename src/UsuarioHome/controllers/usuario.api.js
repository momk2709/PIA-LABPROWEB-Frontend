import { cursosApi } from "../../api/cursosApi";
import { getApiError } from "../../utils/getApiError";


export async function getDetalleUsuario() {
    try {
        const response = await cursosApi.get("/user/profile");

        return response.data.data;
    } catch (error) {
        throw getApiError(error);
    }
}

export async function getDetalleFactura(id) {
    try {
        const response = await cursosApi.get(`/user/profile/factura/${id}`);
        return response.data;
    } catch (error) {
        throw getApiError(error);
    }
}

export async function editarRfc({
    rfc
}) {
    try {
        const response = await cursosApi.put(`/user/profile/factura/${id}`, {
            rfc
        });

        return response.data.data;
    } catch (error) {
        throw getApiError(error);
    }
}