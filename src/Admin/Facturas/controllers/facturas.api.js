import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

export async function getFacturas() {
  try {
    const response = await cursosApi.get("/admin/factura");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export async function editarFactura({ id, status_factura }) {
  try {
    const response = await cursosApi.put(`/admin/factura/${id}`, {
      status_factura,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
