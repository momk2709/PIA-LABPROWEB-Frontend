import { ComponenteBase } from "../../Components";
import { format } from "date-fns";
export class DatosCurso extends ComponenteBase {
  constructor(nombre, fechaInicio, fechaFin, precio, imagenSrc) {
    super();
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.precio = precio;
    this.imagenSrc = imagenSrc;
  }

  render() {
    return `
        <div class="row mb-5">
          <div class="col-lg-6 col-12">
            <img src="${
              this.imagenSrc
            }" width="100%" alt="Imagen de la categoría del curso">
          </div>
          <div class="col-lg-6 col-12">
            <ul>
              <li>
                <h5 class="display-5">${this.nombre}</h5>
              </li>
              <li>
                <h4>Fecha Inicio:</h4>
                <p>${format(new Date(this.fechaInicio), "MMMM d, yyyy")}</p>
              </li>
              <li>
                <h4>Fecha Fin:</h4>
                <p>${format(new Date(this.fechaFin), "MMMM d, yyyy")}</p>
              </li>
              <li>
                <h4>Precio:</h4>
                <p>${this.precio}</p>
              </li>
            </ul>
          </div>
        </div>
      `;
  }
}

export class DescripcionComponente extends ComponenteBase {
  constructor(texto) {
    super();
    this.texto = texto;
  }

  render() {
    return `
        <div class="descripcion p-5">
          <h1>Información del curso</h1>
          <p class="text-justify-center">${this.texto}</p>
        </div>
      `;
  }
}

export class DatosInstructor extends ComponenteBase {
  constructor(nombre, foto, descripcion, enlace, email) {
    super();
    this.nombre = nombre;
    this.foto = foto;
    this.descripcion = descripcion;
    this.enlace = enlace;
    this.email = email;
  }

  render() {
    return `
        <div class="row mt-5">
          <div class="col-lg-4">
            <img src="${this.foto}" width="100%" alt="Foto del Instructor" />
          </div>
          <div class="col-lg-5">
            <a href="${this.enlace}"><h4>${this.nombre}</h4></a>
            <em>${this.email}</em>
            <p>${this.descripcion}</p>
          </div>
        </div>
      `;
  }
}
