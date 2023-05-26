import { getApiError } from "../../utils/getApiError";
import { cursosApi } from "../../api/cursosApi";

async function register({ nombre, email, password, passwordConfirmation }) {
  try {
    const response = await cursosApi.post("/auth/register", {
      nombre,
      email,
      password,
      passwordConfirmation,
    });

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}

export { register };
