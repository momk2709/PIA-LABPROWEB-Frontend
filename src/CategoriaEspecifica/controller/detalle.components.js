import { ComponenteBase } from "../../Components";

export class ComponenteCursoInformacion extends ComponenteBase {
  constructor(titulo_curso, descripcion_curso, imagen_src) {
    super();
    this.titulo_curso = titulo_curso;
    this.descripcion_curso = descripcion_curso;
    this.imagen_src = imagen_src;
  }

  render() {
    return `
        <div id="information-container" class="row">
          <div class="col-lg-6 col-12">
            <div class="p-3">
              <h1>${this.titulo_curso}</h1>
              <p id="descripcionCurso" class="mt-4 fs-5">${this.descripcion_curso}</p>
            </div>
          </div>
          <div class="col-lg-6 col-12">
            <img src="${this.imagen_src}" width="80%" alt="Imagen de la categoria" />
          </div>
        </div>
      `;
  }
}
export class ComponenteCursoLink extends ComponenteBase {
  constructor(titulo_curso, fecha_inicio, fecha_fin, navto) {
    super();
    this.titulo_curso = titulo_curso;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.navto = navto;
  }

  render() {
    return `
        <div class="col-md-6 col-12 mb-5 cursoLink">
          <div class="card">
            <a href="${this.navto}">
              <div class="card-body">
                <h5 class="card-title">${this.titulo_curso}</h5>
                <p class="card-text"><b>Inicia:</b> ${this.fecha_inicio}</p>
                <p class="card-text"><b>Finaliza:</b> ${this.fecha_fin}</p>
              </div>
            </a>
          </div>
        </div>
      `;
  }
}
