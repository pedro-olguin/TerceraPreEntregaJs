let formContacto = document.querySelector("#formContacto");
const ventanaFlotante = document.querySelector("#ventanaFlotante");
let nombre = document.querySelector("#nombre");
let telefono = document.querySelector("#telefono");
let destinatario = document.querySelector("#destinatario");
let cantPers = document.querySelector("#cantPers");
let save = document.querySelector("#save");
let fecha = document.querySelector("#fecha");
let btnSearch = document.querySelector("#btnSearch");
const inputSearch = document.querySelector("#search");
const ulProdElegido = document.querySelector("#ulProdElegido");
const carrito = [];

const productList = document.querySelector("#productList");

function crearHtml(productos) {
  productList.innerHTML = "";
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("productoContainer");
    div.innerHTML = `
    <img src="../assets/${producto.img}" class="card-img-top"
        alt="imagen ilustrativa en representacion de promo 1 de pizzas">
    <div class="card-body">
        <h4 class="card-title"> ${producto.titulo} </h4>
        <p class="card-text"> ${producto.descripcion} </p>
        <p class="oPromoP">$${producto.precio}</p>
        <button class="btn" id="prod-${producto.id}"> Comprar </button>
    </div>`;

    productList.appendChild(div);
    const boton = document.getElementById(`prod-${producto.id}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  });
}

crearHtml(productos);

// function formularioFlotante() {
//   formContacto = addEventListener("submit", (e) => {
//     e.preventDefault();
//     nombre = nombre.value;
//     telefono = telefono.value;
//     destinatario = destinatario.value;
//     cantPers = cantPers.value;
//     fecha = fecha.value;

//     formContacto = [nombre, telefono, destinatario, cantPers, fecha];

//     localStorage.setItem("formContacto", JSON.stringify(formContacto));

//     ventanaFlotante.style.display = "none";
//   });
// }

function formularioFlotante() {
  const formContacto = document.getElementById("formContacto");

  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const destinatario = document.getElementById("destinatario").value;
    const cantPers = document.getElementById("cantPers").value;
    const fecha = document.getElementById("fecha").value;

    const formContacto = {
      nombre: nombre,
      telefono: telefono,
      destinatario: destinatario,
      cantPers: cantPers,
      fecha: fecha,
    };

    localStorage.setItem("formContacto", JSON.stringify(formContacto));

    ventanaFlotante.style.display = "none";
  });
}

formularioFlotante();

function filtrarProducto(arr, filtros) {
  const filtro = arr.filter((el) => {
    return el.descripcion.includes(filtros.toLowerCase());
  });

  return filtro;
}

btnSearch.addEventListener("click", () => {
  const filtrado = filtrarProducto(productos, inputSearch.value);

  crearHtml(filtrado);
});
