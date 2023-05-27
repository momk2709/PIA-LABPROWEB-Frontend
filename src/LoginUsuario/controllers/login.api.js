import { cursosApi } from "../../api/cursosApi";
import { getApiError } from "../../utils/getApiError";

export async function login({ email, password }) {
  try {
    const response = await cursosApi.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw getApiError(error);
  }
}
