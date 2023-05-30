import {cursosApi} from "../../../api/cursosApi";
import {getApiError} from "../../../utils/getApiError";

export async function getALLUsers() {
  try {
    const response = await cursosApi.get("/admin/users");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
export async function createUsers({
  nombre,
  email,
  rol,
}) {
  try {
    const response = await cursosApi.post("/admin/users", {
      nombre,
      email,
      rol,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
export async function updateUsers({
  id,
  nombre,
  email,
  rol,
}) {
  try {
    const response = await cursosApi.put(`/admin/users/${id}`, {
      nombre,
      email,
      rol,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
export async function deleteUser(id) {
  try {
    const response = await cursosApi.delete(`/admin/users/${id}`);

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
