import { getApiError } from "../../utils/getApiError";
import { cursosApi } from "../../api/cursosApi";

export async function registrarInforme({ nombre, telefono, email, mensaje }) {
  try {
    const response = await cursosApi.post("/informe", {
      nombre,
      telefono,
      email,
      mensaje,
    });

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}


