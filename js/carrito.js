const carritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
const contenedorCarritoVacio = document.getElementById("carrito-vacio");
const contenedorCarritoProductos = document.getElementById("carritoProductos");
const contenedorCarritoAcciones = document.getElementById("carrito-acciones");
const contenedorCarritoComprado = document.getElementById("carrito-comprado");
const botonesEliminar = document.getElementById("carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.getElementById("total");
const botonComprar = document.getElementById("carrito-acciones-comprar")

function cargarProductosCarrito() {
  if (carritoLS) {
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    contenedorCarritoComprado.classList.add("disabled");
    botonComprar.classList.remove("disabled");
    contenedorCarritoProductos.innerText = "";

    carritoLS.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto", "row", "col-xl-3", "col-md-3", "col-sm-6", "p-3", "card", "mx-2", "mb-3");
      div.innerHTML = `
  <img class="carrito-producto-imagen img-fluid" src="${producto.imagen}"
      alt="${producto.titulo}">
  <div class="carrito-producto-titulo">
      <small>título</small>
      <h5>${producto.titulo}</h5>
  </div>
  <div class="carrito-producto-cantidad">
      <small>Cantidad</small>
      <p>${producto.cantidad}</p>
  </div>
  <div class="carrito-producto-tamanio">
      <small>Tamaño</small>
      <p>${producto.tamanio}</p>
  </div>
  <div class="carrito-producto-precio">
      <small>Precio</small>
      <p>${producto.precio}</p>
  </div>
  <div class="carrito-producto-subtotal">
      <small>Subtotal</small>
      <p>$${producto.precio * producto.cantidad}</p>
  </div>
  <button class="btn btn-outline-info carrito-producto-eliminar mx-5 mt-3" id="${producto.id
        }"><i
          class="bi bi-trash-fill"></i></button> `;
      carritoProductos.appendChild(div);
    })

    actualizarTotal();
    actualizarBotonesEliminar();
  } else { botonComprar.classList.add("disabled") };
}
cargarProductosCarrito();

function actualizarBotonesEliminar() {
  const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  botonesEliminar.forEach((boton) => boton.addEventListener("click", eliminarDelCarrito));
}

function eliminarDelCarrito(e) {
  idBoton = e.currentTarget.id;
  const index = carritoLS.findIndex((producto) => producto.id === idBoton);
  carritoLS.splice(index, 1);
  cargarProductosCarrito();
  localStorage.setItem("productos-en-carrito", JSON.stringify(carritoLS));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
  carritoLS.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(carritoLS));
  cargarProductosCarrito();
}

function actualizarTotal() {
  const sumaTotal = carritoLS.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  total.innerHTML = `$${sumaTotal}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
  carritoLS.length = 0;
  localStorage.setItem("productos-en-carrito", JSON.stringify(carritoLS));

  contenedorCarritoVacio.classList.add("disabled");
  contenedorCarritoProductos.classList.add("disabled");
  contenedorCarritoAcciones.classList.add("disabled");
  contenedorCarritoComprado.classList.remove("disabled");

  Swal.fire({
    position: 'center',
    icon: 'success',
    text: `Muchas gracias por tu compra`,
    showConfirmButton: false,
    timer: 2000,
    width: `25%`,
    padding: `1rem`,
  })
}