import { ComponenteBase } from "../../Components";
import { format } from "date-fns";

export class DatosCurso extends ComponenteBase {
    constructor(nombre, descripcion, precio, fecha_Inicio, fecha_Fin) {
        super();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.fechaInicio = fecha_Inicio;
        this.fechaFin = fecha_Fin;
    }

    render() {
        return `
                 <div id="cursoLink" class="col-md-3 col-12 mb-5">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">${this.descripcion}</p>
                        <p>$ ${this.precio}</p>
                         <h4>Fecha Inicio:</h4>
                <p>${format(new Date(this.fechaInicio), "MMMM d, yyyy")}</p>
                <h4>Fecha Fin:</h4>
                <p>${format(new Date(this.fechaFin), "MMMM d, yyyy")}</p>
                        </div>
                    </div>
                </div>
        `
    }
}

export class DatosFactura extends ComponenteBase {
    constructor(id, fecha, status_factura, precio) {
        super();
        this.id = id;
        this.fecha = fecha;
        this.status_factura = status_factura;
        this.precio = precio;
    }

    render() {
        return `
                 <div id="cursoLink" class="col-md-3 col-12 mb-5">
                    <div class="card">
                        <div class="card-body">
                        <h4>Fecha</h4>
                <p>${format(new Date(this.fecha), "MMMM d, yyyy")}</p>
                <h4>Status:</h4>
                        <p class="card-text">${this.status_factura}</p>
                        <p>$ ${this.precio}</p>
                        </div>
                    </div>
                </div>
        `
    }
}

