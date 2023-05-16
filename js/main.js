class producto {
  constructor(id, titulo, imagen, precio, tamanio) {
    this.id = id;
    this.titulo = titulo;
    this.imagen = imagen;
    this.precio = precio;
    this.tamanio = tamanio;
    this.cantidad = 1;
  }
}

const uno = new producto("g1", "Uno", "./img-gr/gr1.jpg", 500, "25 x 14");
const encuentro_color = new producto("g2", "Encuentro color", "./img-gr/gr2.jpg", 800, "48 x 54");
const espejo = new producto("g3", "Espejo", "./img-gr/gr3.jpg", 400, "25 x 14");
const encuentro = new producto("g4", "Encuentro", "./img-gr/gr4.jpg", 700, "48 x 54");
const valizas = new producto("g5", "Valizas", "./img-gr/gr5.jpg", 400, "14 x 14");
const sauce = new producto("g6", "Sauce", "./img-gr/gr6.jpg", 700, "25 x 14");
const vuelvo = new producto("g7", "Vuelvo", "./img-gr/gr7.jpg", 400, "15 x 25");
const punio = new producto("g8", "Puño", "./img-gr/gr8.jpg", 400, "14 x 14");

const productos = [uno, encuentro_color, espejo, encuentro, valizas, sauce, vuelvo, punio];

let carrito = [];
const contenedorProductos = document.querySelector("#contenedor-productos");

function cargarProductos() {
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add(
      "producto",
      "col-xl-4",
      "col-md-6",
      "col-sm-12",
      "p-2",
      "pb-4",
      "text-center"
    );
    div.innerHTML = `<img class="producto-imagen img-fluid" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="producto-detalles">
                            <h4 class="producto-titulo py-2">${producto.titulo}</h3>
                            <p class="producto-precio py-1">$${producto.precio}</p>
                            <p class="producto-tamanio py-1">${producto.tamanio}</p>
                            <button class="btn btn-info" id="boton${producto.id}">Agregar</button>
                        </div>`;

    contenedorProductos.appendChild(div);

    // agregar productos al Carrito

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
      Swal.fire({
        position: 'bottom-start',
        icon: 'success',
        text: `"${producto.titulo}" se agregó al carrito`,
        showConfirmButton: false,
        timer: 1500,
        width: `25%`,
        padding: `1rem`,
      })
    });
  });
}

const carritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if (carritoLS) {
  carrito = carritoLS;
} else {
  carrito = [];
};

cargarProductos();

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find((producto) => producto.id === id);
    carrito.push(producto);
  }

  localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
};
