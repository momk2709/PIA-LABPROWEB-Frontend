import { isAdmin } from "../utils/getSession";

document.addEventListener("DOMContentLoaded", async () => {
  const admin = await isAdmin();
  if (admin) {
    window.location.href = "/Admin/index.html";
  }
});
