import { cursosApi } from "../../../api/cursosApi";
import { getApiError } from "../../../utils/getApiError";

export const getAllInstructores = async () => {
  try {
    const response = await cursosApi.get("/admin/instructor");

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
};

export const createInstructor = async ({
  nombre,
  email,
  descripcion,
  telefono,
  imagenUrl,
}) => {
  try {
    const response = await cursosApi.post("/admin/instructor", {
      nombre,
      email,
      descripcion,
      telefono,
      imagenUrl,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
};

export const updateInstructor = async ({
  id,
  nombre,
  email,
  descripcion,
  telefono,
  imagenUrl,
}) => {
  try {
    const response = await cursosApi.put(`/admin/instructor/${id}`, {
      nombre,
      email,
      descripcion,
      telefono,
      imagenUrl,
    });

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
};

export const deleteInstructor = async (id) => {
  try {
    const response = await cursosApi.delete(`/admin/instructor/${id}`);

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
};

export const asignarInstructor = async ({ instructor_id, curso_id }) => {
  try {
    const response = await cursosApi.post(
      "/admin/asignacion/curso-instructor",
      {
        instructor_id,
        curso_id,
      }
    );

    return response.data.data;
  } catch (error) {
    throw getApiError(error);
  }
};
