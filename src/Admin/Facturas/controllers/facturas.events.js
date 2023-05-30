import { getFacturas, editarFactura } from "./facturas.api";

import DataTables from "datatables.net-dt";
import Swal from "sweetalert2";
import format from "date-fns/format";

const editarFacturaModal = document.getElementById("editar-factura-modal");

window.addEventListener("DOMContentLoaded", async () => {
  const response = await getFacturas();

  const facturas = response.facturas.map((factura) => {
    return [
      factura.id,
      factura.usuario_id,
      factura.curso_id,
      factura.usuario,
      factura.curso,
      format(new Date(factura.fecha), "dd/MM/yyyy"),
      factura.status,
      factura.rfc,
      factura.precio,
    ];
  });

  const facturasTable = document.getElementById("facturas-table");

  const dataTable = new DataTables(facturasTable, {
    data: facturas,
    columns: [
      { title: "ID" },
      { title: "Usuario ID" },
      { title: "Curso ID" },
      { title: "Usuario" },
      { title: "Curso" },
      { title: "Fecha" },
      { title: "Status" },
      { title: "RFC" },
      { title: "Precio" },
      {
        title: "Acciones",
        render: function (data, type, row) {
          return `
                    <button class="btn btn-warning btn-sm" data-id="${row[0]}">
                        EDITAR
                    </button>
                `;
        },
      },
    ],

    scrollX: true,
    scrollY: "50vh",
  });

  facturasTable.addEventListener("click", async (e) => {
    if (e.target.matches("button.btn-warning")) {
      const id = e.target.getAttribute("data-id");

      const factura = facturas.find((factura) => factura[0] === Number(id));

      const status_factura = document.getElementById("editar-factura-status");

      status_factura.value = factura[6];

      editarFacturaModal.setAttribute("data-id", id);

      $("#editar-factura-modal").modal("show");
    }
  });
});

const editarFacturaForm = document.getElementById("editar-factura-form");

editarFacturaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = Number(editarFacturaModal.getAttribute("data-id"));

  const status_factura = document.getElementById("editar-factura-status").value;

  try {
    const response = await editarFactura({ id, status_factura });

    Swal.fire({
      title: "Factura editada",
      text: `La factura con ID ${response.factura.id} ha sido editada`,
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      $("#editar-factura-modal").modal("hide");
      window.location.reload();
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessages = error.data.map((error) => {
        return `<li>${error.msg}</li>`;
      });
      Swal.fire({
        title: "Validation Error",
        html: `<ul>${errorMessages.join("")}</ul>`,
        icon: "error",
      });
    } else {
      Swal.fire("Error", error.message, "error");
    }
  }
});
