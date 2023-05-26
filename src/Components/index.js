export class ComponenteBase {
  constructor() {
    if (this.constructor === ComponenteBase) {
      throw new Error(
        "La clase ComponenteBase no puede ser instanciada directamente."
      );
    }
  }

  render() {
    throw new Error(
      "El método 'render' debe ser implementado en la clase hija."
    );
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
