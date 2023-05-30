import { getDetalleUsuario, getDetalleFactura, editarRfc } from "./usuario.api";
import { DatosCurso, DatosFactura } from "./usuario.components";


window.addEventListener("DOMContentLoaded", async () => {
    try {

        const response = await getDetalleUsuario()
        const cursos = response.cursos.forEach(curso => {
            const datosCurso = new DatosCurso(
                curso.nombre,
                curso.descripcion,
                curso.precio,
                curso.fecha_inicio,
                curso.fecha_fin
            );

            datosCurso.insertarEnContenedor("cursosContenedor");

        });

        const facturas = response.facturas.forEach(factura => {
            const datosFactura = new DatosFactura(
                factura.id,
                factura.fecha,
                factura.status,
                factura.precio
            );

            datosFactura.insertarEnContenedor("facturasContenedor");

        });


    } catch (error) {
        console.error(error);
    }
})

