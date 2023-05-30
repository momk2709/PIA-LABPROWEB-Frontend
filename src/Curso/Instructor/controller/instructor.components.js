import { ComponenteBase } from "../../../Components";

export class DatosInstructor extends ComponenteBase {
    constructor(nombre, foto, descripcion, email) {
        super();
        this.nombre = nombre;
        this.foto = foto;
        this.descripcion = descripcion;
        this.email = email;
    }

    render() {
        return `
                <div class="row justify-content-center">
                <div class="card" style="width: 18rem;">
                    <img src="${this.foto}" class="card-img-top" alt="Foto del Instructor">
                        <div class="card-body">
                            <h5 class="card-title">${this.nombre}</h5>
                            <em>${this.email}</em>
                            <p>${this.descripcion}</p>
                        </div>
                </div>
                </div>
        `;
    }
}
