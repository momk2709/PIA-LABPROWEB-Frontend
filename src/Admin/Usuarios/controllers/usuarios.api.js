import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

export async function getALLUsers() {
  try {
    const response = await cursosApi.get("/admin/users");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
export async function createUsers({ nombre, email, rol, password }) {
  try {
    const response = await cursosApi.post("/admin/users", {
      nombre,
      email,
      rol,
      password,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
export async function updateUsers(usuario) {
  try {
    const response = await cursosApi.put(`/admin/users/${usuario.id}`, usuario);

    return response.data.data;
  } catch (error) {
    console.log(error);
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

export async function asignarUsuario({ usuario_id, curso_id }) {
  try {
    const response = await cursosApi.post("/admin/asignacion/curso-user", {
      usuario_id,
      curso_id,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
}
