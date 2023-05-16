let costoVidrio = 0;
let perimetro = 0;
let costoMoldura = 0;
let precioRedondeado = 0;

class marco {
  constructor(
    nombreCliente,
    largo,
    ancho,
    molduraSeleccionada,
    costoVidrio,
    perimetro,
    costoMoldura,
    precioRedondeado
  ) {
    (this.nombreCliente = nombreCliente),
      (this.largo = largo),
      (this.ancho = ancho),
      (this.molduraSeleccionada = molduraSeleccionada),
      (this.costoVidrio = costoVidrio),
      (this.perimetro = perimetro),
      (this.costoMoldura = costoMoldura);
    this.precioRedondeado = precioRedondeado;
  }
}
const marcos = [];

if (localStorage.getItem("marcos")) {
  let marco = JSON.parse(localStorage.getItem("marcos"));

  for (let i = 0; i < marcos.length; i++) {
    marcos.push(marco[i]);
  }
}

const formulario = document.getElementById("formulario");
const btnCalcular = document.querySelector("#btnCalcular");
const fragment = document.createDocumentFragment();

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  calc();
  verPresupuesto();
});

function calc() {
  const nombreCliente = document.querySelector("#inputNombre").value;
  const largo = parseFloat(document.querySelector("#inputLargo").value);
  const ancho = parseFloat(document.querySelector("#inputAncho").value);
  const costoVidrio = parseFloat((ancho * largo) / 5.6);
  const perimetro = parseFloat(2 * ancho + 2 * largo);
  let costoMoldura;
  const molduraIndex =
    document.querySelector("#inputMoldura").selectedIndex - 1;
  const molduraSeleccionada = molduras[molduraIndex];

  if (perimetro < 244) {
    costoMoldura = molduraSeleccionada.precio;
  } else if (perimetro >= 244 && perimetro <= 488) {
    costoMoldura = 2 * molduraSeleccionada.precio;
  } else {
    costoMoldura = 3 * molduraSeleccionada.precio;
  }

  let costoEstimado = costoVidrio + costoMoldura + 100;
  let precioFinal = 2 * costoEstimado;
  let precioRedondeado = Math.ceil(precioFinal / 50) * 50;

  const nuevoMarco = new marco(
    nombreCliente,
    largo,
    ancho,
    molduraSeleccionada,
    costoVidrio,
    perimetro,
    costoMoldura,
    precioRedondeado
  );
  marcos.push(nuevoMarco);
  //Agrego al LocalStorage:
  localStorage.setItem("marcos", JSON.stringify(marcos));
  formulario.reset();
}

const contenedor = document.querySelector("#contenedor");

function verPresupuesto() {
  contenedor.innerHTML = "";
  marcos.forEach((marco) => {
    const div = document.createElement(`div`);
    div.innerHTML = ` 
    
    <div class="card m-2 mt-5 p-3 nuevoMarco shadow" >
      <p>${marco.nombreCliente}</p>
      <p>medidas: ${marco.largo} x ${marco.ancho}</p>
      <p>moldura: ${marco.molduraSeleccionada.nombre}</p>
      <p>precio: ${marco.precioRedondeado}</p>
      
    </div>  `;

    contenedor.appendChild(div);
  });
}

let molduras = [];

fetch(`json/molduras.json`)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    molduras = data;
    for (const moldura of molduras) {
      const option = document.createElement("option");
      option.value = parseFloat(moldura.precio);
      option.innerText = moldura.nombre;
      fragment.appendChild(option);
    }
    inputMoldura.appendChild(fragment);
  })
  .catch(error => {
    console.error("Error al cargar los datos del archivo JSON:", error);
  });
