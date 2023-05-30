import { cursosApi } from "../api/cursosApi";

async function sessionControl() {
  const token = window.localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const response = await cursosApi.get("/auth/me");

    return response.data.data;
  } catch (error) {
    return false;
  }
}

export async function getSession() {
  const session = await sessionControl();

  if (!session) {
    return false;
  }

  return session;
}

export async function isAdmin() {
  const session = await getSession();

  if (session.rol === "ADMIN") {
    return true;
  }

  return false;
}
