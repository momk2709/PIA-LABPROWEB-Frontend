export class CategoriaCard {
  constructor(enlace, titulo_curso, descripcion_curso) {
    this.enlace = enlace;
    this.titulo_curso = titulo_curso;
    this.descripcion_curso = descripcion_curso;
  }

  render() {
    const html = `
        <div class="col-lg-4 col-12 position-relative mb-5">
          <a href="${this.enlace}">
            <div class="card">
              <div class="card-body">
                <div id="curso" class="card-title text-white text-center p-4">
                  <h5>${this.titulo_curso}</h5>
                </div>
                <div id="descripcionCurso" class="card-text text-white text-center p-3">
                  <p>${this.descripcion_curso}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      `;

    return html;
  }

  insertarEnContenedor(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
      const htmlComponente = this.render();
      contenedor.innerHTML += htmlComponente;
    } else {
      console.error(`El contenedor con ID '${contenedorId}' no existe.`);
    }
  }
}
