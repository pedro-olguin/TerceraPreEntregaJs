const containerTarjetas = document.querySelector("#prodListCarrito");
const cantidadDeProductos = document.querySelector("#unidades");
const precioProductos = document.querySelector("#precio");
const carritoVacio = document.querySelector("#carritoVacio");
const ContainerTotales = document.querySelector("#totales");

//Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage
function crearTarjetasCarrito() {
  containerTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("productos"));
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("tarj-producto");
      div.innerHTML = `
                <h4> ${producto.titulo} </h4>
                  <p> ${producto.descripcion} </p>
                  <p class="oPromoP">$${producto.precio}</p>
                  <div class="btnContainer">
                  <button class="btn">-</button>
                  <span class="cantidad numCarrito">${producto.cantidad}</span>
                  <button class="btn">+</button>`;

      containerTarjetas.appendChild(div);
      div.getElementsByTagName("button")[0].addEventListener("click", (e) => {
        restarAlCarrito(producto);
        crearTarjetasCarrito();
        actualizarTotales();
      });
      div.getElementsByTagName("button")[1].addEventListener("click", (e) => {
        const cantidadDeProductos =
          e.target.parentElement.getElementsByClassName("cantidad")[0];
        cantidadDeProductos.innerText = agregarAlCarrito(producto);
        actualizarTotales();
      });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearTarjetasCarrito();

//=================================================================================================================

// Actualiza el precio y las unidades de la pagina del carrito
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadDeProductos.innerText = cantidad;
  precioProductos.innerText = precio;
  if (precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

//Reiniciar Carrito

document.getElementById("reiniciar").addEventListener("click", () => {
  containerTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

//Comprar Carrito
document.getElementById("comprar").addEventListener("click", () => {
  comprarCarrito();
  reiniciarCarrito();
});

//=============================================================================================================

// Muestra o esconde el mensaje de carrito vacio
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("productos"));
  carritoVacio.classList.toggle("escondido", productos);
  ContainerTotales.classList.toggle("escondido", !productos);
}

//============================================================================================================
