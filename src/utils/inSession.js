import { getSession } from "./getSession";

const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const informeTab = document.getElementById("informes");
const menu = document.getElementById("menu");

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const session = await getSession();

    if (!session) {
      registerButton.classList.remove("d-none");
      loginButton.classList.remove("d-none");
      informeTab.classList.remove("d-none");
      menu.classList.add("d-none");
    } else {
      registerButton.classList.add("d-none");
      loginButton.classList.add("d-none");
      informeTab.classList.add("d-none");
    }
  } catch (error) {
    console.log(error);
  }
});
