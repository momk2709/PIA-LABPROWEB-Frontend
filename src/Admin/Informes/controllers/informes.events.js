import { getAllInformes } from "./informes.api";
import Swal from "sweetalert2";
import DataTable from "datatables.net-dt";
import format from "date-fns/format";

document.addEventListener("DOMContentLoaded", async () => {
  const response = await getAllInformes();
  const seeInforme = response.informes.map((informes) => {
    return [
      informes.id,
      informes.nombre,
      informes.telefono,
      informes.email,
      informes.mensaje,
    ];
  });
  const informesTable = document.getElementById("informes-table");
  const dataTable = new DataTable(informesTable, {
    data: seeInforme,
    columns: [
      { title: "Informes ID" },
      { title: "Nombre" },
      { title: "Telefono" },
      { title: "Email" },
      { title: "Mensaje" },
    ],
    scrollX: true,
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json",
    },
  });
});
